const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Hello from smart shala backend server");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port 3000`);
});