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

    describe('GET /teams/year/:year', () => {
        it('should return all teams in 1 year and sort in alphabetical order', async () => {
            const year = 2014
            const response = await requestInstance.get(`/teams/year/${year}`);
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
            const testParticipation = await requestInstance.get(`/participation/team/${response.data.list[0]._id}/${year}`);
            assert.isAbove(testParticipation.data.list.length, 0);
            for (let i = 1; i < response.data.list.length; i++) {
                assert.ok(response.data.list[i].t_name >= response.data.list[i - 1].t_name, 'Grandprix are not in alphabetical order');
              }
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

    describe('GET /teams/year/:year/points', () => {
        it('should return all teams sum points in 1 year in rank order', async () => {
            const year = 2014
            const response = await requestInstance.get(`/teams/year/${year}/points`);
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
            const testParticipation = await requestInstance.get(`/participation/team/${response.data.list[0].team_id}/${year}`);
            assert.isAbove(testParticipation.data.list.length, 0);
            assert.strictEqual(response.data.list[0].pos, 1);
            assert.strictEqual(response.data.list[1].pos, 2);
            assert.isTrue(response.data.list[0].sumPts > response.data.list[1].sumPts);
        });
        it('should return 404 if find sum points of invalid year', async () => {
            try {
                const response = await requestInstance.get(`/teams/year/2012/points`);
            }
            catch (err: any) {
                assert.strictEqual(err.response.status, 404);
                assert.strictEqual(err.response.data.message, 'no teams points to be found');
                return
            }
            throw `Should throw error but did not`
        });

   

        
    });

    describe('GET /teams/:id/yearly-ranking', () => {
        it('should return list of yearly ranking of a team', async () => {
            const teamId = '649d42fb8f9d812c3201f569';
            const response = await requestInstance.get(`/teams/${teamId}/yearly-ranking`);
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.data.target._id, teamId);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
            assert.exists(response.data.list[0].rank)
            assert.isTrue(response.data.list[1].year > response.data.list[0].year)
        });

        it('should return 404 if team not found', async () => {
            try {
                const nonExistentId = '64a0347faa416f5926961dd3'; // Replace with a non-existent team id
                await requestInstance.get(`/teams/${nonExistentId}/yearly-ranking`);
            }
            catch (err: any) {
                assert.strictEqual(err.response.status, 404);
                assert.strictEqual(err.response.data.message, 'team not found');
                return
            }
            throw `Should throw error but did not`
        });
    });

    describe('GET /teams/:id/yearly-best-driver', () => {
        it('should return list of yearly best-driver of a team', async () => {
            const teamId = '649d42fb8f9d812c3201f569';
            const response = await requestInstance.get(`/teams/${teamId}/yearly-best-driver`);
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.data.target._id, teamId);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
            assert.exists(response.data.list[0].driver)
            assert.isTrue(response.data.list[1].year > response.data.list[0].year)
        });

        it('should return 404 if team not found', async () => {
            try {
                const nonExistentId = '64a0347faa416f5926961dd3'; // Replace with a non-existent team id
                await requestInstance.get(`/teams/${nonExistentId}/yearly-best-driver`);
            }
            catch (err: any) {
                assert.strictEqual(err.response.status, 404);
                assert.strictEqual(err.response.data.message, 'team not found');
                return
            }
            throw `Should throw error but did not`
        });
    });
});
