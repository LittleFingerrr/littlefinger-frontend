import { Button } from '@/components/ui/button'
import { Plus, UserPlus2 } from 'lucide-react'

const MembersCTABtns = () => {
  return (
    <div className="flex items-center gap-4 md:gap-6">
        <Button className="bg-regal-gold hover:bg-regal-gold/60 rounded-lg text-white font-normal text-base" size={'lg'} variant={'outline'}>
            <Plus size={24}/> Add Members
        </Button>
        <Button className="rounded-lg bg-regal-black font-normal text-base" size={'lg'} variant={'outline'}>
            <UserPlus2 size={24}/> Invite Members
        </Button>
    </div>
  )
}

export default MembersCTABtns
