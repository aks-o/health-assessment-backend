import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Doctor } from '../entities/Doctor';
import { SuggestedDoctor } from '../entities/SuggestedDoctor';
import { getDoctors, addDoctor } from '../controllers/doctorController';
import AppDataSource from '../ormconfig';

const router = Router();

// GET /api/doctors?type=Allopathic&subSpecialty=Neurology&city=Bangalore&area=Indiranagar
router.get('/', getDoctors);

// POST /api/doctors
router.post('/', addDoctor);

// DELETE /api/doctors/:id
router.delete('/:id', async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(Doctor);
    const { id } = req.params;
    const doctor = await repo.findOne({ where: { id } });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    await repo.remove(doctor);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/suggest-doctor
router.post('/suggest-doctor', async (req, res) => {
  const repo = getRepository(SuggestedDoctor);
  const { name, type, subSpecialty, city, area, contact, address, reason } = req.body;
  if (!name || !type || !subSpecialty || !city || !area) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const suggestion = repo.create({ name, type, subSpecialty, city, area, contact, address, reason });
  await repo.save(suggestion);
  res.status(201).json({ message: 'Suggestion submitted' });
});

export default router; 