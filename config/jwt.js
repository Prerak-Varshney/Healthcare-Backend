import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './env.js';

const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

const verifyToken = (token) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err) {
            return "invalid";
        }
        return decoded;
    });
}

export { generateToken, verifyToken };