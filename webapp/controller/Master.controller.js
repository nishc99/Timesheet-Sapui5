sap.ui.define(
    [
      "./Base.controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.example.timesheet.controller.Master", {
        onInit() {
          BaseController.prototype.onInit.call(this);
          this._oRouter.getRoute("master").attachPatternMatched(this.onViewPatternMatched, this);
          this._fetchRequestListData();
        },
        onViewPatternMatched: function () {
            this._oAppModel.updateBindings(true);
        },
        onRefresh:function(){
            this._fetchRequestListData();
        },
        _fetchRequestListData: function () {
         
            if (this._oComponent._oBackendModelAPI) {
  
              this._oComponent._oBackendModelAPI
                .getRequestList()
                .then(this.onRequestLoaded.bind(this))
                .catch(this.onRequestLoadFailed.bind(this));
            }
          },
          onRequestLoaded: function () {
            this._postProcessInitialDataLoad(true);
          },
  
          onRequestLoadFailed: function (oResponse) {
            this._postProcessInitialDataLoad(false);
          },
          _postProcessInitialDataLoad: function () {
            var aRequest =
              this._oAppModel.getProperty("/REQUEST_LIST") || [];
          },
          onListItemPress:function(oEvent){
            var oNextUIState =sap.f.LayoutType.TwoColumnsBeginExpanded;
            var oListItem =sap.ui.getCore().byId(oEvent.getParameter("id")).getBindingContext('app').sPath;
                if (oListItem) {
                    var index = oListItem.split("/")[2];
                } 
                this._showDetail(oNextUIState, index);
          },
          _showDetail: function(oNextUIState, oItem){
            this.getRouter().navTo("detail", {layout: oNextUIState, 
              NOTIFICATION_ID: oItem});
          },  
          onRequestApprove:function(){
            sap.m.MessageToast.show("Requests Approved");
          },
          onRequestReject:function(){
            sap.m.MessageToast.show("Requests Rejected");
          },
          onExit: function () {
            this._oComponent._oBackendModelAPI.abortAllRequests();
          }
      });
    }
  );
  