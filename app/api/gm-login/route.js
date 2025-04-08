import bcrypt from 'bcrypt';
import { createClient } from '@libsql/client';
import { NextResponse } from 'next/server';

export async function POST(req) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }

    try {
        const { username, password } = await req.json();
        console.log('Login attempt - Username:', username);
        console.log('Login attempt - Password:', password);

        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
        }

        if (username.length < 3 || username.length > 50) {
            return NextResponse.json({ error: 'Username must be between 3 and 50 characters' }, { status: 400 });
        }

        if (password.length < 8) {
            return NextResponse.json({ error: 'Password must be at least 8 characters long' }, { status: 400 });
        }

        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return NextResponse.json({ error: 'Username can only contain letters, numbers, and underscores' }, { status: 400 });
        }

        const db = createClient({
            url: process.env.TURSO_DB_URL,
            authToken: process.env.TURSO_AUTH_TOKEN,
        });

        try {
            const result = await db.execute({
                sql: 'SELECT password_hash, gm_level, permissions, is_active, last_login FROM gm_accounts WHERE username = ?',
                args: [username],
            });

            console.log('Database query result:', result.rows);

            if (result.rows.length === 0) {
                return NextResponse.json({ error: 'Invalid GM credentials' }, { status: 401 });
            }

            const gm = result.rows[0];

            if (!gm.is_active) {
                return NextResponse.json({ error: 'GM account is deactivated.' }, { status: 403 });
            }

            const passwordMatch = await bcrypt.compare(password, gm.password_hash);
            console.log('Password match result:', passwordMatch);

            if (passwordMatch) {
                try {
                    await db.execute({
                        sql: 'UPDATE gm_accounts SET last_login = CURRENT_TIMESTAMP WHERE username = ?',
                        args: [username],
                    });
                } catch (updateError) {
                    console.error('Failed to update last login:', updateError);
                    // Log the error but don't fail the login
                }

                const response = {
                    success: true,
                    message: 'GM login successful',
                    data: {
                        username: username,
                        gmLevel: gm.gm_level || 0, // Default to 0 if undefined
                        permissions: gm.permissions || '', // Default to empty string if undefined
                        lastLogin: gm.last_login || null, // Default to null if undefined
                    },
                };
                console.log('Response:', response);
                return NextResponse.json(response, { status: 200 });
            } else {
                return NextResponse.json({ error: 'Invalid GM credentials' }, { status: 401 });
            }
        } catch (error) {
            console.error('Database error:', error);

            if (error.message.includes('connection')) {
                return NextResponse.json({ error: 'Database connection error. Please try again later.' }, { status: 503 });
            }

            if (error.message.includes('timeout')) {
                return NextResponse.json({ error: 'Request timed out. Please try again.' }, { status: 504 });
            }

            if (error.message.includes('permission denied')) {
                return NextResponse.json({ error: 'Database permission error. Please contact an administrator.' }, { status: 500 });
            }

            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        } finally {
            try {
                await db.close();
            } catch (closeError) {
                console.error('Error closing database connection:', closeError);
            }
        }
    } catch (error) {
        console.error('Request parsing error:', error);

        if (error instanceof SyntaxError) {
            return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
        }

        if (error instanceof TypeError) {
            return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
        }

        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}