// initialization

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');


// configuration of the secret file
dotenv.config();

// Create an instance of Express
const app = express();
const PORT = process.env.PORT||6000;

// Create an HTTP server and integrate with Express
const server = http.createServer(app);

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

// Connect to MongoDB
mongoose.connect(process.env.URI, {

});

// Check the database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log(`MongoDB has connected...`);
});

// import routes

const studentRouter = require('./routes/studentRouter')
const adminRouter = require('./routes/adminRouter')
const superRouter = require('./routes/superRouter')
// middlewares
app.use(bodyParser.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// Mount routes on API routes(/api/version)

app.use("/api/v1/student", studentRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/super", superRouter);






