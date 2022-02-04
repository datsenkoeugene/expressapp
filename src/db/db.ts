import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Book, Schema, User } from '../types/types';

let db: lowdb.LowdbSync<Schema>;

export const createConnection = async () => {
    const adapter = new FileSync<Schema>('db.json');
    db = lowdb(adapter);
    db.defaults({ users: [], books: [], refreshTokens: [] }).write();
};

export const getConnection = () => db;