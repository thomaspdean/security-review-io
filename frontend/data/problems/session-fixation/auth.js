const express = require('express');
const session = require('express-session');
const app = express();

// VULNERABLE: Session not regenerated after login
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false, // Should be true in production with HTTPS
        httpOnly: false // Should be true to prevent XSS
    }
}));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Authenticate user
    if (authenticateUser(username, password)) {
        // VULNERABLE: Session ID not regenerated
        // Attacker can provide a session ID and it will be reused
        req.session.userId = getUserId(username);
        req.session.username = username;
        res.redirect('/dashboard');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.post('/logout', (req, res) => {
    // VULNERABLE: Session destroyed but ID could be reused
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

