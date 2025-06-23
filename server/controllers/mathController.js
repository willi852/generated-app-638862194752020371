const express = require('express');
const router = express.Router();

// Evaluate mathematical expression
router.post('/evaluate', (req, res) => {
  try {
    const { expression } = req.body;
    // For security reasons, in a real app you would validate the input
    const result = Function(`'use strict'; return (${expression})`)();
    
    if (isNaN(result)) {
      throw new Error('Invalid result');
    }
    
    res.json({ result });
  } catch (error) {
    console.error('Evaluation error:', error);
    res.status(400).json({ error: 'Error evaluating expression' });
  }
});

// Scientific functions
router.post('/scientific', (req, res) => {
  try {
    const { operation, value } = req.body;
    let result;
    
    switch(operation) {
      case 'sin':
        result = Math.sin(value);
        break;
      case 'cos':
        result = Math.cos(value);
        break;
      case 'tan':
        result = Math.tan(value);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'pow':
        result = Math.pow(value, req.body.exponent);
        break;
      case 'factorial':
        result = factorial(value);
        break;
      default:
        throw new Error('Unknown operation');
    }
    
    res.json({ result });
  } catch (error) {
    console.error('Scientific operation error:', error);
    res.status(400).json({ error: 'Error performing scientific operation' });
  }
});

function factorial(n) {
  if (n < 0) return NaN;
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

module.exports = router;