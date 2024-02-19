const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://tlscarvalhos:Selat%40105@cluster0.iobxrym.mongodb.net/amarelo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Define schema and model
const Schema = mongoose.Schema;
const itemSchema = new Schema({
  nome: String,
  idade: Number,
  motivo: String,
});

const Item = mongoose.model('Item', itemSchema, 'azul');

// API routes
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro :(' });
  }
});

app.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro :(' });
  }
});

app.put('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Item.findByIdAndUpdate(id, req.body);
    res.json({ message: 'Item alterado com sucesso :)' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro :(' });
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.json({ message: 'Item deletado com sucesso :)' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro :(' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
