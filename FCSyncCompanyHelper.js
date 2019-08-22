({
    
	syncCompany : function(component, event, helper) {
        var recordId = component.get('v.recordId');
        
        var action = component.get('c.syncCompany');
        action.setParams({ 
            recordId: recordId
        });
        action.setCallback(this, function (response) {             
            var state = response.getState();
            var allValues = response.getReturnValue();
            if (state === "SUCCESS") {     
                console.log('GET RECORD ID: ' +  response);
                //console.log('ALL VALUES ----- ' + allValues);
                //console.log('test name' + allValues.Name);
                /*
                console.log('ALL VALUES ----- ' + allValues);
                component.set('v.groupName', allValues.Name);
                component.set('v.fitchId', allValues.Fitch_Connect_ID__c);
                component.set('v.synced', allValues.FC_Synced__c);
                component.set('v.syncTime', allValues.FC_Sync_Time__c);
                */
                if(allValues.hasError){
                    this.displayToast(component, 'error', allValues.message);
                    component.set('v.syncingStatus', 'Not Synced');
                    component.set('v.error', allValues.objWrap.errors[0]);
                }else{
                    this.displayToast(component, 'success', 'Synced successfully!');
                    component.set('v.syncingStatus', 'Synced successfully!');
                }
            }
            else {
                this.displayToast(component, 'error', 'Error!');
            }
        });
        $A.enqueueAction(action);     
	},
    
    displayToast: function (component, type, message) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            type: type,
            message: message
        });
        toastEvent.fire();
    },
})