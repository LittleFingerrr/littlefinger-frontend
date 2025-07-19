export const VAULTABI = [
  {
    "name": "VaultImpl",
    "type": "impl",
    "interface_name": "littlefinger::interfaces::ivault::IVault"
  },
  {
    "name": "core::integer::u256",
    "type": "struct",
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
    "name": "littlefinger::structs::vault_structs::VaultStatus",
    "type": "enum",
    "variants": [
      {
        "name": "VAULTRESUMED",
        "type": "()"
      },
      {
        "name": "VAULTFROZEN",
        "type": "()"
      }
    ]
  },
  {
    "name": "littlefinger::structs::vault_structs::TransactionType",
    "type": "enum",
    "variants": [
      {
        "name": "DEPOSIT",
        "type": "()"
      },
      {
        "name": "WITHDRAWAL",
        "type": "()"
      },
      {
        "name": "PAYMENT",
        "type": "()"
      },
      {
        "name": "BONUS_ALLOCATION",
        "type": "()"
      }
    ]
  },
  {
    "name": "littlefinger::structs::vault_structs::Transaction",
    "type": "struct",
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
    "name": "littlefinger::interfaces::ivault::IVault",
    "type": "interface",
    "items": [
      {
        "name": "deposit_funds",
        "type": "function",
        "inputs": [
          {
            "name": "amount",
            "type": "core::integer::u256"
          },
          {
            "name": "address",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "withdraw_funds",
        "type": "function",
        "inputs": [
          {
            "name": "amount",
            "type": "core::integer::u256"
          },
          {
            "name": "address",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "emergency_freeze",
        "type": "function",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "unfreeze_vault",
        "type": "function",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "pay_member",
        "type": "function",
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
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "add_to_bonus_allocation",
        "type": "function",
        "inputs": [
          {
            "name": "amount",
            "type": "core::integer::u256"
          },
          {
            "name": "address",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_balance",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_vault_status",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "littlefinger::structs::vault_structs::VaultStatus"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_bonus_allocation",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_transaction_history",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::array::Array::<littlefinger::structs::vault_structs::Transaction>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "allow_org_core_address",
        "type": "function",
        "inputs": [
          {
            "name": "org_address",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "name": "OwnableMixinImpl",
    "type": "impl",
    "interface_name": "openzeppelin_access::ownable::interface::OwnableABI"
  },
  {
    "name": "openzeppelin_access::ownable::interface::OwnableABI",
    "type": "interface",
    "items": [
      {
        "name": "owner",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "transfer_ownership",
        "type": "function",
        "inputs": [
          {
            "name": "new_owner",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "renounce_ownership",
        "type": "function",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "transferOwnership",
        "type": "function",
        "inputs": [
          {
            "name": "newOwner",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "renounceOwnership",
        "type": "function",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "name": "constructor",
    "type": "constructor",
    "inputs": [
      {
        "name": "token",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "littlefinger::contracts::vault::Vault::DepositSuccessful",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "caller",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "token",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "amount",
        "type": "core::integer::u256"
      },
      {
        "kind": "data",
        "name": "timestamp",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "littlefinger::contracts::vault::Vault::WithdrawalSuccessful",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "caller",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "token",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "amount",
        "type": "core::integer::u256"
      },
      {
        "kind": "data",
        "name": "timestamp",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "littlefinger::contracts::vault::Vault::VaultFrozen",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "caller",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "timestamp",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "littlefinger::contracts::vault::Vault::VaultResumed",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "caller",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "timestamp",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "littlefinger::contracts::vault::Vault::TransactionRecorded",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "transaction_type",
        "type": "littlefinger::structs::vault_structs::TransactionType"
      },
      {
        "kind": "data",
        "name": "caller",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "transaction_details",
        "type": "littlefinger::structs::vault_structs::Transaction"
      },
      {
        "kind": "data",
        "name": "token",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "littlefinger::contracts::vault::Vault::BonusAllocation",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "amount",
        "type": "core::integer::u256"
      },
      {
        "kind": "data",
        "name": "timestamp",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
    "type": "event",
    "members": [
      {
        "kind": "key",
        "name": "previous_owner",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "key",
        "name": "new_owner",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
    "type": "event",
    "members": [
      {
        "kind": "key",
        "name": "previous_owner",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "key",
        "name": "new_owner",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "OwnershipTransferred",
        "type": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred"
      },
      {
        "kind": "nested",
        "name": "OwnershipTransferStarted",
        "type": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "class_hash",
        "type": "core::starknet::class_hash::ClassHash"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "Upgraded",
        "type": "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "littlefinger::contracts::vault::Vault::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "DepositSuccessful",
        "type": "littlefinger::contracts::vault::Vault::DepositSuccessful"
      },
      {
        "kind": "nested",
        "name": "WithdrawalSuccessful",
        "type": "littlefinger::contracts::vault::Vault::WithdrawalSuccessful"
      },
      {
        "kind": "nested",
        "name": "VaultFrozen",
        "type": "littlefinger::contracts::vault::Vault::VaultFrozen"
      },
      {
        "kind": "nested",
        "name": "VaultResumed",
        "type": "littlefinger::contracts::vault::Vault::VaultResumed"
      },
      {
        "kind": "nested",
        "name": "TransactionRecorded",
        "type": "littlefinger::contracts::vault::Vault::TransactionRecorded"
      },
      {
        "kind": "nested",
        "name": "BonusAllocation",
        "type": "littlefinger::contracts::vault::Vault::BonusAllocation"
      },
      {
        "kind": "flat",
        "name": "OwnableEvent",
        "type": "openzeppelin_access::ownable::ownable::OwnableComponent::Event"
      },
      {
        "kind": "flat",
        "name": "UpgradeableEvent",
        "type": "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event"
      }
    ]
  }
] as const;