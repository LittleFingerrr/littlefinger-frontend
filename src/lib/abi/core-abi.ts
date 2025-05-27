export const COREABI = [
  {
    "type": "impl",
    "name": "UpgradeableImpl",
    "interface_name": "openzeppelin_upgrades::interface::IUpgradeable"
  },
  {
    "type": "interface",
    "name": "openzeppelin_upgrades::interface::IUpgradeable",
    "items": [
      {
        "type": "function",
        "name": "upgrade",
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
    "type": "impl",
    "name": "CoreImpl",
    "interface_name": "littlefinger::interfaces::icore::ICore"
  },
  {
    "type": "interface",
    "name": "littlefinger::interfaces::icore::ICore",
    "items": [
      {
        "type": "function",
        "name": "schedule_payout",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "initialize_disbursement_schedule",
        "inputs": [
          {
            "name": "schedule_type",
            "type": "core::integer::u8"
          },
          {
            "name": "start",
            "type": "core::integer::u64"
          },
          {
            "name": "end",
            "type": "core::integer::u64"
          },
          {
            "name": "interval",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "impl",
    "name": "MemberImpl",
    "interface_name": "littlefinger::interfaces::imember_manager::IMemberManager"
  },
  {
    "type": "enum",
    "name": "littlefinger::structs::member_structs::MemberRole",
    "variants": [
      {
        "name": "None",
        "type": "()"
      },
      {
        "name": "EMPLOYEE",
        "type": "core::integer::u16"
      },
      {
        "name": "ADMIN",
        "type": "core::integer::u16"
      },
      {
        "name": "CONTRACTOR",
        "type": "core::integer::u16"
      }
    ]
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
    "name": "core::option::Option::<core::felt252>",
    "variants": [
      {
        "name": "Some",
        "type": "core::felt252"
      },
      {
        "name": "None",
        "type": "()"
      }
    ]
  },
  {
    "type": "enum",
    "name": "littlefinger::structs::member_structs::MemberStatus",
    "variants": [
      {
        "name": "ACTIVE",
        "type": "()"
      },
      {
        "name": "SUSPENDED",
        "type": "()"
      },
      {
        "name": "PROBATION",
        "type": "()"
      },
      {
        "name": "REMOVED",
        "type": "()"
      }
    ]
  },
  {
    "type": "enum",
    "name": "core::option::Option::<core::integer::u256>",
    "variants": [
      {
        "name": "Some",
        "type": "core::integer::u256"
      },
      {
        "name": "None",
        "type": "()"
      }
    ]
  },
  {
    "type": "enum",
    "name": "core::option::Option::<core::integer::u64>",
    "variants": [
      {
        "name": "Some",
        "type": "core::integer::u64"
      },
      {
        "name": "None",
        "type": "()"
      }
    ]
  },
  {
    "type": "struct",
    "name": "littlefinger::structs::member_structs::MemberResponse",
    "members": [
      {
        "name": "fname",
        "type": "core::felt252"
      },
      {
        "name": "lname",
        "type": "core::felt252"
      },
      {
        "name": "alias",
        "type": "core::felt252"
      },
      {
        "name": "role",
        "type": "littlefinger::structs::member_structs::MemberRole"
      },
      {
        "name": "id",
        "type": "core::integer::u256"
      },
      {
        "name": "address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "status",
        "type": "littlefinger::structs::member_structs::MemberStatus"
      },
      {
        "name": "base_pay",
        "type": "core::integer::u256"
      },
      {
        "name": "pending_allocations",
        "type": "core::option::Option::<core::integer::u256>"
      },
      {
        "name": "total_received",
        "type": "core::option::Option::<core::integer::u256>"
      },
      {
        "name": "no_of_payouts",
        "type": "core::integer::u32"
      },
      {
        "name": "last_disbursement_timestamp",
        "type": "core::option::Option::<core::integer::u64>"
      },
      {
        "name": "total_disbursements",
        "type": "core::option::Option::<core::integer::u64>"
      },
      {
        "name": "reg_time",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "type": "struct",
    "name": "core::array::Span::<littlefinger::structs::member_structs::MemberResponse>",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<littlefinger::structs::member_structs::MemberResponse>"
      }
    ]
  },
  {
    "type": "struct",
    "name": "littlefinger::structs::member_structs::MemberConfig",
    "members": [
      {
        "name": "weight",
        "type": "core::array::Array::<core::integer::u16>"
      },
      {
        "name": "visibility",
        "type": "core::integer::u8"
      }
    ]
  },
  {
    "type": "interface",
    "name": "littlefinger::interfaces::imember_manager::IMemberManager",
    "items": [
      {
        "type": "function",
        "name": "add_member",
        "inputs": [
          {
            "name": "fname",
            "type": "core::felt252"
          },
          {
            "name": "lname",
            "type": "core::felt252"
          },
          {
            "name": "alias",
            "type": "core::felt252"
          },
          {
            "name": "role",
            "type": "littlefinger::structs::member_structs::MemberRole"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "add_admin",
        "inputs": [
          {
            "name": "member_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "invite_member",
        "inputs": [
          {
            "name": "role",
            "type": "core::integer::u16"
          },
          {
            "name": "address",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "renumeration",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::felt252"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "accept_invite",
        "inputs": [
          {
            "name": "fname",
            "type": "core::felt252"
          },
          {
            "name": "lname",
            "type": "core::felt252"
          },
          {
            "name": "alias",
            "type": "core::felt252"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "update_member_details",
        "inputs": [
          {
            "name": "member_id",
            "type": "core::integer::u256"
          },
          {
            "name": "fname",
            "type": "core::option::Option::<core::felt252>"
          },
          {
            "name": "lname",
            "type": "core::option::Option::<core::felt252>"
          },
          {
            "name": "alias",
            "type": "core::option::Option::<core::felt252>"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "update_member_base_pay",
        "inputs": [
          {
            "name": "member_id",
            "type": "core::integer::u256"
          },
          {
            "name": "base_pay",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "suspend_member",
        "inputs": [
          {
            "name": "member_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "reinstate_member",
        "inputs": [
          {
            "name": "member_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "get_members",
        "inputs": [],
        "outputs": [
          {
            "type": "core::array::Span::<littlefinger::structs::member_structs::MemberResponse>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_member",
        "inputs": [
          {
            "name": "member_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "littlefinger::structs::member_structs::MemberResponse"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "update_member_config",
        "inputs": [
          {
            "name": "config",
            "type": "littlefinger::structs::member_structs::MemberConfig"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "impl",
    "name": "DisbursementImpl",
    "interface_name": "littlefinger::interfaces::idisbursement::IDisbursement"
  },
  {
    "type": "enum",
    "name": "littlefinger::structs::disbursement_structs::ScheduleStatus",
    "variants": [
      {
        "name": "ACTIVE",
        "type": "()"
      },
      {
        "name": "PAUSED",
        "type": "()"
      },
      {
        "name": "DELETED",
        "type": "()"
      }
    ]
  },
  {
    "type": "enum",
    "name": "littlefinger::structs::disbursement_structs::ScheduleType",
    "variants": [
      {
        "name": "RECURRING",
        "type": "()"
      },
      {
        "name": "ONETIME",
        "type": "()"
      }
    ]
  },
  {
    "type": "struct",
    "name": "littlefinger::structs::disbursement_structs::DisbursementSchedule",
    "members": [
      {
        "name": "schedule_id",
        "type": "core::integer::u64"
      },
      {
        "name": "status",
        "type": "littlefinger::structs::disbursement_structs::ScheduleStatus"
      },
      {
        "name": "schedule_type",
        "type": "littlefinger::structs::disbursement_structs::ScheduleType"
      },
      {
        "name": "start_timestamp",
        "type": "core::integer::u64"
      },
      {
        "name": "end_timestamp",
        "type": "core::integer::u64"
      },
      {
        "name": "interval",
        "type": "core::integer::u64"
      },
      {
        "name": "last_execution",
        "type": "core::option::Option::<core::integer::u64>"
      }
    ]
  },
  {
    "type": "struct",
    "name": "littlefinger::structs::member_structs::Member",
    "members": [
      {
        "name": "id",
        "type": "core::integer::u256"
      },
      {
        "name": "address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "status",
        "type": "littlefinger::structs::member_structs::MemberStatus"
      },
      {
        "name": "role",
        "type": "littlefinger::structs::member_structs::MemberRole"
      },
      {
        "name": "base_pay",
        "type": "core::integer::u256"
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
    "name": "littlefinger::interfaces::idisbursement::IDisbursement",
    "items": [
      {
        "type": "function",
        "name": "create_disbursement_schedule",
        "inputs": [
          {
            "name": "schedule_type",
            "type": "core::integer::u8"
          },
          {
            "name": "start",
            "type": "core::integer::u64"
          },
          {
            "name": "end",
            "type": "core::integer::u64"
          },
          {
            "name": "interval",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "pause_disbursement_schedule",
        "inputs": [
          {
            "name": "schedule_id",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "resume_schedule",
        "inputs": [
          {
            "name": "schedule_id",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "delete_schedule",
        "inputs": [
          {
            "name": "schedule_id",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "get_current_schedule",
        "inputs": [],
        "outputs": [
          {
            "type": "littlefinger::structs::disbursement_structs::DisbursementSchedule"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_disbursement_schedules",
        "inputs": [],
        "outputs": [
          {
            "type": "core::array::Array::<littlefinger::structs::disbursement_structs::DisbursementSchedule>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "retry_failed_disbursement",
        "inputs": [
          {
            "name": "schedule_id",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "get_pending_failed_disbursements",
        "inputs": [],
        "outputs": [],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "add_failed_disbursement",
        "inputs": [
          {
            "name": "member",
            "type": "littlefinger::structs::member_structs::Member"
          },
          {
            "name": "disbursement_id",
            "type": "core::integer::u256"
          },
          {
            "name": "timestamp",
            "type": "core::integer::u64"
          },
          {
            "name": "caller",
            "type": "core::starknet::contract_address::ContractAddress"
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
        "name": "update_current_schedule_last_execution",
        "inputs": [
          {
            "name": "timestamp",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "set_current_schedule",
        "inputs": [
          {
            "name": "schedule_id",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "compute_renumeration",
        "inputs": [
          {
            "name": "member",
            "type": "littlefinger::structs::member_structs::Member"
          },
          {
            "name": "total_bonus_available",
            "type": "core::integer::u256"
          },
          {
            "name": "total_members_weight",
            "type": "core::integer::u16"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "update_schedule_interval",
        "inputs": [
          {
            "name": "schedule_id",
            "type": "core::integer::u64"
          },
          {
            "name": "new_interval",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "update_schedule_type",
        "inputs": [
          {
            "name": "schedule_id",
            "type": "core::integer::u64"
          },
          {
            "name": "schedule_type",
            "type": "littlefinger::structs::disbursement_structs::ScheduleType"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "get_last_disburse_time",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u64"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_next_disburse_time",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u64"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "impl",
    "name": "OrganizationImpl",
    "interface_name": "littlefinger::interfaces::iorganization::IOrganization"
  },
  {
    "type": "struct",
    "name": "core::byte_array::ByteArray",
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
    "type": "enum",
    "name": "core::option::Option::<core::byte_array::ByteArray>",
    "variants": [
      {
        "name": "Some",
        "type": "core::byte_array::ByteArray"
      },
      {
        "name": "None",
        "type": "()"
      }
    ]
  },
  {
    "type": "struct",
    "name": "littlefinger::structs::organization::OrganizationConfig",
    "members": [
      {
        "name": "name",
        "type": "core::option::Option::<core::byte_array::ByteArray>"
      },
      {
        "name": "admins",
        "type": "core::array::Array::<core::starknet::contract_address::ContractAddress>"
      }
    ]
  },
  {
    "type": "struct",
    "name": "littlefinger::structs::organization::OrganizationInfo",
    "members": [
      {
        "name": "org_id",
        "type": "core::integer::u256"
      },
      {
        "name": "name",
        "type": "core::byte_array::ByteArray"
      },
      {
        "name": "deployer",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "ipfs_url",
        "type": "core::byte_array::ByteArray"
      },
      {
        "name": "vault_address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "created_at",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "type": "interface",
    "name": "littlefinger::interfaces::iorganization::IOrganization",
    "items": [
      {
        "type": "function",
        "name": "transfer_organization_claim",
        "inputs": [
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "adjust_committee",
        "inputs": [
          {
            "name": "add",
            "type": "core::array::Array::<core::starknet::contract_address::ContractAddress>"
          },
          {
            "name": "subtract",
            "type": "core::array::Array::<core::starknet::contract_address::ContractAddress>"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "update_organization_config",
        "inputs": [
          {
            "name": "config",
            "type": "littlefinger::structs::organization::OrganizationConfig"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "get_organization_details",
        "inputs": [],
        "outputs": [
          {
            "type": "littlefinger::structs::organization::OrganizationInfo"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "impl",
    "name": "VotingImpl",
    "interface_name": "littlefinger::interfaces::voting::IVote"
  },
  {
    "type": "enum",
    "name": "littlefinger::structs::voting::PollStatus",
    "variants": [
      {
        "name": "Pending",
        "type": "()"
      },
      {
        "name": "Started",
        "type": "()"
      },
      {
        "name": "Finished",
        "type": "core::bool"
      }
    ]
  },
  {
    "type": "struct",
    "name": "littlefinger::structs::voting::Poll",
    "members": [
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "name",
        "type": "core::byte_array::ByteArray"
      },
      {
        "name": "desc",
        "type": "core::byte_array::ByteArray"
      },
      {
        "name": "yes_votes",
        "type": "core::integer::u256"
      },
      {
        "name": "no_votes",
        "type": "core::integer::u256"
      },
      {
        "name": "status",
        "type": "littlefinger::structs::voting::PollStatus"
      }
    ]
  },
  {
    "type": "struct",
    "name": "littlefinger::structs::voting::VotingConfig",
    "members": [
      {
        "name": "private",
        "type": "core::bool"
      },
      {
        "name": "threshold",
        "type": "core::integer::u256"
      },
      {
        "name": "weighted",
        "type": "core::bool"
      },
      {
        "name": "weighted_with",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "type": "interface",
    "name": "littlefinger::interfaces::voting::IVote",
    "items": [
      {
        "type": "function",
        "name": "create_poll",
        "inputs": [
          {
            "name": "name",
            "type": "core::byte_array::ByteArray"
          },
          {
            "name": "desc",
            "type": "core::byte_array::ByteArray"
          },
          {
            "name": "member_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "vote",
        "inputs": [
          {
            "name": "support",
            "type": "core::bool"
          },
          {
            "name": "id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "get_poll",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "littlefinger::structs::voting::Poll"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "end_poll",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "update_voting_config",
        "inputs": [
          {
            "name": "config",
            "type": "littlefinger::structs::voting::VotingConfig"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "impl",
    "name": "OwnableMixinImpl",
    "interface_name": "openzeppelin_access::ownable::interface::OwnableABI"
  },
  {
    "type": "interface",
    "name": "openzeppelin_access::ownable::interface::OwnableABI",
    "items": [
      {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "transfer_ownership",
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
        "type": "function",
        "name": "renounce_ownership",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "transferOwnership",
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
        "type": "function",
        "name": "renounceOwnership",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "constructor",
    "name": "constructor",
    "inputs": [
      {
        "name": "org_id",
        "type": "core::integer::u256"
      },
      {
        "name": "org_name",
        "type": "core::byte_array::ByteArray"
      },
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "ipfs_url",
        "type": "core::byte_array::ByteArray"
      },
      {
        "name": "vault_address",
        "type": "core::starknet::contract_address::ContractAddress"
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
        "name": "deployer",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "type": "event",
    "name": "littlefinger::structs::member_structs::MemberInvited",
    "kind": "struct",
    "members": [
      {
        "name": "address",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "role",
        "type": "littlefinger::structs::member_structs::MemberRole",
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
    "name": "littlefinger::structs::member_structs::MemberEvent",
    "kind": "struct",
    "members": [
      {
        "name": "fname",
        "type": "core::felt252",
        "kind": "data"
      },
      {
        "name": "lname",
        "type": "core::felt252",
        "kind": "data"
      },
      {
        "name": "address",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "status",
        "type": "littlefinger::structs::member_structs::MemberStatus",
        "kind": "data"
      },
      {
        "name": "value",
        "type": "core::felt252",
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
    "name": "littlefinger::structs::member_structs::MemberEnum",
    "kind": "enum",
    "variants": [
      {
        "name": "Invited",
        "type": "littlefinger::structs::member_structs::MemberInvited",
        "kind": "nested"
      },
      {
        "name": "Added",
        "type": "littlefinger::structs::member_structs::MemberEvent",
        "kind": "nested"
      },
      {
        "name": "Removed",
        "type": "littlefinger::structs::member_structs::MemberEvent",
        "kind": "nested"
      },
      {
        "name": "Suspended",
        "type": "littlefinger::structs::member_structs::MemberEvent",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "littlefinger::components::member_manager::MemberManagerComponent::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "MemberEnum",
        "type": "littlefinger::structs::member_structs::MemberEnum",
        "kind": "flat"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
    "kind": "struct",
    "members": [
      {
        "name": "previous_owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "new_owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
    "kind": "struct",
    "members": [
      {
        "name": "previous_owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "new_owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "OwnershipTransferred",
        "type": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
        "kind": "nested"
      },
      {
        "name": "OwnershipTransferStarted",
        "type": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
    "kind": "struct",
    "members": [
      {
        "name": "class_hash",
        "type": "core::starknet::class_hash::ClassHash",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "Upgraded",
        "type": "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "littlefinger::components::organization::OrganizationComponent::Event",
    "kind": "enum",
    "variants": []
  },
  {
    "type": "event",
    "name": "littlefinger::structs::voting::Voted",
    "kind": "struct",
    "members": [
      {
        "name": "id",
        "type": "core::integer::u256",
        "kind": "key"
      },
      {
        "name": "voter",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "littlefinger::components::voting::VotingComponent::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "Voted",
        "type": "littlefinger::structs::voting::Voted",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "littlefinger::components::disbursement::DisbursementComponent::Event",
    "kind": "enum",
    "variants": []
  },
  {
    "type": "event",
    "name": "littlefinger::contracts::core::Core::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "MemberEvent",
        "type": "littlefinger::components::member_manager::MemberManagerComponent::Event",
        "kind": "flat"
      },
      {
        "name": "OwnableEvent",
        "type": "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
        "kind": "flat"
      },
      {
        "name": "UpgradeableEvent",
        "type": "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
        "kind": "flat"
      },
      {
        "name": "OrganizationEvent",
        "type": "littlefinger::components::organization::OrganizationComponent::Event",
        "kind": "flat"
      },
      {
        "name": "VotingEvent",
        "type": "littlefinger::components::voting::VotingComponent::Event",
        "kind": "flat"
      },
      {
        "name": "DisbursementEvent",
        "type": "littlefinger::components::disbursement::DisbursementComponent::Event",
        "kind": "flat"
      }
    ]
  }
] as const;