/**
 * Created by UTOPIA SOFTWARE on 19/02/2018.
 */

// define the model namespace
utopiasoftware.emap.model = {

  /**
   * property acts as a flag that indicates that all hybrid plugins and DOM content
   * have been successfully loaded. It relies on the ons.ready() method
   *
   * @type {boolean} flag for if the hybrid plugins and DOM content are ready for execution
   */
  isAppReady: false

};

// call the method to startup the app
utopiasoftware.emap.controller.startup();

// listen for the initialisation of the TOC page
$(document).on("init", "#toc-page", utopiasoftware.emap.controller.tocPageViewModel.pageInit);

// listen for when the TOC page is shown
$(document).on("show", "#toc-page", utopiasoftware.emap.controller.tocPageViewModel.pageShow);

// listen for when the TOC page is hidden
$(document).on("hide", "#toc-page", utopiasoftware.emap.controller.tocPageViewModel.pageHide);

//# sourceMappingURL=model-compiled.js.map