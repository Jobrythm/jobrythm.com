import { query } from '../config/database';

export interface Setting {
  id: number;
  key: string;
  value: string;
  type: string;
  updated_at: Date;
}

export class SettingModel {
  static async findAll(): Promise<Setting[]> {
    const result = await query('SELECT * FROM settings ORDER BY key');
    return result.rows;
  }

  static async findByKey(key: string): Promise<Setting | null> {
    const result = await query('SELECT * FROM settings WHERE key = $1', [key]);
    return result.rows[0] || null;
  }

  static async upsert(key: string, value: string, type: string = 'string'): Promise<Setting> {
    const result = await query(
      `INSERT INTO settings (key, value, type) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (key) 
       DO UPDATE SET value = $2, type = $3, updated_at = NOW() 
       RETURNING *`,
      [key, value, type]
    );
    return result.rows[0];
  }

  static async delete(key: string): Promise<void> {
    await query('DELETE FROM settings WHERE key = $1', [key]);
  }

  static async getPublicSettings(): Promise<Record<string, any>> {
    const result = await query(
      "SELECT key, value, type FROM settings WHERE key NOT LIKE 'admin_%'"
    );
    
    const settings: Record<string, any> = {};
    result.rows.forEach((row) => {
      settings[row.key] = this.parseValue(row.value, row.type);
    });
    return settings;
  }

  private static parseValue(value: string, type: string): any {
    switch (type) {
      case 'number':
        return Number(value);
      case 'boolean':
        return value === 'true';
      case 'json':
        return JSON.parse(value);
      default:
        return value;
    }
  }
}
