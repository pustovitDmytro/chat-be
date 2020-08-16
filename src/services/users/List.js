import { User } from 'src/models';
import ServiceBase     from '../Base';
import { dumpUser } from '../utils/dumpUtils';

export default class UsersList extends ServiceBase {
    static rules = {};

    async execute() {
        const users = await User.find();

        return { data: users.map(dumpUser) };
    }
}
