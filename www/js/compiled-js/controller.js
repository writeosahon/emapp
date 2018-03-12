/**
 * Created by UTOPIA SOFTWARE on 19/02/2018.
 */

/**
 * file defines all View-Models, Controllers and Event Listeners used by the app
 *
 * The 'utopiasoftware.emap' namespace has being defined in the base js file.
 * The author uses the terms 'method' and function interchangeably; likewise the terms 'attribute' and 'property' are
 * also used interchangeably
 */


// define the controller namespace
utopiasoftware.emap.controller = {

    /**
     * method contains the stratup/bootstrap code needed to initiate app logic execution
     */
    startup: function(){

        // initialise the onsen library
        ons.ready(function () {
            // set the default handler for the app
            ons.setDefaultDeviceBackButtonListener(function(){
                // does nothing for now!!
            });

            // displaying prepping message
            $('#loader-modal-message').html("Loading App...");
            //$('#loader-modal').get(0).show(); // show loader

            if(localStorage.getItem("app-status") && localStorage.getItem("app-status") !== ""){ // there is a previous logged in user

            }
            else{ // no previous logged in user
                // load the signup page
                $('ons-splitter').get(0).content.load("signup-template");
            }

            // load the app 1st page
            //$('ons-splitter').get(0).content.load("app-main-template");

            // START ALL CORDOVA PLUGINS CONFIGURATIONS
            try {
                // lock the orientation of the device to 'PORTRAIT'
                screen.lockOrientation('portrait');
            }
            catch(err){}

            // set status bar color
            StatusBar.backgroundColorByHexString("#DC723D");
            navigator.splashscreen.hide(); // hide the splashscreen

            utopiasoftware.emap.model.isAppReady = true; // true that app is fully loaded and ready


        }); // end of ons.ready()

    },


    /**
     * object is the view-model of the signup page
     */
    signupPageViewModel: {

        /**
         * event is triggered when page is initialised
         */
        pageInit: function(event){

            var $thisPage = $(event.target); // get the current page shown
            // disable the swipeable feature for the app splitter
            $('ons-splitter-side').removeAttr("swipeable");

            // call the function used to initialise the app page if the app is fully loaded
            loadPageOnAppReady();

            //function is used to initialise the page if the app is fully ready for execution
            function loadPageOnAppReady(){
                // check to see if onsen is ready and if all app loading has been completed
                if(!ons.isReady() || utopiasoftware.emap.model.isAppReady === false){
                    setTimeout(loadPageOnAppReady, 500); // call this function again after half a second
                    return;
                }

                // listen for the back button event
                $thisPage.get(0).onDeviceBackButton = utopiasoftware.emap.controller.signupPageViewModel.backButtonClicked;

                // hide the loader
                $('#loader-modal').get(0).hide();

            }

        },

        /**
         * method is triggered when page is shown
         */
        pageShow: function(){
            // disable the swipeable feature for the app splitter
            $('ons-splitter-side').removeAttr("swipeable");
            //$('#menu-tabbar .tabbar__border').css("visibility", "hidden");
        },


        /**
         * method is triggered when page is hidden
         */
        pageHide: function(){
            // stop the rotating animation on main menu page
            //$('.rotating-infinite-ease-in-1').addClass('rotating-infinite-ease-in-1-paused');
        },

        /**
         * method is triggered when page is destroyed
         */
        pageDestroy: function(){
            // stop the rotating animation on main menu page
            //$('.rotating-infinite-ease-in-1').addClass('rotating-infinite-ease-in-1-paused');
        },

        /**
         * method is triggered when back button or device back button is clicked
         */
        backButtonClicked: function(){

            // check if the side menu is open
            if($('ons-splitter').get(0).right.isOpen){ // side menu open, so close it
                $('ons-splitter').get(0).right.close();
                return; // exit the method
            }

            ons.notification.confirm('Do you want to close the app?', {title: 'Exit App',
                    buttonLabels: ['No', 'Yes']}) // Ask for confirmation
                .then(function(index) {
                    if (index === 1) { // OK button
                        navigator.app.exitApp(); // Close the app
                    }
                });
        }
    },

    /**
     * object is view-model for toc page
     */
    tocPageViewModel: {


        /**
         * property holds the toc date picker
         */
        tocDatePicker: null,

        /**
         * property holds the grid for toc
         */
        tocGrid: null,

        /**
         * event is triggered when page is initialised
         */
        pageInit: function(event){

            var $thisPage = $(event.target); // get the current page shown
            // disable the swipeable feature for the app splitter
            $('ons-splitter-side').removeAttr("swipeable");

            // call the function used to initialise the app page if the app is fully loaded
            loadPageOnAppReady();

            //function is used to initialise the page if the app is fully ready for execution
            function loadPageOnAppReady(){
                // check to see if onsen is ready and if all app loading has been completed
                if(!ons.isReady() || utopiasoftware.emap.model.isAppReady === false){
                    setTimeout(loadPageOnAppReady, 500); // call this function again after half a second
                    return;
                }

                // listen for the back button event
                $thisPage.get(0).onDeviceBackButton = utopiasoftware.emap.controller.tocPageViewModel.backButtonClicked;

                // inject the the modules required to create the transaction history grid
                ej.grids.Grid.Inject(ej.grids.Page, ej.grids.Selection, ej.grids.Scroll, ej.grids.Search, ej.grids.Toolbar,
                    ej.grids.DetailRow,
                    ej.grids.PdfExport, ej.grids.ExcelExport, ej.grids.Group, ej.grids.Aggregate);

                // create the date picker
                utopiasoftware.emap.controller.tocPageViewModel.tocDatePicker =
                    new ej.calendars.DatePicker({
                        placeholder: 'Pick Meeting Date',
                        floatLabelType: 'Auto',
                        readonly: true,
                        // sets the value.
                        value: new Date(),
                        // sets the min date
                        //min: new Date(),
                        //sets the max date
                        //max: new Date(),
                        format: 'yyyy-MM-dd',
                        focus: function(){ // listen for when component has focus
                            // open the date picker
                            utopiasoftware.emap.controller.tocPageViewModel.tocDatePicker.show();
                        },
                        change: function(){

                            utopiasoftware.emap.controller.tocPageViewModel.
                            updateTocGrid(kendo.toString(utopiasoftware.emap.controller.tocPageViewModel.
                                tocDatePicker.value, 'yyyy-MM-dd'));
                        }
                    });

                // render initialized toc DatePicker
                utopiasoftware.emap.controller.tocPageViewModel.tocDatePicker.
                appendTo('#toc-date-picker');

                utopiasoftware.emap.controller.tocPageViewModel.
                updateTocGrid(kendo.toString(utopiasoftware.emap.controller.tocPageViewModel.tocDatePicker.value, 'yyyy-MM-dd'));

                // hide the loader
                $('#loader-modal').get(0).hide();

            }

        },

        /**
         * method is triggered when page is shown
         */
        pageShow: function(){
            // disable the swipeable feature for the app splitter
            $('ons-splitter-side').removeAttr("swipeable");
            //$('#menu-tabbar .tabbar__border').css("visibility", "hidden");
        },


        /**
         * method is triggered when page is hidden
         */
        pageHide: function(){
            // stop the rotating animation on main menu page
            //$('.rotating-infinite-ease-in-1').addClass('rotating-infinite-ease-in-1-paused');
        },

        /**
         * method is triggered when page is destroyed
         */
        pageDestroy: function(){
            // stop the rotating animation on main menu page
            //$('.rotating-infinite-ease-in-1').addClass('rotating-infinite-ease-in-1-paused');
        },

        /**
         * method is triggered when back button or device back button is clicked
         */
        backButtonClicked: function(){

            // check if the side menu is open
            if($('ons-splitter').get(0).right.isOpen){ // side menu open, so close it
                $('ons-splitter').get(0).right.close();
                return; // exit the method
            }

            ons.notification.confirm('Do you want to close the app?', {title: 'Exit App',
                    buttonLabels: ['No', 'Yes']}) // Ask for confirmation
                .then(function(index) {
                    if (index === 1) { // OK button
                        navigator.app.exitApp(); // Close the app
                    }
                });
        },

        /**
         * method is used to create/update the toc grid component
         */
        updateTocGrid: function(meetingDateString){

            // check if the TOC Grid has been created before, if so, show spinner
            if(utopiasoftware.emap.controller.tocPageViewModel.tocGrid){ // grid has previously been created
                // show spinner for the grid object
                utopiasoftware.emap.controller.tocPageViewModel.tocGrid.showSpinner();
            }

            // call the method that will load the table of content for the exco meeting
            utopiasoftware.emap.controller.tocPageViewModel.
            tocFileReader(meetingDateString, "content.json").
            then(function(dataObject){
                if(utopiasoftware.emap.controller.tocPageViewModel.tocGrid){ // grid has previously been created
                    // hide spinner
                    utopiasoftware.emap.controller.tocPageViewModel.tocGrid.hideSpinner();
                    // destroy the grid object
                    utopiasoftware.emap.controller.tocPageViewModel.tocGrid.destroy();
                }

                utopiasoftware.emap.controller.tocPageViewModel.tocGrid =
                    new ej.grids.Grid({
                        // Width for grid
                        width: '100%',
                        allowTextWrap: true,
                        toolbar: ['search'],
                        columns: [
                            { field: 'sno',
                                headerText: '<div style="color: #f28340; width: 100%; height: 100%; font-size: 1.2em; text-transform: uppercase">S/N</div>',
                                width: "10%", clipMode: 'ellipsiswithtooltip', customAttributes: {
                                class: 'toc-grid-sno-column'}
                            },
                            { field: 'subject',
                                headerText: '<div style="color: #f28340; width: 100%; height: 100%; font-size: 1.2em; text-transform: uppercase">Subject</div>',
                                width: "30%", clipMode: 'ellipsiswithtooltip', customAttributes: {
                                class: 'toc-grid-subject-column'}
                            },
                            { field: 'agenda',
                                headerText: '<div style="color: #f28340; width: 100%; height: 100%; font-size: 1.2em; text-transform: uppercase">Agenda</div>',
                                width: "35%", clipMode: 'ellipsiswithtooltip', customAttributes: {
                                class: 'toc-grid-agenda-column'}
                            },
                            { field: 'sno',
                                headerText: '',
                                width: "25%", template: '#attachments-column-template', clipMode: 'ellipsiswithtooltip'}
                        ],
                        dataSource: dataObject.toc,
                        childGrid: {
                            dataSource: dataObject.attachments,
                            queryString: 'sno',
                            columns: [
                                { field: 'filename', headerText: 'Attachments', width: '80%', customAttributes: {
                                    class: 'toc-grid-attachments-filename-column'}},
                                { field: 'fileurl',
                                    headerText: '',
                                    width: "20%", template: '#view-attachment-column-template', clipMode: 'ellipsiswithtooltip'}
                            ]
                        }
                    });

                //append the newly created grid
                utopiasoftware.emap.controller.tocPageViewModel.tocGrid.
                appendTo('#toc-grid');

            }).catch(function(err){console.log(err);});

        },


        tocFileReader: function(directoryName, fileName){

            var mainPromiseResolve = null;
            var mainPromiseReject = null;

            var mainPromise = new Promise(function(mainResolve, mainReject){

                mainPromiseResolve = mainResolve;
                mainPromiseReject = mainReject;

                new Promise(function(resolve, reject){ // request file read write permissions
                    cordova.plugins.diagnostic.requestRuntimePermissions(resolve, reject, [
                        cordova.plugins.diagnostic.permission.WRITE_EXTERNAL_STORAGE,
                        cordova.plugins.diagnostic.permission.READ_EXTERNAL_STORAGE
                    ])
                }).
                then(function(statuses){
                    console.log("READ", statuses[cordova.plugins.diagnostic.permission.READ_EXTERNAL_STORAGE]);
                    if(! (statuses[cordova.plugins.diagnostic.permission.WRITE_EXTERNAL_STORAGE] ===
                        cordova.plugins.diagnostic.permissionStatus.GRANTED ||
                        statuses[cordova.plugins.diagnostic.permission.READ_EXTERNAL_STORAGE] ===
                        cordova.plugins.diagnostic.permissionStatus.GRANTED)){
                        throw "error";
                    }
                    return new Promise(function(resolve, reject){ // return the directory where to store the document/image
                        window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, resolve, reject);
                    });
                }).
                then(function(rootDir){ // get the device root directory
                    return new Promise(function(resolve, reject){
                        // read from the EMAPP/[MEETING-DATE] directory contained in the root directory
                        rootDir.getDirectory("EMAPP/" + directoryName, {create: false}, resolve, reject);
                    });
                }).
                then(function(meetingDir){
                    console.log(meetingDir.toURL());
                    return new Promise(function(resolve, reject){
                        meetingDir.getFile(fileName, {create: false}, resolve, reject);
                    });
                }).
                then(function(fileEntry){
                    return new Promise(function(resolve, reject){ // return the FileWriter object used to write content to the created file
                        fileEntry.file(resolve, reject);
                    });
                }).
                then(function(file){

                    return new Promise(function(resolve, reject){
                        var fileReader = new FileReader();
                        fileReader.onloadend = function(){
                            resolve(this.result);
                        };


                        fileReader.readAsText(file); // read the file
                    });
                }).
                then(function(fileContent){
                    console.log(fileContent);
                    mainPromiseResolve(JSON.parse(fileContent));
                }).
                catch(function(err){
                    console.log("ERROR", err);
                    mainPromiseResolve({toc: [], attachments: []});
                });
            });

            return mainPromise;
        },

        viewAttachmentsList: function(projectSerialNumber, buttonElem){
            var rowIndex = kendo.parseInt(projectSerialNumber) - 1;
            switch($(buttonElem).attr('data-emap-grid-row-state')){
                case "collapsed":
                    utopiasoftware.emap.controller.tocPageViewModel.tocGrid.detailRowModule.expand(rowIndex);
                    $(buttonElem).attr('data-emap-grid-row-state', "expanded");
                    break;
                case "expanded":
                    utopiasoftware.emap.controller.tocPageViewModel.tocGrid.detailRowModule.collapse(rowIndex);
                    $(buttonElem).attr('data-emap-grid-row-state', "collapsed");
                    break;
            }

        },

        viewAttachment: function(buttonElem){
            var fileurl = $(buttonElem).attr('data-emap-fileurl');
            // get the absolute url for the atachment to be displayed
            var absoluteURL = cordova.file.externalRootDirectory + "EMAPP/" +
                kendo.toString(utopiasoftware.emap.controller.tocPageViewModel.tocDatePicker.value, 'yyyy-MM-dd') +
                    "/ATTACHMENTS/" + fileurl;
            console.log("FILE URL ", absoluteURL);

            new Promise(function(resolve, reject){
                cordova.plugins.fileOpener2.showOpenWithDialog(
                    absoluteURL,
                    'application/pdf',
                    {
                        error : reject,
                        success : resolve
                    }
                );
            });

        }
    }
};
