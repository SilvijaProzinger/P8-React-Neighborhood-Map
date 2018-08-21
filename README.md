# Neighborhood Map

This project is the last project made for Udacity's Front End Nanodegree. The goal of this project was to create a  map using React 
which shows all the nearby places or points of interest in a chosen city. In my map I show all the coffee shops near the city square in city of Osijek in Croatia. This project was bootstraped with create-react-app and uses Foursquare API as well as Google Maps API.

## Features
The user can view a map with points of interests (coffee shops) near Ante Starčević Square. Each point of interest is marked by a  marker, and on click user can view the info window with additional data such as the name of the coffee shop and it's adress if it's fetched by Foursquare's API. Users can also see the list of veneus by clickin the hamburger menu on the right and by clicking on the place in the list, it's corresponding marker bounces. There is also a filter box which allows user to search for one of the available coffee shops.

## How to run
*Download or clone the repository
*Install all project dependencies with npm install
*Start the development server with npm start
*Run on http://localhost:3000 

Additionaly, create-react-app also provides a service worker but it only runs in production mode. To start production mode after installing the project dependencies do the following:

*Run npm run build
*Type npm install -g serve
*Start production mode with serve -s build
*Run on http://localhost:5000

## Code dependencies
*create-react-app
*Foursquare 
*google maps (no package)
*axios 
*react-burger-menu

## References
*Async google maps loading by Klaas on [klaasnotfound.com](https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/)
*[Axios documentation for fetching Foursquare API](https://github.com/axios/axios)
*Creating markers by lession chapter 8: Understanding API Services - 22.Devil in the Details
*Marker animation and events by [Google Maps documentation](https://developers.google.com/maps/documentation/javascript/markers)
*Info window by [Google Maps documentation](https://developers.google.com/maps/documentation/javascript/infowindows)
*How to filter markers after searching by Rene Korss on [Slackoverflow](https://stackoverflow.com/questions/22323073/how-to-filter-google-maps-markers-in-one-array-with-select)
*[React-burger-menu documentation for installing responsive sidebar](https://github.com/negomi/react-burger-menu)