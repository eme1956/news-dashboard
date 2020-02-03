const
    newsService = require('../services/newsService');

// News-API aufrufen und Home Ausgabe aufbereiten mit Promises
const renderHome = (req, res) => {
    let articles = [],  //Definition der neuen Variablen
        message = '';
        
        newsService.getNews().then(response => { //wenn Antwort OK,...
            articles = response.articles;        //...diese entgegenehmen
        })
        .catch(err => {       // Fehlerhandling
            message = 'Error when retrieving articles from NewsAPI';    
        })
        .then(() => {  // zusätzlichen then; es wird immer ausgeführt
            res.render('home', {
                title: 'news',
                heading: 'Welcome to your news dashboard!',
                homeActive: true,   
                articles,       //neue Variable
                message         //neue Variable
            });           
        });
};

module.exports = {
    renderHome
}