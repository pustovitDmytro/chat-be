import { assert } from 'chai';
import TestFactory from '../Factory';
import request from '../request';

const factory = new TestFactory();

suite('Chats List');

before(async () => {
    await factory.cleanup();
    await factory.setDefaultUsers();
    await factory.setDefaultChats();
});

test('Positive: Get chats', async () => {
    await request.
        get('/api/v1/chats/').
        expect(200).
        set({ 'Authorization': factory.loginAdmin() }).
        expect('Content-Type', /json/).
        expect(({ body }) => {
            assert.ok(body.status);
            body.data.forEach(u => {
                assert.exists(u.id);
                assert.isString(u.name);
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
