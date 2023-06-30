import { Schema, model } from 'mongoose';
import { config } from '../config';

// Create an interface representing a document in MongoDB.
export interface IDriver {
    name: string;
    nationality: string;
}

// Create a Schema corresponding to the document interface.
const driverSchema = new Schema<IDriver>({
    name: { type: String, required: true, index: true },
    nationality: { type: String, required: true }
},
    { collection: config.db.driversColl });

// Create a Model.
export const Driver = model<IDriver>('Driver', driverSchema);
