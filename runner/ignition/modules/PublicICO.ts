// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Apollo", (m) => {
  const contract = m.contract("PublicICO", []);

  // m.call(contract, "launch", []);

  return { apollo: contract };
});
