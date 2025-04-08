import fetch from 'node-fetch';

async function testLogin() {
    try {
        const response = await fetch('http://localhost:3000/api/user-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'Plaguedoc',
                password: 'LeviathanValkyrae'
            })
        });

        const data = await response.json();
        console.log('Response:', data);

        if (data.success) {
            console.log('API test was successful!');
            return true;
        } else {
            console.error('API test failed:', data.error || 'Unknown error');
            return false;
        }
    } catch (error) {
        console.error('Error during API test:', error.message);
        return false;
    }
}

testLogin(); 