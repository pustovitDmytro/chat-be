import { Chat } from 'src/models';
import ServiceBase     from '../Base';
import { dumpChat } from '../utils/dumpUtils';

export default class ChatsList extends ServiceBase {
    static rules = {};

    async execute() {
        const chats = await Chat.find();

        return { data: chats.map(dumpChat) };
    }
}
