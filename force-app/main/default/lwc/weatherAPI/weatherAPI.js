import { LightningElement } from 'lwc';
import getWeather from '@salesforce/apex/WeatherAPI.getWeather';

export default class WeatherAPI extends LightningElement {

    city;
    imageURL;
    condition;
    temp;
    windSpeed;

    handleonchange(event) {
        this.city = event.target.value;
    }

    buttonClick() {
        getWeather({city:this.city}).then((response) => {
            console.log("Response ---->  "+response);
            let parseDate = JSON.parse(response);
            this.imageURL = parseDate.current.condition.icon;
            this.condition = parseDate.current.condition.text;
            this.temp =  "Temprature : "+ parseDate.current.temp_c + " C";
            this.windSpeed = "Wind Speed : "+parseDate.current.wind_kph + " kmph";
        }) .catch((error) => {
            this.condition = 'No matching location found';
            console.log(error);
        })
    }

    renderedCallback() {
        if (this.videoElement) {
            return;
        }
        this.videoElement = this.template.querySelector('video');
        if (this.videoElement) {
            this.videoElement.muted = true;
        }
    }

}