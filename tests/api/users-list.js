import { assert } from 'chai';
import TestFactory from '../Factory';
import request from '../request';

const factory = new TestFactory();

suite('Users List');

before(async () => {
    await factory.cleanup();
    await factory.setDefaultUsers();
});

test('Positive: Get users', async () => {
    await request.
        get('/api/v1/users/').
        expect(200).
        set({ 'Authorization': factory.loginAdmin() }).
        expect('Content-Type', /json/).
        expect(({ body }) => {
            assert.ok(body.status);
            body.data.forEach(u => {
                assert.exists(u.id);
                assert.isString(u.login);
                assert.isString(u.createdAt);
            })
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
