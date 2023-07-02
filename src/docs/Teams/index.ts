import getOneTeam from './getOneTeam';
import getAllTeams from './getAllTeams';
import getTeamsByYear from './getTeamsByYear'
import getSumPtsAllTeams from './getSumPtsAllTeams';

export default {
    '/api/v1/teams': {
        ...getAllTeams,
    },
    '/api/v1/teams/year/{year}': {
        ...getTeamsByYear,
    },
    '/api/v1/teams/year/{year}/points': {
        ...getSumPtsAllTeams,
    },
    '/api/v1/teams/{id}': {
        ...getOneTeam,
    },
}