declare var $ : any;
declare var USAFNav: any;
declare var module: { hot: any };

import * as React from "react";

import {render} from "react-dom";
import {Config} from "./Config";
import {MainApp} from "./containers/MainApp";

const { AppContainer } = require("react-hot-loader");
const rootElement = document.getElementById("app") as Element;
require("./style.css");

function loadApp() {
  // And render our App into it, inside the HMR App ontainer which handles the hot reloading
  render(
    <AppContainer>
       <MainApp />
    </AppContainer>,
    rootElement
  );

  // Handle hot reloading requests from Webpack
  if (module.hot) {
    module.hot.accept("./containers/MainApp", () => {
      // If we receive a HMR request for our App container, then reload it using require
      // (we can"t do this dynamically with import)
      const NextApp = require("./containers/MainApp").MainApp;

      // And render it into the root element again
      render(
        <AppContainer>
          <NextApp />
        </AppContainer>,
        rootElement
      );
    });
  }
}

loadApp();
