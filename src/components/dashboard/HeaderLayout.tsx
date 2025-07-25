import { ConnectWalletBtn } from "./ConnectWalletBtn";

export default function HeaderLayout({ heading = 'Dashboard' }: { heading?: string }) {
  return (
    <header className="flex items-center justify-between my-3">
      <h1 className="text-xl md:text-3xl font-semibold">{heading}</h1>
      <ConnectWalletBtn />
    </header>
  );
}
