import path from 'path';
import confme from 'confme';

const config = confme(
    path.join(__dirname, '../', 'etc', 'config.json')
);

config.isTest = process.env.MODE === 'test';
module.exports = config; // eslint-disable-line import/no-commonjs

