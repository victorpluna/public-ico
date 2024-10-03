export interface Contribution {
  projectId: number;
  projectTitle: string;
  contributor: string;
  value: number;
  claimed: boolean;
  createdAt: number;
}
