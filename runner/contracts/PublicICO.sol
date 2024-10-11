// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import "./SampleContract.sol";

contract PublicICO {
    struct TokenDetails {
        string tokenTicker;
        uint totalSupply;
        uint tokenDistribution;
    }

    struct FundingDetails {
        uint ownFunding;
        uint targetFunding;
        uint totalFunding;
        address payable fundingWallet;
    }
    struct Project {
        uint id;
        string title;
        address creator;
        string whitePaper;
        string projectPlan;
        TokenDetails tokenDetails;
        FundingDetails fundingDetails;
        uint deadline;
        bool applied;
    }

    struct Contribution {
        uint projectId;
        string projectTitle;
        address contributor;
        uint value;
        bool claimed;
        uint createdAt;
    }

    mapping(uint => Project) public projects;
    mapping(uint => Contribution[]) public contributions;
    uint public projectCount;
    uint256 public contractCount;
    address[] public deployedContracts;

    event ProjectCreated(Project project);
    event ContributionReceived(Contribution contribution);
    event FundsClaimed(uint projectId, address contributor, uint amount);
    event ProjectApplied(Project project);
    event ContractDeployed(address contractAddress);

    modifier onlyCreator(uint projectId) {
        require(
            msg.sender == projects[projectId].creator,
            "Only the project creator can perform this action."
        );
        _;
    }

    modifier projectExists(uint projectId) {
        require(projectId < projectCount, "Project not found.");
        _;
    }

    modifier projectActive(uint projectId) {
        require(
            block.timestamp < projects[projectId].deadline,
            "Project deadline expired."
        );
        _;
    }

    modifier projectExpired(uint projectId) {
        require(
            block.timestamp >= projects[projectId].deadline,
            "Project deadline has not yet expired."
        );
        _;
    }

    modifier targetAchieved(uint projectId) {
        require(
            projects[projectId].fundingDetails.totalFunding >=
                projects[projectId].fundingDetails.targetFunding,
            "Target value not reached."
        );
        _;
    }

    constructor() {
        projectCount = 0;
        contractCount = 0;
    }

    function createProject(
        string memory title,
        string memory whitePaper,
        string memory projectPlan,
        string memory tokenTicker,
        uint totalSupply,
        uint tokenDistribution,
        uint targetFunding,
        address payable fundingWallet
    ) external payable {
        require(msg.value > 0, "Project creator needs to lock in a value.");
        require(
            bytes(tokenTicker).length > 0 && bytes(tokenTicker).length <= 5,
            "tokenTicker must be up to 5 characters long."
        );
        require(
            tokenDistribution >= 0 && tokenDistribution <= 100,
            "tokenDistribution must be between 0 and 100 characters long."
        );

        uint deadline = block.timestamp + 90 days;

        TokenDetails memory tokenDetails = TokenDetails({
            tokenTicker: tokenTicker,
            totalSupply: totalSupply,
            tokenDistribution: tokenDistribution
        });

        FundingDetails memory fundingDetails = FundingDetails({
            ownFunding: msg.value,
            targetFunding: targetFunding,
            totalFunding: msg.value,
            fundingWallet: fundingWallet
        });

        Project memory newProject = Project({
            id: projectCount,
            creator: msg.sender,
            title: title,
            whitePaper: whitePaper,
            projectPlan: projectPlan,
            tokenDetails: tokenDetails,
            fundingDetails: fundingDetails,
            deadline: deadline,
            applied: false
        });

        projects[projectCount] = newProject;

        emit ProjectCreated(newProject);

        projectCount++;
    }

    function deployContract(
        string memory name,
        string memory ticker,
        uint256 totalSupply
    ) private returns (address) {
        SampleContract token = new SampleContract(name, ticker, totalSupply);
        // token.transfer(msg.sender, totalSupply);
        deployedContracts.push(address(token));
        contractCount += 1;

        emit ContractDeployed(address(token));
        return address(token);
    }

    function contribute(
        uint projectId
    ) external payable projectExists(projectId) projectActive(projectId) {
        require(msg.value > 0, "Contribution must have a value.");

        Project storage project = projects[projectId];
        project.fundingDetails.totalFunding += msg.value;

        Contribution memory newContribution = Contribution({
            projectId: project.id,
            projectTitle: project.title,
            contributor: msg.sender,
            value: msg.value,
            claimed: false,
            createdAt: block.timestamp
        });
        contributions[projectId].push(newContribution);

        emit ContributionReceived(newContribution);
    }

    function claimFunds(uint projectId) external projectExists(projectId) {
        Project storage project = projects[projectId];
        require(!project.applied, "The project has already been applied.");

        uint totalContribution = 0;

        Contribution[] storage projectContributions = contributions[projectId];
        for (uint i = 0; i < projectContributions.length; i++) {
            if (
                projectContributions[i].contributor == msg.sender &&
                !projectContributions[i].claimed
            ) {
                totalContribution += projectContributions[i].value;

                projectContributions[i].claimed = true;
            }
        }

        require(totalContribution > 0, "No contributions to be claimed.");

        project.fundingDetails.totalFunding -= totalContribution;

        payable(msg.sender).transfer(totalContribution);

        emit FundsClaimed(projectId, msg.sender, totalContribution);
    }

    function applyProject(
        uint projectId
    )
        external
        projectExists(projectId)
        onlyCreator(projectId)
        projectActive(projectId)
        targetAchieved(projectId)
    {
        Project storage project = projects[projectId];
        require(!project.applied, "The project has already been applied.");

        project.applied = true;

        deployContract(
            project.title,
            project.tokenDetails.tokenTicker,
            project.tokenDetails.totalSupply
        );

        project.fundingDetails.fundingWallet.transfer(
            project.fundingDetails.totalFunding
        );

        emit ProjectApplied(project);
    }

    function listActiveProjects() external view returns (Project[] memory) {
        Project[] memory activeProjects = new Project[](projectCount);
        uint counter = 0;

        for (uint i = 0; i < projectCount; i++) {
            if (
                block.timestamp < projects[i].deadline && !projects[i].applied
            ) {
                activeProjects[counter] = projects[i];
                counter++;
            }
        }

        return activeProjects;
    }

    function listClosedProjects() external view returns (Project[] memory) {
        Project[] memory closedProjects = new Project[](projectCount);
        uint counter = 0;

        for (uint i = 0; i < projectCount; i++) {
            if (block.timestamp > projects[i].deadline || projects[i].applied) {
                closedProjects[counter] = projects[i];
                counter++;
            }
        }

        return closedProjects;
    }

    function retrieveProject(
        uint projectId
    ) external view projectExists(projectId) returns (Project memory) {
        return projects[projectId];
    }

    function listProjectContributions(
        uint projectId
    ) external view projectExists(projectId) returns (Contribution[] memory) {
        return contributions[projectId];
    }

    function getMyContributions()
        external
        view
        returns (Contribution[] memory)
    {
        uint totalContributions = 0;

        for (uint i = 0; i < projectCount; i++) {
            Contribution[] storage projectContributions = contributions[i];
            for (uint j = 0; j < projectContributions.length; j++) {
                if (projectContributions[j].contributor == msg.sender) {
                    totalContributions++;
                }
            }
        }

        Contribution[] memory myContributions = new Contribution[](
            totalContributions
        );
        uint index = 0;

        for (uint i = 0; i < projectCount; i++) {
            Contribution[] storage projectContributions = contributions[i];
            for (uint j = 0; j < projectContributions.length; j++) {
                if (projectContributions[j].contributor == msg.sender) {
                    myContributions[index] = projectContributions[j];
                    index++;
                }
            }
        }

        return myContributions;
    }
}
