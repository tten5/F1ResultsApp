import { assert } from 'chai';
import requestInstance from './client';
import { Participation } from '../models/participation';

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

    describe('GET /drivers/year/:year', () => {
        it('should return all drivers in 1 year', async () => {
            const year = 2014
            const response = await requestInstance.get(`/drivers/year/${year}`);
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
            const testParticipation = await requestInstance.get(`/participation/driver/${response.data.list[0]._id}/${year}`);
            assert.isAbove(testParticipation.data.list.length, 0);
        });
        it('should return 404 if driver of invalid year', async () => {
            try {
                const response = await requestInstance.get(`/drivers/year/2012`);            
            }
            catch (err: any) {
                assert.strictEqual(err.response.status, 404);
                assert.strictEqual(err.response.data.message, 'there is no driver in that year');
                return
            }
            throw `Should throw error but did not`
        });
    });
});
