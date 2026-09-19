import express from 'express';
import { query } from '../db.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const result = await query(
      'SELECT id, name, description, price_cents, duration_minutes, created_at FROM services ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch services', error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { name, description, price_cents, duration_minutes } = req.body ?? {};

  if (!name || !Number.isInteger(price_cents) || !Number.isInteger(duration_minutes)) {
    return res.status(400).json({ message: 'Name, price_cents, and duration_minutes are required.' });
  }

  try {
    const result = await query(
      `
        INSERT INTO services (name, description, price_cents, duration_minutes)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, description, price_cents, duration_minutes, created_at
      `,
      [name, description ?? '', Number(price_cents), Number(duration_minutes)]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create service', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price_cents, duration_minutes } = req.body ?? {};

  try {
    const result = await query(
      `
        UPDATE services
        SET name = COALESCE($1, name),
            description = COALESCE($2, description),
            price_cents = COALESCE($3, price_cents),
            duration_minutes = COALESCE($4, duration_minutes)
        WHERE id = $5
        RETURNING id, name, description, price_cents, duration_minutes, created_at
      `,
      [name ?? null, description ?? null, price_cents ?? null, duration_minutes ?? null, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Service not found.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update service', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await query('DELETE FROM services WHERE id = $1 RETURNING id', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Service not found.' });
    }

    res.json({ message: 'Service deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete service', error: error.message });
  }
});

export default router;
