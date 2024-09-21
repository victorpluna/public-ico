export interface Project {
  id: number;
  title: string;
  creator: string;
  whitePaper: string;
  projectPlan: string;
  contractCode: string;
  ownFunding: number;
  targetFunding: number;
  totalFunding: number;
  fundingWallet: string;
  deadline: number;
  applied: boolean;
}
