import { query } from '../config/database';
import bcrypt from 'bcryptjs';

export interface User {
  id: number;
  email: string;
  password_hash: string;
  name?: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export class UserModel {
  static async findByEmail(email: string): Promise<User | null> {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  static async findById(id: number): Promise<User | null> {
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async create(email: string, password: string, name?: string): Promise<User> {
    const password_hash = await bcrypt.hash(password, 10);
    const result = await query(
      'INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, password_hash, name || email.split('@')[0], 'admin']
    );
    return result.rows[0];
  }

  static async updatePassword(id: number, newPassword: string): Promise<void> {
    const password_hash = await bcrypt.hash(newPassword, 10);
    await query(
      'UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2',
      [password_hash, id]
    );
  }

  static async verifyPassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password_hash);
  }
}
