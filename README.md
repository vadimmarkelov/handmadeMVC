# User stories

 *  Allow the user to sort the room table by occupancy
 	or price, display a total when the user selects a quantity.

 *  Display the reviews into blocks of 5 and pagination. Allow the user
	to sort the reviews by review score.


# Implementation

There is SHARED folder with handmade implementation of basic OOP.

Code has been organized by Features.

Folder FEATURES/ROOMS contain MVC for room table.

Folder FEATURES/REVIEWS contain MVC for reviews list.

I've used some third party libs like "handlebars" to compile templates. And there is a es5-shim patch in dependencies.

I've tried to be as much Vanilla as it can have sense in implementation of user stories.

But, in addition to Vanilla OOP and MVC there are build tools to assist in development and to create production ready code. It builds SASS styles, concatenates & uglifies JavaScript, makes live reload, runs unit tests and calculates test coverage.

# Development environment

To run the development environment and build app code you need [Node](http://nodejs.org), [Bower](http://bower.io) & [Gulp](http://gulpjs.com).

Follow these steps to run the local development setup of the front-end:

1. Install Gulp (if not yet installed): ```npm install -g gulp```
2. Install Bower (if not yet installed): ```npm install -g bower```
3. Install project dependencies: ```npm install && bower install```
4. Start the development environment: ```gulp watch```
5. Build project for production: ```gulp```

Example of code that has been built is located in DIST folder. 