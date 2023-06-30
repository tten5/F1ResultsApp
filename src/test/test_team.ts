import { assert } from 'chai';
import requestInstance from './client';

describe('Team API', () => {
    describe('GET /teams', () => {
        it('should return all team', async () => {
            const response = await requestInstance.get('/teams');
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
        });
    });

    describe('GET /teams/:id', () => {
        it('should return a specific team', async () => {
            const teamId = '649d42fb8f9d812c3201f569';
            const response = await requestInstance.get(`/teams/${teamId}`);
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.data.target._id, teamId);
        });

        it('should return 404 if team not found', async () => {
            try {
                const nonExistentId = '649d3c55e81209641c7096c3'; // Replace with a non-existent team id
                await requestInstance.get(`/teams/${nonExistentId}`);
            }
            catch(err:any) {
                assert.strictEqual(err.response.status, 404);
                assert.strictEqual(err.response.data.message, 'team not found');
                return
            }
            throw `Should throw error but did not`
        });
    });
});
