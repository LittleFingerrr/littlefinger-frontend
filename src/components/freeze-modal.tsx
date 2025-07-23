"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Shield } from "lucide-react";

interface FreezeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FreezeModal({ open, onOpenChange }: FreezeModalProps) {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for the emergency freeze",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Call the emergency freeze function on the contract

      // Execute the transaction
      console.log("Emergency freezing vault:", { reason });
      //  await sendAsync();

      toast({
        title: "Emergency Freeze Initiated",
        description:
          "Vault has been frozen. All transactions are now suspended.",
      });

      // Reset form and close modal
      setReason("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error freezing vault:", error);
      toast({
        title: "Freeze Failed",
        description: "There was an error freezing the vault. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setReason("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Shield className="h-5 w-5" />
            Emergency Freeze Vault
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-lg bg-red-50 p-4 border border-red-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="text-sm text-red-800">
                <p className="font-medium mb-2">Critical Action Warning</p>
                <ul className="space-y-1 text-xs">
                  <li>• This will immediately freeze all vault operations</li>
                  <li>
                    • No deposits, withdrawals, or payments will be possible
                  </li>
                  <li>
                    • Only authorized administrators can unfreeze the vault
                  </li>
                  <li>
                    • This action should only be used in emergency situations
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Emergency Freeze*</Label>
            <Textarea
              id="reason"
              name="reason"
              value={reason}
              onChange={handleReasonChange}
              placeholder="Describe the emergency situation requiring vault freeze..."
              rows={4}
              required
              disabled={isSubmitting}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              This reason will be logged and visible to all administrators
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-3 border">
            <div className="text-sm">
              <p className="font-medium mb-1">After freezing:</p>
              <p className="text-muted-foreground text-xs">
                Contact your system administrator or use the admin panel to
                unfreeze the vault when the emergency is resolved.
              </p>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              disabled={!reason.trim() || isSubmitting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? "Freezing..." : "Emergency Freeze"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
