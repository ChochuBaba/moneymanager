import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
  transactions: []
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  }

  useEffect(() => {
    const fetchLatestTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/transactions'); // Adjust the URL as per your server endpoint
        const latestTransactions = response.data;
        // Update the state with the fetched transactions
        dispatch({
          type: 'SET_TRANSACTIONS',
          payload: latestTransactions
        });
      } catch (error) {
        console.error('Error fetching latest transactions:', error);
      }
    };

    fetchLatestTransactions();
  }, []);

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    deleteTransaction,
    addTransaction
  }}>
    {children}
  </GlobalContext.Provider>);
}