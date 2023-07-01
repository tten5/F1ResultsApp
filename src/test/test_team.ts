import { assert } from 'chai';
import { Participation } from '../models/participation';
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

    describe('GET /teams/year/:year', () => {
        it('should return all teams in 1 year', async () => {
            const year = 2014
            const response = await requestInstance.get(`/teams/year/${year}`);
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
            const testParticipation = await requestInstance.get(`/participation/team/${response.data.list[0]._id}/${year}`);
            assert.isAbove(testParticipation.data.list.length, 0);
        });
        it('should return 404 if team of invalid year', async () => {
            try {
                const response = await requestInstance.get(`/teams/year/2012`);            
            }
            catch (err: any) {
                assert.strictEqual(err.response.status, 404);
                assert.strictEqual(err.response.data.message, 'there is no team in that year');
                return
            }
            throw `Should throw error but did not`
        });
    });
});
