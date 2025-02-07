import React, { useState, useEffect } from 'react';
import mysqlConfig from './mysqlConfig';
import authConfig from './authConfig';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loanItems, setLoanItems] = useState([]);
  const [newLoanItem, setNewLoanItem] = useState({
    productName: '',
    clientName: '',
    itemCost: '',
    transportCost: '',
  });

  useEffect(() => {
    // In a real environment, you would fetch data from your Node.js server here
    // Example:
    // fetch('/api/loan-items')
    //   .then(response => response.json())
    //   .then(data => setLoanItems(data));
    // For now, we'll use dummy data
    setLoanItems([
      { productName: 'Laptop', clientName: 'John Doe', itemCost: 1200, transportCost: 50 },
      { productName: 'Car', clientName: 'Jane Smith', itemCost: 20000, transportCost: 500 },
    ]);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewLoanItem(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addLoanItem = () => {
    // In a real environment, you would send this data to your Node.js server
    // Example:
    // fetch('/api/loan-items', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(newLoanItem),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   setLoanItems(prevState => [...prevState, data]);
    //   setNewLoanItem({
    //     productName: '',
    //     clientName: '',
    //     itemCost: '',
    //     transportCost: '',
    //   });
    // });
    // For now, we'll just update the local state
    setLoanItems(prevState => [...prevState, newLoanItem]);
    setNewLoanItem({
      productName: '',
      clientName: '',
      itemCost: '',
      transportCost: '',
    });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const authenticate = () => {
    if (password === authConfig.password) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mt-5">
        <h1>Authentication Required</h1>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="btn btn-primary" onClick={authenticate}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>Loan Information</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Client Name</th>
            <th>Item Cost</th>
            <th>Transport Cost</th>
          </tr>
        </thead>
        <tbody>
          {loanItems.map((item, index) => (
            <tr key={index}>
              <td>{item.productName}</td>
              <td>{item.clientName}</td>
              <td>{item.itemCost}</td>
              <td>{item.transportCost}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Loan Item</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          name="productName"
          placeholder="Product Name"
          value={newLoanItem.productName}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          name="clientName"
          placeholder="Client Name"
          value={newLoanItem.clientName}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          name="itemCost"
          placeholder="Item Cost"
          value={newLoanItem.itemCost}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          name="transportCost"
          placeholder="Transport Cost"
          value={newLoanItem.transportCost}
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-primary" onClick={addLoanItem}>
        Add Item
      </button>
      <p>MySQL Host: {mysqlConfig.host}</p>
    </div>
  );
}

export default App;
