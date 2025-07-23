"use client";
import React from "react";

export interface OrganizationFormProps {
  orgName: string;
  setOrgName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  description: string;
  setDescription: (desc: string) => void;
}

export default function OrganizationForm({ orgName, setOrgName, email, setEmail, description, setDescription }: OrganizationFormProps) {
  return (
    <div className="bg-[#DADADA1A]/10 rounded-xl p-8 mb-8 z-20">
      <h2 className="text-2xl font-semibold mb-2">Organization Information</h2>
      <p className="text-gray-400 mb-6">Update your organization details</p>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-400 mb-1">Organization Name</label>
          <input
            type="text"
            className="w-full bg-white/5 text-white rounded-md px-4 py-2 focus:outline-none"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Email Address</label>
          <input
            type="email"
            className="w-full bg-white/5 text-white rounded-md px-4 py-2 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Organization Description</label>
          <input
            type="text"
            className="w-full bg-white/5 text-white rounded-md px-4 py-2 focus:outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="bg-[#967623] hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-3xl mt-4"
        >
          save changes
        </button>
      </form>
    </div>
  );
}
