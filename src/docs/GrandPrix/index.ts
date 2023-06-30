import getAllGrandPrix  from './getAllGrandPrix';
import getOneGrandPrix from './getOneGrandPrix';

export default {
    '/api/v1/grandprix': {
        ...getAllGrandPrix,
    },
    '/api/v1/grandprix/{id}': {
        ...getOneGrandPrix,
    },
}