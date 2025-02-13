const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// Rota de Login
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });

  const data = await response.json();
  if (response.ok) {
    res.cookie('token', data.token, { httpOnly: true });
    res.redirect('/minhas-compras');
  } else {
    res.render('login', { title: 'Login', error: data.mensagem });
  }
});

// Rota de Logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

// Rota de Minhas Compras
router.get('/minhas-compras', async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/login');
  }

  const response = await fetch('http://localhost:3000/api/minhas-compras', {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  const compras = await response.json();
  res.render('compras', { title: 'Minhas Compras', compras });
});

// Rota de Visualização de Ingresso
router.get('/ingresso/:id', async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/login');
  }

  const response = await fetch(`http://localhost:3000/api/ingresso/${req.params.id}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  const ingresso = await response.json();
  res.render('ingresso', { title: ingresso.nome, ingresso });
});

module.exports = router;