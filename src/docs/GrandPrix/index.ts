import getAllGrandPrix  from './getAllGrandPrix';
import getOneGrandPrix from './getOneGrandPrix';
import getGPByYear from './getGPByYear';

export default {
    '/api/v1/grandprix': {
        ...getAllGrandPrix,
    },
    '/api/v1/grandprix/year/{year}': {
        ...getAllGrandPrix,
    },
    '/api/v1/grandprix/{id}': {
        ...getOneGrandPrix,
    },
}