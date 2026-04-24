import { Users, Clock, TrendingUp, ShieldCheck } from 'lucide-react';

export function StatsSection() {
    return (
        <section className="bg-zinc-900 border-y border-zinc-800">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600/20 rounded-full mb-3">
                            <Users className="size-7 text-blue-400" />
                        </div>
                        <div className="text-3xl md:text-4xl font-black text-white">10,000+</div>
                        <p className="mt-2 text-sm text-gray-400 font-medium">Happy Gamers</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-green-600/20 rounded-full mb-3">
                            <Clock className="size-7 text-green-400" />
                        </div>
                        <div className="text-3xl md:text-4xl font-black text-white">8+</div>
                        <p className="mt-2 text-sm text-gray-400 font-medium">Years Experience</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-yellow-600/20 rounded-full mb-3">
                            <TrendingUp className="size-7 text-yellow-400" />
                        </div>
                        <div className="text-3xl md:text-4xl font-black text-white">98%</div>
                        <p className="mt-2 text-sm text-gray-400 font-medium">Satisfaction Rate</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-600/20 rounded-full mb-3">
                            <ShieldCheck className="size-7 text-purple-400" />
                        </div>
                        <div className="text-3xl md:text-4xl font-black text-white">2-Hour</div>
                        <p className="mt-2 text-sm text-gray-400 font-medium">Support Response</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
