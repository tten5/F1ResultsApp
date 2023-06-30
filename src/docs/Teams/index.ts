import getOneTeam from './getOneTeam';
import getAllTeams from './getAllTeams';

export default {
    '/api/v1/teams': {
        ...getAllTeams,
    },
    '/api/v1/teams/{id}': {
        ...getOneTeam,
    },
}