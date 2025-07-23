"use client";

import React, { useState } from "react";
import SettingsHeader from "@/components/settings/SettingsHeader";
import SettingsTabs from "@/components/settings/SettingsTabs";
import OrganizationForm from "@/components/settings/OrganizationForm";
import DisplaySettings from "@/components/settings/DisplaySettings";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="min-h-screen bg-[#070602] text-white flex">
      <main className="flex-1 relative">
        <p className="mb-4 text-gray-300">
          Manage your organization details and preferences
        </p>
        <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "General" && (
          <>
            <OrganizationForm
              orgName={orgName}
              setOrgName={setOrgName}
              email={email}
              setEmail={setEmail}
              description={description}
              setDescription={setDescription}
            />
            <DisplaySettings />
          </>
        )}
      </main>
    </div>
  );
}
