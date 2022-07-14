## crowd source geo data tool

A very simple crowding-source map application. It lets the user visualize information attached to a polygon or marker added by others. New information could also be added, by drawing a polygon or placing a marker.

The application was built with `Node.js` on the back-end using `Express` to serve `EJS` pages, handling HTTP requests and connecting to a `MongoDB` database using mongoose to better handling database operations. The front-end uses `bootstrap` to make it easy to style the page and uses `Leaflet.js` for the map and draw tool.

Check a live demo [here](https://crowd-source-map-tool.herokuapp.com/)

### How to run:
The best way to run this project is by using docker and docker-compose, this way don't need to have anything else installed in your machine. Just follow this steps:

1. Make a `.env` file with the same content as `.example.env`
2. Run `docker-compose up`
3. Open http://localhost:5000/

### TO-DO version 2
* add text-based search