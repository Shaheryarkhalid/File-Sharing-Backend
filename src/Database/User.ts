import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    meta: {
		createdAt: Date,
		updatedAt: Date
    };
}

const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    meta: {
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    }
	},
	{
    timestamps: false
  }
);

UserSchema.pre<IUser>('save', function (next) {
    this.meta.updatedAt = new Date(); 
    next();
});

const User = mongoose.model<IUser>('User', UserSchema);
export default  User