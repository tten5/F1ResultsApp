import getOneTeam from './getOneTeam';
import getAllTeams from './getAllTeams';
import getTeamsByYear from './getTeamsByYear'
import getSumPtsAllTeams from './getSumPtsAllTeams';
import getYearlyRankingOfTeam from './getYearlyRankingOfTeam';
import getYearlyRankingBestDriver from './getYearlyRankingBestDriver';

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
    '/api/v1/teams/{id}/yearly-ranking': {
        ...getYearlyRankingOfTeam,
    },
    '/api/v1/teams/{id}/yearly-best-driver': {
        ...getYearlyRankingBestDriver,
    },
}