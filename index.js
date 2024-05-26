const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');
const multer = require('multer');
const path = require('path'); // Import path module

const app = express();

const pusher = new Pusher({
  appId: '1567495',
  key: 'f483ab9e753fe87b0e1b',
  secret: 'bd28602fca69da04ca27',
  cluster: 'ap1',
  encrypted: true
});

app.use(cors());

app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// POST route for handling messages with images
app.post('/message', upload.single('image'), (req, res) => {
  const { message, name } = req.body;
  const imageUrl = req.file ? req.file.path : null;

  pusher.trigger('chat', 'message', { message: message, name: name, imageUrl: imageUrl });

  res.status(200).send({ message: message, name: name, imageUrl: imageUrl });
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
