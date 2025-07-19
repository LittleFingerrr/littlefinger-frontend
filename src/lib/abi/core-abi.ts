export const COREABI = [
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
    "name": "CoreImpl",
    "type": "impl",
    "interface_name": "littlefinger::interfaces::icore::ICore"
  },
  {
    "name": "littlefinger::interfaces::icore::ICore",
    "type": "interface",
    "items": [
      {
        "name": "schedule_payout",
        "type": "function",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "initialize_disbursement_schedule",
        "type": "function",
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
    "name": "MemberImpl",
    "type": "impl",
    "interface_name": "littlefinger::interfaces::imember_manager::IMemberManager"
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
    "name": "core::option::Option::<core::felt252>",
    "type": "enum",
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
    "name": "littlefinger::structs::member_structs::MemberRole",
    "type": "enum",
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
    "name": "littlefinger::structs::member_structs::MemberStatus",
    "type": "enum",
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
    "name": "core::option::Option::<core::integer::u256>",
    "type": "enum",
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
    "name": "core::option::Option::<core::integer::u64>",
    "type": "enum",
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
    "name": "littlefinger::structs::member_structs::MemberResponse",
    "type": "struct",
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
    "name": "core::array::Span::<littlefinger::structs::member_structs::MemberResponse>",
    "type": "struct",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<littlefinger::structs::member_structs::MemberResponse>"
      }
    ]
  },
  {
    "name": "littlefinger::structs::member_structs::MemberConfig",
    "type": "struct",
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
    "name": "littlefinger::interfaces::imember_manager::IMemberManager",
    "type": "interface",
    "items": [
      {
        "name": "add_member",
        "type": "function",
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
            "type": "core::integer::u16"
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
        "name": "add_admin",
        "type": "function",
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
        "name": "invite_member",
        "type": "function",
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
        "name": "accept_invite",
        "type": "function",
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
        "name": "update_member_details",
        "type": "function",
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
        "name": "update_member_base_pay",
        "type": "function",
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
        "name": "get_member_base_pay",
        "type": "function",
        "inputs": [
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
        "name": "suspend_member",
        "type": "function",
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
        "name": "reinstate_member",
        "type": "function",
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
        "name": "get_members",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::array::Span::<littlefinger::structs::member_structs::MemberResponse>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_member",
        "type": "function",
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
        "name": "update_member_config",
        "type": "function",
        "inputs": [
          {
            "name": "config",
            "type": "littlefinger::structs::member_structs::MemberConfig"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "record_member_payment",
        "type": "function",
        "inputs": [
          {
            "name": "member_id",
            "type": "core::integer::u256"
          },
          {
            "name": "amount",
            "type": "core::integer::u256"
          },
          {
            "name": "timestamp",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "name": "DisbursementImpl",
    "type": "impl",
    "interface_name": "littlefinger::interfaces::idisbursement::IDisbursement"
  },
  {
    "name": "littlefinger::structs::disbursement_structs::ScheduleStatus",
    "type": "enum",
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
    "name": "littlefinger::structs::disbursement_structs::ScheduleType",
    "type": "enum",
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
    "name": "littlefinger::structs::disbursement_structs::DisbursementSchedule",
    "type": "struct",
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
    "name": "littlefinger::interfaces::idisbursement::IDisbursement",
    "type": "interface",
    "items": [
      {
        "name": "create_disbursement_schedule",
        "type": "function",
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
        "name": "pause_disbursement",
        "type": "function",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "resume_schedule",
        "type": "function",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_current_schedule",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "littlefinger::structs::disbursement_structs::DisbursementSchedule"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_disbursement_schedules",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::array::Array::<littlefinger::structs::disbursement_structs::DisbursementSchedule>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "update_current_schedule_last_execution",
        "type": "function",
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
        "name": "set_current_schedule",
        "type": "function",
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
        "name": "compute_renumeration",
        "type": "function",
        "inputs": [
          {
            "name": "member",
            "type": "littlefinger::structs::member_structs::MemberResponse"
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
        "name": "update_schedule_interval",
        "type": "function",
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
        "name": "update_schedule_type",
        "type": "function",
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
        "name": "get_last_disburse_time",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u64"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_next_disburse_time",
        "type": "function",
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
    "name": "OrganizationImpl",
    "type": "impl",
    "interface_name": "littlefinger::interfaces::iorganization::IOrganization"
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
    "name": "core::option::Option::<core::byte_array::ByteArray>",
    "type": "enum",
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
    "name": "littlefinger::structs::organization::OrganizationConfig",
    "type": "struct",
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
    "name": "littlefinger::structs::organization::OrganizationType",
    "type": "enum",
    "variants": [
      {
        "name": "CENTRALIZED",
        "type": "()"
      },
      {
        "name": "DECENTRALIZED",
        "type": "()"
      }
    ]
  },
  {
    "name": "littlefinger::structs::organization::OrganizationInfo",
    "type": "struct",
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
      },
      {
        "name": "organization_type",
        "type": "littlefinger::structs::organization::OrganizationType"
      }
    ]
  },
  {
    "name": "littlefinger::interfaces::iorganization::IOrganization",
    "type": "interface",
    "items": [
      {
        "name": "transfer_organization_claim",
        "type": "function",
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
        "name": "adjust_committee",
        "type": "function",
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
        "name": "update_organization_config",
        "type": "function",
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
        "name": "get_organization_details",
        "type": "function",
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
    "name": "VotingImpl",
    "type": "impl",
    "interface_name": "littlefinger::interfaces::dao_controller::IVote"
  },
  {
    "name": "littlefinger::structs::member_structs::InviteStatus",
    "type": "enum",
    "variants": [
      {
        "name": "PENDING",
        "type": "()"
      },
      {
        "name": "ACCEPTED",
        "type": "()"
      },
      {
        "name": "REJECTED",
        "type": "()"
      },
      {
        "name": "EXPIRED",
        "type": "()"
      }
    ]
  },
  {
    "name": "littlefinger::structs::member_structs::MemberInvite",
    "type": "struct",
    "members": [
      {
        "name": "address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "role",
        "type": "littlefinger::structs::member_structs::MemberRole"
      },
      {
        "name": "base_pay",
        "type": "core::integer::u256"
      },
      {
        "name": "invite_status",
        "type": "littlefinger::structs::member_structs::InviteStatus"
      },
      {
        "name": "expiry",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "name": "littlefinger::structs::dao_controller::ADDMEMBER",
    "type": "struct",
    "members": [
      {
        "name": "member",
        "type": "littlefinger::structs::member_structs::MemberInvite"
      },
      {
        "name": "member_address",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "name": "littlefinger::structs::dao_controller::UPDATEMEMBERBASEPAY",
    "type": "struct",
    "members": [
      {
        "name": "member_id",
        "type": "core::integer::u256"
      }
    ]
  },
  {
    "name": "littlefinger::structs::dao_controller::CHANGEMEMBERSTATUS",
    "type": "struct",
    "members": [
      {
        "name": "member_id",
        "type": "core::integer::u256"
      },
      {
        "name": "current_status",
        "type": "littlefinger::structs::member_structs::MemberStatus"
      },
      {
        "name": "proposed_status",
        "type": "littlefinger::structs::member_structs::MemberStatus"
      }
    ]
  },
  {
    "name": "littlefinger::structs::dao_controller::SETCURRENTDISBURSEMENTSCHEDULE",
    "type": "struct",
    "members": [
      {
        "name": "schedule_id",
        "type": "core::integer::u64"
      },
      {
        "name": "previous_schedule",
        "type": "littlefinger::structs::disbursement_structs::DisbursementSchedule"
      },
      {
        "name": "new_schedule",
        "type": "littlefinger::structs::disbursement_structs::DisbursementSchedule"
      }
    ]
  },
  {
    "name": "littlefinger::structs::dao_controller::CHANGESCHEDULESTATUS",
    "type": "struct",
    "members": [
      {
        "name": "schedule_id",
        "type": "core::integer::u64"
      },
      {
        "name": "previous_status",
        "type": "littlefinger::structs::disbursement_structs::ScheduleStatus"
      },
      {
        "name": "new_status",
        "type": "littlefinger::structs::disbursement_structs::ScheduleStatus"
      }
    ]
  },
  {
    "name": "littlefinger::structs::dao_controller::CHANGEORGANIZATIONTYPE",
    "type": "struct",
    "members": [
      {
        "name": "current_config",
        "type": "littlefinger::structs::organization::OrganizationType"
      },
      {
        "name": "new_config",
        "type": "littlefinger::structs::organization::OrganizationType"
      }
    ]
  },
  {
    "name": "littlefinger::structs::dao_controller::PollReason",
    "type": "enum",
    "variants": [
      {
        "name": "ADDMEMBER",
        "type": "littlefinger::structs::dao_controller::ADDMEMBER"
      },
      {
        "name": "UPDATEMEMBERBASEPAY",
        "type": "littlefinger::structs::dao_controller::UPDATEMEMBERBASEPAY"
      },
      {
        "name": "CHANGEMEMBERSTATUS",
        "type": "littlefinger::structs::dao_controller::CHANGEMEMBERSTATUS"
      },
      {
        "name": "SETCURRENTDISBURSEMENTSCHEDULE",
        "type": "littlefinger::structs::dao_controller::SETCURRENTDISBURSEMENTSCHEDULE"
      },
      {
        "name": "CHANGESCHEDULESTATUS",
        "type": "littlefinger::structs::dao_controller::CHANGESCHEDULESTATUS"
      },
      {
        "name": "CHANGEORGANIZATIONTYPE",
        "type": "littlefinger::structs::dao_controller::CHANGEORGANIZATIONTYPE"
      }
    ]
  },
  {
    "name": "core::bool",
    "type": "enum",
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
    "name": "littlefinger::structs::dao_controller::PollStatus",
    "type": "enum",
    "variants": [
      {
        "name": "ACTIVE",
        "type": "()"
      },
      {
        "name": "FINISHED",
        "type": "core::bool"
      }
    ]
  },
  {
    "name": "littlefinger::structs::dao_controller::Poll",
    "type": "struct",
    "members": [
      {
        "name": "proposer",
        "type": "core::integer::u256"
      },
      {
        "name": "poll_id",
        "type": "core::integer::u256"
      },
      {
        "name": "reason",
        "type": "littlefinger::structs::dao_controller::PollReason"
      },
      {
        "name": "up_votes",
        "type": "core::integer::u256"
      },
      {
        "name": "down_votes",
        "type": "core::integer::u256"
      },
      {
        "name": "status",
        "type": "littlefinger::structs::dao_controller::PollStatus"
      },
      {
        "name": "created_at",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "name": "littlefinger::structs::dao_controller::VotingConfig",
    "type": "struct",
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
    "name": "littlefinger::interfaces::dao_controller::IVote",
    "type": "interface",
    "items": [
      {
        "name": "create_poll",
        "type": "function",
        "inputs": [
          {
            "name": "member_id",
            "type": "core::integer::u256"
          },
          {
            "name": "reason",
            "type": "littlefinger::structs::dao_controller::PollReason"
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
        "name": "approve",
        "type": "function",
        "inputs": [
          {
            "name": "poll_id",
            "type": "core::integer::u256"
          },
          {
            "name": "member_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "reject",
        "type": "function",
        "inputs": [
          {
            "name": "poll_id",
            "type": "core::integer::u256"
          },
          {
            "name": "member_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "set_threshold",
        "type": "function",
        "inputs": [
          {
            "name": "new_threshold",
            "type": "core::integer::u256"
          },
          {
            "name": "member_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_poll",
        "type": "function",
        "inputs": [
          {
            "name": "poll_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "littlefinger::structs::dao_controller::Poll"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_all_polls",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::array::Array::<littlefinger::structs::dao_controller::Poll>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "update_voting_config",
        "type": "function",
        "inputs": [
          {
            "name": "config",
            "type": "littlefinger::structs::dao_controller::VotingConfig"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_threshold",
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
        "name": "get_eligible_voters",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::array::Array::<core::integer::u256>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_eligible_pollers",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::array::Array::<core::integer::u256>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_eligible_executors",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::array::Array::<core::integer::u256>"
          }
        ],
        "state_mutability": "view"
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
      },
      {
        "name": "organization_type",
        "type": "core::integer::u8"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "littlefinger::structs::member_structs::MemberInvited",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "role",
        "type": "littlefinger::structs::member_structs::MemberRole"
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
    "name": "littlefinger::structs::member_structs::MemberEvent",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "fname",
        "type": "core::felt252"
      },
      {
        "kind": "data",
        "name": "lname",
        "type": "core::felt252"
      },
      {
        "kind": "data",
        "name": "address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "status",
        "type": "littlefinger::structs::member_structs::MemberStatus"
      },
      {
        "kind": "data",
        "name": "value",
        "type": "core::felt252"
      },
      {
        "kind": "data",
        "name": "timestamp",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "littlefinger::structs::member_structs::MemberEnum",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "Invited",
        "type": "littlefinger::structs::member_structs::MemberInvited"
      },
      {
        "kind": "nested",
        "name": "Added",
        "type": "littlefinger::structs::member_structs::MemberEvent"
      },
      {
        "kind": "nested",
        "name": "Removed",
        "type": "littlefinger::structs::member_structs::MemberEvent"
      },
      {
        "kind": "nested",
        "name": "Suspended",
        "type": "littlefinger::structs::member_structs::MemberEvent"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "littlefinger::components::member_manager::MemberManagerComponent::Event",
    "type": "event",
    "variants": [
      {
        "kind": "flat",
        "name": "MemberEnum",
        "type": "littlefinger::structs::member_structs::MemberEnum"
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
    "name": "littlefinger::components::organization::OrganizationComponent::Event",
    "type": "event",
    "variants": []
  },
  {
    "kind": "struct",
    "name": "littlefinger::structs::dao_controller::Voted",
    "type": "event",
    "members": [
      {
        "kind": "key",
        "name": "id",
        "type": "core::integer::u256"
      },
      {
        "kind": "key",
        "name": "voter",
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
    "name": "littlefinger::structs::dao_controller::PollResolved",
    "type": "event",
    "members": [
      {
        "kind": "key",
        "name": "id",
        "type": "core::integer::u256"
      },
      {
        "kind": "data",
        "name": "outcome",
        "type": "core::bool"
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
    "name": "littlefinger::structs::dao_controller::PollCreated",
    "type": "event",
    "members": [
      {
        "kind": "key",
        "name": "id",
        "type": "core::integer::u256"
      },
      {
        "kind": "key",
        "name": "proposer",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "reason",
        "type": "littlefinger::structs::dao_controller::PollReason"
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
    "name": "littlefinger::structs::dao_controller::PollStopped",
    "type": "event",
    "members": [
      {
        "kind": "key",
        "name": "id",
        "type": "core::integer::u256"
      },
      {
        "kind": "key",
        "name": "timestamp",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "littlefinger::structs::dao_controller::ThresholdChanged",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "previous_threshold",
        "type": "core::integer::u256"
      },
      {
        "kind": "data",
        "name": "new_threshold",
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
    "kind": "enum",
    "name": "littlefinger::components::dao_controller::VotingComponent::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "Voted",
        "type": "littlefinger::structs::dao_controller::Voted"
      },
      {
        "kind": "nested",
        "name": "PollResolved",
        "type": "littlefinger::structs::dao_controller::PollResolved"
      },
      {
        "kind": "nested",
        "name": "PollCreated",
        "type": "littlefinger::structs::dao_controller::PollCreated"
      },
      {
        "kind": "nested",
        "name": "PollStopped",
        "type": "littlefinger::structs::dao_controller::PollStopped"
      },
      {
        "kind": "nested",
        "name": "ThresholdChanged",
        "type": "littlefinger::structs::dao_controller::ThresholdChanged"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "littlefinger::components::disbursement::DisbursementComponent::Event",
    "type": "event",
    "variants": []
  },
  {
    "kind": "enum",
    "name": "littlefinger::contracts::core::Core::Event",
    "type": "event",
    "variants": [
      {
        "kind": "flat",
        "name": "MemberEvent",
        "type": "littlefinger::components::member_manager::MemberManagerComponent::Event"
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
      },
      {
        "kind": "flat",
        "name": "OrganizationEvent",
        "type": "littlefinger::components::organization::OrganizationComponent::Event"
      },
      {
        "kind": "flat",
        "name": "VotingEvent",
        "type": "littlefinger::components::dao_controller::VotingComponent::Event"
      },
      {
        "kind": "flat",
        "name": "DisbursementEvent",
        "type": "littlefinger::components::disbursement::DisbursementComponent::Event"
      }
    ]
  }
] as const;