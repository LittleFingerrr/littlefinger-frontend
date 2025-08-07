"use client";

import { useState } from "react";
import { getSocialIcon } from "./icons/social-icons";

export interface SocialContact {
  platform: string;
  handle: string;
}

interface DynamicSocialContactsProps {
  socialContacts: SocialContact[];
  setSocialContacts: (contacts: SocialContact[]) => void;
  error?: string;
}

const SOCIAL_PLATFORMS = [
  "Discord",
  "Telegram",
  "X",
  "LinkedIn",
  "GitHub",
  "Reddit",
  "Instagram",
  "Facebook",
  "YouTube",
  "Other"
];

export const DynamicSocialContacts: React.FC<DynamicSocialContactsProps> = ({
  socialContacts,
  setSocialContacts,
  error,
}) => {
  const addSocialContact = () => {
    setSocialContacts([...socialContacts, { platform: "", handle: "" }]);
  };

  const removeSocialContact = (index: number) => {
    setSocialContacts(socialContacts.filter((_, i) => i !== index));
  };

  const updateSocialContact = (index: number, field: keyof SocialContact, value: string) => {
    const updated = socialContacts.map((contact, i) =>
      i === index ? { ...contact, [field]: value } : contact
    );
    setSocialContacts(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <label className="text-white text-sm font-medium">Social Contacts (Optional)</label>
        <button
          type="button"
          onClick={addSocialContact}
          className="text-[#FF9B28] hover:text-[#FF9B28]/80 text-sm font-medium"
        >
          + Add Social Contact
        </button>
      </div>

      {socialContacts.map((contact, index) => {
        const IconComponent = getSocialIcon(contact.platform);

        return (
          <div key={index} className="flex gap-2 mb-3">
            <div className="flex-1">
              <div className="relative group">
                <select
                  value={contact.platform}
                  onChange={(e) => updateSocialContact(index, "platform", e.target.value)}
                  className="w-full bg-[#FFFFFF1A] opacity-50 border border-white text-white p-3 pl-12 rounded-lg outline-none h-[56px] text-sm focus:bg-[#333333] transition-colors appearance-none cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 155, 40, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)',
                  }}
                >
                  <option value="" className="bg-[#1f1f1f] text-white">Select Platform</option>
                  {SOCIAL_PLATFORMS.map((platform) => (
                    <option key={platform} value={platform} className="bg-[#1f1f1f] text-white">{platform}</option>
                  ))}
                </select>

                {/* Platform Icon */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  {contact.platform ? (
                    <IconComponent className="text-[#FF9B28]" size={18} />
                  ) : (
                    <svg className="w-[18px] h-[18px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10l1 1v16l-1 1H6l-1-1V5l1-1z" />
                    </svg>
                  )}
                </div>

                {/* Dropdown Arrow */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Bottom border accent */}
                <div className="absolute bottom-2 left-3 right-3 h-0.5 bg-gray-600 group-focus-within:bg-[#FF9B28] transition-colors"></div>
              </div>
            </div>

            <div className="flex-1">
              <div className="relative group">
                <input
                  placeholder="Handle/Username"
                  value={contact.handle}
                  onChange={(e) => updateSocialContact(index, "handle", e.target.value)}
                  className="w-full bg-[#FFFFFF1A] opacity-50 border border-white text-white p-3 rounded-lg outline-none h-[56px] focus:bg-[#333333] transition-colors"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 155, 40, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)',
                  }}
                />
                <div className="absolute bottom-2 left-3 right-3 h-0.5 bg-gray-600 group-focus-within:bg-[#FF9B28] transition-colors"></div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeSocialContact(index)}
              className="w-[56px] h-[56px] flex items-center justify-center text-red-400 hover:text-red-300 border border-red-400 rounded-lg hover:bg-red-400/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        );
      })}

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {socialContacts.length === 0 && (
        <div className="text-gray-400 text-sm italic">
          No social contacts added yet. Click "Add Social Contact" to get started.
        </div>
      )}
    </div>
  );
}; 