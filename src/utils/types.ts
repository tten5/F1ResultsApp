import { IGrandPrix } from "../models/grandprix";
import { IDriver } from "../models/driver";
import { ITeam } from "../models/team";
import { IParticipation } from "../models/participation";
import { IUser } from "../models/user";

export interface IWinner { 
    gp_id: string;
    grandprix: string;
    date: string;
    pos: string;
    winner: string;
    team: string;
    laps: number;
    time: string;
}

export interface ISumPts { 
    driver_id: string;
    pos: number;
    driver: string;
    nationality: string;
    team: string;
    sumPts: number;
    percentage: string;
}

export interface IDriverParti {
    grandprix: string;
    date: string;
    pos: string;
    team: string;
    points: number;
    accumPts: number;
}

export interface ITeamSumPts {
    team_id: string;
    pos: number; 
    team: string; 
    sumPts: number; 
    percentage: string;
}

export interface ITeamParti {
    grandprix: string;
    date: string;
    sumPts: number;
    accumPts: number;
    driverInfos: driverContri[];
}

export interface IDriverYearlyRanking {
    rank: number;	
    team: string; 
    sumPts: number;	
    rankChanged: number;
    year: number;
}

type validTarget = IGrandPrix | IDriver | ITeam | IParticipation
    | IWinner | ISumPts | IDriverParti | ITeamSumPts | ITeamParti
    | IDriverYearlyRanking


export interface resFormat {
    message: string;
}

export interface resGetALL extends resFormat{
    list: validTarget[]
}

export interface resGetOne extends resFormat{
    target: validTarget
}

export interface resGetAllOfOne extends resFormat{
    target: validTarget;
    list: validTarget[]
}

export interface resGetAllOfOneTeam extends resGetAllOfOne{
    driverPts: driverContri[]
}

export interface driverSearchParam {
    driverName: string;
    isLastName: boolean; // default is True
}

export interface teamSearchParam {
    teamName: string;
}

export interface grandprixSearchParam {
    grandprixPlace: string;
}

export type driverContri = {
    fullname: string;
    pos: string;
    points: number;
}