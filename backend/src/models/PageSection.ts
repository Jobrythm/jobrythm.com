import { query } from '../config/database';

export interface PageSection {
  id: number;
  page_id: number;
  section_type: string;
  content: any;
  position: number;
  is_visible: boolean;
  created_at: Date;
  updated_at: Date;
}

export class PageSectionModel {
  static async findByPageId(pageId: number): Promise<PageSection[]> {
    const result = await query(
      'SELECT * FROM page_sections WHERE page_id = $1 ORDER BY position',
      [pageId]
    );
    return result.rows;
  }

  static async findById(id: number): Promise<PageSection | null> {
    const result = await query('SELECT * FROM page_sections WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async create(data: {
    page_id: number;
    section_type: string;
    content: any;
    position?: number;
  }): Promise<PageSection> {
    // If no position specified, add to end
    let position = data.position;
    if (position === undefined) {
      const maxPos = await query(
        'SELECT COALESCE(MAX(position), -1) as max_pos FROM page_sections WHERE page_id = $1',
        [data.page_id]
      );
      position = maxPos.rows[0].max_pos + 1;
    }

    const result = await query(
      'INSERT INTO page_sections (page_id, section_type, content, position) VALUES ($1, $2, $3, $4) RETURNING *',
      [data.page_id, data.section_type, JSON.stringify(data.content), position]
    );
    return result.rows[0];
  }

  static async update(
    id: number,
    data: Partial<Omit<PageSection, 'id' | 'page_id' | 'created_at' | 'updated_at'>>
  ): Promise<PageSection> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'content') {
        fields.push(`${key} = $${paramCount}`);
        values.push(JSON.stringify(value));
      } else {
        fields.push(`${key} = $${paramCount}`);
        values.push(value);
      }
      paramCount++;
    });

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const result = await query(
      `UPDATE page_sections SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );
    return result.rows[0];
  }

  static async delete(id: number): Promise<void> {
    await query('DELETE FROM page_sections WHERE id = $1', [id]);
  }

  static async reorder(pageId: number, sectionIds: number[]): Promise<void> {
    // Update positions based on array order
    for (let i = 0; i < sectionIds.length; i++) {
      await query(
        'UPDATE page_sections SET position = $1, updated_at = NOW() WHERE id = $2 AND page_id = $3',
        [i, sectionIds[i], pageId]
      );
    }
  }
}
