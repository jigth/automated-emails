const express = require('express');
const app = express();

const { join } = require('path');
const hbs = require('hbs');

// Settings
app.use(express.static( join(__dirname, 'public') ));
app.set('views', join( __dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);
hbs.registerPartials( join(__dirname, 'views', 'partials'), (err) => {
    if ( err !== undefined ) {
        console.error('ERROR', err);
    }
});

app.use( express.static(join(__dirname, 'public')) );


app.get('/', (req, res) => {
    res.render('index');
});

module.exports = app;
