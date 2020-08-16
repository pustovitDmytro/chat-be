import { Chat } from 'src/models';
import ServiceBase     from '../Base';
import { dumpChat } from '../utils/dumpUtils';

export default class ChatsCreate extends ServiceBase {
    static rules = {
        data : [ 'required', { 'nested_object' : {
            name : [ 'required', 'string' ]
        } } ]
    };

    async execute({ data }) {
        const chat = await Chat.create(data);

        return { data: dumpChat(chat) };
    }
}
