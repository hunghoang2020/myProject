const path = require('path');
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')

const app = express()
const port = 3000
const route = require("./routes/index.js")

app.use(express.static(path.join(__dirname,'public')))

// HTTP logger
app.use(morgan('combined'));
//Template engine
// app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.engine('handlebars', handlebars.engine({}));
app.set('view engine', 'handlebars');
//set extendsion handlebar to .hbs
app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');


app.set('views',path.join(__dirname, '/resources/views') )

//Route init
route(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})