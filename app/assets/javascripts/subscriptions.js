const stripe = Stripe(window.publishableKey);
const elements = stripe.elements();
const style = {
  base: {
    color: '#32325d',
    lineHeight: '24px',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

const card = elements.create('card', {style: style});
card.mount('#card-element');

card.addEventListener('change', ({error}) => {
  const displayError = document.getElementById('card-errors');

  if (error) {
    displayError.textContent = error.message;
  } else {
    displayError.textContent = '';
  }
});

const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const {token, error} = await stripe.createToken(card);
  if (error) {
    const errorElement = document.getElementById('card-errors');
    errorElement.textContent = error.message;
  } else {
    stripeTokenHandler(token);
  }
});

const stripeTokenHandler = (token) => {
  const form = document.getElementById('payment-form');
  const hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);
  form.submit();
}
