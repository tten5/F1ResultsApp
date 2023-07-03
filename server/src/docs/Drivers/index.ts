import getAllDrivers from './getAllDrivers';
import getOneDriver from './getOneDriver';
import getDriversByYear from './getDriversByYear';
import getSumPtsAllDrivers from './getSumPtsAllDrivers';
import searchDriversByName from './searchDriversByName';
import getYearlyRankingOfDriver from './getYearlyRankingOfDriver';

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
    '/api/v1/drivers/search': {
        ...searchDriversByName
    },
    '/api/v1/drivers/{id}/yearly-ranking': {
        ...getYearlyRankingOfDriver
    },
}