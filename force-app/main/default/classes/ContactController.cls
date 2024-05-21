public with sharing class ContactController {
    @AuraEnabled
    public static List<Contact> getContacts(String accountId){
        try {
            return [
                Select AccountId, Id, FirstName 
                From Contact 
                Where AccountId =:accountId 
                With SECURITY_ENFORCED
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}