import { assert } from 'chai';
import requestInstance from './client';

describe('Grand Prix API', () => {
    describe('GET /grandprix', () => {
        it('should return all grand prix in place order', async () => {
            const response = await requestInstance.get('/grandprix');
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
            for (let i = 1; i < response.data.list.length; i++) {
                assert.ok(response.data.list[i].place >= response.data.list[i - 1].place, 'Grandprix are not in place order');
              }
        });
    });

    describe('GET /grandprix/:id', () => {
        it('should return a specific grand prix', async () => {
            const grandPrixId = '649d3c55e81209641c7096c4';
            const response = await requestInstance.get(`/grandprix/${grandPrixId}`);
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.data.target._id, grandPrixId);
        });

        it('should return 404 if grand prix not found', async () => {
            try {
                const nonExistentId = '649d3c55e81209641c7096c3'; // Replace with a non-existent grand prix id
                await requestInstance.get(`/grandprix/${nonExistentId}`);
            }
            catch(err:any) {
                assert.strictEqual(err.response.status, 404);
                assert.strictEqual(err.response.data.message, 'grandprix not found');
                return
            }
            throw `Should throw error but did not`
        });
    });

    describe('GET /grandprix/year/:year?sort', () => {
        it('should return all grandprix in 1 year', async () => {
            const year = 2014
            const response = await requestInstance.get(`/grandprix/year/${year}`);
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
            assert.strictEqual(response.data.list[0].year, year);
        });
        it('should return 404 if grandprix of invalid year', async () => {
            try {
                const response = await requestInstance.get(`/grandprix/year/2012`);            
            }
            catch (err: any) {
                assert.strictEqual(err.response.status, 404);
                assert.strictEqual(err.response.data.message, 'there is no grandprix in that year');
                return
            }
            throw `Should throw error but did not`
        });
        it('should return grandprix list in place order when sort=place', async () => {
            const year = 2014
            const response = await requestInstance.get(`/grandprix/year/${year}?sort=place`);
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
            assert.strictEqual(response.data.list[0].year, year);
            for (let i = 1; i < response.data.list.length; i++) {
              assert.ok(response.data.list[i].place >= response.data.list[i - 1].place, 'Grandprix are not in place order');
            }
        });
        it('should return grandprix list in date order when sort is not place', async () => {
            const year = 2014
            const response = await requestInstance.get(`/grandprix/year/${year}?sort=what`);
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
            assert.strictEqual(response.data.list[0].year, year);
            for (let i = 1; i < response.data.list.length; i++) {
              assert.ok(response.data.list[i].date >= response.data.list[i - 1].date, 'Grandprix are not in date order');
            }
        });
    });

    describe('GET /grandprix/year/:year/winners?top', () => {
        it('should return all grandprix winners in 1 year with only top 1', async () => {
            const year = 2014
            const response = await requestInstance.get(`/grandprix/year/${year}/winners`);
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
            assert.strictEqual(response.data.list[0].date.slice(-4), String(year));
            assert.strictEqual(response.data.list[0].pos, "1")
            assert.strictEqual(response.data.list[1].pos, "1")
        });
        it('should return all grandprix winners in 1 year with top3 when top3=true', async () => {
            const year = 2014
            const response = await requestInstance.get(`/grandprix/year/${year}/winners?top3=true`);
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
            assert.strictEqual(response.data.list[0].date.slice(-4), String(year));
            assert.strictEqual(response.data.list[0].pos, "1")
            assert.strictEqual(response.data.list[1].pos, "2")
        });
        it('should return all grandprix winners in 1 year with only top 1 if top3 not equal to true', async () => {
            const year = 2014
            const response = await requestInstance.get(`/grandprix/year/${year}/winners?top3=what`);
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
            assert.strictEqual(response.data.list[0].date.slice(-4), String(year));
            assert.strictEqual(response.data.list[0].pos, "1")
            assert.strictEqual(response.data.list[1].pos, "1")
        });
    });
});
