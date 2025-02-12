const router = require('express').Router();
const UserController = require('../controller/userController');
const TicketController = require('../controller/userController');

router.post('/registrar', UserController.registrar);
router.post('/login', UserController.login);

module.exports = router;