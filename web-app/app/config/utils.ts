import { BigNumberish, formatUnits } from "ethers";

export const convertTimestampToDate = (timestamp: BigNumberish) =>
  new Date(Number(timestamp) * 1000);

export const calculateFundingProgress = (
  targetFunding: BigNumberish,
  totalFunding: BigNumberish
) =>
  Number(
    (
      (Number(formatUnits(totalFunding, "ether")) /
        Number(formatUnits(targetFunding, "ether"))) *
      100
    ).toFixed(2)
  );
