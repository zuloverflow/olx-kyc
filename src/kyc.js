// ==UserScript==
// @name         olx kyc
// @namespace    http://tampermonkey.net/
// @version      2024-01-13
// @description  try to take over the world!
// @author       You
// @match        https://uvt.olx.co.id/*
// @icon         https://whats-sheet.com/wp-content/uploads/2022/01/cropped-Whatsheet-120-x-120-px-32x32.png
// @require      https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("yeyss");
    const dataHolder = document.createElement("textarea");
    dataHolder.setAttribute("id", "myDataHolder");

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type == "attributes") {
                const responseBody = mutation.target.getAttribute('mydata')
                console.log(responseBody);
            }
        });
    });
    observer.observe(dataHolder, {
        //configure it to listen to attribute changes
        attributes: true
    });

    const injectedScript =
          "(" +
          function() {
              console.log("Script Injected");
              let hasElement = false
              // define monkey patch function
              const urls = 'https://uvt.olx.co.id/api/users/v1/';
              const initAll = async (imageUrl) => {
                  if(!hasElement){
                      const anchor = document.querySelectorAll('.documentSubSection')[1].querySelector('.disableImage')
                      console.log(anchor)
                      const dataHolder = document.createElement("textarea");
                      dataHolder.setAttribute("id", "myDataHolder");
                      anchor.prepend(dataHolder);
                  }

                  const workerPromise = window.Tesseract.createWorker('eng', 1, {
                      logger: ({ progress, status }) => {
                          if (status === "recognizing text") {
                              console.log(progress)
                          }
                      },
                  });
                  const worker = await workerPromise;
                  const ret = await worker.recognize(
                      imageUrl
                  );
                  console.log(ret.data.text);
                  document.getElementById('myDataHolder').value = ret.data.text
                  await worker.terminate();
              }

              const monkeyPatch = () => {
                  let oldXHROpen = window.XMLHttpRequest.prototype.open;
                  window.XMLHttpRequest.prototype.open = function() {
                      this.addEventListener("load", async function() {
                          const url = this.responseURL
                          if(url.startsWith(urls)){
                              const responseBody = await this.response.text()
                              const {data} = JSON.parse(responseBody);
                              const [doc] = data?.docs.filter(d => d.type !== 'selfie')
                              const mediaUrl = doc?.media_info[0].url
                              if(mediaUrl){
                                  initAll(mediaUrl);
                              }
                          }
                      });
                      return oldXHROpen.apply(this, arguments);
                  };
              };
              monkeyPatch();
          } +
          ")();";
    const injectScript = () => {
        console.log("Injecting Script");
        var script = document.createElement("script");
        script.textContent = injectedScript;
        (document.head || document.documentElement).appendChild(script);
        script.remove();
    };
    setTimeout(injectScript, 400);
})();