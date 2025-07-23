"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Dashboard", icon: "/icons/dashboard.svg", href: "/dashboard" },
  { label: "Members", icon: "/icons/members.svg", href: "/members" },
  { label: "Schedule", icon: "/icons/schedule.svg", href: "/schedule" },
  { label: "Vault", icon: "/icons/vault.svg", href: "/vault" },
  {
    label: "Settings",
    icon: "/icons/settings.svg",
    href: "/dashboard/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-[#070602] flex flex-col justify-between shadow-lg z-30 border-r border-gray-600/60">
      <div>
        <div className="flex row items-center py-4">
          <Image
            src="/littlefinger.svg"
            alt="Little Finger Logo"
            width={80}
            height={80}
          />
          <span className="mt-2 -ml-2 text-sm font-bold tracking-wide text-gray-400/60 underline">
            LITTLE FINGER
          </span>
        </div>
        <nav className="mt-6 flex flex-col gap-8">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="group flex items-center gap-4 px-8 py-4 text-white hover:bg-[#1A1814] transition"
            >
              <span className="w-6 h-6 flex items-center justify-center">
                <Image
                  src={item.icon}
                  alt={item.label + " icon"}
                  width={24}
                  height={24}
                />
              </span>
              <span className="font-medium text-base group-hover:text-yellow-400">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
      <div
        className="fixed bottom-5 -left-28 -mb-8 w-60 h-32 bg-gradient-to-t from-[#F3A42C4D] to-transparent rounded-full blur-2xl pointer-events-none z-0"
        style={{ filter: "blur(32px)" }}
      />
    </aside>
  );
}
