import { LightningElement, api, track } from 'lwc';

export default class ChildCompPublicMethod extends LightningElement {
    @track message;

    @api
    changeMessage(str) {
        this.message = str;
    }
}