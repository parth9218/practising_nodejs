// Using jsonwebtoken

const fs = require('fs');
const crypto = require('crypto');
const express = require('express');
const jwt = require('jsonwebtoken');

var privateKey = fs.readFileSync('private.key', 'utf-8');
var publicKey = fs.readFileSync('public.key', 'utf-8');

const app = express();

var signOptions = {
    issuer: 'Parth',
    subject: 'Me',
    audience: 'All',
    algorithm: 'RS256'
};

app.get('/token', (req, res) => {
    var payload = { nonce: crypto.randomBytes(16).toString('base64') };    
    var token = jwt.sign(payload, privateKey, signOptions);
    res.send(token);
}).listen(8080);

app.get('/verification', (req, res) => {
    var token = req.headers['x-access-token'];
    if(!token)   return res.status(401).send('No token found.');
    jwt.verify(token, publicKey, signOptions, (err, decoded) => {
        if(err) return res.status(501).send('Invalid Token');
        return res.status(200).send(decoded);
    });

});


