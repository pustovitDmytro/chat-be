import mongoose from 'mongoose';
import bluebird from 'bluebird';
import config   from 'src/config';

import '../models/User';
import '../models/Chat';

const { port, host, database, user, password } = config.db;

mongoose.Promise = bluebird;

export const mongoUrl = `mongodb://${user}:${password}@${host}:${port}/${database}?authSource=admin`;

async function connect(url) {
    try {
        await mongoose.connect(url, {
            useNewUrlParser    : true,
            useUnifiedTopology : true
        });
        console.log('MONGO_DB CONNECTION ESTABLISED');
    } catch (error) {
        console.error('MONGO_DB CONNECTION FAILED');
        console.error(error);
        throw error;
    }
}
connect(mongoUrl);

export default mongoose;
