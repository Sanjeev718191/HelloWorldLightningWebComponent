import { LightningElement } from 'lwc';
import pubsub from 'c/pubSub' ; 

export default class SubscriberComp extends LightningElement {
    message;
    connectedCallback(){
        this.register();
    }
    register(){
        pubsub.register('simplevt', this.handleEvent.bind(this));
    }
    handleEvent(messageFromEvt){
        this.message = messageFromEvt ? JSON.stringify(messageFromEvt) : 'no message payload';
    }
}