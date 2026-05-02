import { Footer } from '@/components/store/footer';
import { Navbar } from '@/components/store/navbar';
import { ThinHero } from '@/components/store/thin-hero';
import { Link, router } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

type PaymentStatus = 'pending' | 'paid' | 'failed';

interface OrderSummary {
    id: number;
    total_amount: string;
    payment_status: PaymentStatus;
    payment_method: string;
    mpesa_phone: string | null;
    mpesa_receipt_number: string | null;
    paid_at: string | null;
}

const formatKes = (value: number): string => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(value);
};

export default function AwaitingPayment({ order }: { order: OrderSummary }): JSX.Element {
    const [status, setStatus] = useState<PaymentStatus>(order.payment_status);
    const [receipt, setReceipt] = useState<string | null>(order.mpesa_receipt_number);

    useEffect(() => {
        if (status !== 'pending') {
            return;
        }

        const timer = window.setInterval(async () => {
            const response = await fetch(`/checkout/${order.id}/payment-status`, {
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            if (!response.ok) {
                return;
            }

            const data = await response.json();
            setStatus(data.payment_status as PaymentStatus);
            setReceipt(data.mpesa_receipt_number ?? null);
        }, 4000);

        return () => {
            window.clearInterval(timer);
        };
    }, [order.id, status]);

    const statusText = useMemo(() => {
        if (status === 'paid') {
            return 'Payment received successfully.';
        }

        if (status === 'failed') {
            return 'Payment was cancelled or failed. You can retry below.';
        }

        return 'Waiting for M-Pesa confirmation. Enter your PIN on your phone to complete payment.';
    }, [status]);

    return (
        <main className="min-h-screen bg-[#f4f4f5] text-[#111827]">
            <Navbar />
            <ThinHero title="Awaiting Payment Confirmation" />

            <section className="mx-auto my-16 max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-semibold text-slate-900">Order #{order.id}</h1>
                <p className="mt-3 text-slate-600">Amount: {formatKes(Number(order.total_amount))}</p>
                <p className="mt-2 text-slate-600">Payment Method: {order.payment_method.toUpperCase()}</p>
                <p className="mt-2 text-slate-600">Status: <span className="font-semibold text-slate-900">{status}</span></p>
                <p className="mt-4 text-slate-700">{statusText}</p>

                {receipt && <p className="mt-3 text-sm text-slate-600">Receipt: {receipt}</p>}

                <div className="mt-8 flex flex-wrap gap-3">
                    {status !== 'paid' && (
                        <button
                            type="button"
                            onClick={() => router.post(`/checkout/${order.id}/retry-mpesa`)}
                            className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
                        >
                            Retry M-Pesa Prompt
                        </button>
                    )}

                    <Link href="/account" className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                        View My Orders
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
