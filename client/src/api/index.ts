// GrandPrix API 
export function getGPInOneYearUrl(year: string, sort: string) {
    return `/grandprix/year/${year}?sort=${sort}`
}

export function getWinnersInOneYearUrl(year: string, top3: string) {
    return `/grandprix/year/${year}/winners?top3=${top3}`
}

export function getAllGPPlacesUrl() {
    return `/grandprix//places`
}

export function getYearlyWinnersOfOneGPPlaceUrl(place: string) {
    return `/grandprix/place/${place}/yearly-winners`
}

// Driver API
export function getDriversPtsInOneYearUrl(year: string) {
    return `/drivers/year/${year}/points`
}

export function getDriversInOneYearUrl(year: string, sort: string) {
    return `/drivers/year/${year}?sort=${sort}`
}

export function searchDriverByNameUrl() {
    return `/drivers/search`
}

export function getYearlyRakingOfOneDriverUrl(id: string) {
    return `/drivers/${id}/yearly-ranking`
}

// Team API
export function getTeamsInOneYearUrl(year: string) {
    return `/teams/year/${year}`
}
export function getTeamsPtsInOneYearUrl(year: string) {
    return `/teams/year/${year}/points`
}
export function getYearlyRakingOfOneTeamUrl(id: string) {
    return `/teams/${id}/yearly-ranking`
}
export function getYearlyBestDriverOfOneTeamUrl(id: string) {
    return `/teams/${id}/yearly-best-driver`
}
// Participation API

export function getParOfOneDriverUrl(grandprixId: string) {
    return `/participation/grandprix/${grandprixId}`;
}

export function getParOfOneDriverInOneYearUrl(driverId: string, year: string) {
    return `/participation/driver/${driverId}/${year}`
}

export function getParOfOneTeamInOneYearUrl(teamId: string, year: string) {
    return `/participation/team/${teamId}/${year}`
}

