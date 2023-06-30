import getOneParticipation from './getOneParticipation';
import getParticipationByGP from './getParticipationByGP';
import getParticipationByDriver from './getParticipationByDriver';
import getParticipationByTeam from './getParticipationByTeam';

export default {
    '/api/v1/participation/grandprix/{id}': {
        ...getParticipationByGP,
    },
    '/api/v1/participation/driver/{id}/{year}': {
        ...getParticipationByDriver,
    },
    '/api/v1/participation/team/{id}/{year}': {
        ...getParticipationByTeam,
    },
    '/api/v1/participation/{id}': {
        ...getOneParticipation,
    },
}