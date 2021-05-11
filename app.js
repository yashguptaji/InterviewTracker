const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth,checkUser} = require('./middleware/authMiddleware');
const {checkAdmin} = require('./middleware/adminMiddleware');


// express app
const app = express();
const authRoutes= require('./routes/authRoutes');
const adminRoutes= require('./routes/adminRoutes');
const contentRoutes= require('./routes/contentRoutes');

// connect to mongodb & listen for requests
const dbURI = 'mongodb+srv://yg:test123@cluster0.qcwnw.mongodb.net/myFirstDatabase';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true})
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files

app.use(express.json());
app.use(cookieParser());
app.use('/admin',adminRoutes);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('*',checkUser);
app.get('*',checkAdmin);
app.get('/', requireAuth,(req, res) => res.redirect('/about'));


app.get('/about',requireAuth, (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
//app.use('/blogs',requireAuth, blogRoutes);

app.use(authRoutes);
app.use(contentRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});