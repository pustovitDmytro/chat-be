import ServiceBase  from '../Base';

export default class SessionCheck extends ServiceBase {
    static LOG_LEVEL = 'verbose'

    static rules = {
        token : [ 'required', 'string' ]
    };

    async execute({ token }) {
        return { token };
    }
}
