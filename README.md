# Stealthy - Stealth Crypto Payment Platform

Stealthy is a stealth crypto payment platform built with Angular and Solidity. It allows users to send payments of TRC10 tokens psuedo-anonymously while providing a layer of privacy. The smart contracts have been deployed to Tron test networks with the following contract address:

**Address: TF7n3VPwofUergujURnouxtubN1GKtndLv**

## How it Works
```mermaid
graph TD;
    A[User Deposits Funds] --> B[Creates a Password];
    B --> C[Password is Hashed Off-Chain];
    C --> D[Hash is Sent to the Smart Contract];
    D --> E[Hash is Hashed Again in the Smart Contract];
    E --> F[Deposit Contract Generates a Disposable Smart Contract Wallet];
    F --> G[Secured by the Hashed Hash of the Password];
    G --> H[Withdrawer Calls the Withdraw Method in the Smart Contract Wallet];
    H --> I[Providing the Exchange/Non-Linked Account and the Raw Password];
    I --> J[Raw Password is Hashed and Hashed Again to Prove Ownership];
    J --> K[Funds are Released];
```

## Notice
Please note that the project is not audited and should only be used in testnet.

## License
This project is licensed under the MIT License.
