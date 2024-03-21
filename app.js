// db username = piyushpawar
// db password = En7sKHvQCQVToRlm

// db url = mongodb+srv://piyushpawar:<password>@cluster0.0pdtyn8.mongodb.net/


const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const connectDB = require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

const app = express();
const port = 5000;

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://piyushpawar:En7sKHvQCQVToRlm@cluster0.0pdtyn8.mongodb.net/Notes_APP'
    }),
    // cookie: { maxAge : new Date(Date.now()+ (3600000))}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

//connect to db
connectDB();

app.use(express.static('public'));

app.use(expressLayouts);
app.set('layout','./layouts/main');
app.set('view engine', 'ejs');

//rotes
app.use('/',require('./server/routes/auth'));
app.use('/',require('./server/routes/index'));
app.use('/',require('./server/routes/dashboard'));


//handle 404
app.get('*', function(req, res){
    // res.status(404).send('404 Page Not Found');
    res.status(404).render('404');
})

app.listen(port,()=>{console.log(`app listening on port ${port}`);
});