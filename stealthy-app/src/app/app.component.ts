import { Component, OnInit } from '@angular/core';
import { ContractService } from './contract.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { ConfirmationService } from 'primeng/api';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Stealthy';
  year = new Date().getFullYear();
  copyMessage: any;

  instructions: any;
  
  chains = [
    {
      name: "Tron Testnet",
      chainId: "10200",
      contract: "0xdd7a3Fb3dAaEf50e1F693A5c780c784De0eD7fE6"
    }
  ];
  
  amount:number = 0
  password: string = "";
  confirmPassword: string = "";

  contract: string = "";
  toAddress: string = "";
  passwordWithdraw: string = "";
  
  loggedIn = false;
  wallet: string = "Connect Tronlink Wallet";
  walletHex: any;

  constructor(private service:ContractService, 
    private clipboard: Clipboard,
    private confirmationService: ConfirmationService,
    private dataService: DataService){
      this.instructions = dataService.getInstructions();
  }

  ngOnInit(): void {
    
  }

  async connectWallet(){
    if (window.tronWeb && window.tronWeb.defaultAddress.base58){
      this.wallet = window.tronWeb.defaultAddress.base58;
      this.walletHex = window.tronWeb.address.toHex(this.wallet);
      this.loggedIn = true;
    } else if (!window.tronWeb){
        alert("Please install and login to TronLink Wallet");
    } else if(!window.tronWeb.defaultAddress.base58){
        alert("Please login to your TronLink Wallet");
    }
    
  }

  correctPasswordFormat(type:string){
    if (type == 'send'){
      return this.password == this.confirmPassword && this.password.length == 8;
    }
    if (type == 'withdraw'){
      return this.passwordWithdraw.length == 8
    }
    return false;
  }

  sendfunds() {
    this.confirmationService.confirm({
      message: `Are you sure you want to deposit an amount of, ${this.amount}?`,
      header: 'Deposit Funds',
      accept: async () => {
        if(this.amount > 0 && this.correctPasswordFormat('send')) {
          await this.service.deposit(this.password, this.amount).then(address => {
            alert("Transaction confirmed, withdrawal addres: " + address + "Provide the address and password to the receiver.");
          }).catch(e => {

          });
        } else {
          alert("Input details are incorrect! Check and resubmit.");
        }
      }
    });
  }

  withdrawfunds(){
    this.confirmationService.confirm({
      message: `Are you sure you want to withdraw funds to address,  ${this.toAddress ? this.toAddress : this.wallet }?`,
      header: `Withdraw Funds`,
      accept: async () => {
        if(this.contract != "" && this.passwordWithdraw.length == 8){
          let withdrawalAddr = this.toAddress != "" ? this.toAddress : this.wallet; 
          await this.service.withdraw(this.passwordWithdraw, withdrawalAddr, this.contract).then(data => {
            alert("Transaction confirmed with status: " + data);
          }).catch(async e => {

          })
        } else {
          alert("Input details are incorrect! Check and resubmit.");
        }
      }
    });
  }

  cancelDeposit() {
    this.amount = 0;
    this.password = "";
    this.confirmPassword = "";
  }

  cancelWithdrawal() {
    this.contract = "";
    this.toAddress = "";
    this.passwordWithdraw = "";
  }

  copyAddress() {
    this.clipboard.copy(this.wallet);
  }

}
