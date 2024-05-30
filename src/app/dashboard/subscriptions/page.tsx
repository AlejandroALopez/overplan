'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function SubscriptionPage() {
    const [email, setEmail] = useState('');

    const handleSubscribe = async (priceId: string) => {
        const stripe = await stripePromise;

        if (!stripe) {
            console.error('Stripe has not been initialized.');
            return;
        }

        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/subscriptions/checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ priceId }),
        });

        const { sessionId } = await response.json();

        const { error } = await stripe.redirectToCheckout({
            sessionId,
          });

        if (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <h1>Choose a Plan</h1>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div>
                <h2>Free Plan</h2>
                <p>$0/mo</p>
                <button onClick={() => handleSubscribe(process.env.NEXT_PUBLIC_STRIPE_FREE_PRICE_ID || "")}>
                    Subscribe
                </button>
            </div>
            <div>
                <h2>Pro Plan</h2>
                <p>$5/mo</p>
                <button onClick={() => handleSubscribe(process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "")}>
                    Subscribe
                </button>
            </div>
        </div>
    );
}
