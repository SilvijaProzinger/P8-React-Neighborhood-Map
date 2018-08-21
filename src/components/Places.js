import React, { Component } from 'react';
// Import react-burger-menu
import { slide as Menu } from 'react-burger-menu';

class Places extends Component {
		state = {
			places: this.props.places,
			search: '',
			markers: this.props.markers,
		};

	updateSearch (event) {
		this.setState({search: event.target.value});
	}

	// Trigger marker's info window when clicking on a location by comparing marker's title to venue name
	onLocationClick = (placeName) => {
        this.props.markers.map((marker) => {
            if(marker.title === placeName) {
                window.google.maps.event.trigger(marker, 'click');
            }
        })
    }

    // Filter markers after searching for venue, reference: Rene Korss on Stackoverflow: https://stackoverflow.com/questions/22323073/how-to-filter-google-maps-markers-in-one-array-with-select
    filterMarkers = () => {
		if (this.state.search !== '') { // If the user enters something in search field
        	this.props.places.forEach((place, i) => {
        		if (place.name.toLowerCase().includes(this.state.search.toLowerCase())) { // If the searched input matches venue name
          			this.props.markers[i].setVisible(true) // Show all appropriate markers
        		} else { // If the input doesn't match don't show those markers
          			this.props.markers[i].setVisible(false)
        		}
      			})
    	} else { //if there is no search input show all markers
      		this.props.places.forEach((place, i) => {
        		if (this.props.markers.length) {
         		    this.props.markers[i].setVisible(true)
        		}
      		})
   		}
    }

	// filteredList variable filters the list of places after user types into search box
	render () {
		let filteredList = this.props.places.filter(
			(place) => {
				// toLowerCase helps appropriate letter be recognized regardless of upper case or lower case
				return place.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;				
			}
		);
		                    
		// Variable list maps through list of places and their id to generate their names
		const list = filteredList.map((place, i) => {
			return (
				<li className="location-list" key = {i} onClick={() => this.onLocationClick(place.name)}>
				{place.name}
				</li>
			) 
		})

		this.filterMarkers()

		return (
		// Use react burger menu for sidebar
		<Menu right> 
		<div className="sidebar-content">
		 <div className="filter-box" aria-label="Filter places" tabIndex="0">
			<input type="text" 
			placeholder="Search for places"
			value={this.state.search} 
			onChange={this.updateSearch.bind(this)}
			markers={this.props.markers}/>
		  </div>
		 <div className="places-list">
		 	<h3>Places:</h3>
		 	<ul role="menu" aria-label="List of coffee shops">
		 	{list}
		 	</ul>
		 </div>
		 </div>
		 </Menu>

		)
	}
}

export default Places;