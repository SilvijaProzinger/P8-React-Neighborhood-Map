import React, { Component } from 'react';

class Places extends Component {
		state = {
			places: this.props.places,
			search: '',
			markers: this.props.markers,
		};

	updateSearch (event) {
		this.setState({search: event.target.value});

	}

	//filteredList variable filters the list of places after user types into search box
	render () {
		const markers = this.props.markers;
		let filteredList = this.props.places.filter(
			(place) => {
				//toLowerCase helps appropriate letter be recognized regardless of upper case or lower case
				return place.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
				/*for (let i = 0; i < this.props.places.length; i++){
					if(place.name.toLowerCase().includes(this.state.search.toLowerCase())) {
	                markers[i].setVisible(true)
				    } else {
					markers[i].setVisible(false)
			    }*/
				}
			
		);


		//variable list maps through list of places and their id to generate their names
		const list = filteredList.map((place, i) => {
			return (
				<li key = {i}>{place.name}</li>
			) 
		})

		return (
		<div className="sidebar-content">
		 <div className="filter-box">
			<input type="text" 
			placeholder="Search for places"
			value={this.state.search} 
			onChange={this.updateSearch.bind(this)}/>
		  </div>
		 <div className="places-list">
		 	<h3>Places:</h3>
		 	<ul>
		 	{list}
		 	</ul>
		 </div>
		 </div>

		)
	}
}

export default Places;