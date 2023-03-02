const path = require('path');
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')

const app = express()
const port = 3000
const route = require("./routes/index.js")
const db = require('./config/db')


// connect to db
db.connect();
app.use(express.static(path.join(__dirname,'public')))
//body parser dung de lay data submit form trong bien .body.datakey
app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json)
//jwt dung de tao token dang nhap

app.use(cookieParser())
//body parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// HTTP logger
app.use(morgan('combined'));
//Template engine
// app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.engine('handlebars', handlebars.engine({}));
app.set('view engine', 'handlebars');
//set extendsion handlebar to .hbs
app.engine('.hbs', 
  handlebars.engine({
    extname: '.hbs',
    helpers : {
      sum : (a,b) => a + b
    },
  }));
app.set('view engine', '.hbs');
app.set('views', './views');


app.set('views',path.join(__dirname, '/resources/views') )

//setting middleware
app.use(express.static(__dirname + '/uploadss/')); //Serves resources from public folder

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))


//Route init
route(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})