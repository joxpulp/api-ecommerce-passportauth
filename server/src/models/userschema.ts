import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from './interfaces';

const userCollection = 'user';

const userSchema = new Schema<User>(
	{
		username: { type: String, required: true, unique: true, max: 100 },
		password: { type: String, required: true, max: 100 },
		email: { type: String, required: true, unique: true, max: 100 },
		name: { type: String, required: true, max: 100 },
		lastname: { type: String, required: true, max: 100 },
	},
	{ versionKey: false }
);

userSchema.pre('save', async function (next) {
	const user = this;
	const hash = await bcrypt.hash(user.password, 10);
	this.password = hash;
	next();
});

userSchema.methods.isValidPassword = async function (password) {
	const user = this;
	const compare = await bcrypt.compare(password, user.password);
	return compare;
};

export const userModel = model<User>(userCollection, userSchema)