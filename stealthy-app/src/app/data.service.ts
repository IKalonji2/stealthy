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
            }
          ]
        }
      ];

      getInstructions() {
        return this.instructions;
      }
}