"use client";

import { useState, useEffect } from "react";

export default function TokenBalance() {
    const [balance, setBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBalance = async () => {
            setLoading(true);
            try {
                // Replace with your actual UnbelievaBoat API call
                const simulatedBalance = 1000;
                setBalance(simulatedBalance);
            } catch (err: any) {
                setError(err.message || "Failed to fetch balance");
            } finally {
                setLoading(false);
            }
        };

        fetchBalance();
    }, []);

    if (loading) {
        return (
            <div style={{
                position: 'fixed', // Ensure it's always on screen
                top: '10px', // Place it at the top
                left: '50%',
                transform: 'translateX(-50%)', // Center horizontally
                border: '3px solid blue',
                padding: '20px',
                zIndex: 9999, // Ensure it's on top of everything
                backgroundColor: 'black',
                color: 'white',
                textAlign: 'center'
            }}>
                Loading Balance...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                position: 'fixed',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                border: '3px solid red',
                padding: '20px',
                zIndex: 9999,
                backgroundColor: 'black',
                color: 'white',
                textAlign: 'center'
            }}>
                Error: {error}
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            border: '3px solid green',
            padding: '20px',
            zIndex: 9999,
            backgroundColor: 'black',
            color: 'white',
            textAlign: 'center'
        }}>
            <h2>Your Balance: {balance}</h2>
        </div>
    );
}