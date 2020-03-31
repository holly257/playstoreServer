const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('GET /apps', () => {
    //get fetch call works 
    it('should return array of 20 books', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf(20);
            })
    })
    //search filters works
    it('should filter the array by search parameter', () => {
        return supertest(app)
            .get('/apps')
            .query({search: 'candy'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf(2)
                expect(res.body).to.deep.equal([
                    {
                        "App": "Candy Crush Saga",
                        "Category": "GAME",
                        "Rating": 4.4,
                        "Reviews": "22426677",
                        "Size": "74M",
                        "Installs": "500,000,000+",
                        "Type": "Free",
                        "Price": "0",
                        "Content Rating": "Everyone",
                        "Genres": "Casual",
                        "Last Updated": "July 5, 2018",
                        "Current Ver": "1.129.0.2",
                        "Android Ver": "4.1 and up"
                    },
                    {
                        "App": "Candy Crush Soda Saga",
                        "Category": "GAME",
                        "Rating": 4.4,
                        "Reviews": "6198563",
                        "Size": "67M",
                        "Installs": "100,000,000+",
                        "Type": "Free",
                        "Price": "0",
                        "Content Rating": "Everyone",
                        "Genres": "Casual",
                        "Last Updated": "July 10, 2018",
                        "Current Ver": "1.118.4",
                        "Android Ver": "4.1 and up"
                    },
                ]);
            })
    })
    //sort by wrong parameter fails
    it('should only sort by Rating and App', () => {
        return supertest(app)
            .get('/apps')
            .query(!['Rating', 'App'])
            .expect(400, 'Sort must be one of Rating or App.')
    })
    //sort works with correct parameters
    it('should sort by rating, smallest to largest', () => {
        return supertest(app)
            .get('/apps')
            .query({sort: 'Rating'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                //check atual sort is correct
            })
    })
    //filter by wrong genre parameters fails
    it('should only filter if correct genre parameters', () => {
        return supertest(app)
            .get('/apps')
            .query(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'])
            .expect(400, 'Genre can be Action, Puzzle, Strategy, Casual, Arcade, or Card.')
    })
    //filter by genre works with correct parameters
    it('should filter array by genre', () => {
        return supertest(app)
            .get('/apps')
            .query({genre: 'Arcade'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf(3)
                expect(res.body).to.deep.equal([
                    {
                        "App": "Subway Surfers",
                        "Category": "GAME",
                        "Rating": 4.5,
                        "Reviews": "27722264",
                        "Size": "76M",
                        "Installs": "1,000,000,000+",
                        "Type": "Free",
                        "Price": "0",
                        "Content Rating": "Everyone 10+",
                        "Genres": "Arcade",
                        "Last Updated": "July 12, 2018",
                        "Current Ver": "1.90.0",
                        "Android Ver": "4.1 and up"
                    },
                    {
                        "App": "Angry Birds Rio",
                        "Category": "GAME",
                        "Rating": 4.4,
                        "Reviews": "2610526",
                        "Size": "46M",
                        "Installs": "100,000,000+",
                        "Type": "Free",
                        "Price": "0",
                        "Content Rating": "Everyone",
                        "Genres": "Arcade",
                        "Last Updated": "July 3, 2018",
                        "Current Ver": "2.6.9",
                        "Android Ver": "4.1 and up"
                    },
                    {
                        "App": "Sonic Dash",
                        "Category": "GAME",
                        "Rating": 4.5,
                        "Reviews": "3778921",
                        "Size": "75M",
                        "Installs": "100,000,000+",
                        "Type": "Free",
                        "Price": "0",
                        "Content Rating": "Everyone",
                        "Genres": "Arcade",
                        "Last Updated": "July 26, 2018",
                        "Current Ver": "3.8.5.Go",
                        "Android Ver": "4.1 and up"
                    },
                ])
            })
    })

})





////sort in app.js
////writing sort test
////tests for wrong parameters - correct syntax?