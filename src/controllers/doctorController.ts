import { Doctor } from '../entities/Doctor';
import { Request, Response } from 'express';
import AppDataSource from '../ormconfig';

const doctorRepo = AppDataSource.getRepository(Doctor);

export const getDoctors = async (req: Request, res: Response) => {
  const { type, city, specialty } = req.query;
  let where: any = {};
  if (type) where.type = type;
  if (city) where.city = city;
  if (specialty) where.specialty = specialty;
  try {
    const doctors = await doctorRepo.find({ where });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching doctors' });
  }
};

export const addDoctor = async (req: Request, res: Response) => {
  const { name, specialty, type, address, phone, city } = req.body;
  if (!name || !specialty || !type || !address || !phone || !city) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const doctor = doctorRepo.create({ name, specialty, type, address, phone, city });
    await doctorRepo.save(doctor);
    res.status(201).json({ message: 'Doctor added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding doctor' });
  }
};

export class DoctorController {
  async findNearbyDoctors(latitude: number, longitude: number, specialization?: string) {
    // Implement geolocation-based doctor search
  }

  async verifyDoctor(doctorId: string) {
    // Implement doctor verification logic
  }
}