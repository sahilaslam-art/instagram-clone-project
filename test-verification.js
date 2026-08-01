async function testRegistration() {
  console.log('Testing Registration on LIVE backend...');
  const formData = {
    fullName: 'Test Customer',
    mobileNumber: '9999999991',
    email: 'testcustomer1@example.com',
    password: 'password123',
    role: 'Customer',
  };

  const regRes = await fetch('https://instagram-clone-project-backend.onrender.com/api/v1/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  const regData = await regRes.json();
  console.log('Registration Response:', regRes.status, regData);

  if (regRes.status === 201 || regRes.status === 400) {
    console.log('\nTesting Mobile Verification...');
    const mobRes = await fetch('https://instagram-clone-project-backend.onrender.com/api/v1/auth/verify-mobile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: '9999999991',
        otp: '123456'
      })
    });
    console.log('Mobile Verification Response:', mobRes.status, await mobRes.json());

    console.log('\nTesting Email Verification...');
    const emailRes = await fetch('https://instagram-clone-project-backend.onrender.com/api/v1/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: 'testcustomer1@example.com',
        otp: '123456'
      })
    });
    console.log('Email Verification Response:', emailRes.status, await emailRes.json());
  }
}

testRegistration();
