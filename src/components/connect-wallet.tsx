import { Button } from "@/components/ui/button";

export function ConnectWallet() {
  return (
    <Button className="p-6 bg-primary rounded-[3.8125rem] backdrop-blur-[3.125rem] backdrop-brightness-[100%]  hover:bg-primary/90">
      <span className="font-lato font-medium text-white text-base tracking-[0] leading-[normal]">
        Connect wallet
      </span>
    </Button>
  );
}
