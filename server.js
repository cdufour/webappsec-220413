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
});

app.post('/login', (req, res) => {
  
  const { password } = req.body;
  if (password == 'juve') {
	  res.send('login ok');
  } else {
	  res.send('login not ok');
  }
  console.log('Request on /login with password: ' + password);
  
});

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

});

app.get('/csp', (req, res) => {
  res.setHeader(
    "content-security-policy",
    "script-src 'self'"
  );
  res.send(`
    <h1>Demo CSP</h1>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js""></script>
  `);
});

app.get('/no-csp', (req, res) => {
  res.send(`
    <h1>Demo CSP</h1>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js""></script>
  `);
});

app.get('/cors', (req, res) => {
  // cors headers
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-allow-methods", "*");
  
  res.send(`
    <h1>Demo CORS</h1>
    <script>
    
    </script>
  `);
});




app.listen(port, () => console.log('Serveur http @ ' + port));
