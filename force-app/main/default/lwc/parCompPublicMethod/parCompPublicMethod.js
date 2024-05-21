import { LightningElement } from 'lwc';

export default class ParCompPublicMethod extends LightningElement {
    handleChangeEvent(event) {
        this.template.querySelector('c-child-Comp-Public-Method').changeMessage(event.target.value);
    }
}