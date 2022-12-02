const 
    nodeCache = require('node-cache') ;

class Cache {
    #_cache;
    constructor(ttl=30){
        this.#_cache = new nodeCache({stdTTL: ttl, useClenes: false});
    }
    /*
    * create a namespace for the cache key
    * The value of target is expected to be in the the common messages as one targeTypes
    */

    set(key, val){
        this.#_cache.set(key, val) ;
    }

    get(key){
        let result = this.#_cache.get(key) || null ;
        return result ;
    }

    delete(key){
        return this.#_cache.del(key) || null ;
    }

    deleteAll() {this.#_cache.flushAll()}

    listKeys() {return this.#_cache.keys()}

}
module.exports = {Cache} ;