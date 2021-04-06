const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {requireAuth,checkUser} = require('./middleware/authMiddleware');


const app = express();
const authRoutes= require('./routes/authRoutes');

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://yg:test123@cluster0.qcwnw.mongodb.net/myFirstDatabase';
//'mongodb+srv://shaun:test1234@cluster0.del96.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*',checkUser);
app.get('/', requireAuth,(req, res) => res.render('home'));
app.get('/smoothies', requireAuth,(req, res) => res.render('smoothies'));

app.use(authRoutes);

//cookies
