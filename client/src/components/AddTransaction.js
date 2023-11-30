import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';
import axios from 'axios';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit =async(e) => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount //setting it to be a number 
    };

    addTransaction(newTransaction);

    try {
      // Send POST request to server to add transaction
      const response = await axios.post('http://localhost:5000/transactions/add', newTransaction);

      addTransaction(newTransaction); // Update the context with the new transaction

      console.log(response.data); // Log the response from the server (optional)
    } catch (error) {
      console.error('Error adding transaction:', error);
    }

    // Clear the form fields after adding transaction
    setText('');
    setAmount(0);



    
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount 
            <br />
            (negative - expense, positive - income)
          </label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  )
}
