const { exec } = require('child_process');

var passwords = ['admin', 'azerty', 'root', '1234', 'juve'];

function cb(err, stdout, stderr) {
  console.log('child process run');
  console.log(stdout);
}

passwords.forEach(password => {
  const endpoint = 'http://localhost:3007/login';
  var cmd = `curl -X POST -d '{"password":"${password}"}' -H "Content-Type: application/json" ${endpoint}`;
  exec(cmd, cb);
})
