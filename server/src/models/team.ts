import { Schema, model } from 'mongoose';
import { config } from '../config';

// Create an interface representing a document in MongoDB.
export interface ITeam {
    t_name: string;
}

// Create a Schema corresponding to the document interface.
const teamSchema = new Schema<ITeam>({
    t_name: { type: String, required: true, index: true },
},
    { collection: config.db.teamsColl });

// Create a Model.
export const Team = model<ITeam>('Team', teamSchema);
