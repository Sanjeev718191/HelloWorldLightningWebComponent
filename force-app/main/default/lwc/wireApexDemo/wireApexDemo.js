import { LightningElement, api, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';

export default class WireApexDemo extends LightningElement {
    @api recordId;
    @wire(getContacts, {accountId : '$recordId'})
    wiredContacts({ error, data }) {
        if (data) {
            console.log(data);
            
        } else if (error) {
            console.log(error);
        }
    }
    contacts;
    
}