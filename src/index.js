const path = require('path');
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')

const app = express()
const port = 3000


// HTTP logger
app.use(morgan('combined'));
//Template engine
// app.engine('handlebars', handlebars());
// app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.engine('handlebars', handlebars.engine({}));
app.set('view engine', 'handlebars');
//set extendsion handlebar to .hbs
app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');


app.set('views',path.join(__dirname, '/resoure/views') )



app.get('/', (req, res) => { 
  // res.send('Hello World!ssss')
  res.render('home');
})

app.get('/new', (req, res) => { 
  // res.send('Hello World!ssss')
  res.render('new');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})