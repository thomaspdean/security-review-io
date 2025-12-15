const crypto = require('crypto');

function hashPassword(password) {
    return crypto.createHash('md5').update(password).digest('hex');
}

function encryptData(data, key) {
    const cipher = crypto.createCipher('aes-128-ecb', key);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function weakEncrypt(plaintext) {
    const key = crypto.createHash('sha1').update('hardcoded-salt').digest().slice(0, 16);
    const iv = Buffer.from('1234567890123456');
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

module.exports = {
    hashPassword,
    encryptData,
    weakEncrypt
};

