import { Button } from '@/components/ui/button';
import { UserPlus2 } from 'lucide-react';
import AddMember from './AddMember';

const MembersCTABtns = () => {
    return (
        <div className="flex items-center gap-4 md:gap-6">
            <AddMember />
            <Button
                className="rounded-[0.5rem] bg-regal-black font-normal text-sm sm:text-base px-6 py-4"
                variant={'outline'}
            >
                <UserPlus2 size={24} /> Invite Members
            </Button>
        </div>
    );
};

export default MembersCTABtns;
