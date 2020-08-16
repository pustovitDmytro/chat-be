#!./node_modules/.bin/babel-node

import { docopt } from 'docopt';
import mongoose from 'lib/mongoose';
import { users } from '../fixtures';

const User = mongoose.model('User');

const doc = `Usage:
   seeds.js
   seeds.js -h | --help

Options:
   -h --help          Fill db with seeds data.
`;

async function main() {
    try {
        console.log(1);
        await User.insertMany(users);
        console.log(`added ${users.length} users`);
        // const user = new User(userData);

        // await user.save();
        // console.log('created', user);
        mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error(error);
        mongoose.connection.close();
        process.exit(1);
    }
}

main(docopt(doc));
