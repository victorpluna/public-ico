export const contractAbi = [
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
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "ContractDeployed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "projectId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "projectTitle",
            type: "string",
          },
          {
            internalType: "address",
            name: "contributor",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "claimed",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct PublicICO.Contribution",
        name: "contribution",
        type: "tuple",
      },
    ],
    name: "ContributionReceived",
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
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
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
            components: [
              {
                internalType: "string",
                name: "tokenTicker",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "totalSupply",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "tokenDistribution",
                type: "uint256",
              },
            ],
            internalType: "struct PublicICO.TokenDetails",
            name: "tokenDetails",
            type: "tuple",
          },
          {
            components: [
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
            ],
            internalType: "struct PublicICO.FundingDetails",
            name: "fundingDetails",
            type: "tuple",
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
        indexed: false,
        internalType: "struct PublicICO.Project",
        name: "project",
        type: "tuple",
      },
    ],
    name: "ProjectApplied",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
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
            components: [
              {
                internalType: "string",
                name: "tokenTicker",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "totalSupply",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "tokenDistribution",
                type: "uint256",
              },
            ],
            internalType: "struct PublicICO.TokenDetails",
            name: "tokenDetails",
            type: "tuple",
          },
          {
            components: [
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
            ],
            internalType: "struct PublicICO.FundingDetails",
            name: "fundingDetails",
            type: "tuple",
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
        indexed: false,
        internalType: "struct PublicICO.Project",
        name: "project",
        type: "tuple",
      },
    ],
    name: "ProjectCreated",
    type: "event",
  },
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
    inputs: [],
    name: "contractCount",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "contributions",
    outputs: [
      {
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "projectTitle",
        type: "string",
      },
      {
        internalType: "address",
        name: "contributor",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "claimed",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
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
        name: "tokenTicker",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenDistribution",
        type: "uint256",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "deployedContracts",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyContributions",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "projectId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "projectTitle",
            type: "string",
          },
          {
            internalType: "address",
            name: "contributor",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "claimed",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        internalType: "struct PublicICO.Contribution[]",
        name: "",
        type: "tuple[]",
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
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
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
            components: [
              {
                internalType: "string",
                name: "tokenTicker",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "totalSupply",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "tokenDistribution",
                type: "uint256",
              },
            ],
            internalType: "struct PublicICO.TokenDetails",
            name: "tokenDetails",
            type: "tuple",
          },
          {
            components: [
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
            ],
            internalType: "struct PublicICO.FundingDetails",
            name: "fundingDetails",
            type: "tuple",
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
    name: "listClosedProjects",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
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
            components: [
              {
                internalType: "string",
                name: "tokenTicker",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "totalSupply",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "tokenDistribution",
                type: "uint256",
              },
            ],
            internalType: "struct PublicICO.TokenDetails",
            name: "tokenDetails",
            type: "tuple",
          },
          {
            components: [
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
            ],
            internalType: "struct PublicICO.FundingDetails",
            name: "fundingDetails",
            type: "tuple",
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
    inputs: [
      {
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
    ],
    name: "listProjectContributions",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "projectId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "projectTitle",
            type: "string",
          },
          {
            internalType: "address",
            name: "contributor",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "claimed",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        internalType: "struct PublicICO.Contribution[]",
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
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
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
        components: [
          {
            internalType: "string",
            name: "tokenTicker",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenDistribution",
            type: "uint256",
          },
        ],
        internalType: "struct PublicICO.TokenDetails",
        name: "tokenDetails",
        type: "tuple",
      },
      {
        components: [
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
        ],
        internalType: "struct PublicICO.FundingDetails",
        name: "fundingDetails",
        type: "tuple",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
    ],
    name: "retrieveProject",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
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
            components: [
              {
                internalType: "string",
                name: "tokenTicker",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "totalSupply",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "tokenDistribution",
                type: "uint256",
              },
            ],
            internalType: "struct PublicICO.TokenDetails",
            name: "tokenDetails",
            type: "tuple",
          },
          {
            components: [
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
            ],
            internalType: "struct PublicICO.FundingDetails",
            name: "fundingDetails",
            type: "tuple",
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
        internalType: "struct PublicICO.Project",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
