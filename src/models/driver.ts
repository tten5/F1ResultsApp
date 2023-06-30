import { Schema, model } from 'mongoose';

// Create an interface representing a document in MongoDB.
export interface IDriver {
    name: string;
    nationality: string;
}

// Create a Schema corresponding to the document interface.
const driverSchema = new Schema<IDriver>({
    name: { type: String, required: true },
    nationality: {type: String, required: true }
});

// Create a Model.
export const Driver = model<IDriver>('Driver', driverSchema);
