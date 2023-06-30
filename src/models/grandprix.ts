import { Schema, model } from 'mongoose';

// Create an interface representing a document in MongoDB.
interface IGrandPrix {
    place: string;
    year: number;
}

// Create a Schema corresponding to the document interface.
const grandprixSchema = new Schema<IGrandPrix>({
    place: { type: String, required: true },
    year: {type: Number, required: true }
});

// Create a Model.
export default model<IGrandPrix>('GrandPrix', grandprixSchema);
