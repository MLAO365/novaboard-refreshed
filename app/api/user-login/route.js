import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        // Validate request content type
        const contentType = request.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return NextResponse.json({
                success: false,
                message: 'Content-Type must be application/json'
            }, { 
                status: 415,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // Parse and validate request body
        let body;
        try {
            body = await request.json();
        } catch (parseError) {
            return NextResponse.json({
                success: false,
                message: 'Invalid JSON in request body'
            }, { 
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // Validate required fields
        const { username, password } = body;
        if (!username || !password) {
            return NextResponse.json({
                success: false,
                message: 'Username and password are required'
            }, { 
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // TODO: Implement your authentication logic here
        // This is a placeholder for the actual authentication process
        
        // Example response structure with explicit headers
        return NextResponse.json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: 'user-id',
                    username: username,
                    // Add other user data as needed
                }
            }
        }, { 
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        // Ensure all errors return JSON
        return NextResponse.json({
            success: false,
            message: 'Login failed',
            error: error.message || 'An unexpected error occurred'
        }, { 
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
} 