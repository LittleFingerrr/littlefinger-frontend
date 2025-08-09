export function PaymentStatsCard() {
    const stats = [
        {
            label: 'Total Payment',
            value: '13,0000.00 STRK',
        },
        {
            label: 'Upcoming Payment',
            value: '1,00.03 STRK',
        },
        {
            label: 'Total Number of Payments',
            value: '23',
        },
        {
            label: 'Date of Last Payment',
            value: '2024-11-05',
        },
        {
            label: 'Date of joining company',
            value: '2012-09-01',
        },
    ];

    return (
        <div
            className="relative rounded-lg p-6 overflow-hidden"
            style={{ backgroundColor: '#131313A6' }}
        >
            {/* Glow effect - only bottom-right corner */}
            <div
                className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-xl"
                style={{ background: 'radial-gradient(circle, #F3A42C 0%, transparent 70%)' }}
            ></div>

            {/* Content */}
            <div className="relative z-10 space-y-6">
                {stats.map((stat, index) => (
                    <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0">
                        <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                        <p className="text-white font-medium text-lg">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
