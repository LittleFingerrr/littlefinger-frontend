'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useAccount, useReadContract } from "@starknet-react/core"
import { FACTORYABI } from "@/lib/abi/factory-abi"
import { LITTLEFINGER_FACTORY_ADDRESS } from "@/lib/constants"
import { COREABI } from "@/lib/abi/core-abi"
import { contractAddressToHex } from "@/lib/utils"

export default function SettingsPage() {

  const { address: user } = useAccount();

  const { data: ContractAddresses } = useReadContract(
    user
      ? {
          abi: FACTORYABI,
          address: LITTLEFINGER_FACTORY_ADDRESS,
          functionName: "get_vault_org_pair",
          args: [user!],
          watch: true,
        }
      : ({} as any),
  )

  const { data: Org_Info, isLoading: OrgInfoLoading } = useReadContract({
    abi: COREABI,
    address: contractAddressToHex(ContractAddresses?.[0]),
    functionName: "get_organization_details",
    args: [],
    watch: true
  })
  
  console.log(Org_Info);
  
  const organizationName = Org_Info?.name;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your organization settings and preferences.</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Information</CardTitle>
              <CardDescription>Update your organization details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input id="org-name" defaultValue={Org_Info?.name} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="org-email">Email Address</Label>
                <Input id="org-email" type="email" defaultValue={`admin@${Org_Info?.name.toLowerCase()}.com`} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="org-description">Organization Description</Label>
                <Input id="org-description" defaultValue={"Leading provider of digital solutions"} />
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>Customize your dashboard appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable dark mode for the interface</p>
                </div>
                <Switch id="dark-mode" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="compact-view">Compact View</Label>
                  <p className="text-sm text-muted-foreground">Display more information in less space</p>
                </div>
                <Switch id="compact-view" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notif">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch id="email-notif" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="disbursement-notif">Disbursement Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about upcoming and completed disbursements
                  </p>
                </div>
                <Switch id="disbursement-notif" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="member-notif">Member Updates</Label>
                  <p className="text-sm text-muted-foreground">Get notified about member changes</p>
                </div>
                <Switch id="member-notif" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="wallet-address">Connected Wallet</Label>
                <div className="flex items-center">
                  <Input id="wallet-address" readOnly value={user} className="bg-muted" />
                  <Button variant="outline" className="ml-2">
                    Disconnect
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Your currently connected wallet address</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch id="two-factor" />
              </div>

              <Button variant="destructive" className="mt-4">
                Delete Organization
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="gas-limit">Default Gas Limit</Label>
                <Input id="gas-limit" defaultValue="300000" />
                <p className="text-sm text-muted-foreground">Maximum gas to use for transactions</p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="ipfs-gateway">IPFS Gateway</Label>
                <Input id="ipfs-gateway" defaultValue="https://ipfs.io/ipfs/" />
                <p className="text-sm text-muted-foreground">Gateway used for IPFS content</p>
              </div>

              <Button>Save Advanced Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
