import React, { useState } from 'react';

const sampleCenters = [
  { name: 'City Pharmacy', address: '123 Main St, Delhi', phone: '9999999999', city: 'Delhi' },
  { name: 'HealthPlus Medical', address: '456 Market Rd, Delhi', phone: '8888888888', city: 'Delhi' }
];

function MedicineCenters() {
  const [search, setSearch] = useState('');
  const centers = sampleCenters.filter(center =>
    center.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container" style={{ marginTop: 'calc(2rem + 10px)', marginBottom: '2rem' }}>
      <h2>Local Medicine Centers</h2>
      <input
        type="text"
        placeholder="Search by city..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: '0.5rem', margin: '1rem 0', width: '100%', maxWidth: 400, borderRadius: 8, border: '1px solid #ccc' }}
      />
      <div className="services-grid">
        {centers.length === 0 ? (
          <p>No centers found.</p>
        ) : (
          centers.map((center, idx) => (
            <div className="service-card" key={idx}>
              <strong>{center.name}</strong><br />
              {center.address}<br />
              {center.phone}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MedicineCenters;
