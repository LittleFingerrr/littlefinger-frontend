"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import backgroundImage from "../../../public/registerBackgroundImg.png";

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
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="relative min-h-screen ov flex items-center justify-center bg-[#070602] overflow-hidden">
      <Image
        src={backgroundImage}
        alt="background"
        layout="fill"
        objectFit="cover"
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
                  <option value="ETH">ETH</option>
                  <option value="DAI">STRK</option>
                  <option value="USDT">USDT</option>
                  <option value="USDT">USDC</option>
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

          <button
            type="submit"
            className=" flex justify-end float-end rounded-full  bg-gradient-to-r from-yellow-600 to-yellow-600 text-white px-10 py-3 py  mt-5 hover:opacity-90"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
