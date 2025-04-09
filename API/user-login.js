import bcrypt from 'bcrypt';
import { createClient } from '@libsql/client';
import { NextResponse } from 'next/server';

/**
 * Handles user login requests by validating credentials against the database.
 * Uses bcrypt for secure password comparison and Turso for database operations.
 * 
 * @param {Request} req - The incoming HTTP request
 * @returns {NextResponse} JSON response with login status and appropriate HTTP status code
 */
export async function POST(req) {
    // Validate request method
    if (req.method !== 'POST') {
        return NextResponse.json(
            { error: 'Method not allowed' },
            { status: 405, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        // Parse and validate request body
        const { username, password } = await req.json();

        // Validate required fields
        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Validate input length and format
        if (username.length < 3 || username.length > 50) {
            return NextResponse.json(
                { error: 'Username must be between 3 and 50 characters' },
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: 'Password must be at least 8 characters long' },
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Initialize database connection
        const db = createClient({
            url: process.env.TURSO_DATABASE_URL,
            authToken: process.env.TURSO_AUTH_TOKEN,
        });

        try {
            // Query database for user's password hash
            const result = await db.execute({
                sql: 'SELECT password_hash FROM users WHERE username = ?',
                args: [username],
            });

            // Check if user exists
            if (result.rows.length === 0) {
                return NextResponse.json(
                    { error: 'Invalid credentials' },
                    { status: 401, headers: { 'Content-Type': 'application/json' } }
                );
            }

            // Compare provided password with stored hash
            const storedHash = result.rows[0].password_hash;
            const passwordMatch = await bcrypt.compare(password, storedHash);

            if (passwordMatch) {
                // Successful login
                return NextResponse.json(
                    { 
                        success: true, 
                        message: 'Login successful',
                        data: {
                            username: username,
                            // Add any additional user data you want to return
                        }
                    },
                    { status: 200, headers: { 'Content-Type': 'application/json' } }
                );
            } else {
                // Invalid password
                return NextResponse.json(
                    { error: 'Invalid credentials' },
                    { status: 401, headers: { 'Content-Type': 'application/json' } }
                );
            }
        } catch (error) {
            // Handle database errors
            console.error('Database error:', error);
            
            // Check for specific database errors
            if (error.message.includes('connection')) {
                return NextResponse.json(
                    { error: 'Database connection error. Please try again later.' },
                    { status: 503, headers: { 'Content-Type': 'application/json' } }
                );
            }
            
            if (error.message.includes('timeout')) {
                return NextResponse.json(
                    { error: 'Request timed out. Please try again.' },
                    { status: 504, headers: { 'Content-Type': 'application/json' } }
                );
            }

            // Generic database error
            return NextResponse.json(
                { error: 'Internal server error' },
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        } finally {
            // Ensure database connection is closed
            try {
                await db.close();
            } catch (closeError) {
                console.error('Error closing database connection:', closeError);
            }
        }
    } catch (error) {
        // Handle request parsing errors
        console.error('Request parsing error:', error);
        
        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { error: 'Invalid JSON in request body' },
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        if (error instanceof TypeError) {
            return NextResponse.json(
                { error: 'Invalid request format' },
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Generic error
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
} 