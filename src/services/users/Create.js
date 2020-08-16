import { User } from 'src/models';
import ServiceBase     from '../Base';
import { dumpUser } from '../utils/dumpUtils';

export default class UsersCreate extends ServiceBase {
    static rules = {
        data : [ 'required', { 'nested_object' : {
            login    : [ 'required', 'string' ],
            password : [ 'required', 'string' ],
            role     : [ 'required', { 'one_of': [ 'ADMIN', 'CLIENT' ] } ]
        } } ]
    };

    async execute({ data }) {
        const user = new User(data);

        await user.save();

        return { data: dumpUser(user) };
    }
}
