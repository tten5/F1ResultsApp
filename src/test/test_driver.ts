import { assert } from 'chai';
import requestInstance from './client';

describe('Driver API', () => {
    describe('GET /drivers', () => {
        it('should return all driver', async () => {
            const response = await requestInstance.get('/drivers');
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
        });
    });

    describe('GET /drivers/:id', () => {
        it('should return a specific driver', async () => {
            const driverId = '649d4ddb61c89321f5d7ebe3';
            const response = await requestInstance.get(`/drivers/${driverId}`);
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.data.target._id, driverId);
        });

        it('should return 404 if driver not found', async () => {
            try {
                const nonExistentId = '649d3c55e81209641c7096c3'; // Replace with a non-existent driver id
                await requestInstance.get(`/drivers/${nonExistentId}`);
            }
            catch(err:any) {
                assert.strictEqual(err.response.status, 404);
                assert.strictEqual(err.response.data.message, 'driver not found');
                return
            }
            throw `Should throw error but did not`
        });
    });
});
