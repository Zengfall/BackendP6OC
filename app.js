const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

mongoose.connect('mongodb+srv://lordzeng:Madiop1957@cluster0.r2gbqli.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: false,
})); // sécurise en tête http

app.use(cors()); 

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;