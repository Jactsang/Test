const request = require('supertest')
const app = require('../index.js')

describe('Testing requests', () => {
    test('list Pending application details', async (done) => {
        await request(app).get('/jobDetails/pendingApplicationDetails').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
            // expect(res.body).toHaveProperty('post')
        })
    })
})