public with sharing class AnimalCaller {
    public static List<String> getAllAnimals() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        List<String> animalNames = new List<String>();
        if(response.getStatusCode() == 200) {
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            List<Object> animals = (List<Object>) results.get('animals');
            for(Object animal: animals) {
                animalNames.add(String.valueOf(animal));
            }
        }
        return animalNames;
    }
    public static String addAnimal(String name) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals');
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        request.setBody('{"name":"'+name+'"}');
        HttpResponse response = http.send(request);
        String res = '';
        if(response.getStatusCode() != 201) {
            res = 'Unable to add animal : ' + response.getStatusCode() + ' ' + response.getStatus();
        } else {
            res = 'Animal added successfully';
        }
        return res;
    }
}