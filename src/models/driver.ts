import { Schema, model } from 'mongoose';

// Create an interface representing a document in MongoDB.
interface IDriver {
    name: string;
    nationality: string;
}

// Create a Schema corresponding to the document interface.
const driverSchema = new Schema<IDriver>({
    name: { type: String, required: true },
    nationality: {type: String, required: true }
});

// Create a Model.
export default model<IDriver>('Driver', driverSchema);
