const form = document.getElementById('subscribe-form');
const message = document.getElementById('message');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  message.textContent = `Success! You are subscribed to our newsletter with email: ${email}`;

});
