const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3006;

const validCredentials = {
  admin: {
    username: 'admin',
    password: 'password123',
    isAdmin: true,
  },
  user: {
    username: 'user',
    password: 'password456',
    isAdmin: false,
  },
};

app.use(bodyParser.json());
app.use(cors());

// Backend Activity Endpoint:
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log('Login attempt for username:', username, 'with password:', password);

  // Check if the provided username exists in validCredentials
  if (validCredentials.hasOwnProperty(username)) {
    const user = validCredentials[username];

    // Check if the provided password matches the stored password
    if (user.password === password) {
      res.json({ status: 'Success', isAdmin: user.isAdmin });
      console.log('Login successful for username:', username);
    } else {
      res.json({ status: 'Failed' });
      console.log('Login failed for username:', username);
    }
  } else {
    res.json({ status: 'Failed' });
    console.log('Login failed for username:', username);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
