import { assert } from 'chai';
import TestFactory from '../Factory';
import request from '../request';

const factory = new TestFactory();

suite('Create Chat');

before(async () => {
    await factory.cleanup();
    await factory.setDefaultUsers();
    await factory.setDefaultChats();
});

const chatData = {
    name : 'act better'
};

test('Positive: Create chat', async () => {
    await request.
        post('/api/v1/chats/').
        send({ data: chatData }).
        expect(200).
        set({ 'Authorization': factory.adminToken() }).
        expect('Content-Type', /json/).
        expect(({ body }) => {
            assert.ok(body.status, JSON.stringify(body.error));
            assert.deepOwnInclude(body.data, {
                name : chatData.name
            });
            assert.exists(body.data.id);
        });
});

after(async () => {
    await factory.cleanup();
});
