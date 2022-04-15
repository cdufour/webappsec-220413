// import des dépendances
const express = require('express');
const cookieParser = require('cookie-parser');
const escape = require('escape-html');
const serialize = require('node-serialize');

const port = 3007;
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser())

// custom mdw pour monitoring
app.use((req, res, next) => {
  console.log(req.ip);
  next(); // passage au middleware suivant
})

function logUserAgent(req, res, next) {
  console.log('[+] User-Agent', req.headers['user-agent']);
  next();
}


app.get('/', logUserAgent, (req, res) => {
  res.send('homepage');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
})

app.post('/login', (req, res) => {
  
  const { password } = req.body;
  if (password == 'juve') {
	  res.send('login ok');
  } else {
	  res.send('login not ok');
  }
  console.log('Request on /login with password: ' + password);
  
})

app.get('/cookie', (req, res) => {

  if (req.cookies.profile) {
    var str = new Buffer(req.cookies.profile, 'base64').toString();
    var obj = serialize.unserialize(str);
    if (obj.username) {
      res.send("Hello " + escape(obj.username));
    }
  } else {
      res.cookie('profile', "eyJ1c2VybmFtZSI6ImFqaW4iLCJjb3VudHJ5IjoiaW5kaWEiLCJjaXR5IjoiYmFuZ2Fsb3JlIn0=", {
        maxAge: 900000,
        httpOnly: true
      });
  }
  res.send("Hello World");

})


app.listen(port, () => console.log('Serveur http @ ' + port))
