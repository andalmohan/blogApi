const {validationResult } = require('express-validator');

// function validationPost(req, res, next) {
//     const { title, content } = req.body;
  
//     if (!title || !content) {
//       return res.status(400).json({ error: 'Title and content are required field....' });
//     }
  
//     next();
//   }

  const handleValidationErrors = (req,res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

  const bearerAuth = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
  
    if (!bearerHeader) {
      return res.status(401).send('Unauthorized');
    }
  
    const token = bearerHeader.split(' ')[1];
    const expectedToken = process.env.BEARER_TOKEN;
    console.log(token);
  
    if (token === expectedToken) {
      next();
    } else {

      return res.status(401).send('Unauthorized');
    }
  };



module.exports = {
  handleValidationErrors,
  bearerAuth
};