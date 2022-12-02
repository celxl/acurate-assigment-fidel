require('dotenv').config('/.env') ;

//modules
const 
    express = require('express'),
    app = express(),
    glob = require('glob'),
    exceptions = require('./app/utils/userFacingErrors'),
    path = require('path');



// variables
const 
    port = process.env.PORT || 3000,
    endpointsPrefix = '_endpoint.js';


app.use(express.json()) ;

//use morgan only when not in production
process.env.NODE_ENV != "production" &&  app.use(require('morgan')('dev')) ;


//add routes
glob.sync(`./app/endpoints/*${endpointsPrefix}`).forEach(function (file) {
    console.log('Adding API Rest endpoint for: ' + path.basename(file)) ;
    let endpoint = require(path.resolve(file)) ;
    app.use(endpoint.base_uri, endpoint.router) ;
});



//global error response handle
app.use((err, req, res, next) => {
    (err) && ( console.error(err) ) ;
    if(err instanceof exceptions.UserFacingError){
        res.status(err.Status).json(err);
    }
    else {
        res.sendStatus(500)
    }
});


app.listen(port, ()=>{
    console.log('Server started on port: ' +port);
})
