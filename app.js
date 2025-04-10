const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Museum = require('./models/museum');

/*
* Setting Mongoose Connection
*/
mongoose.connect('mongodb://localhost:27017/discover-museum', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})

const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'))



app.get('/', (req, res) => {
    res.render('home');
})

app.get('/museums', async (req,res) => {
    const museums = await Museum.find({});
    res.render('museums/index',{ museums })
})

// Create museum for testing
// app.get('/makemuseum',async (req, res) => {
//     const theMusem = new Museum({
//         name:"philadelphia museum of art",
//         about:"The Philadelphia Museum of Art—in partnership with the city, the region, and art museums around the globe—seeks to preserve, enhance, interpret, and extend the reach of its great collections in particular, and the visual arts in general, to an increasing and increasingly diverse audience as a source of delight, illumination, and lifelong learning.",
//         location:"2151 Benjamin Franklin Parkway,Philadelphia, PA 19130",
//         price:"$25",
//         hours:"Monday,Friday-Sunday",
//         website:"https://www.philamuseum.org/"

//     });
//     await theMusem.save();
//     res.send(theMusem)
// })


/*
* App Listen on Port 3000
*/
app.listen(3000, () => {
    console.log("Serving on port 3000")
})