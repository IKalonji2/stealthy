import { Injectable } from '@angular/core';
import { ethers, utils } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  DEPOSIT_CONTRACT = "TF7n3VPwofUergujURnouxtubN1GKtndLv";
  SPAMTOLL = 100000

  constructor() {}
  
  async withdraw(password: string, withdrawalAddr: string, contractAddr: string) {
    try {
        let instance = await window.tronWeb.contract().at(contractAddr);
        let res = await instance.transfer(password,withdrawalAddr).send({
            feeLimit:100_000_000,
            callValue:this.SPAMTOLL,
            shouldPollResponse:true
        });
        console.log(res);
		alert(res)
		return res;
    } catch (error) {
        console.log(error);
		alert(error)
    }

  }
  async deposit(password: string, amount: number) {
	const hashedPassword = utils.keccak256(utils.toUtf8Bytes(password));
	const amountInSUN = amount * 1000000
    try {
        let instance = await window.tronWeb.contract().at(this.DEPOSIT_CONTRACT);
        let res = await instance.deposit(hashedPassword).send({
            feeLimit:100_000_000,
            callValue: amountInSUN,
            shouldPollResponse:true
        });
        console.log(res);
		alert(res)
		return res;
    } catch (error) {
        console.log(error);
		alert(error)
    }

  }

}

const StealthyABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "withdrawAddress",
				"type": "address"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_hashedPassword",
				"type": "bytes32"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]

const StealthyWithdrawalABI = [
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_withdrawalHash",
				"type": "bytes32"
			}
		],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "withdrawAddress",
				"type": "address"
			}
		],
		"name": "Withdraw",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "toAddress",
				"type": "address"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]
