// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract PublicICO {
    struct Project {
        uint id;
        string title;
        address creator;
        string whitePaper;
        string projectPlan;
        string contractCode;
        uint ownFunding;
        uint targetFunding;
        uint totalFunding;
        address payable fundingWallet;
        uint deadline;
        bool applied;
    }

    struct Contribution {
        address contributor;
        uint value;
        bool claimed;
        uint createdAt;
    }

    mapping(uint => Project) public projects;
    mapping(uint => Contribution[]) public contributions;
    uint public projectCount;

    event ProjectCreated(
        uint projectId,
        string title,
        address creator,
        string whitePaper,
        string projectPlan,
        uint targetFunding,
        uint deadline
    );
    event ContributionReceived(
        uint projectId,
        address contributor,
        uint amount
    );
    event FundsClaimed(uint projectId, address contributor, uint amount);
    event ProjectApplied(uint projectId, address creator, uint totalFunding);

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
            projects[projectId].totalFunding >=
                projects[projectId].targetFunding,
            "Target value not reached."
        );
        _;
    }

    constructor() {
        projectCount = 0;
    }

    function createProject(
        string memory title,
        string memory whitePaper,
        string memory projectPlan,
        string memory contractCode,
        uint targetFunding,
        address payable fundingWallet
    ) external payable {
        require(msg.value > 0, "Project creator needs to lock in a value.");

        uint deadline = block.timestamp + 90 days;

        Project memory newProject = Project({
            id: projectCount,
            creator: msg.sender,
            title: title,
            whitePaper: whitePaper,
            projectPlan: projectPlan,
            contractCode: contractCode,
            ownFunding: msg.value,
            targetFunding: targetFunding,
            totalFunding: msg.value,
            fundingWallet: fundingWallet,
            deadline: deadline,
            applied: false
        });

        projects[projectCount] = newProject;

        emit ProjectCreated(
            projectCount,
            title,
            msg.sender,
            whitePaper,
            projectPlan,
            targetFunding,
            deadline
        );

        projectCount++;
    }

    function contribute(
        uint projectId
    ) external payable projectExists(projectId) projectActive(projectId) {
        require(msg.value > 0, "Contribution must have a value.");

        Project storage project = projects[projectId];
        project.totalFunding += msg.value;

        Contribution memory newContribution = Contribution({
            contributor: msg.sender,
            value: msg.value,
            claimed: false,
            createdAt: block.timestamp
        });
        contributions[projectId].push(newContribution);

        emit ContributionReceived(projectId, msg.sender, msg.value);
    }

    function claimFunds(
        uint projectId
    ) external projectExists(projectId) projectExpired(projectId) {
        Project storage project = projects[projectId];
        require(
            project.totalFunding < project.targetFunding,
            "Target value has been reached. Unable to redeem."
        );

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

        project.totalFunding -= totalContribution;

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

        // TODO: Contract creation using a Factory.

        project.fundingWallet.transfer(project.totalFunding);

        emit ProjectApplied(projectId, project.creator, project.totalFunding);
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
}
