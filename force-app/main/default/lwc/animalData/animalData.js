import { LightningElement, wire, track } from 'lwc';
import image from "@salesforce/resourceUrl/animal_img";
import getAllAnimals from '@salesforce/apex/AnimalCaller.getAllAnimals';
import addAnimal from '@salesforce/apex/AnimalCaller.addAnimal';

export default class AnimalData extends LightningElement {
    @track animals =  new Array();
    error;
    inputValue = '';
    animalLogo = image;

    @wire(getAllAnimals)
    wiredAnimals({ error, data }) {
        if (data) {
            //this.animals = data;
            data.forEach(element => {
                this.animals.push(element);
            });
            this.error = undefined;
        } else if (error) {
            this.animals = undefined;
            this.error = error;
        }
    }

    handleInputChange(event) {
        this.inputValue = event.target.value;
    }

    addAnimal() {
        if(this.inputValue.length > 2) {
            this.animals.push(this.inputValue);
            // addAnimal({ name : this.inputValue })
            // .then(result => {
            //     alert(result);
            // })
            // .catch(error => {
            //     alert(error);
            // })
        } else {
            alert('Please enter animal name with atleast 3 char');
        }
    }
    
}