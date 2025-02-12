const router = require('express').Router();
const PurchaseController = require('../controller/purchaseController');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, PurchaseController.criar);
router.get('/minhas-compras', authMiddleware, PurchaseController.listarCompras);