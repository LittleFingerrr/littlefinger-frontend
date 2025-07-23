import { Button } from "@/components/ui/button";

export function ConnectWallet() {
  return (
    <Button className="px-6 lg:px-8  py-2 lg:py-5 bg-primary rounded-[3.8125rem] backdrop-blur-[3.125rem] backdrop-brightness-[100%]  hover:bg-primary/90">
      <span className="font-lato font-medium text-white text-xs md:text-base tracking-[0] leading-[normal]">
        Connect wallet
      </span>
    </Button>
  );
}
