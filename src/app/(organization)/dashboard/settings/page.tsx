'use client';

import React, { useState } from 'react';
import SettingsTabs from '@/components/settings/SettingsTabs';
import OrganizationForm from '@/components/settings/OrganizationForm';
import DisplaySettings from '@/components/settings/DisplaySettings';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('General');
    const [orgName, setOrgName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div className="min-h-screen bg-[#070602] text-white flex flex-col">
            <main className="flex-1 relative max-w-6xl mx-auto w-full">
                <p className="mb-6 text-gray-300 text-sm sm:text-base text-center sm:text-left">
                    Manage your organization details and preferences
                </p>

                {/* Tabs */}
                <div className="mb-6">
                    <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                {/* Tab Content */}
                <div className="space-y-8">
                    {activeTab === 'General' && (
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
                </div>
            </main>
        </div>
    );
}
