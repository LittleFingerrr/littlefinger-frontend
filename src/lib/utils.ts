import { clsx, type ClassValue } from "clsx"
import { uint256 } from "starknet";
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

export function contractAddressToHex(addressValue: any): `0x${string}` {
  if (!addressValue) return "0x0" as `0x${string}`;
  
  let bigIntValue: bigint;
  
  // Handle different input types
  if (typeof addressValue === 'bigint') {
    bigIntValue = addressValue;
  } else if (typeof addressValue === 'number') {
    bigIntValue = BigInt(addressValue);
  } else if (typeof addressValue === 'string') {
    // If it's already a hex string, return as is (with proper formatting)
    if (addressValue.startsWith('0x')) {
      return addressValue.toLowerCase().padStart(66, '0') as `0x${string}`; // Ensure 64 chars after 0x
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
  
  return paddedHex as `0x${string}`;
}

export const timeStampToDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000)
    const dateString = date.toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
    })
    return dateString
}

export const getUint256FromDecimal = (decimalAmount: string) => {
  try {
    const amount = Number(decimalAmount)
    const multiplied = amount * Math.pow(10, 18)
    return uint256.bnToUint256(multiplied.toString())
  } catch (err) {
    throw new Error('Invalid amount format')
  }
}

export const shortenAddress = (address: string, length: number = 4): string => {
  if (!address) return '';
  return `${address.slice(0, length)}...${address.slice(-length)}`;
}

export function getTokenNameFromAddress(tokenAddress: string): string {
  // Common Starknet token addresses on Sepolia testnet
  const tokenAddresses: { [key: string]: string } = {
    // ETH (native token)
    '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7': 'ETH',
    // USDC
    '0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8': 'USDC',
    // USDT
    '0x068f5c6a61730768477ced7eef7680cb4349c890b1e3f42d9b5b1473e17706c3': 'USDT',
    // DAI
    '0x00da114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3': 'DAI',
    // STRK (Starknet token)
    '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d': 'STRK',
    // WBTC
    '0x03fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac': 'WBTC',
  };

  const normalizedAddress = tokenAddress.toLowerCase();
  
  if (tokenAddresses[normalizedAddress]) {
    return tokenAddresses[normalizedAddress];
  }
  //if no mapping found, return 
  return "none";
}