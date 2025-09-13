const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Simple route
app.get('/', (req, res) => {
  res.send('Hello World from Node.js!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
