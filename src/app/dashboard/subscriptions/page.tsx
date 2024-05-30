'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function SubscriptionPage() {
    const [annualOption, setAnnualOption] = useState<boolean>(true);

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
        <div className='flex flex-col items-center w-full gap-8 p-12 bg-white'>
            <div className='flex flex-col items-center gap-8'>
                <p className="text-4xl font-semibold text-center w-1/2">Achieve More With OverPlan AI Premium Plans</p>
                <p className='text-lg text-[#808080] text-center w-3/4'>
                    Get the most out of OverPlan AI plan generator and our plan management tools.
                    Progress through multiple plans, get more personalized tasks, and more with
                    OverPlan premium subscriptions.
                </p>
            </div>
            {/* <h1>Choose a Plan</h1> */}
            <div className='flex flex-row gap-4'>
                <button
                    className={`py-2 px-2 border-none bg-primary 
                        ${annualOption ? "bg-opacity-15" : "text-white"} rounded-md
                        transition hover:scale-105 duration-300`}
                    onClick={() => setAnnualOption(false)}
                >
                    Monthly
                </button>
                <button
                    className={`py-2 px-2 border-none bg-primary 
                        ${!annualOption ? "bg-opacity-15" : "text-white"} rounded-md
                        transition hover:scale-105 duration-300`}
                    onClick={() => setAnnualOption(true)}
                >
                    Annual (20% off)
                </button>
            </div>
            <div className='flex flex-row gap-16 flex-wrap'>
                {/* Free Plan */}
                <div className='flex flex-col items-center px-12 py-4 gap-8 bg-[#CCCCCC] bg-opacity-10 rounded-md'>
                    <p className='text-xl'>Free</p>
                    <p className='text-3xl font-semibold'>$0/mo</p>
                    <div className='flex flex-col'>
                        <p>1 Free Plan</p>
                    </div>
                    <button
                        className='bg-[#B3B3B3] text-white rounded-md px-12 py-2 mt-12 drop-shadow-md'
                        onClick={() => handleSubscribe(process.env.NEXT_PUBLIC_STRIPE_FREE_PRICE_ID || "")}
                        disabled
                    >
                        Your Plan
                    </button>
                </div>
                {/* Pro Plan */}
                <div className='flex flex-col items-center px-12 py-4 gap-8 bg-primary bg-opacity-10 rounded-md'>
                    <p className='text-xl'>Pro</p>
                    <div className='flex flex-col items-center gap-1'>
                        <p className='text-3xl font-semibold'>${annualOption ? "4" : "5"}/mo</p>
                        <p className='text-sm text-[#808080]'>{annualOption ? "billed $48 annually" : "billed monthly"}</p>
                    </div>
                    <div className='flex flex-col'>
                        <p>1 Free Plan</p>
                    </div>
                    <button
                        className='bg-primary text-white rounded-md px-12 py-2 mt-12 drop-shadow-md
                            transition hover:scale-105 duration-300'
                        onClick={() => handleSubscribe(process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "")}
                    >
                        Upgrade
                    </button>
                </div>
            </div>
        </div >
    );
}
