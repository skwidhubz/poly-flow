import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DONATE_MUTATION } from './graphql/mutations';

const DonationForm = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [token, setToken] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [donate] = useMutation(DONATE_MUTATION);

  const handleDonation = async (event) => {
    event.preventDefault();

    // Show loading state
    setLoading(true);
    setErrorMessage('');

    try {
      const { data } = await donate({
        variables: {
          amount: parseInt(amount),
          currency,
          token,
          description
        }
      });

      const { success, message } = data.donate;

      if (success) {
        // Donation was successful
        alert(message);
        // Reset the form
        setAmount('');
        setToken('');
        setDescription('');
      } else {
        // Donation failed
        setErrorMessage(message);
      }
    } catch (error) {
      // Handle any errors that occur during the donation process
      setErrorMessage('An error occurred during the donation process. Please try again later.');
    }

    // Hide loading state
    setLoading(false);
  };

  return (
    <div>
      <h2>Donation Form</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleDonation}>
        <div>
          <label>Amount:</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <div>
          <label>Currency:</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            {/* Add more currency options if needed */}
          </select>
        </div>
        <div>
          <label>Card Token:</label>
          <input type="text" value={token} onChange={(e) => setToken(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading}>Donate</button>
      </form>
    </div>
  );
};

export default DonationForm;
