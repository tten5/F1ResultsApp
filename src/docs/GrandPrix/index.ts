import getAllGrandPrix  from './getAllGrandPrix';
import getOneGrandPrix from './getOneGrandPrix';
import getGPByYear from './getGPByYear';
import getWinnersAllGP from './getWinnersAllGP';

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
    '/api/v1/grandprix/{id}': {
        ...getOneGrandPrix,
    },
}