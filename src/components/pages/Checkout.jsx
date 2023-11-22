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

  useEffect(() => {
    const createPaymentLink = async () => {
      try {
        const body = {
          data: {
            attributes: {
              amount: Number(totalAmount),
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
  }, [totalAmount]);

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
