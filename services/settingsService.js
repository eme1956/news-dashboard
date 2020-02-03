const fs = require('fs');

//Datei settings.json lesen und JSON-Objekt erstellen 
const readSettings = () => { 
    return new Promise(resolve => {
        fs.readFile('settings.json', 'utf-8', (err, data) => {
            if (!err) {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve({});
                }
            } else {
                resolve({});
            }
        });
    });
};

//settings.js schreiben
const writeSettings = data => {
    fs.writeFileSync('settings.json', JSON.stringify(data));
};

module.exports = {
    readSettings,
    writeSettings
};