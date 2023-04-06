import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    instructions = [
        {
          target: 'Deposit',
          items: [
            {
              name: 'Deposit Amount',
              description: 'Enter the amount you would like to deposit.'
            },
            {
              name: 'Withrawal Password',
              description: 'Enter the password to be used when withdrawing the deposited amount. Password must be greater that 4 characters long have a maximum of 8 characters.'
            },
            {
              name: 'Confirm Password',
              description: 'Confirm your withdrawall password by re-entering it.'
            },
            {
              name: 'Confirm Deposit',
              description: "Click 'Confirm' to confirm the deposit, then a popup will show then click 'Send' to deposit the amount."
            },
            {
              name: 'Copy Wallet Address',
              description: "Wait for the transaction to complete, the a popoup will show with a Wallet Address which will be used with the password to withdraw the funds."
            },
            {
              name: 'Share Withdrawal Details',
              description: "Share the Wallet Address and Withdrawal Passwor with the Peer that you sending the funds to."
            }
          ]
        },
        {
          target: 'Withdraw',
          items: [
            {
              name: 'Contract Address',
              description: 'Enter Contract Address you received from the peer who deposited the funds.'
            },
            {
              name: 'Withrawal Address',
              description: 'Enter Address where you want the funds to be transfered to, or leave blank if you withdrawing to the connected wallet.'
            },
            {
              name: 'Withdrawal Password',
              description: 'Enter the Password you recieved from the peer who deposited the funds.'
            },
            {
              name: 'Confirm Withdrawal',
              description: "Click 'Confirm' to confirm the withdrawal, then a popup will show then click 'Withdraw' to withdraw the funds to specified address."
            }
          ]
        }
      ];

      getInstructions() {
        return this.instructions;
      }
}