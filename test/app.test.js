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
                // expect(res.body).to.deep.equal(
                //     {
                //         "App": "Candy Crush Saga",
                //         "Category": "GAME",
                //         "Rating": 4.4,
                //         "Reviews": "22426677",
                //         "Size": "74M",
                //         "Installs": "500,000,000+",
                //         "Type": "Free",
                //         "Price": "0",
                //         "Content Rating": "Everyone",
                //         "Genres": "Casual",
                //         "Last Updated": "July 5, 2018",
                //         "Current Ver": "1.129.0.2",
                //         "Android Ver": "4.1 and up"
                //     },
                //     {
                //         "App": "Candy Crush Soda Saga",
                //         "Category": "GAME",
                //         "Rating": 4.4,
                //         "Reviews": "6198563",
                //         "Size": "67M",
                //         "Installs": "100,000,000+",
                //         "Type": "Free",
                //         "Price": "0",
                //         "Content Rating": "Everyone",
                //         "Genres": "Casual",
                //         "Last Updated": "July 10, 2018",
                //         "Current Ver": "1.118.4",
                //         "Android Ver": "4.1 and up"
                //     },
                // );
            })
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
            })
    })
    //filter by genre fails with any other parameter
    it('should only filter by correct genre parameters', () => {
        return supertest(app)
            .get('/apps')
            .query(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'])
            .expect(400) //and res message
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
            })
    })

})




//help
////filter deep equal
////sort in app.js
////writing sort test