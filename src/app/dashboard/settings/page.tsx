"use client";

import React, { useState } from "react";
import SettingsHeader from "@/components/settings/SettingsHeader";
import SettingsTabs from "@/components/settings/SettingsTabs";
import OrganizationForm from "@/components/settings/OrganizationForm";
import DisplaySettings from "@/components/settings/DisplaySettings";
import Sidebar from "@/components/Sidebar";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="min-h-screen bg-[#070602] text-white flex">
      <Sidebar />
      <main className="flex-1 px-12 py-10 relative ml-56">
        <div
          className="fixed -top-10 -right-24 -mb-8 w-60 h-32 bg-gradient-to-t from-[#F3A42C4D] to-transparent rounded-full blur-2xl pointer-events-none z-0"
          style={{ filter: "blur(32px)" }}
        />
        <SettingsHeader />
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
