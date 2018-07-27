const assert=require('assert');
const ganache=require('ganache-cli');
const Web3=require('web3');
const provider=ganache.provider();
const web3=new Web3(provider);
const {interface,bytecode}=require('../compile');

let accounts;
let lottery;

beforeEach(async () =>{
			accounts= await web3.eth.getAccounts();
			
			lottery=await new web3.eth.Contract(JSON.parse(interface)).
					deploy({data:bytecode}).send({from:accounts[0],gas:'1000000'});
			});

describe('Lottery Test' , async ()=>{
					it('Deploys a contract' , ()=>{
										assert.ok(lottery.options.address);
										});

					it('Allows entry of one player', async ()=>{
										await lottery.methods.Enter().send({from:accounts[0],value:web3.utils.toWei('0.02','ether')});
										const player=await lottery.methods.getPlayers().call({from:accounts[0]});
										assert.equal(accounts[0],player[0]);
										assert.equal(1,player.length);
					});

					it('Allows entry of multiple player', async ()=>{
										await lottery.methods.Enter().send({from:accounts[0],value:web3.utils.toWei('0.02','ether')});
																			
										await lottery.methods.Enter().send({from:accounts[1],value:web3.utils.toWei('0.02','ether')});
																				
										await lottery.methods.Enter().send({from:accounts[2],value:web3.utils.toWei('0.02','ether')});
										
										const player=await lottery.methods.getPlayers().call({from:accounts[0]});

										assert.equal(accounts[0],player[0]);
										assert.equal(accounts[1],player[1]);
										assert.equal(accounts[2],player[2]);
										assert.equal(3,player.length);
					});
						
					it('Player should send minimum ether to enter', async ()=>{
									try {
										await lottery.methods.Enter().send({from:accounts[0],value:0});
										assert(false);
									     }
									catch(err){assert(err);}
					});
					it('Manager can only pick up the winner', async ()=>{
									try{
										await lottery.methods.pickWinner.send({from:accounts[1]});	
										assert(false);
									   }
									catch(err){assert(err);}
					});
										

});
					
