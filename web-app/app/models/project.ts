export interface Project {
  id: number;
  title: string;
  creator: string;
  whitePaper: string;
  projectPlan: string;
  fundingDetails: {
    ownFunding: number;
    targetFunding: number;
    totalFunding: number;
    fundingWallet: string;
  };
  tokenDetails: {
    tokenTicker: string;
    totalSupply: number;
    distribution: number;
  };
  deadline: number;
  applied: boolean;
}
