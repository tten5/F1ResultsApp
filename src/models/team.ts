import { Schema, model } from 'mongoose';

// Create an interface representing a document in MongoDB.
interface ITeam {
    t_name: string;
}

// Create a Schema corresponding to the document interface.
const teamSchema = new Schema<ITeam>({
    t_name: { type: String, required: true },
});

// Create a Model.
export default model<ITeam>('Team', teamSchema);
