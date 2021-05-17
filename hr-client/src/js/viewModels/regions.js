/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['knockout',
'ojs/ojmodel',
'ojs/ojcollectiondataprovider',
'ojs/ojlabel',
'ojs/ojchart',
'ojs/ojlistview',"ojs/ojinputtext","ojs/ojformlayout","ojs/ojtoolbar",
'ojs/ojavatar',"ojs/ojtable", "ojs/ojcheckboxset", "ojs/ojinputnumber", "ojs/ojinputtext", "ojs/ojdialog", "ojs/ojbutton"],
 function(ko, Model,CollectionDataProvider) {
    function RegionsViewModel() {
     var restUrl = "http://localhost:7101/RestWebService-RESTWebService-context-root/rest/v0/region";
     var self = this;
     self.regionId = ko.observable();
     self.regionName = ko.observable();
     self.firstSelected = ko.observable();
     self.activityDataProvider = ko.observable(); 
     var regionModel = Model.Model.extend({
       urlRoot :  'http://localhost:7101/RestWebService-RESTWebService-context-root/rest/v0/region',
       
       idAttribute : 'RegionId'
      
     });
     self.region = new regionModel();
     var regionCollection = new Model.Collection.extend({
        url :  'http://localhost:7101/RestWebService-RESTWebService-context-root/rest/v0/region',
        model : self.region,
        comparator : 'id'

     });
     this.parseRegions = (response) => {
       console.log(repomse.items);
      return repomse.items;
     }
     this.parseRegion = (response) => {
      console.log("I am here");
      return {
          RegionId: response["RegionId"],
          RegionName: response["RegionName"],
      };
  };
     self.regions = new regionCollection();
     
     self.activityDataProvider(new CollectionDataProvider(self.regions));
    
     this.firstSelectedRowChangedListener = (event) =>{
        const itemContext = event.detail.value;
        console.log(itemContext);
                  if (itemContext && itemContext.data) {
                      console.log(itemContext.data);
                      const region = itemContext.data;
                      self.regionId(region.RegionId);
                      self.regionName(region.RegionName);
                  }
     };
     this.updateRow = () => {
      
            const element = document.getElementById("table");
            console.log(element)
            const currentRow = element.currentRow;
            console.log(currentRow);
            console.log(self.regionId);
            const myModel = self.regions.get(self.regionId());
            console.log(myModel);
            if (currentRow != null) {
                myModel.save({
                    RegionName: self.regionName()
                }, {
                    
                  
                    success: (myModel, response, options) => {
                        alert("Update Passed " );
                    },
                    error: (jqXHR, textStatus, errorThrown) => {
                        alert("Update failed with: " + textStatus);
                       
                    }
                });
                
            }
        
    };
    this.removeRow = (event, data) => {
       
            const model = self.regions.get(self.regionId());
            if (model) {
                self.regions.remove(model);
                model.destroy();
            }
        document.getElementById("table").refresh();
        self.regionId('');
        self.regionName('');
    };
    this.addRow = () => {
        const recordAttrs = {
            RegionId : Math.random(),
            RegionName: self.regionName()
        };
        console.log(recordAttrs)
        self.regions.create(recordAttrs, {
            wait: true,
            success: (model, response) => {
                alert("Create Sucessful " );
             },
            error: (jqXHR, textStatus, errorThrown) => { 
                alert("Update Sucessful " );
            },
        });
    
};
      this.connected = () => {
        accUtils.announce('Incidents page loaded.', 'assertive');
        document.title = "Incidents";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return RegionsViewModel;
  }
);
