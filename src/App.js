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
	    alert ('Error fetching data from Foursquare API')
	    console.log('Error fetching and parsing data', error);
	  });

	  // Handles errors for Google Maps
      window.gm_authFailure = () => {
      alert('Error loading Google Maps. Check the API key.')
      }    
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
	  // Create info window
	  const infoWindow = new window.google.maps.InfoWindow()
	  // Continue if the marker array is empty, if the places array is filled, and map is set
	  if (this.state.markers.length === 0 && this.state.places.length > 0 && this.state.map) {
	    const places = this.state.places
	    const markers = []
	    for (let i = 0; i < places.length; i++) {
	      // Get the position and other attributes from the places array fetched from Foursquare
	      const position = places[i].location;
	      const title = places[i].name;
	      const venueID = places[i].venueID;

	      // Create a marker per location, and put into markers array.
	      const marker = new window.google.maps.Marker({
	        position: position,
	        title: title,
	        animation: window.google.maps.Animation.DROP,
	        venueID: venueID,
	        map: map
	      });

	      markers.push(marker)

	    this.setState({
	      markers
	    })

	    // Create variable which will populate info window with content fetched from Foursquare
	    let infoContent = `<h3 className="info-title">${this.state.places[i].name}</h3>
	                       <p className="info-text">Address: ${places[i].location.formattedAddress[0]} ${places[i].location.formattedAddress[1]} ${places[i].location.formattedAddress[2]}</p>`

	    // Display the info window after clicking on the marker
        marker.addListener('click', function() {
        	//Set info window content
        	infoWindow.setContent(infoContent)
                // Open the info window
                infoWindow.open(map, marker)

                // Animate the marker, source: https://developers.google.com/maps/documentation/javascript/examples/marker-animations
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(window.google.maps.Animation.BOUNCE)
                    setTimeout(function() {
                        marker.setAnimation(null)
                    }, 1000)
                }
            })
	  }
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
    return (
      <div className="App" role="main">
        <header className="App-header" aria-label="header" tabindex="0">
          <h1 className="App-title">Coffee Shops near Ante Starčević Square </h1>
           <h2 className="App-subtitle">Osijek, Croatia</h2>
           <img className="header-image" src="http://www.pngall.com/wp-content/uploads/3/Espresso-PNG-Free-Download.png" alt="coffee cup header"/>
        </header>
        <div className="main-container">
          <div id="map" style={{ height: `600px`, width: '100%' }} role="application" aria-labelledby="map" tabIndex="0"></div>
          <div id="places-sidebar">
          	<Places
          	places = {this.state.places} 
          	markers = {this.state.markers}
          	/>
          </div>
        </div>
        <footer className="footer" aria-label="footer" tabindex="0">
        	<h4>Made by Silvija Prozinger, powered by Foursquare API</h4>
        </footer>
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
