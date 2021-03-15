const rateLimit = require('express-rate-limit');

//Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 100 //Limite chaque adresse IP à 100 requête par windowMs
})

module.exports = limiter;