import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Area } from '../entities/Area';

const router = Router();

// GET /api/areas
router.get('/', async (req, res) => {
  const repo = getRepository(Area);
  const areas = await repo.find();
  res.json(areas);
});

// POST /api/areas
router.post('/', async (req, res) => {
  const repo = getRepository(Area);
  const { name, state } = req.body;
  if (!name) return res.status(400).json({ error: 'Missing area name' });
  const area = repo.create({ name, state });
  await repo.save(area);
  res.status(201).json(area);
});

// DELETE /api/areas/:id
router.delete('/:id', async (req, res) => {
  const repo = getRepository(Area);
  const { id } = req.params;
  const area = await repo.findOne({ where: { id } });
  if (!area) return res.status(404).json({ error: 'Area not found' });
  await repo.remove(area);
  res.json({ success: true });
});

export default router; 