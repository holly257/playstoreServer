const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(morgan('common'));
app.use(cors());

const store = require('./store.js');

app.get('/apps', (req, res) => {
    const { search='', sort, genre} = req.query;

    if (sort) {
        if (!['Rating', 'App'].includes(sort)) {
            return res.status(400)
                .send('Sort must be one of Rating or App');
        }
    }

    if (genre) {
        if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
            return res.status(400)
                .send('Genre can be Action, Puzzle, Strategy, Casual, Arcade, or Card.')
        }
    }

    let results = store.filter(option => 
        option.App.toLowerCase()
        .includes(search.toLowerCase()));

    if (sort) {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        });
    }

    if (genre) {
        results = results.filter(option => 
            option.Genres.includes(genre));
    }

    res
        .json(results);
})

module.exports = app;