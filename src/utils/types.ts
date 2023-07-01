import { IGrandPrix } from "../models/grandprix";
import { IDriver } from "../models/driver";
import { ITeam } from "../models/team";
import { IParticipation } from "../models/participation";
import { IUser } from "../models/user";

type validTarget = IGrandPrix | IDriver | ITeam | IParticipation | IUser


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
}

export interface teamSearchParam {
    teamName: string;
}

export interface grandprixSearchParam {
    grandprixPlace: string;
}