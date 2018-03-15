"use strict";

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

// listen for the initialisation of the SIGNUP page
$(document).on("init", "#signup-page", utopiasoftware.emap.controller.signupPageViewModel.pageInit);

// listen for when the SIGNUP page is shown
$(document).on("show", "#signup-page", utopiasoftware.emap.controller.signupPageViewModel.pageShow);

// listen for when the SIGNUP page is hidden
$(document).on("hide", "#signup-page", utopiasoftware.emap.controller.signupPageViewModel.pageHide);

// listen for when the SIGNUP page is destroyed
$(document).on("destroy", "#signup-page", utopiasoftware.emap.controller.signupPageViewModel.pageDestroy);

// listen for the initialisation of the LOGIN page
$(document).on("init", "#login-page", utopiasoftware.emap.controller.loginPageViewModel.pageInit);

// listen for when the LOGIN page is shown
$(document).on("show", "#login-page", utopiasoftware.emap.controller.loginPageViewModel.pageShow);

// listen for when the LOGIN page is hidden
$(document).on("hide", "#login-page", utopiasoftware.emap.controller.loginPageViewModel.pageHide);

// listen for when the LOGIN page is destroyed
$(document).on("destroy", "#login-page", utopiasoftware.emap.controller.loginPageViewModel.pageDestroy);

// listen for the initialisation of the TOC page
$(document).on("init", "#toc-page", utopiasoftware.emap.controller.tocPageViewModel.pageInit);

// listen for when the TOC page is shown
$(document).on("show", "#toc-page", utopiasoftware.emap.controller.tocPageViewModel.pageShow);

// listen for when the TOC page is hidden
$(document).on("hide", "#toc-page", utopiasoftware.emap.controller.tocPageViewModel.pageHide);

// listen for when the TOC page is destroyed
$(document).on("destroy", "#toc-page", utopiasoftware.emap.controller.tocPageViewModel.pageDestroy);

//# sourceMappingURL=model-compiled.js.map