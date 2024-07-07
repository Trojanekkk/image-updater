const loki = require('lokijs')

const db = new loki('data/image-updater.db', {
    autoload: true,
	autoloadCallback : initDB,
	autosave: true, 
	autosaveInterval: 5000
})

function initDB () {
    collections = [
        'containers',
        'images',
        'registries',
        'servers',
        'general'
    ]
    
    collections.forEach(collection => {
        if (db.getCollection(collection) === null) {
            db.addCollection(collection)
        }
    })
}

module.exports = (async function() {
    return db
})()