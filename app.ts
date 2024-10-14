// app.ts

import express from 'express';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = 3000;

// Create a rate limiter
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});

//Route-Specific Rate Limiting
const specificlimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // limit each IP to 5 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    headers: true, // Send rate limit info in the `X-RateLimit-*` headers
});// Apply the rate limiter to all requests

//wholeApp rate limiting
app.use(limiter);

// A sample route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
//Route-Specific Rate Limiting
app.get('/api/some-route', specificlimiter, (req, res) => {
    res.send('This is a rate-limited API route.');
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
