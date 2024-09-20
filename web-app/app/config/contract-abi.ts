export const contractAbi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
    ],
    name: "applyProject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
    ],
    name: "claimFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
    ],
    name: "contribute",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "contributor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ContributionReceived",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "whitePaper",
        type: "string",
      },
      {
        internalType: "string",
        name: "projectPlan",
        type: "string",
      },
      {
        internalType: "string",
        name: "contractCode",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "targetFunding",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "fundingWallet",
        type: "address",
      },
    ],
    name: "createProject",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "contributor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FundsClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalFunding",
        type: "uint256",
      },
    ],
    name: "ProjectApplied",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "whitePaper",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "projectPlan",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "targetFunding",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "ProjectCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "contributions",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "listActiveProjects",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "string",
            name: "whitePaper",
            type: "string",
          },
          {
            internalType: "string",
            name: "projectPlan",
            type: "string",
          },
          {
            internalType: "string",
            name: "contractCode",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "ownFunding",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "targetFunding",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalFunding",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "fundingWallet",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "applied",
            type: "bool",
          },
        ],
        internalType: "struct PublicICO.Project[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "projectCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "projects",
    outputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "string",
        name: "whitePaper",
        type: "string",
      },
      {
        internalType: "string",
        name: "projectPlan",
        type: "string",
      },
      {
        internalType: "string",
        name: "contractCode",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "ownFunding",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "targetFunding",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalFunding",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "fundingWallet",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "applied",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
