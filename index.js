// initialization
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');


// Create an instance of Express
const app = express();
const PORT = process.env.PORT||6000;

 // Use CORS middleware
 app.use(cors());
 

// configuration of the secret file
dotenv.config();

// Create an HTTP server and integrate with Express
const server = http.createServer(app);

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

  // Connect to MongoDB
  mongoose.connect(process.env.URI, {

});
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Check the database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log(`MongoDB has connected...`);
});

// import routes

const studentRouter = require('./routes/studentRouter')
const feedbackRouter = require("./routes/feedbackRouter")
const adminRouter = require('./routes/adminRouter')
const assignmentRouter = require('./routes/assignmentRouter')
const superRouter = require('./routes/superRouter')
// middlewares
app.use(express.json({ extended: true, limit: '200mb' }))
app.use(express.urlencoded({ limit: '200mb', extended: true, parameterLimit: 50000 }))

// Mount routes on API routes(/api/version)

app.use("/api/v1/student", studentRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/super", superRouter);
app.use("/api/v1/feedback", feedbackRouter);
app.use("/api/v1/submit", assignmentRouter);








