export interface Contribution {
  projectId: number;
  projectTitle: string;
  contributor: string;
  value: number;
  claimed: boolean;
  createdAt: number;
}

export type ProjectContributions = {
  projectId: number;
  projectTitle: string;
  total: number;
  claimed: boolean;
  contributions: Contribution[];
};
