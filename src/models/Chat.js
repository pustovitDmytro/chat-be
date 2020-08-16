import mongoose from 'mongoose';
import Base from './Base';

const { Schema } = mongoose;

const schema = new Schema({
    name      : { type: String, required: true },
    createdAt : { type: Date, default: Date.now }
});

export default class Chat extends Base {
    static model = mongoose.model('Chat', schema)
}
