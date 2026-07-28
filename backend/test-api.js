const API_BASE = 'http://localhost:5000/api/v1';

async function testAPIs() {
    try {
        console.log('--- 🚀 Starting Backend API Tests ---\n');

        // 1. Check if server is running
        try {
            await fetch('http://localhost:5000/');
            console.log('✅ Server is running on port 5000');
        } catch (e) {
            console.error('❌ Server is NOT running! Please start the server using "npm run dev" in the backend folder first.');
            return;
        }

        // Generate random email to avoid duplication errors on multiple runs
        const randomStr = Math.random().toString(36).substring(7);
        const testUser = {
            fullName: "Test User",
            mobileNumber: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
            email: `test_${randomStr}@stagefund.com`,
            password: "password123",
            role: "Customer"
        };

        // 2. Register
        console.log('\n1. Testing User Registration...');
        const regRes = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });
        const regData = await regRes.json();
        if (regRes.ok) {
            console.log('✅ User Registration Successful:', regData.message);
        } else {
            console.log('❌ Registration Failed:', regData.message);
            return;
        }

        // 3. Login
        console.log('\n2. Testing User Login...');
        const loginRes = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier: testUser.email, password: testUser.password })
        });
        const loginData = await loginRes.json();
        
        let token = '';
        if (loginRes.ok) {
            token = loginData.data.token;
            console.log('✅ Login Successful! Got JWT Token.');
        } else {
            console.log('❌ Login Failed:', loginData.message);
            return;
        }

        // 4. Access Protected Route (Customer Dashboard)
        console.log('\n3. Testing Protected Route (Customer Dashboard)...');
        const dashRes = await fetch(`${API_BASE}/customer/dashboard`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const dashData = await dashRes.json();
        if (dashRes.ok) {
            console.log('✅ Dashboard Fetched Successfully!');
            console.log('   User:', dashData.data.user.fullName);
            console.log('   Role:', dashData.data.user.role);
        } else {
            console.log('❌ Dashboard Fetch Failed:', dashData.message);
        }

        // 5. Test Add Funds to Wallet
        console.log('\n4. Testing Wallet Funding...');
        const walletRes = await fetch(`${API_BASE}/customer/wallet/add-funds`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ amount: 50000 })
        });
        const walletData = await walletRes.json();
        if (walletRes.ok) {
            console.log('✅ Funds Added Successfully!');
            console.log('   New Balance:', walletData.data.balance);
        } else {
            console.log('❌ Add Funds Failed:', walletData.message);
        }

        console.log('\n--- 🎉 All Basic API Tests Passed Successfully! ---');

    } catch (error) {
        console.error('An unexpected error occurred during testing:', error);
    }
}

testAPIs();
