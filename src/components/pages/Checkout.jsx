import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const config = {
  publicKey: import.meta.env.VITE_PAYMONGO_PUBLIC_KEY,
  secretKey: import.meta.env.VITE_PAYMONGO_SECRET_KEY,
};

const encodedSecretKey = btoa(`${config.secretKey}`);

const Checkout = () => {
  const location = useLocation();
  const totalAmount = new URLSearchParams(location.search).get('total');

  const [error, setError] = useState(null);

  useEffect(() => {
    const createPaymentLink = async () => {
      try {
        const body = {
          data: {
            attributes: {
              amount: Number(totalAmount)*100,
              currency: 'PHP',
              description: 'Payment for your order',
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

            // Redirect to Paymongo Link URL
            window.location.href = checkout_url;
          } else {
            setError('Error creating Paymongo Link');
          }
        } else {
          console.error('Error from Paymongo API:', responseData);
          setError('Error from Paymongo API');
        }
      } catch (err) {
        console.error(err);
        setError('Error creating Paymongo Link');
      }
    };

    createPaymentLink();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {!error && <div>Redirecting to payment...</div>}
    </div>
  );
};

export default Checkout;
