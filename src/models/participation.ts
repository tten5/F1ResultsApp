import { Schema, Types, model } from 'mongoose';

// Create an interface representing a document in MongoDB.
interface IParticipation {
    gp_id: Types.ObjectId;
    driver_id: Types.ObjectId;
    team_id: Types.ObjectId;
    time: string;
    laps: number;
    pos: string;
    points: number;
}

// Create a Schema corresponding to the document interface.
const participationSchema = new Schema<IParticipation>({
    gp_id: {
        type: Schema.Types.ObjectId,
        ref: 'GrandPrix'
    },
    driver_id: {
        type: Schema.Types.ObjectId,
        ref: 'Driver'
    },
    team_id: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    time: { type: String, required: true },
    laps: { type: Number, required: true },
    pos: { type: String, required: true },
    points: { type: Number, required: true }
});

// Create a Model.
export default model<IParticipation>('Participation', participationSchema);
