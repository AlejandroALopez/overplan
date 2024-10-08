'use client';

import { getTokensFromCookies } from '@/lib/utils/auth';
import { useAppSelector } from "@/lib/store";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function SubscriptionPage() {
    const userData = useAppSelector(state => state.session.userData);

    const handleSubscribe = async (priceId: string) => {
        if (!userData) {
            console.error('User data not available');
            return;
        }

        const stripe = await stripePromise;

        if (!stripe) {
            console.error('Stripe has not been initialized.');
            return;
        }

        const { token, refreshToken } = getTokensFromCookies();
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/checkout-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ userId: userData.userId, email: userData.email, priceId }),
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
            {/* Headings */}
            <div className='flex flex-col items-center gap-8'>
                <p className="text-3xl md:text-4xl font-semibold text-center w-full md:w-11/12 lg:w-1/2">Achieve More With OverPlan AI Pro</p>
                <p className='text-base md:text-lg text-[#808080] text-center w-11/12 md:w-3/4'>
                    Get the most out of OverPlan AI plan generator and our plan management tools.
                    Progress through multiple plans, get more personalized tasks, and more!
                </p>
            </div>
            {/* Plans */}
            <div className='flex flex-col-reverse lg:flex-row justify-center gap-16 mb-12"'>
                {/* Free Plan */}
                <div className="flex flex-col items-center bg-white rounded-2xl w-72 h-96 gap-4 drop-shadow-lg">
                    <div className={`w-full h-4 bg-gray-300 rounded-t-2xl`} />
                    <p className="text-xl text-black font-medium">Free</p>
                    <div className="flex flex-col items-center my-4 h-12">
                        <p className="text-4xl text-black font-semibold">$0/mo</p>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-full">
                        <p>2 Free Plans</p>
                    </div>
                    {userData?.tier === 'Free' && (
                        <button
                            className="flex items-center justify-center rounded-2xl mt-auto m-4 py-3 w-3/4 text-primary font-medium
                        transition hover:scale-110 hover:bg-primary hover:text-white duration-300 border-2 border-primary"
                            disabled
                        >
                            Your Plan
                        </button>
                    )}
                </div>
                {/* Pro Plan */}
                <div className="flex flex-col items-center bg-white rounded-2xl w-72 h-96 gap-4 drop-shadow-lg">
                    <div className={`w-full h-4 bg-primary rounded-t-2xl`} />
                    <p className="text-xl text-black font-medium">Pro</p>
                    <div className="flex flex-col items-center my-4 h-12">
                        <p className="text-4xl text-black font-semibold">$5/mo</p>
                        <p className="text-sm text-[#808080] mt-1">billed monthly</p>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-full">
                        <p>Up to 10 plans per month</p>
                        <p>Multi Plan support</p>
                    </div>
                    <button
                        className="flex items-center justify-center rounded-2xl mt-auto m-4 py-3 w-3/4 text-primary font-medium
                        transition hover:scale-110 hover:bg-primary hover:text-white duration-300 border-2 border-primary"
                        onClick={() => handleSubscribe(process.env.NEXT_PUBLIC_STRIPE_PRO_MONTH_PRICE_ID || "")}
                        disabled={userData?.tier === 'Pro (month)'}
                    >
                        {(userData?.tier === 'Pro (month)') ? 'Your Plan' : 'Upgrade'}
                    </button>
                </div>
            </div>
        </div >
    );
}
