export const VAULTABI = [
    {
        type: 'impl',
        name: 'VaultImpl',
        interface_name: 'littlefinger::interfaces::ivault::IVault',
    },
    {
        type: 'struct',
        name: 'core::integer::u256',
        members: [
            {
                name: 'low',
                type: 'core::integer::u128',
            },
            {
                name: 'high',
                type: 'core::integer::u128',
            },
        ],
    },
    {
        type: 'enum',
        name: 'littlefinger::structs::vault_structs::VaultStatus',
        variants: [
            {
                name: 'VAULTRESUMED',
                type: '()',
            },
            {
                name: 'VAULTFROZEN',
                type: '()',
            },
        ],
    },
    {
        type: 'enum',
        name: 'littlefinger::structs::vault_structs::TransactionType',
        variants: [
            {
                name: 'DEPOSIT',
                type: '()',
            },
            {
                name: 'WITHDRAWAL',
                type: '()',
            },
            {
                name: 'PAYMENT',
                type: '()',
            },
            {
                name: 'BONUS_ALLOCATION',
                type: '()',
            },
        ],
    },
    {
        type: 'struct',
        name: 'littlefinger::structs::vault_structs::Transaction',
        members: [
            {
                name: 'transaction_type',
                type: 'littlefinger::structs::vault_structs::TransactionType',
            },
            {
                name: 'token',
                type: 'core::starknet::contract_address::ContractAddress',
            },
            {
                name: 'amount',
                type: 'core::integer::u256',
            },
            {
                name: 'timestamp',
                type: 'core::integer::u64',
            },
            {
                name: 'tx_hash',
                type: 'core::felt252',
            },
            {
                name: 'caller',
                type: 'core::starknet::contract_address::ContractAddress',
            },
        ],
    },
    {
        type: 'interface',
        name: 'littlefinger::interfaces::ivault::IVault',
        items: [
            {
                type: 'function',
                name: 'deposit_funds',
                inputs: [
                    {
                        name: 'amount',
                        type: 'core::integer::u256',
                    },
                    {
                        name: 'address',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                outputs: [],
                state_mutability: 'external',
            },
            {
                type: 'function',
                name: 'withdraw_funds',
                inputs: [
                    {
                        name: 'amount',
                        type: 'core::integer::u256',
                    },
                    {
                        name: 'address',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                outputs: [],
                state_mutability: 'external',
            },
            {
                type: 'function',
                name: 'emergency_freeze',
                inputs: [],
                outputs: [],
                state_mutability: 'external',
            },
            {
                type: 'function',
                name: 'unfreeze_vault',
                inputs: [],
                outputs: [],
                state_mutability: 'external',
            },
            {
                type: 'function',
                name: 'pay_member',
                inputs: [
                    {
                        name: 'recipient',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                    {
                        name: 'amount',
                        type: 'core::integer::u256',
                    },
                ],
                outputs: [],
                state_mutability: 'external',
            },
            {
                type: 'function',
                name: 'add_to_bonus_allocation',
                inputs: [
                    {
                        name: 'amount',
                        type: 'core::integer::u256',
                    },
                    {
                        name: 'address',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                outputs: [],
                state_mutability: 'external',
            },
            {
                type: 'function',
                name: 'get_balance',
                inputs: [],
                outputs: [
                    {
                        type: 'core::integer::u256',
                    },
                ],
                state_mutability: 'view',
            },
            {
                type: 'function',
                name: 'get_vault_status',
                inputs: [],
                outputs: [
                    {
                        type: 'littlefinger::structs::vault_structs::VaultStatus',
                    },
                ],
                state_mutability: 'view',
            },
            {
                type: 'function',
                name: 'get_bonus_allocation',
                inputs: [],
                outputs: [
                    {
                        type: 'core::integer::u256',
                    },
                ],
                state_mutability: 'view',
            },
            {
                type: 'function',
                name: 'get_transaction_history',
                inputs: [],
                outputs: [
                    {
                        type: 'core::array::Array::<littlefinger::structs::vault_structs::Transaction>',
                    },
                ],
                state_mutability: 'view',
            },
            {
                type: 'function',
                name: 'allow_org_core_address',
                inputs: [
                    {
                        name: 'org_address',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                outputs: [],
                state_mutability: 'external',
            },
        ],
    },
    {
        type: 'impl',
        name: 'OwnableMixinImpl',
        interface_name: 'openzeppelin_access::ownable::interface::OwnableABI',
    },
    {
        type: 'interface',
        name: 'openzeppelin_access::ownable::interface::OwnableABI',
        items: [
            {
                type: 'function',
                name: 'owner',
                inputs: [],
                outputs: [
                    {
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                state_mutability: 'view',
            },
            {
                type: 'function',
                name: 'transfer_ownership',
                inputs: [
                    {
                        name: 'new_owner',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                outputs: [],
                state_mutability: 'external',
            },
            {
                type: 'function',
                name: 'renounce_ownership',
                inputs: [],
                outputs: [],
                state_mutability: 'external',
            },
            {
                type: 'function',
                name: 'transferOwnership',
                inputs: [
                    {
                        name: 'newOwner',
                        type: 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                outputs: [],
                state_mutability: 'external',
            },
            {
                type: 'function',
                name: 'renounceOwnership',
                inputs: [],
                outputs: [],
                state_mutability: 'external',
            },
        ],
    },
    {
        type: 'constructor',
        name: 'constructor',
        inputs: [
            {
                name: 'token',
                type: 'core::starknet::contract_address::ContractAddress',
            },
            {
                name: 'owner',
                type: 'core::starknet::contract_address::ContractAddress',
            },
        ],
    },
    {
        type: 'event',
        name: 'littlefinger::contracts::vault::Vault::DepositSuccessful',
        kind: 'struct',
        members: [
            {
                name: 'caller',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
            {
                name: 'token',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
            {
                name: 'amount',
                type: 'core::integer::u256',
                kind: 'data',
            },
            {
                name: 'timestamp',
                type: 'core::integer::u64',
                kind: 'data',
            },
        ],
    },
    {
        type: 'event',
        name: 'littlefinger::contracts::vault::Vault::WithdrawalSuccessful',
        kind: 'struct',
        members: [
            {
                name: 'caller',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
            {
                name: 'token',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
            {
                name: 'amount',
                type: 'core::integer::u256',
                kind: 'data',
            },
            {
                name: 'timestamp',
                type: 'core::integer::u64',
                kind: 'data',
            },
        ],
    },
    {
        type: 'event',
        name: 'littlefinger::contracts::vault::Vault::VaultFrozen',
        kind: 'struct',
        members: [
            {
                name: 'caller',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
            {
                name: 'timestamp',
                type: 'core::integer::u64',
                kind: 'data',
            },
        ],
    },
    {
        type: 'event',
        name: 'littlefinger::contracts::vault::Vault::VaultResumed',
        kind: 'struct',
        members: [
            {
                name: 'caller',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
            {
                name: 'timestamp',
                type: 'core::integer::u64',
                kind: 'data',
            },
        ],
    },
    {
        type: 'event',
        name: 'littlefinger::contracts::vault::Vault::TransactionRecorded',
        kind: 'struct',
        members: [
            {
                name: 'transaction_type',
                type: 'littlefinger::structs::vault_structs::TransactionType',
                kind: 'data',
            },
            {
                name: 'caller',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
            {
                name: 'transaction_details',
                type: 'littlefinger::structs::vault_structs::Transaction',
                kind: 'data',
            },
            {
                name: 'token',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'data',
            },
        ],
    },
    {
        type: 'event',
        name: 'littlefinger::contracts::vault::Vault::BonusAllocation',
        kind: 'struct',
        members: [
            {
                name: 'amount',
                type: 'core::integer::u256',
                kind: 'data',
            },
            {
                name: 'timestamp',
                type: 'core::integer::u64',
                kind: 'data',
            },
        ],
    },
    {
        type: 'event',
        name: 'openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred',
        kind: 'struct',
        members: [
            {
                name: 'previous_owner',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'key',
            },
            {
                name: 'new_owner',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'key',
            },
        ],
    },
    {
        type: 'event',
        name: 'openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted',
        kind: 'struct',
        members: [
            {
                name: 'previous_owner',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'key',
            },
            {
                name: 'new_owner',
                type: 'core::starknet::contract_address::ContractAddress',
                kind: 'key',
            },
        ],
    },
    {
        type: 'event',
        name: 'openzeppelin_access::ownable::ownable::OwnableComponent::Event',
        kind: 'enum',
        variants: [
            {
                name: 'OwnershipTransferred',
                type: 'openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred',
                kind: 'nested',
            },
            {
                name: 'OwnershipTransferStarted',
                type: 'openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted',
                kind: 'nested',
            },
        ],
    },
    {
        type: 'event',
        name: 'openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded',
        kind: 'struct',
        members: [
            {
                name: 'class_hash',
                type: 'core::starknet::class_hash::ClassHash',
                kind: 'data',
            },
        ],
    },
    {
        type: 'event',
        name: 'openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event',
        kind: 'enum',
        variants: [
            {
                name: 'Upgraded',
                type: 'openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded',
                kind: 'nested',
            },
        ],
    },
    {
        type: 'event',
        name: 'littlefinger::contracts::vault::Vault::Event',
        kind: 'enum',
        variants: [
            {
                name: 'DepositSuccessful',
                type: 'littlefinger::contracts::vault::Vault::DepositSuccessful',
                kind: 'nested',
            },
            {
                name: 'WithdrawalSuccessful',
                type: 'littlefinger::contracts::vault::Vault::WithdrawalSuccessful',
                kind: 'nested',
            },
            {
                name: 'VaultFrozen',
                type: 'littlefinger::contracts::vault::Vault::VaultFrozen',
                kind: 'nested',
            },
            {
                name: 'VaultResumed',
                type: 'littlefinger::contracts::vault::Vault::VaultResumed',
                kind: 'nested',
            },
            {
                name: 'TransactionRecorded',
                type: 'littlefinger::contracts::vault::Vault::TransactionRecorded',
                kind: 'nested',
            },
            {
                name: 'BonusAllocation',
                type: 'littlefinger::contracts::vault::Vault::BonusAllocation',
                kind: 'nested',
            },
            {
                name: 'OwnableEvent',
                type: 'openzeppelin_access::ownable::ownable::OwnableComponent::Event',
                kind: 'flat',
            },
            {
                name: 'UpgradeableEvent',
                type: 'openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event',
                kind: 'flat',
            },
        ],
    },
] as const;
