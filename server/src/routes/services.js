import express from 'express';
import { supabase } from '../db.js';

const router = express.Router();

const COLUMNS = 'id, name, description, price_cents, duration_minutes, created_at';

router.get('/', async (_req, res) => {
  const { data, error } = await supabase
    .from('services')
    .select(COLUMNS)
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({ message: 'Failed to fetch services', error: error.message });
  }

  res.json(data);
});

router.post('/', async (req, res) => {
  const { name, description, price_cents, duration_minutes } = req.body ?? {};

  if (!name || !Number.isInteger(price_cents) || !Number.isInteger(duration_minutes)) {
    return res.status(400).json({ message: 'Name, price_cents, and duration_minutes are required.' });
  }

  const { data, error } = await supabase
    .from('services')
    .insert({ name, description: description ?? '', price_cents, duration_minutes })
    .select(COLUMNS)
    .single();

  if (error) {
    return res.status(500).json({ message: 'Failed to create service', error: error.message });
  }

  res.status(201).json(data);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price_cents, duration_minutes } = req.body ?? {};

  const updates = {};
  if (name !== undefined) updates.name = name;
  if (description !== undefined) updates.description = description;
  if (price_cents !== undefined) updates.price_cents = price_cents;
  if (duration_minutes !== undefined) updates.duration_minutes = duration_minutes;

  const { data, error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id)
    .select(COLUMNS)
    .maybeSingle();

  if (error) {
    return res.status(500).json({ message: 'Failed to update service', error: error.message });
  }

  if (!data) {
    return res.status(404).json({ message: 'Service not found.' });
  }

  res.json(data);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) {
    return res.status(500).json({ message: 'Failed to delete service', error: error.message });
  }

  if (!data) {
    return res.status(404).json({ message: 'Service not found.' });
  }

  res.json({ message: 'Service deleted successfully.' });
});

export default router;
