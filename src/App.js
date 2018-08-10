import React, { Component } from 'react';
/*import logo from './logo.svg';*/
import './App.css';


class App extends Component {

	componentDidMount() {
        // Call the initMap() asynchronously with componentDidMount method
        window.initMap = this.initMap;
        // Asynchronously load Google Maps
        loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAUSrFja-h2hJqeIbh1whssllk3t8U6VAs&callback=initMap')
    };

    // Initialize map   
    initMap() {
        let map = new window.google.maps.Map(document.getElementById("map"), {
        	zoom: 14,
        	center: {lat: 45.5616873, lng: 18.6770196 }
        });
    }
    
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Coffee Shops near Ante Starčević Square, Osijek, Croatia</h1>
        </header>
          <div id="map" style={{ height: `600px`, width: '100%' }}></div>
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
