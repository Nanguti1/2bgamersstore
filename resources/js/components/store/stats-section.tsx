import { Users, Clock, TrendingUp, ShieldCheck } from 'lucide-react';

export function StatsSection() {
    return (
        <section className="border-y border-slate-200 bg-white">
            <div className="mx-auto max-w-screen-2xl px-8 py-12 sm:px-8 lg:px-8">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600/20 rounded-full mb-3">
                            <Users className="size-7 text-blue-400" />
                        </div>
                        <div className="text-3xl font-black text-slate-900 md:text-4xl">10,000+</div>
                        <p className="mt-2 text-sm font-medium text-slate-600">Happy Gamers</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-green-600/20 rounded-full mb-3">
                            <Clock className="size-7 text-green-400" />
                        </div>
                        <div className="text-3xl font-black text-slate-900 md:text-4xl">8+</div>
                        <p className="mt-2 text-sm font-medium text-slate-600">Years Experience</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-yellow-600/20 rounded-full mb-3">
                            <TrendingUp className="size-7 text-yellow-400" />
                        </div>
                        <div className="text-3xl font-black text-slate-900 md:text-4xl">98%</div>
                        <p className="mt-2 text-sm font-medium text-slate-600">Satisfaction Rate</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-600/20 rounded-full mb-3">
                            <ShieldCheck className="size-7 text-purple-400" />
                        </div>
                        <div className="text-3xl font-black text-slate-900 md:text-4xl">2-Hour</div>
                        <p className="mt-2 text-sm font-medium text-slate-600">Support Response</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
