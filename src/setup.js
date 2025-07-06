const { DataSource } = require('typeorm');
const { Doctor } = require('./src/entities/Doctor');
const { Area } = require('./src/entities/Area');
const AppDataSource = require('./src/ormconfig').default;

async function seedDoctorsAndAreas() {
  await AppDataSource.initialize();
  const doctorRepo = AppDataSource.getRepository(Doctor);
  const areaRepo = AppDataSource.getRepository(Area);

  // Areas/Cities
  const cities = [
    { name: 'Bangalore', state: 'Karnataka' },
    { name: 'Bhopal', state: 'Madhya Pradesh' },
    { name: 'Kolkata', state: 'West Bengal' },
    { name: 'Deoghar', state: 'Jharkhand' },
    { name: 'Ranchi', state: 'Jharkhand' },
    { name: 'Dhanbad', state: 'Jharkhand' },
    { name: 'Bokaro', state: 'Jharkhand' },
    { name: 'Durgapur', state: 'West Bengal' },
    { name: 'Jamshedpur', state: 'Jharkhand' },
    { name: 'Dumka', state: 'Jharkhand' },
    { name: 'Bhagalpur', state: 'Bihar' },
    { name: 'Patna', state: 'Bihar' },
    { name: 'Bhubaneswar', state: 'Odisha' },
    { name: 'Mumbai', state: 'Maharashtra' },
    { name: 'Siliguri', state: 'West Bengal' },
    { name: 'Guwahati', state: 'Assam' },
  ];
  for (const city of cities) {
    if (!(await areaRepo.findOneBy({ name: city.name }))) {
      await areaRepo.save(areaRepo.create(city));
    }
  }

  // Doctors
  const specialties = [
    { type: 'Allopathic', subSpecialties: ['Gynocology', 'Neurology', 'Dentist', 'Heart', 'Surgeon', 'General Medicine', 'Eye', 'Bone', 'Skin'] },
    { type: 'Ayurvedic', subSpecialties: ['General'] },
    { type: 'Homeopathic', subSpecialties: ['General'] },
  ];
  for (const city of cities) {
    for (const spec of specialties) {
      for (const sub of spec.subSpecialties) {
        const name = `${sub} Specialist (${spec.type}) - ${city.name}`;
        const doctor = await doctorRepo.findOneBy({ name, city: city.name });
        if (!doctor) {
          await doctorRepo.save(doctorRepo.create({
            name,
            type: spec.type,
            subSpecialty: sub,
            area: city.name,
            city: city.name,
            contact: '1234567890',
            address: `${sub} Clinic, ${city.name}`
          }));
        }
      }
    }
  }
  await AppDataSource.destroy();
  console.log('Sample doctors and areas seeded.');
}

if (require.main === module) {
  seedDoctorsAndAreas();
} 