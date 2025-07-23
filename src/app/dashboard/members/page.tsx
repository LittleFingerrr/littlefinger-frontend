import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, UserPlus2 } from "lucide-react"

const MembersPage = () => {
  return (
    <div className="mt-4 md:mt-8 space-y-8">
        <div className="flex items-center gap-4 md:gap-6">
            <Button className="bg-regal-gold hover:bg-regal-gold/60 rounded-lg text-white font-normal text-base" size={'lg'} variant={'outline'}>
                <Plus size={24}/> Add Members
            </Button>
            <Button className="rounded-lg bg-regal-black font-normal text-base" size={'lg'} variant={'outline'}>
                <UserPlus2 size={24}/> Invite Members
            </Button>
        </div>
        <div className="flex w-full items-center gap-2">
            <Input className="h-10" placeholder="Search Members..." />
            <Button className="rounded-lg bg-white/15 font-normal text-base" size={'lg'} variant="outline">
                Filter by Role
            </Button>
        </div>
    </div>
  )
}

export default MembersPage
