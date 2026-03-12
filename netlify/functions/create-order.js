exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const SS_API_KEY    = '342c5a334ec940b8a6c94c462ca1145b';
  const SS_API_SECRET = '05a53637fbaa4595883eecd020f52910';
  const ssAuth = Buffer.from(`${SS_API_KEY}:${SS_API_SECRET}`).toString('base64');

  try {
    const orderData = JSON.parse(event.body);

    const response = await fetch('https://ssapi.shipstation.com/orders/createorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + ssAuth
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.error('ShipStation error:', err);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
