import express from 'express';
import controllers from './controllers';

const router = express.Router();
const { sessions, system, users, chats } = controllers;

// system
router.get('/health', system.health);
router.get('/info', system.info);

// users
router.post('/users', sessions.check, users.create);
router.get('/users', sessions.check, users.list);

// chats
router.post('/chats', sessions.check, chats.create);
router.get('/chats', sessions.check, chats.list);

export default router;
