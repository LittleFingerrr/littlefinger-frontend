export const VAULTABI = [
  {
    "type": "impl",
    "name": "VaultImpl",
    "interface_name": "littlefinger::interfaces::ivault::IVault"
  },
  {
    "type": "struct",
    "name": "core::integer::u256",
    "members": [
      {
        "name": "low",
        "type": "core::integer::u128"
      },
      {
        "name": "high",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "type": "enum",
    "name": "core::bool",
    "variants": [
      {
        "name": "False",
        "type": "()"
      },
      {
        "name": "True",
        "type": "()"
      }
    ]
  },
  {
    "type": "interface",
    "name": "littlefinger::interfaces::ivault::IVault",
    "items": [
      {
        "type": "function",
        "name": "deposit_funds",
        "inputs": [
          {
            "name": "amount",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "withdraw_funds",
        "inputs": [
          {
            "name": "amount",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "emergency_freeze",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "unfreeze_vault",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "pay_member",
        "inputs": [
          {
            "name": "recipient",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "amount",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "get_balance",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_bonus_allocation",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "constructor",
    "name": "constructor",
    "inputs": [
      {
        "name": "token",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "available_funds",
        "type": "core::integer::u256"
      },
      {
        "name": "bonus_allocation",
        "type": "core::integer::u256"
      }
    ]
  },
  {
    "type": "event",
    "name": "littlefinger::contracts::vault::Vault::DepositSuccessful",
    "kind": "struct",
    "members": [
      {
        "name": "caller",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "token",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "amount",
        "type": "core::integer::u256",
        "kind": "data"
      },
      {
        "name": "timestamp",
        "type": "core::integer::u64",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "littlefinger::contracts::vault::Vault::WithdrawalSuccessful",
    "kind": "struct",
    "members": [
      {
        "name": "caller",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "token",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "amount",
        "type": "core::integer::u256",
        "kind": "data"
      },
      {
        "name": "timestamp",
        "type": "core::integer::u64",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "littlefinger::contracts::vault::Vault::VaultFrozen",
    "kind": "struct",
    "members": [
      {
        "name": "caller",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "timestamp",
        "type": "core::integer::u64",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "littlefinger::contracts::vault::Vault::VaultResumed",
    "kind": "struct",
    "members": [
      {
        "name": "caller",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "timestamp",
        "type": "core::integer::u64",
        "kind": "data"
      }
    ]
  },
  {
    "type": "enum",
    "name": "littlefinger::structs::vault_structs::TransactionType",
    "variants": [
      {
        "name": "DEPOSIT",
        "type": "()"
      },
      {
        "name": "WITHDRAWAL",
        "type": "()"
      }
    ]
  },
  {
    "type": "struct",
    "name": "littlefinger::structs::vault_structs::Transaction",
    "members": [
      {
        "name": "transaction_type",
        "type": "littlefinger::structs::vault_structs::TransactionType"
      },
      {
        "name": "token",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "amount",
        "type": "core::integer::u256"
      },
      {
        "name": "timestamp",
        "type": "core::integer::u64"
      },
      {
        "name": "tx_hash",
        "type": "core::felt252"
      },
      {
        "name": "caller",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "type": "event",
    "name": "littlefinger::contracts::vault::Vault::TransactionRecorded",
    "kind": "struct",
    "members": [
      {
        "name": "transaction_type",
        "type": "littlefinger::structs::vault_structs::TransactionType",
        "kind": "data"
      },
      {
        "name": "caller",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "transaction_details",
        "type": "littlefinger::structs::vault_structs::Transaction",
        "kind": "data"
      },
      {
        "name": "token",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "littlefinger::contracts::vault::Vault::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "DepositSuccessful",
        "type": "littlefinger::contracts::vault::Vault::DepositSuccessful",
        "kind": "nested"
      },
      {
        "name": "WithdrawalSuccessful",
        "type": "littlefinger::contracts::vault::Vault::WithdrawalSuccessful",
        "kind": "nested"
      },
      {
        "name": "VaultFrozen",
        "type": "littlefinger::contracts::vault::Vault::VaultFrozen",
        "kind": "nested"
      },
      {
        "name": "VaultResumed",
        "type": "littlefinger::contracts::vault::Vault::VaultResumed",
        "kind": "nested"
      },
      {
        "name": "TransactionRecorded",
        "type": "littlefinger::contracts::vault::Vault::TransactionRecorded",
        "kind": "nested"
      }
    ]
  }
] as const;