## crowd source geo data tool

A very simple crowding-source map application. It lets the user visualize information attached to a polygon or marker added by others. New information could also be added, by drawing a polygon or placing a marker.

The application was built with `Node.js` on the back-end using `Express` to serve `EJS` pages, handling HTTP requests and connecting to a `MongoDB` database using mongoose to better handling database operations. The front-end uses `bootstrap` to make it easy to style the page and uses `Leaflet.js` for the map and draw tool.

Check a live demo [here](https://crowd-source-map-tool.herokuapp.com/)

### Running the project locally:
1. clone the repo and run `npm install`
2. create a `.env` file and add the line `DATABASE_URL=< your mongodb connection string >`
3. then you can run it with `npm run dev` to have hot reload with nodemon or `npm start`

### TO-DO version 2
* add text-based search