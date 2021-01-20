# Travel Application Summary:

The project includes a simple form where you enter the city you are traveling to and the date you are leaving and returning. 
you will get:
- the weather currenct forecast or predicted forecast : using WeatherBit API and geonames API
- an image of your destination city: using Pixabay API
- trip info: (duration, days to travel) calcuated from user input.


## Introduction:
you'll need to enter:
1- destination city
2- Departure date
3- returning date

## main functions:
- APIs functions:
    getFromGeoN: queries geonames API using user input (city) to get the city latitude and longitude
    getFromW_Bit: uses geonames returned data to extracts destination weather forcast info from weatherbit
    getFromPbay: to get the destination city picture from pixabay

- performAction: calculate trip info (duration, days to travel) and get APIs functions data
- updateUI: update user interface with the output info (Calculated trip info-picture- weather forcast)
- postDate: Post all the data.


##  important files:
app.js: it includes my API keys, the base URLs, all the above fuctions which are written in JS, eventlisteners...
style.scss:it includes all the styling code for the main user interface
output.scss: includes the styling code for the output that the user gets after hitting Submit button.
server.js: for server setup useing express, project endpoint,dependencies,libraries, get and post routes, webpack dev server for developement ....etc

## server
the app runs on port 7777.


## Reustls:
Weather forcast
Trip calculated information (days to travel - trip duration)
Destination picture

## Credits
www.udacity.com
SaharJazmati
