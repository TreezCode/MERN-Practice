// external imports
const express = require('express');
const path = require('path');
const colors = require('colors');
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
// internal imports
const connectDB = require('./config/db');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;

// connect database
connectDB();
// initialize express
const app = express();
// app.set('trust proxy', 1);
// custom middleware to log events
app.use(logger);
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
// cross origin resource sharing (cors)
app.use(cors(corsOptions));
// built-in middleware for json
app.use(express.json());
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));
// external middleware for cookies
app.use(cookieParser());
// routes
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/refresh', require('./routes/refreshRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
// serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}
// custom error handling middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
