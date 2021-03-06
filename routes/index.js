const router = require('express').Router(),
    newsController = require('../controllers/newsController'),
    settingsController = require('../controllers/settingsController'),
    loginController = require('../controllers/loginController'),
    userController = require('../controllers/userController'),
    authMiddleware = require('../middleware/authMiddleware'),
    apiKeyCheck = require('../middleware/apiKeyCheck');

// Routing: Client fordert mit http GET eine Response an
// Eingabe einer URL im Browser
router.get('/', newsController.renderHome);
router.get('/home', newsController.renderHome);

router.get('/admin', authMiddleware, settingsController.renderSettings);
router.get('/settings', authMiddleware, settingsController.renderSettings);
//save-button löst senden des Formulars an den Server aus
router.post('/settings', authMiddleware, settingsController.receiveSettings);

router.get('/login', loginController.renderLogin);
//login-button löst das senden des Formulars an den Server aus
router.post('/login', loginController.submitLogin);

router.get('/logout', loginController.logout);

//Endpoint 1
router.post('/user', apiKeyCheck, userController.create);
//Endpoint 2
router.get('/user/:id', apiKeyCheck, userController.getById);
//Endpoint 3
router.get('/user', apiKeyCheck, userController.getAll);
//Endpoint 4
router.delete('/user/:id', apiKeyCheck, userController.deleteById);
//Endpoint 5
router.patch('/user', apiKeyCheck, userController.update);

module.exports = router; //export bzw. import
