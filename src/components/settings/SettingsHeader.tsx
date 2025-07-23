"use client";
import React from "react";

export default function SettingsHeader() {
  return (
    <div className="flex justify-between items-center mb-8 z-20">
      <div>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="mt-2 text-gray-300">
          Manage your organization details and preferences
        </p>
      </div>
      <button className="bg-[#967623] hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-full shadow-lg transition">
        Connect wallet
      </button>
    </div>
  );
}
