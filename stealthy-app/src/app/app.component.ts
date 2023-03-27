import { Component, OnInit } from '@angular/core';
import { ContractService } from './contract.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'stealthy-app';
  navItems = [
    {
      label: 'stealthy',
    }
  ]
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

  constructor(private service:ContractService){
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

  sendfunds(){
    if(this.amount > 0 && this.correctPasswordFormat('send')){
      const _address = this.service.deposit(this.password, this.amount);
      alert("Transaction confirmed, withdrawal addres: " + _address + "Provide the address and password to the receiver.")
      return;
    }
    alert("Input details are incorrect! Check and resubmit.")
  }

  withdrawfunds(){
    if(this.contract != "" && this.passwordWithdraw.length == 8){
      let withdrawalAddr = this.toAddress != "" ? this.toAddress : this.wallet; 
      const success = this.service.withdraw(this.passwordWithdraw, withdrawalAddr, this.contract);
      alert("Transaction confirmed with status: " + success);
      return;
    }
    alert("Input details are incorrect! Check and resubmit.")
  }

}
