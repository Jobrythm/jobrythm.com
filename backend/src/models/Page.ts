import { query } from '../config/database';

export interface Page {
  id: number;
  route: string;
  title: string;
  meta_description?: string;
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
}

export class PageModel {
  static async findAll(): Promise<Page[]> {
    const result = await query('SELECT * FROM pages ORDER BY route');
    return result.rows;
  }

  static async findById(id: number): Promise<Page | null> {
    const result = await query('SELECT * FROM pages WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async findByRoute(route: string): Promise<Page | null> {
    const result = await query('SELECT * FROM pages WHERE route = $1', [route]);
    return result.rows[0] || null;
  }

  static async findPublishedByRoute(route: string): Promise<Page | null> {
    const result = await query(
      'SELECT * FROM pages WHERE route = $1 AND is_published = true',
      [route]
    );
    return result.rows[0] || null;
  }

  static async create(data: {
    route: string;
    title: string;
    meta_description?: string;
  }): Promise<Page> {
    const result = await query(
      'INSERT INTO pages (route, title, meta_description) VALUES ($1, $2, $3) RETURNING *',
      [data.route, data.title, data.meta_description]
    );
    return result.rows[0];
  }

  static async update(
    id: number,
    data: Partial<Omit<Page, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<Page> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.entries(data).forEach(([key, value]) => {
      fields.push(`${key} = $${paramCount}`);
      values.push(value);
      paramCount++;
    });

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const result = await query(
      `UPDATE pages SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );
    return result.rows[0];
  }

  static async delete(id: number): Promise<void> {
    await query('DELETE FROM pages WHERE id = $1', [id]);
  }

  static async togglePublish(id: number): Promise<Page> {
    const result = await query(
      'UPDATE pages SET is_published = NOT is_published, updated_at = NOW() WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
}
