"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import backgroundImage from "../../../public/registerBackgroundImg.png";
import { useAccount, useContract, useSendTransaction } from "@starknet-react/core";
import { LITTLEFINGER_FACTORY_ADDRESS, STARKGATE_STRK_ADDRESS, STARKGATE_ETH_ADDRESS, STARKGATE_USDC_ADDRESS, STARKGATE_USDT_ADDRESS } from "@/lib/constants";
import { FACTORYABI } from "@/lib/abi/factory-abi";
import { getUint256FromDecimal } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ConnectWallet } from "@/components/connect-wallet";

const Register = () => {
  const [formData, setFormData] = useState({
    organization: "",
    description: "",
    adminAlias: "",
    adminWallet: "",
    token: "",
  });

  const [errors, setErrors] = useState({
    organization: "",
    description: "",
    adminAlias: "",
    adminWallet: "",
    token: "",
    submit: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  // Use available hooks
  const { address: user, status, isConnected } = useAccount();
  
  const { contract } = useContract({
    abi: FACTORYABI,
    address: LITTLEFINGER_FACTORY_ADDRESS
  });

  // Generate random salt
  const salt = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));

  // Prepare contract calls
  const calls = useMemo(() => {
    const inputIsValid = formData.organization !== "" &&
      formData.description !== "" &&
      formData.adminAlias !== "" &&
      formData.adminWallet !== "" &&
      formData.token !== ""; // ensure token is selected

    if (!inputIsValid || !contract || !user) return;

    return [
      contract.populate("setup_org", [
        getUint256FromDecimal("0"), // available_funds (dummy)
        getUint256FromDecimal("0"), // starting_bonus_allocation (dummy)
        formData.token, // always a valid address
        salt,
        formData.adminWallet || user,
        formData.organization,
        "",
        "",
        "",
        formData.adminAlias,
      ])
    ];
  }, [
    formData.organization,
    formData.description,
    formData.adminAlias,
    formData.adminWallet,
    formData.token,
    contract,
    user,
    salt
  ]);

  const {
    sendAsync,
    isPending,
    isError,
    error
  } = useSendTransaction({
    calls
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {
      organization: formData.organization
        ? ""
        : "Organization Name is required",
      description: formData.description ? "" : "Description is required",
      adminAlias: formData.adminAlias ? "" : "Admin Alias is required",
      adminWallet: formData.adminWallet
        ? ""
        : "Admin Wallet Address is required",
      token: formData.token ? "" : "Please select a token",
      submit: "",
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    // Check if wallet is connected
    if (!isConnected) {
      setErrors((prev) => ({ ...prev, submit: "Please connect your wallet first." }));
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('Starting organization deployment...');
      const result = await sendAsync();
      console.log('Deployment result:', result);
      
      // Store organization name in localStorage for future use
      localStorage.setItem("organizationName", formData.organization);
      
      // On success, redirect to dashboard
      router.push("/organization/dashboard");
    } catch (err) {
      console.error("Registration error:", err);
      setErrors((prev) => ({ ...prev, submit: "Registration failed. Please try again." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen ov flex items-center justify-center bg-[#070602] overflow-hidden">
      <Image
        src={backgroundImage}
        alt="background"
        fill
        style={{ objectFit: "cover" }}
        className="absolute"
      />

      <div
        className="relative z-10 p-10 rounded-2xl w-full max-w-md md:max-w-lg shadow-lg"
        style={{
          background: `linear-gradient(to left, #FF9B28 0%, #8B4513 0%, #070602 50%, #070602 100%)`,
        }}
      >
        <div className="flex justify-center mb-6">
          <Image src={logo} alt="Logo" width={100} height={100} />
        </div>
        <div className="flex justify-center mb-6">
          <ConnectWallet />
        </div>
        <h2 className="text-2xl font-semibold text-center text-white sm:text-4xl sm:font-bold mb-3">
          Welcome User
        </h2>
        <p className="text-lg text-center text-white mb-6">
          please enter your details to sign in
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="space-y-2">
              <div className="relative group">
                <input
                  name="organization"
                  placeholder="Organization Name"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full bg-[#FFFFFF1A] opacity-50 border border-white text-white p-3 rounded-lg outline-none h-[64px] focus:bg-[#333333] transition-colors"
                />
                <div className="absolute bottom-3 left-3 right-3 h-0.5 bg-gray-600 group-focus-within:bg-[#FF9B28] transition-colors"></div>
              </div>
            </div>
            {errors.organization && (
              <p className="text-red-500 text-sm">{errors.organization}</p>
            )}
          </div>

          <div>
            <div className="space-y-2">
              <div className="relative group">
                <input
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-[#FFFFFF1A] opacity-50 border border-white  text-white p-3 rounded-lg outline-none h-[64px] focus:bg-[#333333] transition-colors"
                />
                <div className="absolute bottom-3 left-3 right-3 h-0.5 bg-gray-600 group-focus-within:bg-[#FF9B28] transition-colors"></div>
              </div>
            </div>

            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          <div>
            <div className="space-y-2">
              <div className="relative group">
                <input
                  name="adminAlias"
                  placeholder="Admin Alias"
                  value={formData.adminAlias}
                  onChange={handleChange}
                  className="w-full bg-[#FFFFFF1A] opacity-50 border border-white text-white p-3 rounded-lg outline-none h-[64px] focus:bg-[#333333] transition-colors"
                />
                <div className="absolute bottom-3 left-3 right-3 h-0.5 bg-gray-600 group-focus-within:bg-[#FF9B28] transition-colors"></div>
              </div>
            </div>

            {errors.adminAlias && (
              <p className="text-red-500 text-sm">{errors.adminAlias}</p>
            )}
          </div>

          <div>
            <div className="space-y-2 text-white">
              <div className="relative group">
                <input
                  name="adminWallet"
                  placeholder="Admin Wallet Address"
                  value={formData.adminWallet}
                  onChange={handleChange}
                  className="w-full bg-[#FFFFFF1A] opacity-50 border border-white text-white  p-3 rounded-lg  h-[64px] focus:bg-[#333333] focus:text-white outline-none transition-colors"
                />
                <div className="absolute bottom-3 left-3 right-3 h-0.5 bg-gray-600 group-focus-within:bg-[#FF9B28] transition-colors"></div>
              </div>
            </div>

            {errors.adminWallet && (
              <p className="text-red-500 text-sm">{errors.adminWallet}</p>
            )}
          </div>

          <div>
            <div className="space-y-2">
              <div className="relative group ">
                <select
                  name="token"
                  value={formData.token}
                  onChange={handleChange}
                  className="w-full bg-[#FFFFFF1A] opacity-50 border border-white text-white p-3 pt-8 pb-3 rounded-lg outline-none h-[64px] text-sm focus:bg-[#333333] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select Token</option>
                  <option value={STARKGATE_ETH_ADDRESS}>ETH</option>
                  <option value={STARKGATE_USDC_ADDRESS}>USDC</option>
                  <option value={STARKGATE_USDT_ADDRESS}>USDT</option>
                </select>

                <label
                  htmlFor="token"
                  className="absolute top-2 left-3 text-xs text-gray-400 pointer-events-none"
                >
                  Token
                </label>

                <div className="absolute top-7 left-3 right-3 h-0.5 bg-gray-600 group-focus-within:bg-[#FF9B28 transition-colors"></div>

                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none mt-2">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {errors.token && (
              <p className="text-red-500 text-sm">{errors.token}</p>
            )}
          </div>

          {errors.submit && (
            <p className="text-red-500 text-sm">{errors.submit}</p>
          )}
          
          {isError && error && (
            <p className="text-red-500 text-sm">Transaction failed: {error.message}</p>
          )}
          <button
            type="submit"
            className=" flex justify-end float-end rounded-full  bg-gradient-to-r from-yellow-600 to-yellow-600 text-white px-10 py-3 py  mt-5 hover:opacity-90"
            disabled={!isConnected || isSubmitting || isPending}
          >
            {isSubmitting || isPending ? "Registering..." : "Continue"}
          </button>

          {!isConnected && (
            <p className="text-center text-sm text-muted-foreground mt-2">Please connect your wallet to continue</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
