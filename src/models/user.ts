import { Schema, Types, model } from 'mongoose';

// Create an interface representing a document in MongoDB.
interface IUser {
    username: string;
    password: string;
    favDrivers: Types.ObjectId[];
}

// Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    favDrivers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Driver'
        }       
    ]
});

// Create a Model.
export default model<IUser>('User', userSchema);
