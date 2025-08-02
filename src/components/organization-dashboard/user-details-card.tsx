import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit, Copy } from 'lucide-react';

export function UserDetailsCard() {
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
                {/* User Profile Section */}
                <div className="flex items-start space-x-4">
                    <Avatar className="w-20 h-20 bg-gray-600">
                        <AvatarFallback className="text-white text-xl">WW</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <p className="text-gray-400 text-sm mb-2">User Name</p>
                        <div className="flex items-center space-x-2">
                            <h3 className="text-white text-xl font-medium">Wilfred Wilfred</h3>
                            <Button variant="ghost" size="sm" className="p-1 h-auto">
                                <Edit className="w-4 h-4 text-gray-400" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Role Section */}
                <div>
                    <p className="text-gray-400 text-sm mb-2">Role</p>
                    <p className="text-white text-lg">Member</p>
                </div>

                {/* ID Section */}
                <div>
                    <p className="text-gray-400 text-sm mb-2">ID</p>
                    <div className="flex items-center justify-between">
                        <p className="text-white">Wilfred002_0ea?</p>
                        <Button variant="ghost" size="sm" className="p-1 h-auto">
                            <Copy className="w-4 h-4 text-gray-400" />
                        </Button>
                    </div>
                </div>

                {/* Wallet Address Section */}
                <div>
                    <p className="text-gray-400 text-sm mb-2">Wallet Address</p>
                    <div className="flex items-center justify-between">
                        <p className="text-white text-sm">https://Token/ETH009we?.0aPf</p>
                        <Button variant="ghost" size="sm" className="p-1 h-auto">
                            <Copy className="w-4 h-4 text-gray-400" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
