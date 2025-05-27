import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function felt252ToString(feltValue: any) {
  // Convert the Felt252 value to a hexadecimal string
  let hex = feltValue?.toString(16);

  // Add leading zeroes if the hex string length is not a multiple of 2
  if (hex?.length % 2 !== 0) hex = "0" + hex;

  // Convert the hex string to a readable ASCII string
  let result = "";
  for (let i = 0; i < hex?.length; i += 2) {
    const charCode = parseInt(hex.substr(i, 2), 16);
    result += String.fromCharCode(charCode);
  }

  return result;
}

export function contractAddressToHex(addressValue: any): string {
  if (!addressValue) return "0x0";
  
  let bigIntValue: bigint;
  
  // Handle different input types
  if (typeof addressValue === 'bigint') {
    bigIntValue = addressValue;
  } else if (typeof addressValue === 'number') {
    bigIntValue = BigInt(addressValue);
  } else if (typeof addressValue === 'string') {
    // If it's already a hex string, return as is (with proper formatting)
    if (addressValue.startsWith('0x')) {
      return addressValue.toLowerCase().padStart(66, '0'); // Ensure 64 chars after 0x
    }
    // If it's a decimal string, convert to BigInt
    bigIntValue = BigInt(addressValue);
  } else {
    // Handle objects that might have toString method or valueOf
    bigIntValue = BigInt(addressValue.toString());
  }
  
  // Convert to hex string
  let hexString = bigIntValue.toString(16);
  
  // Pad to 64 characters (32 bytes) and add 0x prefix
  const paddedHex = '0x' + hexString.padStart(64, '0');
  
  return paddedHex;
}