import hre from "hardhat";

async function main() {
  const PublicICO = await hre.ethers.getContractFactory("PublicICO");

  const contract = await PublicICO.deploy();

  const contractAddress = await contract.getAddress();
  console.log(`Contract deployed to: ${contractAddress}`);

  await contract.createProject(
    "Test Mocked Project 1",
    "https://mag.wcoomd.org/uploads/2018/05/blank.pdf",
    "https://mag.wcoomd.org/uploads/2018/05/blank.pdf",
    "https://mag.wcoomd.org/uploads/2018/05/blank.pdf",
    "100000000000000000000",
    "0xfC95F24cf2Dc7205670E4Eb73aC7F743Add0bf57",
    { value: 5000000000000000000n }
  );

  await contract.contribute(0, { value: 1000000000000000000n });
  await contract.contribute(0, { value: 2000000000000000000n });

  await contract.createProject(
    "Test Mocked Project 2",
    "https://mag.wcoomd.org/uploads/2018/05/blank.pdf",
    "https://mag.wcoomd.org/uploads/2018/05/blank.pdf",
    "https://mag.wcoomd.org/uploads/2018/05/blank.pdf",
    "75000000000000000000",
    "0xfC95F24cf2Dc7205670E4Eb73aC7F743Add0bf57",
    { value: 12000000000000000000n }
  );

  await contract.contribute(1, { value: 1000000000000000000n });

  await contract.createProject(
    "Test Mocked Project 3",
    "https://mag.wcoomd.org/uploads/2018/05/blank.pdf",
    "https://mag.wcoomd.org/uploads/2018/05/blank.pdf",
    "https://mag.wcoomd.org/uploads/2018/05/blank.pdf",
    "130000000000000000000",
    "0xfC95F24cf2Dc7205670E4Eb73aC7F743Add0bf57",
    { value: 20000000000000000000n }
  );
}

main().catch(console.error);
