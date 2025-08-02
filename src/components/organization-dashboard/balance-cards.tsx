import { Coins, Gift } from 'lucide-react';

export function BalanceCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Available Payment/Balance Card */}
            <div
                className="relative rounded-lg p-8 overflow-hidden"
                style={{ backgroundColor: '#131313A6' }}
            >
                {/* Glow effect - only bottom-right corner */}
                <div
                    className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-xl"
                    style={{ background: 'radial-gradient(circle, #F3A42C 0%, transparent 70%)' }}
                ></div>

                {/* Content */}
                <div className="relative z-10">
                    <h3 className="text-white font-bold text-lg mb-8">Available Payment/Balance</h3>
                    <div className="flex items-center space-x-4">
                        <Coins className="w-12 h-12 text-yellow-500" />
                        <span className="text-gray-300 text-3xl font-bold">0.005 STRK</span>
                    </div>
                </div>
            </div>

            {/* Available Bonuses Card */}
            <div
                className="relative rounded-lg p-8 overflow-hidden"
                style={{ backgroundColor: '#131313A6' }}
            >
                {/* Glow effect - only bottom-right corner */}
                <div
                    className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-xl"
                    style={{ background: 'radial-gradient(circle, #F3A42C 0%, transparent 70%)' }}
                ></div>

                {/* Content */}
                <div className="relative z-10">
                    <h3 className="text-white font-bold text-lg mb-8">Available Bonuses</h3>
                    <div className="flex items-center space-x-4">
                        <Gift className="w-12 h-12 text-yellow-500" />
                        <span className="text-gray-300 text-3xl font-bold">0.001 ETH</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
