const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// GET route
app.get('/', (req, res) => {
  res.render('index', { result: undefined });
});

// POST route
app.post('/calculate', (req, res) => {
  const { num1, num2, operation } = req.body;
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);
  let result;

  switch (operation) {
    case 'add':
      result = n1 + n2;
      break;
    case 'subtract':
      result = n1 - n2;
      break;
    case 'multiply':
      result = n1 * n2;
      break;
    case 'divide':
      result = n2 !== 0 ? n1 / n2 : 'Cannot divide by zero';
      break;
    default:
      result = 'Invalid operation';
  }

  res.render('index', { result });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
