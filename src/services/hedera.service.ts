import { Injectable } from "@angular/core";
import { Client,
        PrivateKey,
        AccountId,
        FileCreateTransaction,
        ContractCreateTransaction,
        ContractFunctionParameters,
        ContractExecuteTransaction,
        ContractCallQuery,
        Hbar} from "@hashgraph/sdk";
import { environment } from "src/environments/environment";

@Injectable(
    {providedIn: 'root'}
)

export class HederaService {
    
    accountID:any = AccountId.fromString(environment.hederaAccountID);
    accoutPrivateKey:any = PrivateKey.fromString(environment.hederaPrivateKey);
    client:any

    constructor(){
        if ( this.accountID == null ||
            this.accoutPrivateKey == null
        ){
            throw new Error("Account ID and Private Key need to be set in the Environment");
        }

        this.client = Client.forTestnet()
        this.client.setOperator(this.accountID, this.accoutPrivateKey);
    }
    
}