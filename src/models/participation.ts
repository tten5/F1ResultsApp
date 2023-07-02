import { Schema, Types, model } from 'mongoose';
import { config } from '../config';

// Create an interface representing a document in MongoDB.
export interface IParticipation {
    gp_id: Types.ObjectId;
    driver_id: Types.ObjectId;
    team_id: Types.ObjectId;
    time: string;
    laps: number;
    pos: string;
    points: number;
    year: number;
    real_pts: number;
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
    points: { type: Number, required: true },
    year: { type: Number, required: true },
    real_pts: { type: Number, require: true}
},
    { collection: config.db.participationColl });

// Create a Model.
export const Participation = model<IParticipation>('Participation', participationSchema);
