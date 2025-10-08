'use client';
import React from 'react';

export interface SettingsTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function SettingsTabs({ activeTab, setActiveTab }: SettingsTabsProps) {
    const tabs = ['General', 'Notifications', 'Security', 'Advanced'];

    return (
        <div
            className="
        grid grid-cols-2 gap-3 mb-8 z-20
        sm:flex sm:flex-wrap sm:gap-4
      "
        >
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`
            px-4 py-2 rounded-md font-medium text-sm sm:text-base
            ${
                activeTab === tab
                    ? 'bg-[#FFFFFF40]/25 border-[0.6px] border-white/[62%] text-white'
                    : 'bg-[#FFFFFF40]/25 text-gray-300 hover:bg-[#FFFFFF40]/30'
            }
          `}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
