const 
    newsapi = require('newsapi-wrapper'),
    settingsService = require('../services/settingsService');

//eingegebene Formular-Daten empfangen und in Datei schreiben
const receiveSettings = (req, res) => {
    settingsService.writeSettings(req.body);
    renderSettings(req, res); // settings.html anzeigen
};

// Settings Ausgabe aufbereiten
const renderSettings = (req, res) => {
    settingsService.readSettings()
        .then(settings => { 
            res.render('settings', {
                title: 'settings',
                heading: 'Settings',
                settingsActive: true,
                newsApiKey: settings['news-api-key'] || '',
                newsApiCategories: newsapi.getCategories().map(categoryName => {
                    return {
                        value: categoryName,
                        label: categoryName,
                        selected: categoryName === settings['news-api-category']   
                    };
                })
            });
        });
};

module.exports = {
    renderSettings,
    receiveSettings
}