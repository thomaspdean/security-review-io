const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        httpOnly: false
    }
}));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    if (authenticateUser(username, password)) {
        req.session.userId = getUserId(username);
        req.session.username = username;
        res.redirect('/dashboard');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

function authenticateUser(username, password) {
    // Mock authentication
    return username === 'admin' && password === 'password';
}

function getUserId(username) {
    // Mock user lookup
    return 1;
}

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

