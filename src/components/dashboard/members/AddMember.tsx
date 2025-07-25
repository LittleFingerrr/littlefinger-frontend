import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const AddMember = () => {
  return (
    <Dialog>
        <form>
        <DialogTrigger asChild>
            <Button className="bg-regal-gold hover:bg-regal-gold/60 rounded-[0.5rem] text-white font-normal text-sm sm:text-base" variant={'outline'}>
            <Plus size={24}/> Add Members
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-regal-black border border-white/35 sm:rounded-xl">
            <DialogHeader>
            <DialogTitle>Add Member</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
            <div className="grid gap-3">
                <Label htmlFor="name-1">First Name</Label>
                <Input id="name-1" name="first_name" className="bg-transparent border border-white/25 rounded-xl text-white placeholder:text-gray-400 focus:border-white/50" />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="name-2">Last Name</Label>
                <Input id="name-2" name="last_name" className="bg-transparent border border-white/25 rounded-xl text-white placeholder:text-gray-400 focus:border-white/50" />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="username-1">Alias/Username</Label>
                <Input id="username-1" name="username" className="bg-transparent border border-white/25 rounded-xl text-white placeholder:text-gray-400 focus:border-white/50" />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="wallet-address">Wallet Address</Label>
                <Input id="wallet-address" name="wallet_address" className="bg-transparent border border-white/25 rounded-xl text-white placeholder:text-gray-400 focus:border-white/50" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="role-1" className="text-white text-sm">Role*</Label>
                <Select>
                <SelectTrigger className="bg-transparent border border-white/25 rounded-xl text-white focus:border-white/50">
                    <SelectValue placeholder="Select a role" className="text-gray-400" />
                </SelectTrigger>
                <SelectContent className="bg-regal-black border border-white/25 rounded-xl">
                    <SelectItem value="admin" className="text-white hover:bg-white/10">Admin</SelectItem>
                    <SelectItem value="member" className="text-white hover:bg-white/10">Member</SelectItem>
                    <SelectItem value="viewer" className="text-white hover:bg-white/10">Viewer</SelectItem>
                </SelectContent>
                </Select>
            </div>
            </div>
            <DialogFooter className="flex-row gap-3">
                <DialogClose asChild>
                    <Button className="flex-1 rounded-[0.5rem]" variant="outline">Cancel</Button>
                </DialogClose>
                <Button className="flex-1 rounded-[0.5rem] bg-regal-brown" type="submit">Save changes</Button>
            </DialogFooter>
        </DialogContent>
        </form>
    </Dialog>
  )
}

export default AddMember
