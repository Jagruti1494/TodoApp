const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const todosRouter = require('./routes/todos');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://jagrutiparmar698:MqkfZRWKyWO8iTtd@cluster0.9j2wvqn.mongodb.net/Todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use('/todos', todosRouter);
app.use(express.static('public')); // Serve static files from the public directory

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
