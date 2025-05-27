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
import { LITTLEFINGER_FACTORY_ADDRESS } from "@/lib/constants"
import { byteArray, CairoOption, CairoOptionVariant, CallData } from "starknet"

export function RegistrationForm() {
  const { isConnected } = useAccount()
  const router = useRouter()
  const [formData, setFormData] = useState({
    organizationName: "",
    email: "",
    adminFirstName: "",
    description: "",
    adminLastName: "",
    adminAlias: "",
    owner: "",
    token: "",
    ipfsUrl: "",
    availableFunds: "",
    bonusAllocation: ""
  });

  // const orgRegistrationSchema = z.object({
  //   orgName: z.string().min(1, "Name cannot be empty"),
  //   description: z.string().min(10, "Must be more than 10 characters"),
  //   email: z.string().email('Invalid email format'),
  //   firstAdminName: z.string().min(1, "Cannot be empty"),
  //   firstAdminLastName: z.string().min(1, 'Cannot be empty'),
  //   firstAdminAlias: z.string().min(1, "Cannot be empty"),
  //   owner: z.string().optional(),
  //   token: z.string().min(1, "Cannot be empty"),
  //   ipfsUrl: z.string().min(1, "Cannot be empty"),
  //   availableFunds: z.number(),
  //   bonusAllocation: z.number(),
  // })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const {
    address: user
  } = useAccount()

  console.log(user)

  const { contract } = useContract({
    abi: FACTORYABI,
    address: LITTLEFINGER_FACTORY_ADDRESS
  })

  // console.log(contract);

  const salt = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));

  const calls = useMemo(() => {
    const inputIsValid = formData.organizationName !== "" && formData.email !== "" && formData.adminFirstName !== "" && formData.description !== "" 
                          && formData.adminLastName !== "" && formData.adminAlias !== "" && formData.owner !== "" && formData.token !== ""
                          && formData.ipfsUrl !== "" && formData.availableFunds !== "" && Number(formData.availableFunds) !== null
                          && Number(formData.bonusAllocation) !== null

    if (!inputIsValid || !contract || !user) return;

    return [
      contract?.populate("setup_org",
        [
          Number(formData.availableFunds), 
          Number(formData.bonusAllocation), 
          formData.token,
          salt,
          user,
          formData.organizationName,
          formData.ipfsUrl,
          formData.adminFirstName,
          formData.adminLastName,
          formData.adminAlias
        ])
    ]
  }, [
    formData.organizationName, 
    formData.adminAlias, formData.adminFirstName, 
    formData.adminLastName, formData.availableFunds,
    formData.bonusAllocation, formData.description,
    formData.email, formData.ipfsUrl,
    formData.owner, formData.token
  ])

  console.log(calls);

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
    // try {
    //   // In a real app, you would submit this data to your backend or smart contract
    //   console.log("Form submitted:", formData)

    //   const metadata: OrganizationMetadata = {
    //     name: formData.organizationName,
    //     description: formData.description,
    //     email: formData.email,
    //     adminName: `${formData.adminFirstName} ${formData.adminLastName}`,
    //     createdAt: new Date().toISOString(),
    //     version: "1.0"
    //   };

    //   console.log("Uploading data to Pinata...")
    //   const ipfsUrl = await pinataService.uploadMetadata(metadata);
    //   console.log("Metadata uploaded to ", ipfsUrl);
    //   formData.ipfsUrl = ipfsUrl;   
    // } catch {

    // }

    console.log('Hit the ground running')
    try {
      console.log('Keep running and trying')
      const returns = await sendAsync();
      console.log(returns);
      localStorage.setItem("organizationName", formData.organizationName)

      // // Redirect to dashboard
      // router.push("/dashboard")
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting the form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
    // } catch (err) {
    //   console.log('Catching...', err)
    // } finally {
    //   setIsSubmitting(false)
    // }
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (!isConnected) {
  //     alert("Please connect your wallet to continue")
  //     return
  //   }

  //   setIsSubmitting(true)
  //   try {
  //     // In a real app, you would submit this data to your backend or smart contract
  //     console.log("Form submitted:", formData)

  //     const metadata: OrganizationMetadata = {
  //       name: formData.organizationName,
  //       description: formData.description,
  //       email: formData.email,
  //       adminName: `${formData.adminFirstName} ${formData.adminLastName}`,
  //       createdAt: new Date().toISOString(),
  //       version: "1.0"
  //     };

  //     console.log("Uploading data to Pinata...")
  //     const ipfsUrl = await pinataService.uploadMetadata(metadata);
  //     console.log("Metadata uploaded to ", ipfsUrl);
  //     formData.ipfsUrl = ipfsUrl;



  //     // // Simulate API call
  //     // await new Promise((resolve) => setTimeout(resolve, 1000))

  //     // // Store organization info in localStorage for demo purposes
  //     // localStorage.setItem("organizationName", formData.organizationName)

  //     // // Redirect to dashboard
  //     // router.push("/dashboard")
  //   } catch (error) {
  //     console.error("Error submitting form:", error)
  //     alert("There was an error submitting the form. Please try again.")
  //   } finally {
  //     setIsSubmitting(false)
  //   }
  // }

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

              <div className="space-y-2">
                <Label htmlFor="owner">Owner</Label>
                <Input id="owner" name="owner" value={formData.owner} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="token">Token</Label>
                <Input id="token" name="token" value={formData.token} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ipfsUrl">IPFS URL</Label>
                <Input id="ipfsUrl" name="ipfsUrl" value={formData.ipfsUrl} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availableFunds">Available Funds</Label>
                <Input id="availableFunds" name="availableFunds" value={formData.availableFunds} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bonusAllocation">Bonus Allocation</Label>
                <Input id="bonusAllocation" name="bonusAllocation" value={formData.bonusAllocation} onChange={handleChange} required />
              </div>

    
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
