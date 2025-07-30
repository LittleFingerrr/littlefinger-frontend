"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useAccount, useContract, useSendTransaction } from "@starknet-react/core";
import { useRouter } from "next/navigation";
import logo from "../../../public/logo.svg";
import backgroundImage from "../../../public/registerBackgroundImg.png";
import { URLInputWithPreview } from "@/components/ui/url-input-with-preview";
import { DynamicSocialContacts, SocialContact } from "@/components/ui/dynamic-social-contacts";
import { pinataService, OrganizationMetadata } from "@/lib/pinata";
import { FACTORYABI } from "@/lib/abi/factory-abi";
import { LITTLEFINGER_FACTORY_ADDRESS, STARKGATE_STRK_ADDRESS } from "@/lib/constants";
import { ConnectWallet } from "@/components/connect-wallet";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  // Basic Organization Info
  organization: string;
  description: string;
  website: string;
  socialContacts: SocialContact[];
  logoUri: string;
  legalDocument: string;

  // Admin Info
  first_admin_fname: string;
  first_admin_lname: string;
  first_admin_alias: string;

  // Contract Info
  token: string;
  organization_type: number;
}

interface FormErrors {
  [key: string]: string;
}

const STEPS = [
  { id: 1, title: "Organization Details", description: "Basic organization information" },
  { id: 2, title: "Contact & Media", description: "Social contacts and media assets" },
  { id: 3, title: "Admin Information", description: "Administrator details" },
  { id: 4, title: "Contract Setup", description: "Blockchain configuration" },
];

const TOKEN_OPTIONS = [
  { value: STARKGATE_STRK_ADDRESS, label: "STRK" },
  { value: "0x028757d11c97078Dd182023B1cC7b9E7659716c631ADF94D24f1fa7Dc5943072", label: "USDC" },
];

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ipfsUrl, setIpfsUrl] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const { address: userAddress, isConnected } = useAccount();
  const { contract: factoryContract } = useContract({
    abi: FACTORYABI,
    address: LITTLEFINGER_FACTORY_ADDRESS,
  });

  const [formData, setFormData] = useState<FormData>({
    organization: "",
    description: "",
    website: "",
    socialContacts: [],
    logoUri: "",
    legalDocument: "",
    first_admin_fname: "",
    first_admin_lname: "",
    first_admin_alias: "",
    token: "",
    organization_type: 1,
  });

  const salt = Math.floor(Math.random() * 1000000).toString();

  const calls = useMemo(() => {

    if (!userAddress || !factoryContract || !ipfsUrl) return undefined;
    return [factoryContract.populateTransaction['setup_org'](formData.token, salt, userAddress, formData.organization, ipfsUrl, formData.first_admin_fname, formData.first_admin_lname, formData.first_admin_alias, formData.organization_type)];

  }, [factoryContract, userAddress, ipfsUrl]);

  const { sendAsync, isSuccess, error, } = useSendTransaction({
    calls
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    // Helper function to validate URL format
    const isValidUrl = (url: string): boolean => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    switch (step) {
      case 1:
        if (!formData.organization.trim()) newErrors.organization = "Organization name is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";

        // Validate optional website field if provided
        if (formData.website && formData.website.trim() !== "" && !isValidUrl(formData.website)) {
          newErrors.website = "Please enter a valid website URL";
        }
        break;

      case 2:
        // Validate optional social contacts if provided
        if (formData.socialContacts.length > 0) {
          for (let i = 0; i < formData.socialContacts.length; i++) {
            const contact = formData.socialContacts[i];
            if (contact.platform && !contact.handle.trim()) {
              newErrors.socialContacts = `Handle is required for ${contact.platform}`;
              break;
            }
            if (contact.handle && !contact.platform.trim()) {
              newErrors.socialContacts = "Platform is required when handle is provided";
              break;
            }
          }
        }

        // Validate optional logo URI if provided
        if (formData.logoUri && formData.logoUri.trim() !== "" && !isValidUrl(formData.logoUri)) {
          newErrors.logoUri = "Please enter a valid logo URL";
        }

        // Validate optional legal document URL if provided
        if (formData.legalDocument && formData.legalDocument.trim() !== "" && !isValidUrl(formData.legalDocument)) {
          newErrors.legalDocument = "Please enter a valid legal document URL";
        }
        break;

      case 3:
        if (!formData.first_admin_fname.trim()) newErrors.first_admin_fname = "First name is required";
        if (!formData.first_admin_lname.trim()) newErrors.first_admin_lname = "Last name is required";
        if (!formData.first_admin_alias.trim()) newErrors.first_admin_alias = "Admin alias is required";
        if (!userAddress) newErrors.adminWallet = "Admin wallet address is required";
        break;

      case 4:
        if (!formData.token) newErrors.token = "Please select a token";
        if (!formData.organization_type || formData.organization_type < 1) newErrors.organization_type = "Organization type is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(currentStep) || !isConnected || !userAddress || !factoryContract || !userAddress) {
      if (!isConnected) {
        alert("Please connect your wallet first");
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Prepare metadata for IPFS
      const metadata: OrganizationMetadata = {
        name: formData.organization,
        description: formData.description,
        website: formData.website || undefined,
        socialContacts: formData.socialContacts,
        logoUri: formData.logoUri || undefined,
        legalDocument: formData.legalDocument || undefined,
        adminFirstName: formData.first_admin_fname,
        adminLastName: formData.first_admin_lname,
        adminAlias: formData.first_admin_alias,
        adminWallet: userAddress,
        token: formData.token,
        organizationType: formData.organization_type,
        createdAt: new Date().toISOString(),
        version: "1.0",
      };

      // 2. Upload to Pinata
      console.log("Uploading metadata to IPFS...");
      const uploadedIpfsUrl = await pinataService.uploadMetadata(metadata);
      setIpfsUrl(uploadedIpfsUrl);
      console.log("IPFS URL:", uploadedIpfsUrl);

      // 3. Deploy contract
      console.log("Deploying organization contract...");

      await sendAsync();

      if (isSuccess) {
        console.log("Organization deployed successfully");
        toast({
          title: "Organization created successfully",
          description: "You can now access your organization dashboard",
        });

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        console.log("Organization deployment failed:", error);
        toast({
          title: "Failed to create organization",
          description: "Please try again" + error,
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error("Error creating organization:", error);
      toast({
        title: "Failed to create organization",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <div className="relative group">
                <input
                  name="organization"
                  placeholder="Organization Name"
                  value={formData.organization}
                  onChange={(e) => handleInputChange("organization", e.target.value)}
                  className="w-full bg-[#FFFFFF1A] opacity-50 border border-white text-white p-3 rounded-lg outline-none h-[64px] focus:bg-[#333333] transition-colors"
                />
                <div className="absolute bottom-3 left-3 right-3 h-0.5 bg-gray-600 group-focus-within:bg-[#FF9B28] transition-colors"></div>
              </div>
              {errors.organization && <p className="text-red-500 text-sm mt-1">{errors.organization}</p>}
            </div>

            <div>
              <div className="relative group">
                <textarea
                  name="description"
                  placeholder="Organization Description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="w-full bg-[#FFFFFF1A] opacity-50 border border-white text-white p-3 rounded-lg outline-none h-[100px] focus:bg-[#333333] transition-colors resize-none"
                />
                <div className="absolute bottom-3 left-3 right-3 h-0.5 bg-gray-600 group-focus-within:bg-[#FF9B28] transition-colors"></div>
              </div>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <input
                name="website"
                placeholder="Organization Website (Optional)"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="w-full bg-[#FFFFFF1A] opacity-50 border border-white text-white p-3 rounded-lg outline-none h-[64px] focus:bg-[#333333] transition-colors"
              />
              {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <DynamicSocialContacts
              socialContacts={formData.socialContacts}
              setSocialContacts={(contacts) => handleInputChange("socialContacts", contacts)}
              error={errors.socialContacts}
            />

            <URLInputWithPreview
              id="logoUri"
              label="Logo"
              placeholder="Logo URL (Optional)"
              value={formData.logoUri}
              onChange={(value) => handleInputChange("logoUri", value)}
              error={errors.logoUri}
            />

            <URLInputWithPreview
              id="legalDocument"
              label="Legal Document"
              placeholder="Legal Document URL (Optional)"
              value={formData.legalDocument}
              onChange={(value) => handleInputChange("legalDocument", value)}
              error={errors.legalDocument}
            />

          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <div className="relative group">
                <input
                  name="first_admin_fname"
                  placeholder="Admin First Name"
                  value={formData.first_admin_fname}
                  onChange={(e) => handleInputChange("first_admin_fname", e.target.value)}
                  className="w-full bg-[#FFFFFF1A] opacity-50 border border-white text-white p-3 rounded-lg outline-none h-[64px] focus:bg-[#333333] transition-colors"
                />
                <div className="absolute bottom-3 left-3 right-3 h-0.5 bg-gray-600 group-focus-within:bg-[#FF9B28] transition-colors"></div>
              </div>
              {errors.first_admin_fname && <p className="text-red-500 text-sm mt-1">{errors.first_admin_fname}</p>}
            </div>

            <div>
              <div className="relative group">
                <input
                  name="first_admin_lname"
                  placeholder="Admin Last Name"
                  value={formData.first_admin_lname}
                  onChange={(e) => handleInputChange("first_admin_lname", e.target.value)}
                  className="w-full bg-[#FFFFFF1A] opacity-50 border border-white text-white p-3 rounded-lg outline-none h-[64px] focus:bg-[#333333] transition-colors"
                />
                <div className="absolute bottom-3 left-3 right-3 h-0.5 bg-gray-600 group-focus-within:bg-[#FF9B28] transition-colors"></div>
              </div>
              {errors.first_admin_lname && <p className="text-red-500 text-sm mt-1">{errors.first_admin_lname}</p>}
            </div>

            <div>
              <div className="relative group">
                <input
                  name="first_admin_alias"
                  placeholder="Admin Alias"
                  value={formData.first_admin_alias}
                  onChange={(e) => handleInputChange("first_admin_alias", e.target.value)}
                  className="w-full bg-[#FFFFFF1A] opacity-50 border border-white text-white p-3 rounded-lg outline-none h-[64px] focus:bg-[#333333] transition-colors"
                />
                <div className="absolute bottom-3 left-3 right-3 h-0.5 bg-gray-600 group-focus-within:bg-[#FF9B28] transition-colors"></div>
              </div>
              {errors.first_admin_alias && <p className="text-red-500 text-sm mt-1">{errors.first_admin_alias}</p>}
            </div>

            <div>
              <div className="relative group">
                <input
                  name="adminWallet"
                  placeholder="Admin Wallet Address"
                  value={userAddress}
                  disabled
                  className="w-full bg-[#FFFFFF1A] opacity-50 border border-white text-white p-3 rounded-lg outline-none h-[64px] focus:bg-[#333333] transition-colors"
                />
                <div className="absolute bottom-3 left-3 right-3 h-0.5 bg-gray-600 group-focus-within:bg-[#FF9B28] transition-colors"></div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <div className="relative group">
                <select
                  name="token"
                  value={formData.token}
                  onChange={(e) => handleInputChange("token", e.target.value)}
                  className="w-full bg-[#FFFFFF1A] opacity-50 border border-white text-white p-3 pt-8 pb-3 rounded-lg outline-none h-[64px] text-sm focus:bg-[#333333] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select Token</option>
                  {TOKEN_OPTIONS.map((token) => (
                    <option key={token.value} value={token.value}>{token.label}</option>
                  ))}
                </select>
                <label className="absolute top-2 left-3 text-xs text-gray-400 pointer-events-none">Token</label>
                <div className="absolute top-7 left-3 right-3 h-0.5 bg-gray-600 group-focus-within:bg-[#FF9B28] transition-colors"></div>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none mt-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.token && <p className="text-red-500 text-sm mt-1">{errors.token}</p>}
            </div>

            <div>
              <div className="relative group">
                <input
                  name="organization_type"
                  placeholder="Organization Type"
                  value={formData.organization_type}
                  onChange={(e) => handleInputChange("organization_type", parseInt(e.target.value) || 0)}
                  className="w-full bg-[#FFFFFF1A] opacity-50 border border-white text-white p-3 rounded-lg outline-none h-[64px] focus:bg-[#333333] transition-colors"
                />
                <div className="absolute bottom-3 left-3 right-3 h-0.5 bg-gray-600 group-focus-within:bg-[#FF9B28] transition-colors"></div>
              </div>
              {errors.organization_type && <p className="text-red-500 text-sm mt-1">{errors.organization_type}</p>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };


  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#070602] overflow-hidden">
      <Image
        src={backgroundImage}
        alt="background"
        objectFit="cover"
        className="absolute"
      />
      <div
        className="relative z-10 p-10 rounded-2xl w-full max-w-2xl shadow-lg"
        style={{
          background: `linear-gradient(to left, #FF9B28 0%, #8B4513 0%, #070602 50%, #070602 100%)`,
        }}
      >
        {!isConnected || !userAddress ? (
          <div className="flex items-center justify-center min-h-[400px] p-6">
            <Card className="max-w-md w-full bg-[#131313A6] border-[#967623] rounded-3xl">
              <CardContent className="p-8 flex flex-col items-center justify-center">
                <div className="flex justify-center mb-4">
                  <Wallet className="w-16 h-16  text-[#967623]" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  Connect Your Wallet
                </h3>

                <p className="text-gray-400 mb-6">
                  Please connect your wallet to register a organization
                </p>

                <ConnectWallet />
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <Image src={logo} alt="Logo" width={100} height={100} />
            </div>

            <h2 className="text-2xl font-semibold text-center text-white sm:text-4xl sm:font-bold mb-3">
              Register Organization
            </h2>

            <p className="text-lg text-center text-white mb-8">
              Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1]?.title}
            </p>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                {STEPS.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${step.id <= currentStep
                      ? "bg-[#FF9B28] text-white"
                      : "bg-gray-600 text-gray-300"
                      }`}
                  >
                    {step.id}
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className="bg-[#FF9B28] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {renderStepContent()}

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-full font-medium ${currentStep === 1
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                    } transition-colors`}
                >
                  Previous
                </button>

                {currentStep < STEPS.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-600 text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !isConnected}
                    className={`px-6 py-3 rounded-full font-medium transition-opacity ${isSubmitting || !isConnected
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-yellow-600 to-yellow-600 text-white hover:opacity-90"
                      }`}
                  >
                    {isSubmitting ? "Creating..." : "Create Organization"}
                  </button>
                )}
              </div>
            </form>

          </>
        )}
      </div>
    </div>
  );
};

export default Register;
