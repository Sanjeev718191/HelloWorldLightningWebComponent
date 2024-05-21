import { LightningElement } from 'lwc';

export default class ParCustomEvt extends LightningElement {
    message;
    constructor() {
        super();   
        this.template.addEventListener('myevent', this.handleCustomEvent.bind(this));
    }

    handleCustomEvent(event) {
        this.message = event.detail;
    }
}