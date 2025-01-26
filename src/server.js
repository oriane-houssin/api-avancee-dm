const express = require('express');
const app = express(); // intialise une nouvelle application json
app.use(express.json()); // parse JSON bodies

app.listen(3000, () => console.log('Server running on port 3000'));