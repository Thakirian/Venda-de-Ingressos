const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/sequelize');

dotenv.config();

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));

const apiRoutes = require('./routes/api/index');
app.use('/api', apiRoutes);

const webRoutes = require('./routes/web/web');
app.use('/', webRoutes);

sequelize
  .sync() 
  .then(() => {
    console.log('Banco de dados sincronizado.');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });

app.get('/test', (req, res) => {
  res.send('Servidor está funcionando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});