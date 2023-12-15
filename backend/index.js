const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const HotelsRouter = require("./routes/hotels");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/hotels', HotelsRouter);


app.listen(PORT, () => {
    mongoose.connect(
        'mongodb://127.0.0.1/HotelDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('DB OK'))
        .catch(() => console.log('DB ERROR'))

    console.log(`Listening on port ${PORT}`)
});