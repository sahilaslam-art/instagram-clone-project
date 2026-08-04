// removed axios

const rolesToSeed = [
  {
    role: 'Zonal_Admin',
    email: 'zonal@test.com',
    fullName: 'Test Zonal',
    domain: 'D1', zone: 'Z1'
  },
  {
    role: 'Admin',
    email: 'admin_test@test.com',
    fullName: 'Test Admin',
    domain: 'D1', zone: 'Z1', region: 'R1'
  },
  {
    role: 'Sub_Admin',
    email: 'subadmin@test.com',
    fullName: 'Test Sub Admin',
    domain: 'D1', zone: 'Z1', region: 'R1', category: 'C1'
  },
  {
    role: 'Worker',
    email: 'worker@test.com',
    fullName: 'Test Worker',
    domain: 'D1', zone: 'Z1', region: 'R1', category: 'C1', speciality: 'Spec1'
  }
];

async function seed() {
  for (const user of rolesToSeed) {
    const formData = {
      fullName: user.fullName,
      mobileNumber: Math.floor(Math.random() * 10000000000).toString().padStart(10, '0'),
      email: user.email,
      password: 'password123',
      role: user.role,
      domain: user.domain,
      zone: user.zone,
      region: user.region,
      category: user.category,
      speciality: user.speciality
    };
    
    console.log(`Registering ${user.role}...`);
    const res = await fetch('https://instagram-clone-project-backend.onrender.com/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    
    const data = await res.json();
    console.log(res.status, data.message);
  }
}

seed();
