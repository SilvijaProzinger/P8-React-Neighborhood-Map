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
		placeMarkers: []
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
  		})
  	})
  	.catch(error => {
    	console.log('Error fetching and parsing data', error);
  	});

    };

    // Initialize map   
    initMap () {
        let map = new window.google.maps.Map(document.getElementById("map"), {
        	zoom: 14,
        	center: {lat: 45.5616873, lng: 18.6770196 }
        });

        this.createMarkers();
    }

    // The following function uses the places array to create an array of markers on initialize.
    createMarkers = () => {

        for (let i = 0; i < this.state.places.length; i++) {
          // Get the position from the location array
          let position = this.state.places[i].location;
          let name = this.state.places[i].name;
          let venueID = this.state.places[i].venueID;

          // Create a marker per location, and put into markers array.
          let marker = new window.google.maps.Marker({
            position: position,
            title: this.place.name,
            map: this.map,
            animation: window.google.maps.Animation.DROP,
            icon: this.state.defaultIcon,
            venueID: venueID
          });
          // Set state to save the marker to our array of markers.
          this.setState((state) => ({
          	markers: [...state.markers, marker]
      	  }))
        }
    }

    // Create default marker icon
    makeMarkerIcon(markerColor) {
        const markerImage = new window.google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new window.google.maps.Size(21, 34),
          new window.google.maps.Point(0, 0),
          new window.google.maps.Point(10, 34),
          new window.google.maps.Size(21,34)
          );
          return markerImage;
      };


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Coffee Shops near Ante Starčević Square, Osijek, Croatia</h1>
        </header>
        <main>
          <div id="map" style={{ height: `600px`, width: '100%' }}></div>
          <div id="places-sidebar">
          	<Places places={this.state.places} markers={this.state.markers}/>
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
