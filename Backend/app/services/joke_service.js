
const 
    {NotFoundError} = require('../utils/userFacingErrors'),
    {PrismaClient} = require('@prisma/client'),
    {Cache} = require('../utils/cache'),
    cache = new Cache();
    db = new PrismaClient();


exports.listJoke = async (limit = 20, offset = 0) =>{
    let count = await db.joke.count() ;
    let result = await db.joke.findMany({
        take: limit,
        skip: offset*limit,
    }) ;
    
    return {
        total: count,
        offset: offset,
        limit: limit,  
        results: result
    } ;
}


exports.getJoke = async (jokeId) => {
    
    let joke = await db.joke.findUnique({
        where: {
            id: jokeId,
        },
    }) ;

    if(!joke)
        throw new NotFoundError() ;
    
    return joke ;
}

/**
 * Return a randomized joke 
 * @param {string} host
 * @param {string} userAgent
 */
exports.getRandomJoke = async (host, userAgent)=> {
    let 
        usedJokes = cache.get(`used-jokes-${host}-${userAgent}`) || [],
        count = await db.joke.count();
        

    if(usedJokes.length >= count || usedJokes.length >=500){
        cache.delete(`used-jokes-${host}-${userAgent}`) ;
        usedJokes = [] ;
    }

    count -= usedJokes.length ;

    let 
        maxSize = 100,
        pages = (count <= 100)? 0 : Math.trunc(count/maxSize),
        randomOffset = (pages > 0)? Math.floor(Math.random() * (pages)) : 0;


    let result = await db.joke.findMany({
        take: maxSize,
        skip: maxSize*randomOffset,
        where: {
            NOT:{
                id: { in: usedJokes },
            }
        }
    });

    let 
        randomIndex = Math.floor(Math.random() * result.length),
        randomJoke = result[(randomIndex >= result.length)? 0: randomIndex] ;
    
    usedJokes.push(randomJoke.id) ;

    cache.set(`used-jokes-${host}-${userAgent}`, usedJokes) ;

    return randomJoke ;
}