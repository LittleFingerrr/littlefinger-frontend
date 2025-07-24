import { Button } from "../ui/button";

export function ConnectWalletBtn() {
  return (
    <Button className="max-w-48 w-full bg-regal-gold hover:bg-regal-gold/60 rounded-full text-white font-medium text-base" size={'lg'}     onClick={() => alert('Connect wallet clicked')}>
      Connect wallet
    </Button>
  );
}
