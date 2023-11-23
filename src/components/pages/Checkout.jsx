import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const config = {
  publicKey: import.meta.env.VITE_PAYMONGO_PUBLIC_KEY,
  secretKey: import.meta.env.VITE_PAYMONGO_SECRET_KEY,
};

const encodedSecretKey = btoa(`${config.secretKey}`);

const Checkout = () => {
  const location = useLocation();
  const totalAmount = atob(new URLSearchParams(location.search).get('order'));

  const [error, setError] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [transactionId, setTransactionId] = useState(null); // Added state for transaction ID

  useEffect(() => {
    const createPaymentLink = async () => {
      try {
        const body = {
          data: {
            attributes: {
              amount: Number(totalAmount),
              currency: 'PHP',
              description: `Payment for your order${transactionId ? ` #${transactionId}` : ''}`, // Use transaction ID in description if available
            },
          },
        };

        const response = await fetch('https://api.paymongo.com/v1/links', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedSecretKey}`,
          },
          body: JSON.stringify(body),
        });

        const responseData = await response.json();

        if (response.ok) {
          const { data } = responseData;

          if (data) {
            const { attributes: { checkout_url } } = data;

            // Set the checkout URL in state
            setCheckoutUrl(checkout_url);
          } else {
            // This indicates an issue with creating the Paymongo link
            setError('Error creating Paymongo Link');
          }
        } else {
          // This indicates an issue with the Paymongo API request
          console.error('Error from Paymongo API:', responseData);
          setError('Error from Paymongo API');
        }
      } catch (err) {
        console.error(err);
        setError('Error creating Paymongo Link');
      }
    };

    createPaymentLink();
  }, [totalAmount, transactionId]); // Added transactionId as a dependency

  // Retrieve the transaction from local storage
  const localTransaction = JSON.parse(localStorage.getItem('transaction'));

  // Function to fetch transactions from the backend API
  const fetchLatestTransaction = async () => {
    try {
      const response = await fetch('https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/transactions');
      if (response.ok) {
        const responseData = await response.json();

        // Access the "transactions" property to get the array of transactions
        const transactions = responseData.transactions;

        // Ensure transactions is an array before further processing
        if (Array.isArray(transactions)) {
          // Sort transactions by transaction_date in descending order (latest first)
          transactions.sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date));

          // Find the matching transaction based on user_id, products, and total_amount
          const matchingTransaction = transactions.find((transaction) => {
            return (
              transaction.user_id === localTransaction.user_id &&
              transaction.total_amount === localTransaction.total_amount
            );
          });

          if (matchingTransaction) {
            const transactionID = matchingTransaction._id; // Assuming _id is the transaction ID
            setTransactionId(transactionID); // Set the retrieved transaction ID to state
            console.log('Latest Matching Transaction ID:', transactionID);
            return transactionID;
          } else {
            throw new Error('No matching transaction found');
          }
        } else {
          throw new Error('Response data is not an array');
        }
      } else {
        throw new Error('Failed to fetch transactions');
      }
    } catch (error) {
      console.error('Error fetching or finding matching transaction:', error);
      // Handle error - Display an error message or perform necessary actions
      throw error;
    }
  };

  // Call the function to fetch the latest transaction ID
  useEffect(() => {
    fetchLatestTransaction();
  }, []); // Runs once on component mount

  return (
    <div>
      {checkoutUrl ? (
        // Render the Paymongo Link within a div
        <div className="h-screen" dangerouslySetInnerHTML={{ __html: `<iframe src="${checkoutUrl}" width="100%" height="100%" title="Paymongo Checkout"></iframe>` }} />
      ) : (
        // Show a loading message or handle errors
        <div className="flex justify-center mt-40 h-screen">
          <div className="text-center">
            Redirecting to payment...
          </div>
        </div>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default Checkout;
