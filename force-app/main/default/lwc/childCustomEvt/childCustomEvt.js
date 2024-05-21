import { LightningElement } from 'lwc';

export default class ChildCustomEvt extends LightningElement {
    handleChange(evt) {
        evt.preventDefault();
        const myEvent = new CustomEvent('myevent', {
            detail : evt.target.value
        });
        this.dispatchEvent(myEvent);
    }
}