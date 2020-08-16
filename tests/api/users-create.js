import { assert } from 'chai';
import TestFactory from '../Factory';
import request from '../request';

const factory = new TestFactory();

suite('Create User');

before(async () => {
    await factory.cleanup();
    await factory.setDefaultUsers();
});

const userData = {
    login: 'Ryan',
    role: 'CLIENT',
    password: 'ytQkzKaA5JVQr'
}

test('Positive: Create user', async () => {
    await request.
        post('/api/v1/users/').
        send({ data: userData }).
        expect(200).
        set({ 'Authorization': factory.loginAdmin() }).
        expect('Content-Type', /json/).
        expect(({ body }) => {
            assert.ok(body.status);
            assert.deepOwnInclude(body.data, {
                login:userData.login,
                role:userData.role,
            });
            assert.exists(body.data.id);
            assert.notExists(body.data.password);
        });
});

after(async () => {
    try {
        await factory.cleanup();
    } catch (e) {
        console.error(e);
        throw e;
    }
});
