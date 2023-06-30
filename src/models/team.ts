import { Schema, model } from 'mongoose';

// Create an interface representing a document in MongoDB.
export interface ITeam {
    t_name: string;
}

// Create a Schema corresponding to the document interface.
const teamSchema = new Schema<ITeam>({
    t_name: { type: String, required: true, index: true },
});

// Create a Model.
export const Team = model<ITeam>('Team', teamSchema);
