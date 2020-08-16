import mongoose from 'mongoose';
import { encryptPassword } from './utils';
import Base from './Base';

const { Schema } = mongoose;
// const { ObjectId } = Schema.Types;

const UserSchema = new Schema({
    login     : { type: String, required: true, index: { unique: true } },
    role      : { type: String, enum: [ 'ADMIN', 'CLIENT' ], default: 'CLIENT' },
    createdAt : { type: Date, default: Date.now },
    password  : { type: String, required: true, set: encryptPassword }
});

export default class Chat extends Base {
    static model = mongoose.model('User', UserSchema);
}
