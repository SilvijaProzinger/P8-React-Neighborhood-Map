import React, { Component } from 'react';
/*import logo from './logo.svg';*/
import './App.css';
//import axios to fetch data from Foursquare
import axios from 'axios';

//Import components
import Places from './components/Places';

class App extends Component {
	state = {
		places: [],
		markers: [],
		map: null
	}

	// Async method source: https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
	componentDidMount() {
	  // Call the initMap() asynchronously with componentDidMount method
	  window.initMap = this.initMap;
	  // Asynchronously load Google Maps
	  // Note: the API key is expired and map has watermark, please use your own API key to view properly
	  loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAUSrFja-h2hJqeIbh1whssllk3t8U6VAs&callback=initMap')

	  // Get Foursquare places using axios
	  axios.get('https://api.foursquare.com/v2/venues/search?ll=45.5616873,18.6770196&intent=browse&radius=1000&query=cafe&client_id=PGIW2RVNRZZJO4GIBP1ALRK4T3ZK20H4WFHEY5X2OZB4C1MN&client_secret=LLUU3RJV0MHUXU2RSWDZ3RAPO00HFZRKVGU2AGGXUQB41DUY&v=20180728')
	  .then(response => {
	    this.setState({
	      places: response.data.response.venues
	    }, () => this.createMarkers())
	    }).catch(error => {
	    console.log('Error fetching and parsing data', error);
	  });
	};

	// Initialize map
	initMap = () => {
	  // Only execute if map hasn't been setup before
	  if (!this.state.map) {
	    const map = new window.google.maps.Map(document.getElementById("map"), {
	      zoom: 14,
	      center: {
	        lat: 45.5616873,
	        lng: 18.6770196
	      }
	    });

	    this.setState({
	        map
	      }, () =>
	      // Calling createMarkers after setState has completed
	      this.createMarkers()
	    )
	  }
	}

	// The following function uses the places array to create an array of markers on initialize.
	createMarkers = () => {
	  // Use map from the current state
	  const map = this.state.map
	  // Continue if the marker array is empty, if the places array is filled, and map is set
	  if (this.state.markers.length === 0 && this.state.places.length > 0 && this.state.map) {
	    const places = this.state.places
	    const markers = []
	    for (let i = 0; i < places.length; i++) {
	      // Get the position from the location array
	      const position = places[i].location;
	      const title = places[i].name;
	      const venueID = places[i].venueID;

	      // Create a marker per location, and put into markers array.
	      const marker = new window.google.maps.Marker({
	        position: position,
	        title: title,
	        animation: window.google.maps.Animation.DROP,
	        icon: this.state.defaultIcon,
	        venueID: venueID,
	        map: map
	      });

	      markers.push(marker)
	      console.log('marker created')
	    }
	    this.setState({
	      markers
	    })
	    console.log('function called')
	  }
	}

	// Create default marker icon
	makeMarkerIcon(markerColor) {
	  const markerImage = new window.google.maps.Icon(
	    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15%7C0%7C' + markerColor +
	    '|40|_|%E2%80%A2',
	    new window.google.maps.Size(21, 34),
	    new window.google.maps.Point(0, 0),
	    new window.google.maps.Point(10, 34),
	    new window.google.maps.Size(21, 34)
	  );
	  return markerImage;
	};


  render() {
  	const { places, search, markers} = this.state
    if (search) {
      // get the index of elements that does not start with the query
      // and use that index with markers array to setMap to null
      places.forEach((place,i) => {
        if(place.name.toLowerCase().includes(search.toLowerCase())) {
          markers[i].setVisible(true)
        } else {
          markers[i].setVisible(false)
        }
      })
    } else {
      places.forEach((place,i) => {
        if (markers.length && markers[i]) {
          markers[i].setVisible(true)
        }
      })
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Coffee Shops near Ante Starčević Square, Osijek, Croatia</h1>
        </header>
        <main>
          <div id="map" style={{ height: `600px`, width: '100%' }}></div>
          <div id="places-sidebar">
          	<Places 
          	places={this.state.places} 
          	markers={this.state.markers}
          	/>
          </div>
        </main>
      </div>
    );
  }
}

function loadJS(src) {
var ref = window.document.getElementsByTagName("script")[0];
var script = window.document.createElement("script");
script.src = src;
script.async = true;
ref.parentNode.insertBefore(script, ref);
}

export default App;
