import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';
import axios from 'axios';

//Money formatter function
function moneyFormatter(num) {
  let p = num.toFixed(2).split('.');
  return (
    '₹ ' +
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
      }, '') +
    '.' +
    p[1]
  );
}

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? '-' : '+';

  const handleDelete = async (id) => {
    try {
      // Send DELETE request to server to remove transaction
      await axios.delete(`http://localhost:5000/transactions/${id}`); // Adjust the URL as per your server endpoint

      // Update context after successful deletion from the server
      deleteTransaction(id);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text} <span>{sign}{moneyFormatter(transaction.amount)}</span>
      <button onClick={() => handleDelete(transaction.id)} className="delete-btn">x</button>
    </li>
  );

}
