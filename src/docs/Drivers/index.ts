import getAllDrivers from './getAllDrivers';
import getOneDriver from './getOneDriver';
import getDriversByYear from './getDriversByYear';
import getSumPtsAllDrivers from './getSumPtsAllDrivers';

export default {
    '/api/v1/drivers': {
        ...getAllDrivers
    },
    '/api/v1/drivers/year/{year}': {
        ...getDriversByYear
    },
    '/api/v1/drivers/year/{year}/points': {
        ...getSumPtsAllDrivers
    },
    '/api/v1/drivers/{id}': {
        ...getOneDriver
    },
}