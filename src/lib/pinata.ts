"use client"

export interface PinataConfig {
  apiKey: string
  apiSecret: string
  jwt: string
}

export interface OrganizationMetadata {
  name: string
  description: string
  email: string
  adminName: string
  createdAt: string
  version: "1.0"
}

export class PinataService {
  private config: PinataConfig

  constructor(config: PinataConfig) {
    this.config = config
  }

  async uploadMetadata(metadata: OrganizationMetadata): Promise<string> {
    try {
      const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: this.config.apiKey,
          pinata_secret_api_key: this.config.apiSecret,
          Authorization: `Bearer ${this.config.jwt}`,
        },
        body: JSON.stringify({
          pinataContent: metadata,
          pinataMetadata: {
            name: `${metadata.name}-organization-metadata`,
            keyvalues: {
              organization: metadata.name,
              type: "organization-metadata",
            },
          },
          pinataOptions: {
            cidVersion: 1,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`Pinata upload failed: ${response.statusText}`)
      }

      const result = await response.json()
      return `ipfs://${result.IpfsHash}`
    } catch (error) {
      console.error("Error uploading to Pinata:", error)
      throw error
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch("https://api.pinata.cloud/data/testAuthentication", {
        method: "GET",
        headers: {
          pinata_api_key: this.config.apiKey,
          pinata_secret_api_key: this.config.apiSecret,
          Authorization: `Bearer ${this.config.jwt}`,
        },
      })

      return response.ok
    } catch (error) {
      console.error("Pinata connection test failed:", error)
      return false
    }
  }
}

// Initialize Pinata service
export const pinataService = new PinataService({
  apiKey: process.env.NEXT_PUBLIC_PINATA_API_KEY || "",
  apiSecret: process.env.NEXT_PUBLIC_PINATA_API_SECRET || "",
  jwt: process.env.NEXT_PUBLIC_PINATA_JWT || "",
})
