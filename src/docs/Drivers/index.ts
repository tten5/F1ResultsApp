import getAllDrivers from './getAllDrivers';
import getOneDriver from './getOneDriver';

export default {
    '/api/v1/drivers': {
        ...getAllDrivers,
    },
    '/api/v1/drivers/{id}': {
        ...getOneDriver,
    },
}