const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db')

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/students', require("./routes/mainRoutes"));

const PORT = 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));