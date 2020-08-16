import bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from '../../etc/config';

export function checkPassword(plain, hash) {
    return bcrypt.compare(plain, hash);
}

export function encryptPassword(password) {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);

    return bcrypt.hashSync(password, salt);
}
