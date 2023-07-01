import getOneTeam from './getOneTeam';
import getAllTeams from './getAllTeams';
import getTeamsByYear from './getTeamsByYear'

export default {
    '/api/v1/teams': {
        ...getAllTeams,
    },
    '/api/v1/teams/year/{year}': {
        ...getTeamsByYear,
    },
    '/api/v1/teams/{id}': {
        ...getOneTeam,
    },
}