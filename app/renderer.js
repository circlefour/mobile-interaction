const form = document.getElementById('oscForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const ip = document.getElementById('ip').value;
  const port = parseInt(document.getElementById('port').value, 10);

  if (window.api && ip && port) {
    window.api.sendConfig({ip, port });
  }else {
    console.error('missing api bridge or invalid input');
  }
});
