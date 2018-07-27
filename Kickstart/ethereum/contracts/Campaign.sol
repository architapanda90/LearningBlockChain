pragma solidity ^0.4.24;

contract CampaignFactory
{
    address[] public deployedContracts;
    
    function createCampaign(uint minimum) public
    {
        address newCampaign=new Campaign(minimum,msg.sender);//deploying campaign contract
        deployedContracts.push(newCampaign);
    }
    function getDeployedCampaigns() public view returns(address[])
    {
        return deployedContracts;
    }
    
}

contract Campaign
{
    struct Request//Request becomes a datatype by which a varibale can be declared
    {
        string description;//description of the request
        uint value;//amount to be requested to the contributors  or approvers by the manager to send to the vendor
        address receipient;//address of the vendor to whom the money has to be sent
        bool complete;//default is always false unless the request is completed
        uint approvalCount;//number of approvers who have voted yes
        mapping(address=>bool) approvals;//keep track of positive approvals. it is not required to be initialised as it is a reference type and not value type
        
        
    } 

    Request[] public request;//creating an array of requests of type Request.
    address public manager;//declaring the owner of the contract
    uint public minimumContribution;//minimum amount to be paid to make a contribution
   // address[] public approvers;//array of contributors or approvers of requests but it cannot be used because array implementation consume a lot of gas)
   mapping(address=>bool) approvers;//keep track of contributers who only approve yes
    uint totalApprovers=0;
    modifier restricted()//Created a modifier that can be used accross all functions
    {
        require(msg.sender==manager);
        _;
    } 
    
    function Campaign (uint minimum,address creator) public
    {
        manager=creator;
        minimumContribution=minimum;
    }
    
    function contibutors() public payable
    {
        require(msg.value>minimumContribution);
        approvers[msg.sender]=true;
        totalApprovers++;//Increments the count of approvers with each contribution
    }
    
    function createRequest(string description,uint value,address receipient) public restricted
    {
        Request memory newRequest = Request({
           description:description,
           value:value,
           receipient:receipient,
           complete:false,
           approvalCount:0
           //not required to initialise a mapping in structs
        });
        
        request.push(newRequest);
    }
    
    function approveRequests(uint index) public
    {
        //if required request[index] can be assigned to a local variable and used as given below:
        Request storage requests=request[index];
        
        require(approvers[msg.sender]=true);//check if the contributer has paid to become an approver
        
        //check if the approver has not voted
        //------------------------------------
        //require(!(request[index].approvals[msg.sender]=true));or
        require(!(requests.approvals[msg.sender]=true));
        
        //setting a approver as voted
        //--------------------------------------- 
        //request[index].approvals[msg.sender]=true;or
        requests.approvals[msg.sender]=true;
        
        //Incrementing the counter of the number of approvers who have voted.By voted I mean approver who has voted yes and not the approvers who have voted no or not voted at all
        //--------------------------------------------------------------------------------------------------------------------------------------------------
        //request[index].approvalCount++; or
        requests.approvalCount++;
    }
    
    function finaliseRequest(uint index) public restricted
    {
        Request storage requests=request[index];
        require(!requests.complete);//check if request has not been completed
        require(requests.approvalCount>(totalApprovers/2));//total no.of yes should be 50% of the total number of approvers
        
        requests.receipient.transfer(requests.value);//sending the request money to the vendor
        requests.complete=true;//setting request as completed
    }
}