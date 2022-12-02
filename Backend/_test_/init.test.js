const
    {PrismaClient} = require('@prisma/client'),
    db= new PrismaClient(),
    JokeService = require('../app/services/joke_service'), 
    init = require('../app/utils/init') ;


//just want to make sure the init() function runs without error
//then check db manually to se if data was wrote
test('setting up app requirements', async () =>{
    let data = await init.init() ;
    
    expect(1).toBe(1) ;
}) ;


//this test call randomize function intensively to ensure 
//the return of a different joke every time
//and that the function works correctly
test('test intense randomize', async()=> {
    const
        muckHost = 'localhost',
        muckUserAgent = 'jest',
        totalJokes = await db.joke.count(),
        fetchedJokes = new Set();
    
    for (let i = 0; i < 1000; i++) {
        let result = await JokeService.getRandomJoke(muckHost, muckUserAgent) ;
        expect(result).toBeDefined() ;
        //when all jokes have been used clear the set and start over
        if(fetchedJokes.size == totalJokes){
            fetchedJokes.clear() ;
        }
        //make sure the joke has not been used yet
        expect(fetchedJokes.has(result.id)).toBeFalsy() ;
        fetchedJokes.add(result.id) ;
    }
    expect('success').toBe('success') ;
},1000*10);