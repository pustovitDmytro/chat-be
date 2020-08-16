import jwt from 'jsonwebtoken';
import mongoose, { mongoUrl } from 'src/lib/mongoose';
import { User, Chat } from 'src/models';
import { secret } from 'config';
import { users, chats } from '../fixtures';
// import { promisify } from 'bluebird'
export {
    users,
    chats
};

export default class TestFactory {
    constructor() {
        if (!mongoUrl.match(/test/i)) {
            throw new Error(`DATABASE URL [${mongoUrl}] DOES NOT HAVE "test" IN ITS NAME`);
        }
    }

    adminToken() {
        const [ admin ] = this.getRoleUsers('ADMIN');

        return this.token(admin._id);
    }

    token(userId) {
        const user = users.find(u => u._id === userId);

        return jwt.sign(user, secret);
    }

    getRoleUsers(role) {
        return users.filter(u => u.role === role);
    }

    async setDefaultUsers() {
        await User.createMany(users);
    }
    async setDefaultChats() {
        await Chat.createMany(chats);
    }


    async cleanup() {
        await this._dropDatabase();
    }

    async _dropDatabase() {
        for (const collection in mongoose.connection.collections) { // eslint-disable-line
            await mongoose.connection.collections[collection].remove();
        }
    }
}

