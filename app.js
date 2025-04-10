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

app.use(express.urlencoded({extended: true}))


/*
*   =============================
*   ROUTE SECTION
*   =============================
*/ 
app.get('/', (req, res) => {
    res.render('home');
})

// GET: Index Page
//      Display all museum
app.get('/museums', async (req,res) => {
    const museums = await Museum.find({});
    res.render('museums/index',{ museums })
})

// GET: New Page
//      Display new museum form
app.get('/museums/new', (req, res) => {
    res.render('museums/new');
})

// POST: Get data from new museum form,
//       save to database,
//       redirect to the new museum show page
app.post('/museums', async (req, res) => {
    const theMuseum = new Museum(req.body.museum);
    await theMuseum.save();
    res.redirect(`/museums/${theMuseum._id}`)
})

// GET: Show Page
//      Display museum detail based of id
app.get('/museums/:id', async (req,res) => {
    const theMuseum = await Museum.findById(req.params.id);
    res.render('museums/show', { theMuseum })
})

/*
* App Listen on Port 3000
*/
app.listen(3000, () => {
    console.log("Serving on port 3000")
})