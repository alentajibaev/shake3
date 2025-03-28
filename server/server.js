const express = require('express');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

let subscriptions = [];

webpush.setVapidDetails(
  'mailto:test@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/subscribe', (req, res) => {
  subscriptions.push(req.body);
  res.status(201).json({});
});

app.get('/send', (req, res) => {
  const payload = JSON.stringify({
    title: '⚠️ Землетрясение!',
    body: 'Укройтесь немедленно!'
  });

  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      subscriptions.forEach(sub => {
        webpush.sendNotification(sub, payload).catch(err => console.error(err));
      });
    }, i * 300); // каждые 300 мс = 3 секунды на 10 уведомлений
  }

  res.send('10 уведомлений отправлено за 3 секунды!');
});


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
