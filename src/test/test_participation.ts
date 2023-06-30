import { assert } from 'chai';
import requestInstance from './client';

describe('Participation API', () => {
    describe('GET /participation/grandprix/:id', () => {
        it('should return all participation of 1 grandprix', async () => {
            const grandprixId = '649d3c55e81209641c7096c4'
            const response = await requestInstance.get(`/participation/grandprix/${grandprixId}`);
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
        });
        it('should return 404 if participation of invalid grand prix', async () => {
            try {
                const nonExistentId = '649d794f987b834ba97b0f8a'; // Replace with a non-existent participation id
                await requestInstance.get(`/participation/grandprix/${nonExistentId}`);
            }
            catch (err: any) {
                assert.strictEqual(err.response.status, 404);
                assert.strictEqual(err.response.data.message, 'there is no participation of such grand prix');
                return
            }
            throw `Should throw error but did not`
        });
    });



    describe('GET /participation/driver/:id/:year', () => {
        it('should return all participation of 1 driver in 1 year', async () => {
            const driverId = '649d4ddb61c89321f5d7ebd5'
            const year = 2014
            const response = await requestInstance.get(`/participation/driver/${driverId}/${year}`);
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
        });
        it('should return 404 if participation of invalid driver id with valid year', async () => {
            try {
                const nonExistentId = '649d794f987b834ba97b0f8a'; // Replace with a non-existent participation id
                await requestInstance.get(`/participation/driver/${nonExistentId}/2014`);
            }
            catch (err: any) {
                assert.strictEqual(err.response.status, 404);
                assert.strictEqual(err.response.data.message, 'there is no participation of such driver in that year');
                return
            }
            throw `Should throw error but did not`
        });

        it('should return 404 if participation of invalid year with valid driver id', async () => {
            try {
                const driverId = '649d4ddb61c89321f5d7ebd5'; // Replace with a non-existent participation id
                await requestInstance.get(`/participation/driver/${driverId}/2011`);
            }
            catch (err: any) {
                assert.strictEqual(err.response.status, 404);
                assert.strictEqual(err.response.data.message, 'there is no participation of such driver in that year');
                return
            }
            throw `Should throw error but did not`
        });
    });



    describe('GET /participation/team/:id/:year', () => {
        it('should return all participation of 1 team in 1 year', async () => {
            const teamId = '649d42fb8f9d812c3201f569'
            const year = 2014
            const response = await requestInstance.get(`/participation/team/${teamId}/${year}`);
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
        });
        it('should return 404 if participation of invalid team id with valid year', async () => {
            try {
                const nonExistentId = '649d794f987b834ba97b0f8a'; // Replace with a non-existent participation id
                await requestInstance.get(`/participation/team/${nonExistentId}/2014`);
            }
            catch (err: any) {
                assert.strictEqual(err.response.status, 404);
                assert.strictEqual(err.response.data.message, 'there is no participation of such team in that year');
                return
            }
            throw `Should throw error but did not`
        });

        it('should return 404 if participation of invalid year with valid team id', async () => {
            try {
                const teamId = '649d4ddb61c89321f5d7ebd5'; // Replace with a non-existent participation id
                await requestInstance.get(`/participation/team/${teamId}/2011`);
            }
            catch (err: any) {
                assert.strictEqual(err.response.status, 404);
                assert.strictEqual(err.response.data.message, 'there is no participation of such team in that year');
                return
            }
            throw `Should throw error but did not`
        });
    });



    describe('GET /participation/:id', () => {
        it('should return a specific participation', async () => {
            const grandPrixId = '649d794f987b834ba97b0f8a';
            const response = await requestInstance.get(`/participation/${grandPrixId}`);
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.data.target._id, grandPrixId);
        });

        it('should return 404 if participation not found', async () => {
            try {
                const nonExistentId = '649d3c55e81209641c7096c3'; // Replace with a non-existent participation id
                await requestInstance.get(`/participation/${nonExistentId}`);
            }
            catch (err: any) {
                assert.strictEqual(err.response.status, 404);
                assert.strictEqual(err.response.data.message, 'participation not found');
                return
            }
            throw `Should throw error but did not`
        });
    });
});
