import { LightningElement, api } from 'lwc';

export default class ChildPublicProperty extends LightningElement {
    @api message;
}