export const FACTORYABI = [
  {
    "name": "UpgradeableImpl",
    "type": "impl",
    "interface_name": "openzeppelin_upgrades::interface::IUpgradeable"
  },
  {
    "name": "openzeppelin_upgrades::interface::IUpgradeable",
    "type": "interface",
    "items": [
      {
        "name": "upgrade",
        "type": "function",
        "inputs": [
          {
            "name": "new_class_hash",
            "type": "core::starknet::class_hash::ClassHash"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "name": "FactoryImpl",
    "type": "impl",
    "interface_name": "littlefinger::interfaces::ifactory::IFactory"
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
    "name": "core::byte_array::ByteArray",
    "type": "struct",
    "members": [
      {
        "name": "data",
        "type": "core::array::Array::<core::bytes_31::bytes31>"
      },
      {
        "name": "pending_word",
        "type": "core::felt252"
      },
      {
        "name": "pending_word_len",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "name": "littlefinger::interfaces::ifactory::IFactory",
    "type": "interface",
    "items": [
      {
        "name": "setup_org",
        "type": "function",
        "inputs": [
          {
            "name": "available_funds",
            "type": "core::integer::u256"
          },
          {
            "name": "starting_bonus_allocation",
            "type": "core::integer::u256"
          },
          {
            "name": "token",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "salt",
            "type": "core::felt252"
          },
          {
            "name": "owner",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "name",
            "type": "core::byte_array::ByteArray"
          },
          {
            "name": "ipfs_url",
            "type": "core::byte_array::ByteArray"
          },
          {
            "name": "first_admin_fname",
            "type": "core::felt252"
          },
          {
            "name": "first_admin_lname",
            "type": "core::felt252"
          },
          {
            "name": "first_admin_alias",
            "type": "core::felt252"
          },
          {
            "name": "organization_type",
            "type": "core::integer::u8"
          }
        ],
        "outputs": [
          {
            "type": "(core::starknet::contract_address::ContractAddress, core::starknet::contract_address::ContractAddress)"
          }
        ],
        "state_mutability": "external"
      },
      {
        "name": "get_deployed_vaults",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::array::Array::<core::starknet::contract_address::ContractAddress>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_deployed_org_cores",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::array::Array::<core::starknet::contract_address::ContractAddress>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_vault_org_pair",
        "type": "function",
        "inputs": [
          {
            "name": "caller",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "(core::starknet::contract_address::ContractAddress, core::starknet::contract_address::ContractAddress)"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "update_vault_hash",
        "type": "function",
        "inputs": [
          {
            "name": "vault_hash",
            "type": "core::starknet::class_hash::ClassHash"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "update_core_hash",
        "type": "function",
        "inputs": [
          {
            "name": "core_hash",
            "type": "core::starknet::class_hash::ClassHash"
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
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "org_core_class_hash",
        "type": "core::felt252"
      },
      {
        "name": "vault_class_hash",
        "type": "core::felt252"
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
    "kind": "struct",
    "name": "littlefinger::contracts::factory::Factory::VaultDeployed",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "deployed_at",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "littlefinger::contracts::factory::Factory::OrgCoreDeployed",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "deployed_at",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "littlefinger::contracts::factory::Factory::Event",
    "type": "event",
    "variants": [
      {
        "kind": "flat",
        "name": "OwnableEvent",
        "type": "openzeppelin_access::ownable::ownable::OwnableComponent::Event"
      },
      {
        "kind": "flat",
        "name": "UpgradeableEvent",
        "type": "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event"
      },
      {
        "kind": "nested",
        "name": "VaultDeployed",
        "type": "littlefinger::contracts::factory::Factory::VaultDeployed"
      },
      {
        "kind": "nested",
        "name": "OrgCoreDeployed",
        "type": "littlefinger::contracts::factory::Factory::OrgCoreDeployed"
      }
    ]
  }
] as const;