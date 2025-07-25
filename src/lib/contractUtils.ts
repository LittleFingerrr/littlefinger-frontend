// src/app/(organization)/dashboard/contractUtils.ts

import { Provider, Contract, RpcProvider } from 'starknet';
import { LITTLEFINGER_FACTORY_ADDRESS } from '@/lib/constants';
import { FACTORYABI } from '@/lib/abi/factory-abi';

interface ContractPair {
  vaultAddress: string;
  orgCoreAddress: string;
}

const getProvider = () => {
  return new RpcProvider({ 
    nodeUrl: 'https://starknet-mainnet.public.blastapi.io' 
  });
};

export const fetchContractPairFromFactory = async (userAddress: string): Promise<ContractPair> => {
  try {
    const provider = getProvider();
    const factoryContract = new Contract(FACTORYABI, LITTLEFINGER_FACTORY_ADDRESS, provider);
    console.log('Fetching contract pair for address:', userAddress);
    console.log('Factory address:', LITTLEFINGER_FACTORY_ADDRESS);
    const result = await factoryContract.get_vault_org_pair(userAddress);
    console.log('Factory contract result:', result);
    const vaultAddress = result[0].toString();
    const orgCoreAddress = result[1].toString();
    console.log('Parsed addresses:', { vaultAddress, orgCoreAddress });
    if (vaultAddress === "0x0" || orgCoreAddress === "0x0" || vaultAddress === "0" || orgCoreAddress === "0") {
      throw new Error("No organization found for this address");
    }
    return {
      vaultAddress,
      orgCoreAddress
    };
  } catch (error) {
    console.error("Error fetching contract pair from factory:", error);
    if (error instanceof Error) {
      if (error.message.includes('Contract not found') || error.message.includes('Entry point not found')) {
        throw new Error("Factory contract not accessible");
      }
      throw new Error(`No organization found: ${error.message}`);
    }
    throw new Error("No organization found for this address");
  }
};

export const hasOrganization = async (userAddress: string): Promise<boolean> => {
  try {
    const contractPair = await fetchContractPairFromFactory(userAddress);
    return contractPair.vaultAddress !== "0x0" && contractPair.orgCoreAddress !== "0x0";
  } catch {
    return false;
  }
};