import getAllDrivers from './getAllDrivers';
import getOneDriver from './getOneDriver';
import getDriversByYear from './getDriversByYear';

export default {
    '/api/v1/drivers': {
        ...getAllDrivers
    },
    '/api/v1/drivers/year/{year}': {
        ...getDriversByYear
    },
    '/api/v1/drivers/{id}': {
        ...getOneDriver
    },
}