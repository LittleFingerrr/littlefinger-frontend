// Mock data for status
const statusData = [
    {
        status: 'Active',
        role: 'Member',
        dateOfInitialization: 'May 31, 2024',
        statusColor: 'text-green-500',
    },
    {
        status: 'Suspended',
        role: 'Member',
        dateOfInitialization: 'June 2, 2024',
        statusColor: 'text-yellow-500',
    },
    {
        status: 'Removed',
        role: 'Member',
        dateOfInitialization: 'June 12, 2024',
        statusColor: 'text-red-500',
    },
];

export function StatusTable() {
    return (
        <div
            className="relative rounded-lg overflow-hidden"
            style={{ backgroundColor: '#131313A6' }}
        >
            {/* Multiple glow effects */}
            <div
                className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-xl"
                style={{ background: 'radial-gradient(circle, #F3A42C 0%, transparent 70%)' }}
            ></div>
            <div
                className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full blur-xl"
                style={{ background: 'radial-gradient(circle, #F3A42C 0%, transparent 70%)' }}
            ></div>

            {/* Content */}
            <div className="relative z-10 p-6">
                {/* Table Header */}
                <div className="grid grid-cols-3 gap-6 pb-4 mb-6 border-b border-gray-700">
                    <div className="text-white font-medium text-sm uppercase tracking-wider">
                        Status
                    </div>
                    <div className="text-white font-medium text-sm uppercase tracking-wider">
                        Role
                    </div>
                    <div className="text-white font-medium text-sm uppercase tracking-wider">
                        Date of Initialization
                    </div>
                </div>

                {/* Table Data */}
                <div className="space-y-4">
                    {statusData.map((item, index) => (
                        <div key={index} className="grid grid-cols-3 gap-6 py-4">
                            <div className={`font-bold ${item.statusColor}`}>{item.status}</div>
                            <div className="text-white">{item.role}</div>
                            <div className="text-white">{item.dateOfInitialization}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
