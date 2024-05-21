import { LightningElement, track, api } from 'lwc';
import getObjectData from '@salesforce/apex/ObjectDataController.getObjects';
import getAttributes from '@salesforce/apex/ObjectDataController.getAttributes';
import runSOQLLimitQuery from '@salesforce/apex/ObjectDataController.runSOQLLimitQuery';

export default class LwcAssignment extends LightningElement {
    @track objectsMap = [];
    @track availableFields = [];
    @track selectedFields = [];
    @track fieldMap = new Map();
    @track query = '';
    @track queryVisibility = false;
    @track soqlDataVisibility = false;
    @track columns = [];
    @track queryData = [];
    
    selectedObjectName;
    queryLimit;

    connectedCallback() {
        this.doInit();
    }

    async doInit() {
        try {
            const data = await getObjectData();
            if (data) {
                this.objectsMap = Object.entries(data)
                    .filter(([key]) => !key.startsWith('__MISSING'))
                    .map(([key, value]) => ({ label: key, value : value }));
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    async getObjectAttributes(event) {
        this.resetData();
        this.selectedObjectName = event.target.value;
        try {
            const fieldMap = await getAttributes({ objectName: this.selectedObjectName });
            if (fieldMap) {
                for(let key in fieldMap) {
                    if(fieldMap.hasOwnProperty(key)) {
                        let item = {
                            "label": key,
                        	"value": fieldMap[key]
                        }
                    	this.availableFields.push(item);
                        this.fieldMap.set(fieldMap[key], key);
                    }
                }
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    setSelectedFields(event) {
        this.selectedFields = event.detail.value;
    }

    setLimit(event) {
        this.queryLimit = Number(event.detail.value);
    }

    showQuery() {
        if(this.selectedFields.length > 0) {
            if(this.queryLimit) {
                if(this.queryLimit > 0 && this.queryLimit <= 50000) {
                    this.query = `Select ${this.selectedFields.join(', ')} From ${this.selectedObjectName} Limit ${this.queryLimit}`;
                    this.queryVisibility = true;
                } else {
                    alert("Please enter limit between 1 to 50000");
                }
            } else {
                alert("Please enter Limit");
            }
        } else {
            alert("Please select object and fields");
        }
    }

    async runQuery() {
        try {
            const data = await runSOQLLimitQuery({
                query : this.query
            });
            if (data && data.length > 0) {
                this.queryData = data;
                this.columns = this.selectedFields.map(field => ({
                    label: this.fieldMap.get(field),
                    fieldName: field,
                    type: 'text'
                }));
                this.soqlDataVisibility = true;
            } else {
                alert('No data found');
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    resetData() {
        this.availableFields = [];
        this.selectedFields = [];
        this.query = '';
        this.queryVisibility = false;
        this.soqlDataVisibility = false;
        this.columns = [];
        this.queryData = [];
    }

    handleError(error) {
        console.error('Error: ', error);
        const toastEvent = new ShowToastEvent({
            title: 'Error!',
            message: error.body.message,
            variant: 'error'
        });
        this.dispatchEvent(toastEvent);
    }
}