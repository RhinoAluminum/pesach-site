exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { amount } = JSON.parse(event.body);
  const amountCents = Math.round(parseFloat(amount) * 100);

  const response = await fetch('https://connect.squareup.com/v2/online-checkout/payment-links', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer EAAAlyQd6QrPRJ3zPB5cJluHzEyIw1JiBK5eZqx503ZbUwoqzQZPKOAyaJokMaeO',
      'Square-Version': '2024-01-18'
    },
    body: JSON.stringify({
      idempotency_key: 'pesach-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
      quick_pay: {
        name: 'Pesach Bulk Order',
        price_money: { amount: amountCents, currency: 'USD' },
        location_id: 'LT6KN4TY4GFNN'
      }
    })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(data)
  };
};
