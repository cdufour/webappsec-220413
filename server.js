// import des dépendances
const express = require('express');

const port = 3007;
const app = express();

// middlewares
app.use(express.json());

app.get('/', (req, res) => {
  res.send('homepage');
});

app.post('/login', (req, res) => {
  
  const { password } = req.body;
  if (password == 'juve') {
	  res.send('login ok');
  } else {
	  res.send('login not ok');
  }
  console.log('Request on /login with password: ' + password);
  
})

app.listen(port, () => console.log('Serveur http @ ' + port))
