const express = require('express');
const cors = require('cors'); 
const Pusher = require('pusher'); 
const multer = require('multer'); 
const path = require('path'); 
const corsOptions = {
  origin: 'https://pq6x4w4q-5173.asse.devtunnels.ms/',
  optionsSuccessStatus: 200,
  credentials: true,
};
const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (res) => {
  res.send({
    data:'Ini data rahasia'
  });
})

// POST route for handling messages with images
app.post('/message', (req, res) => {
  const { message, name } = req.body;

  res.status(200).send({ message: message, name: name });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});