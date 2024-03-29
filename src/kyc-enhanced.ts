import { createWorker } from "tesseract.js";

(async () => {
  console.log("initializing..");

  function createResultContainer() {
    const textArea = document.createElement("textarea");
    textArea.className = "result-container";
    textArea.spellcheck = false;
    textArea.cols = 20;
    textArea.rows = 10;

    textArea.style.width = "100%";
    textArea.style.height = "300px";
    textArea.style.lineHeight = "28px";

    return textArea;
  }

  async function readDocument(element: HTMLImageElement) {
    const worker = await createWorker();
    const rec = await worker.recognize(element.src);
    worker.terminate();
    return rec.data.text;
  }

  function initObserver() {
    const mutationsTarget = document.getElementsByTagName("body");
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(async (mutation) => {
        if (mutation.type !== "attributes") return;

        const target = mutation.target as HTMLElement;
        const documentContainer = target.closest(".documentContainer");

        if (documentContainer) {
          const imageElement = documentContainer.getElementsByTagName("img");

          if (imageElement.length) {
            const image = imageElement[0];
            const result = await readDocument(image);
            const tobeReplaceByResultContainer =
              documentContainer.querySelector(
                ".disableImage"
              ) as HTMLDivElement;

            if (tobeReplaceByResultContainer) {
              const resultContainer = createResultContainer();
              resultContainer.value = result;

              tobeReplaceByResultContainer.replaceWith(resultContainer);

              const parent = resultContainer.parentElement;

              if (parent) {
                parent.style.padding = "0 24px";
              }
            }
          }
        }
      });
    });

    if (mutationsTarget.length) {
      observer.observe(mutationsTarget[0], {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }
  }

  initObserver();
})();
