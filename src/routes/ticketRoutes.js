const router = require('express').Router();
const TicketController = require('../controller/ticketController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

router.get('/', TicketController.listar);
router.get('/:id', TicketController.buscar);
router.post('/', [authMiddleware, adminMiddleware], TicketController.criar);
router.put('/:id', [authMiddleware, adminMiddleware], TicketController.atualizar);
router.delete('/:id', [authMiddleware, adminMiddleware], TicketController.excluir);

module.exports = router;