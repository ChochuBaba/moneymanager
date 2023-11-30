// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


// Create a schema for transactions
const transactionSchema = new mongoose.Schema({
  text: String,
  amount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model based on the schema
const Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');


// Set up routes

// Example route to get last 10 transactions
app.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 }).limit(5);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/transactions/add', async (req, res) => {
    try {
      const { text, amount } = req.body;
  
      // Create a new transaction instance using your Transaction model
      const newTransaction = new Transaction({
        text,
        amount,
      });
  
      // Save the transaction to MongoDB
      const savedTransaction = await newTransaction.save();
  
      res.status(201).json(savedTransaction); // Send back the saved transaction data as response
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.delete('/transactions/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      await Transaction.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

