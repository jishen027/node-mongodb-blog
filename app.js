const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const {
    result
} = require('lodash')
const blogRouter = require('./routes/blogRoutes')

const app = express()

//connect to mongodb
const dbURL = 'mongodb+srv://khalil:153698ads@nodemongo.apjzf.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => {
        app.listen(3000)
        console.log('connected to db')
    })
    .catch((err) => {
        console.log(err)
    })

//register view engine
app.set('view engine', 'ejs')

//middleware & static files
app.use(express.static('public'))
// transform form data to request body data
app.use(express.urlencoded({
    extended: true
}))
app.use(morgan('dev'))

//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
})

//blog router
app.use('/blogs', blogRouter)

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})


//blog routes
app.use((req, res) => {
    res.status(404).render('404', {
        title: '404'
    })
})