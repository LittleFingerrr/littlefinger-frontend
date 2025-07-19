"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
// import { WalletButton } from "@/components/wallet-button"
import { useRouter } from "next/navigation"
import { useAccount, useContract, useSendTransaction } from "@starknet-react/core"
import { WalletButton } from "./wallet-button"
import { z } from 'zod'
import { OrganizationMetadata, pinataService } from "@/lib/pinata"
import { FACTORYABI } from "@/lib/abi/factory-abi"
import { LITTLEFINGER_FACTORY_ADDRESS, STARKGATE_STRK_ADDRESS } from "@/lib/constants"
import { byteArray, CairoOption, CairoOptionVariant, CallData } from "starknet"
import { contractAddressToHex } from "@/lib/utils"

export function RegistrationForm() {
  const { push } = useRouter()
  const [formData, setFormData] = useState({
    organizationName: "",
    email: "",
    adminFirstName: "",
    description: "",
    adminLastName: "",
    adminAlias: "",
    // owner: "",
    // token: "",
    // ipfsUrl: "",
    // availableFunds: "",
    // bonusAllocation: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const {
    address: user, isConnected
  } = useAccount()

  const { contract } = useContract({
    abi: FACTORYABI,
    address: LITTLEFINGER_FACTORY_ADDRESS
  })

  // console.log(contract);

  const salt = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));

  const calls = useMemo(() => {
    const inputIsValid = formData.organizationName !== "" && formData.email !== "" && formData.adminFirstName !== "" && formData.description !== "" 
                          && formData.adminLastName !== "" && formData.adminAlias !== "";

    if (!inputIsValid || !contract || !user) return;

    return [
      contract?.populate("setup_org",
        [
          0, 
          0, 
          STARKGATE_STRK_ADDRESS,
          salt,
          user,
          formData.organizationName,
          'ipfs_url',
          formData.adminFirstName,
          formData.adminLastName,
          formData.adminAlias,
          0
        ])
    ]
  }, [
    formData.organizationName, 
    formData.adminAlias, formData.adminFirstName, 
    formData.adminLastName, formData.description,
    formData.email,
  ])

  const {
    sendAsync, data, isPending, isError, error
  } = useSendTransaction({
    calls
  })

  const deployOrg = async () => {
    if (!isConnected) {
      alert("Please connect your wallet to continue")
      return
    }

    setIsSubmitting(true)

    console.log('Hit the ground running')
    try {
      console.log('Keep running and trying')
      const returns = await sendAsync();
      console.log(returns);
      localStorage.setItem("organizationName", formData.organizationName);
      push('/dashboard');

      // // Redirect to dashboard
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting the form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-8">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">LittleFinger</h1>
          {/* <Button>
            Connect Wallet
          </Button> */}
          <WalletButton />
        </div>

        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Organization Registration</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="organizationName">Organization Name</Label>
                <Input
                  id="organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Organization Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminFirstName">Admin First Name</Label>
                <Input id="adminFirstName" name="adminFirstName" value={formData.adminFirstName} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminLastName">Admin Last Name</Label>
                <Input id="adminLastName" name="adminLastName" value={formData.adminLastName} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminAlias">Admin Alias</Label>
                <Input id="adminAlias" name="adminAlias" value={formData.adminAlias} onChange={handleChange} required />
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="owner">Owner</Label>
                <Input id="owner" name="owner" value={formData.owner} onChange={handleChange} required />
              </div> */}

              {/* <div className="space-y-2">
                <Label htmlFor="token">Token</Label>
                <Input id="token" name="token" value={formData.token} onChange={handleChange} required />
              </div> */}

              {/* <div className="space-y-2">
                <Label htmlFor="ipfsUrl">IPFS URL</Label>
                <Input id="ipfsUrl" name="ipfsUrl" value={formData.ipfsUrl} onChange={handleChange} required />
              </div> */}

              { /*<div className="space-y-2">
                <Label htmlFor="availableFunds">Available Funds</Label>
                <Input id="availableFunds" name="availableFunds" value={formData.availableFunds} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bonusAllocation">Bonus Allocation</Label>
                <Input id="bonusAllocation" name="bonusAllocation" value={formData.bonusAllocation} onChange={handleChange} required />
              </div> */}

    
              <Button
                type="submit"
                className="w-full bg-slate-300 hover:bg-slate-400 text-slate-800"
                disabled={!isConnected || isSubmitting}
                onClick={deployOrg}
              >
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </Button>

              {!isConnected && (
                <p className="text-center text-sm text-muted-foreground mt-2">Please connect your wallet to continue</p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
