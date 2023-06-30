import { assert } from 'chai';
import requestInstance from './client';

describe('Grand Prix API', () => {
    describe('GET /grandprix', () => {
        it('should return all grand prix', async () => {
            const response = await requestInstance.get('/grandprix');
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
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
});
