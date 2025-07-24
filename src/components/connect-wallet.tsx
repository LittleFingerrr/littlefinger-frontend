"use client";

import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ConnectWallet() {
  const { address, status } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        className={cn(
          "px-6 lg:px-8 py-2 lg:py-5 bg-primary rounded-[3.8125rem] backdrop-blur-[3.125rem] backdrop-brightness-[100%] hover:bg-primary/90 flex items-center gap-2"
        )}
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        <span className="font-lato font-medium text-white text-xs md:text-base tracking-[0] leading-[normal]">
          {status === "connected" ? shortAddress : "Connect wallet"}
        </span>
      </Button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-[#070602] rounded-lg shadow-lg z-50">
          <div
            className="absolute -bottom-3 right-1 w-14 h-14 rounded-full blur-xl"
            style={{
              background:
                "radial-gradient(circle, #F3A42C 0%, transparent 70%)",
            }}
          ></div>
          <div
            className="absolute -top-3 left-1 w-14 h-14 rounded-full blur-xl"
            style={{
              background:
                "radial-gradient(circle, #F3A42C 0%, transparent 70%)",
            }}
          ></div>
          {status === "connected" ? (
            <button
              onClick={() => {
                disconnect();
                setDropdownOpen(false);
              }}
              className="block w-44 text-left px-4 py-2 text-sm hover:bg-[#ffffff]/10 rounded-lg"
            >
              Disconnect
            </button>
          ) : (
            connectors
              .filter(
                (connector) =>
                  connector.id === "braavos" || connector.id === "argentX"
              )
              .map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => {
                    connect({ connector });
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-[#ffffff]/10 rounded-lg flex items-center gap-2"
                >
                  {connector.id === "braavos" ? (
                    <>
                      <img
                        src="/images/Braavos logo.jpeg"
                        alt="Braavos Wallet Logo"
                        className="w-5 h-5 inline-block mr-2"
                      />
                      Braavos Wallet
                    </>
                  ) : (
                    <>
                      <img
                        src="/images/ready logo.png"
                        alt="Ready Wallet Logo"
                        className="w-5 h-5 inline-block mr-2"
                      />
                      Ready Wallet
                    </>
                  )}
                </button>
              ))
          )}
        </div>
      )}
    </div>
  );
}
