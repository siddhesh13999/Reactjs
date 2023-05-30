const connectToMongo = require('./db');
const express = require('express');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes.js');
const cors = require("cors");


const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());
connectToMongo();

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);


app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})