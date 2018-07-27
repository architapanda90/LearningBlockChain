pragma solidity ^0.4.24;

contract Lottery
{
    address public manager;
    address[] public player;
    
    function Lottery() public 
    {
        manager=msg.sender;
    }
    
    function Enter() public payable
    {
        require(msg.value>0.01 ether);
        player.push(msg.sender);
    }
    
    function random() private view returns(uint)
    {
         return uint(keccak256(block.difficulty,now,player));
    }
    
    function pickWinner() public restricted
    {
        //require(msg.sender==manager);
        uint index=random()%player.length;
        player[index].transfer(this.balance);
        player=new address[](0);
    }
    
    modifier restricted()
    {
        require(msg.sender==manager);
        _;
    }
    
    function getPlayers() public view returns(address[])
    {
        return player;
    }
}
        