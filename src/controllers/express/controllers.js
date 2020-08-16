import { system, sessions, users, chats } from 'src/services';
import ExpressController from '../Base/ExpressController';
import { health } from './custom';

const express = new ExpressController();

export default express.buildController({
    system : {
        health,
        info : system.Info
    },
    sessions : {
        check : express.makeServiceRunner(
            sessions.Check,
            req => ({ token: req.headers.authorization }),
            undefined,
            ExpressController.renderAsSessionMiddlevare
        )
    },
    users : {
        create : users.Create,
        list   : users.List
    },
    chats : {
        create : chats.Create,
        list   : chats.List
    }
});
