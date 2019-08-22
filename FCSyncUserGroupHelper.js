({
    
	syncUserGroup : function(component, event, helper) {
        var recordId = component.get('v.recordId');
        
        var action = component.get('c.syncUsers');
        action.setParams({ 
            recordId: recordId
        });
        action.setCallback(this, function (response) {             
            var state = response.getState();
            var allValues = response.getReturnValue();
            if (state === "SUCCESS") {     
                //console.log('ALL VALUES ----- ' + allValues);
                //console.log('test name' + allValues.Name);
                /*
                console.log('ALL VALUES ----- ' + allValues);
                component.set('v.groupName', allValues.Name);
                component.set('v.fitchId', allValues.Fitch_Connect_ID__c);
                component.set('v.synced', allValues.FC_Synced__c);
                component.set('v.syncTime', allValues.FC_Sync_Time__c);
                */
                //allValues.objWrap.errors.error
                //allValues.objWrap.errors.message
                //allValues.objWrap.errors.status
                //allValues.objWrap.errors.timestamp
                console.log('checkpoint 1 : '+JSON.stringify(allValues));
                /*console.log('checkpoint 2 : '+allValues.objWrap.errors[0].error);
                console.log('checkpoint 3 : '+allValues.objWrap.errors[0].message);
                console.log('checkpoint 4 : '+allValues.objWrap.errors[0].status);
                console.log('checkpoint 5 : '+allValues.objWrap.errors[0].timestamp);*/
                if(allValues.hasError){
                    this.displayToast(component, 'error', allValues.message);
                    component.set('v.syncingStatus', 'Not Synced');
                    component.set('v.error', allValues.objWrap.errors[0]);
                }else{
                    this.displayToast(component, 'success', 'Synced successfully!');
                    component.set('v.syncingStatus', 'Synced successfully!');
                }
                
                //component.set('v.spinner', false);
            }
            else {
                this.displayToast(component, 'error', 'Error!');
                //component.set('v.spinner', false);
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