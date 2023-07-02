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


type validTarget = IGrandPrix | IDriver | ITeam | IParticipation | IWinner | ISumPts


export interface resFormat {
    message: string;
}

export interface resGetALL extends resFormat{
    list: validTarget[]
}

export interface resGetOne extends resFormat{
    target: validTarget
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