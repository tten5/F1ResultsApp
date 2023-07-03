import { assert } from 'chai';
import requestInstance from './client';
import FormData from 'form-data';

describe('Driver API', () => {
    describe('GET /drivers', () => {
        it('should return all driver', async () => {
            const response = await requestInstance.get('/drivers');
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
        });
        it('should return driver list in firstname order when sort=firstname', async () => {
            const response = await requestInstance.get(`/drivers?sort=firstname`);
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
            for (let i = 1; i < response.data.list.length; i++) {
                assert.ok(response.data.list[i].firstname >= response.data.list[i - 1].firstname, 'Driver list is not in firstname order');
            }
        });
        it('should return driver list in lastname order when sort is not firstname', async () => {
            const response = await requestInstance.get(`/drivers?sort=what`);
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
            for (let i = 1; i < response.data.list.length; i++) {
                assert.ok(response.data.list[i].lastname >= response.data.list[i - 1].lastname, 'Driver list are not in lastname order');
            }
        });
    });

    describe('GET /drivers/:id', () => {
        it('should return a specific driver', async () => {
            const driverId = '64a0347faa416f5926961dd4';
            const response = await requestInstance.get(`/drivers/${driverId}`);
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.data.target._id, driverId);
        });

        it('should return 404 if driver not found', async () => {
            try {
                const nonExistentId = '64a0347faa416f5926961dd3'; // Replace with a non-existent driver id
                await requestInstance.get(`/drivers/${nonExistentId}`);
            }
            catch (err: any) {
                assert.strictEqual(err.response.status, 404);
                assert.strictEqual(err.response.data.message, 'driver not found');
                return
            }
            throw `Should throw error but did not`
        });
    });

    describe('GET /drivers/year/:year&sort=', () => {
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
        it('should return drivers in 1 year in firstname order when sort=firstname', async () => {
            const year = 2014
            const response = await requestInstance.get(`/drivers/year/${year}?sort=firstname`);
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
            for (let i = 1; i < response.data.list.length; i++) {
                assert.ok(response.data.list[i].firstname >= response.data.list[i - 1].firstname, 'Driver list is not in firstname order');
            }
        });
        it('should return drivers in 1 year in lastname order when sort is not firstname', async () => {
            const year = 2014
            const response = await requestInstance.get(`/drivers/year/${year}?sort=what`);
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
            for (let i = 1; i < response.data.list.length; i++) {
                assert.ok(response.data.list[i].lastname >= response.data.list[i - 1].lastname, 'Driver list are not in lastname order');
            }
        });
    });

    describe('GET /drivers/year/:year/points', () => {
        it('should return all drivers sum points in 1 year in rank order', async () => {
            const year = 2014
            const response = await requestInstance.get(`/drivers/year/${year}/points`);
            assert.strictEqual(response.status, 200);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
            const testParticipation = await requestInstance.get(`/participation/driver/${response.data.list[0].driver_id}/${year}`);
            assert.isAbove(testParticipation.data.list.length, 0);
            assert.strictEqual(response.data.list[0].pos, 1);
            assert.strictEqual(response.data.list[1].pos, 2);
            assert.isTrue(response.data.list[0].sumPts > response.data.list[1].sumPts);
        });
        it('should return 404 if find sum points of invalid year', async () => {
            try {
                const response = await requestInstance.get(`/drivers/year/2012/points`);
            }
            catch (err: any) {
                assert.strictEqual(err.response.status, 404);
                assert.strictEqual(err.response.data.message, 'no drivers points to be found');
                return
            }
            throw `Should throw error but did not`
        });
    });

    describe('POST /drivers/search', () => {
        describe('when isLastName is true', () => {
            it('returns the driver(s) with such lastname', async () => {
                const inputData = { "driverName": "Hamilton", "isLastName": true }
                const response = await requestInstance.post('/drivers/search', inputData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                assert.strictEqual(response.status, 200);
                assert.strictEqual(response.data.list[0].firstname, 'Lewis')
                assert.strictEqual(response.data.list[0].lastname, 'Hamilton')
            });
        });


        it('should return 404 if driverName is not available lastname', async () => {
            try {
                const inputData = { "driverName": "Lewis", "isLastName": true }
                const response = await requestInstance.post('/drivers/search', inputData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            catch (err: any) {
                assert.strictEqual(err.response.status, 404);
                assert.strictEqual(err.response.data.message, 'cannot find driver with such name');
                return
            }
            throw `Should throw error but did not`
        });

        it('should return 400 when there is no driverName', async () => {
            try {
                const inputData = { "isLastName": true }
                const response = await requestInstance.post('/drivers/search', inputData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            catch (err: any) {
                assert.strictEqual(err.response.status, 400)
                assert.strictEqual(err.response.data.message, 'please provide driver name');
                return
            }
            throw `Should throw error but did not`
         
        });

    });

    describe('when isLastName is false', () => {
        it('returns the driver(s) with such firstname when driverName is correct', async () => {
            const inputData = { "driverName": "Lewis", "isLastName": false }
            const response = await requestInstance.post('/drivers/search', inputData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.data.list[0].firstname, 'Lewis')
            assert.strictEqual(response.data.list[0].lastname, 'Hamilton')
        });

        it('should return 404 if driverName is not available firstname', async () => {
            try {
                const inputData = { "driverName": "Hamilton", "isLastName": false }
                const response = await requestInstance.post('/drivers/search', inputData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            catch (err: any) {
                assert.strictEqual(err.response.status, 404);
                assert.strictEqual(err.response.data.message, 'cannot find driver with such name');
                return
            }
            throw `Should throw error but did not`
        });
    });

    describe('GET /drivers/:id/yearly-ranking', () => {
        it('should return list of yearly ranking of a driver', async () => {
            const driverId = '64a0347faa416f5926961dd4';
            const response = await requestInstance.get(`/drivers/${driverId}/yearly-ranking`);
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.data.target._id, driverId);
            assert.isArray(response.data.list);
            assert.isAbove(response.data.list.length, 0);
            assert.exists(response.data.list[0].rank)
            assert.isTrue(response.data.list[1].year > response.data.list[0].year)
        });

        it('should return 404 if driver not found', async () => {
            try {
                const nonExistentId = '64a0347faa416f5926961dd3'; // Replace with a non-existent driver id
                await requestInstance.get(`/drivers/${nonExistentId}/yearly-ranking`);
            }
            catch (err: any) {
                assert.strictEqual(err.response.status, 404);
                assert.strictEqual(err.response.data.message, 'driver not found');
                return
            }
            throw `Should throw error but did not`
        });
    });
});
