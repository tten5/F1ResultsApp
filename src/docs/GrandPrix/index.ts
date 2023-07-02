import getAllGrandPrix  from './getAllGrandPrix';
import getOneGrandPrix from './getOneGrandPrix';
import getGPByYear from './getGPByYear';
import getWinnersAllGP from './getWinnersAllGP';
import getAllGrandPrixPlaces from './getAllGrandPrixPlaces';
import getYearlyWinnersOfGP from './getYearlyWinnersOfGP';

export default {
    '/api/v1/grandprix': {
        ...getAllGrandPrix,
    },
    '/api/v1/grandprix/year/{year}': {
        ...getGPByYear,
    },
    '/api/v1/grandprix/year/{year}/winners': {
        ...getWinnersAllGP,
    },
    '/api/v1/grandprix/places': {
        ...getAllGrandPrixPlaces,
    },
    '/api/v1/grandprix/place/{place}/yearly-winners': {
        ...getYearlyWinnersOfGP,
    },
    '/api/v1/grandprix/{id}': {
        ...getOneGrandPrix,
    },
}