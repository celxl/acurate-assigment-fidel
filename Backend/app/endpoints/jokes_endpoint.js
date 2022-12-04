const 
    express = require('express'),
    {BadRequestError} = require('../utils/userFacingErrors'),
    { body, param, query, matchedData,  validationResult } = require('express-validator'),
    router = express.Router(),
    JokeService = require('../services/joke_service'), 
    ENDPOINT_BASE_URI = '/jokes';



router.get('/',
    query('limit').optional().isInt().toInt(),
    query('offset').optional().isInt().toInt(),
    async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){ 
            throw new BadRequestError('bad request',errors) ;
        }

        let result = await JokeService.listJoke(req.query.limit , req.query.offset) ;
        res.json(result);
    } catch (error) {
        next(error) ;
    }
});

router.get('/randomize', async (req, res, next) => {
    try {
        let result = await JokeService.getRandomJoke(req.headers.host, req.headers['user-agent']) ;
        res.json(result) ;
    } catch (error) {
        next(error) ;
    }
});


router.get('/:jokeId',
    param('jokeId').isInt().toInt(),
    async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){ 
            throw new BadRequestError('bad request',errors) ;
        }

        let result = await JokeService.getJoke(req.params.jokeId) ;
        res.json(result);
    } catch (error) {
        next(error) ;
    }
});




const endpoint = {"router": router, "base_uri":ENDPOINT_BASE_URI} ;
module.exports = endpoint;