import { Schema, model } from 'mongoose';
import { config } from '../config';

// Create an interface representing a document in MongoDB.
export interface IGrandPrix {
    place: string;
    year: number;
    date: Date;
}

// Create a Schema corresponding to the document interface.
const grandprixSchema = new Schema<IGrandPrix>({
    place: { type: String, required: true },
    year: { type: Number, required: true },
    date: { type: Date, required: true }
},
    { collection: config.db.grandprixColl }
);

// Create a Model.
export const GrandPrix = model<IGrandPrix>('GrandPrix', grandprixSchema);
