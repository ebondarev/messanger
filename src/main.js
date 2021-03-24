(() => {
  setTextareaResizeHandler();
  setTextareaAutoHeight();


  function setTextareaAutoHeight() {
    const textareaEl = document.querySelector('[data-js="textarea"]');
    textareaEl.addEventListener('input', () => {
      const {scrollHeight, clientHeight} = textareaEl;
      const diff = scrollHeight - clientHeight;
      console.log(scrollHeight, clientHeight);
      if (diff > 0) {
        textareaEl.style.setProperty('height', `${diff + clientHeight + 5}px`);
      }
    });
  }

  function setTextareaResizeHandler() {
    const textareaEl = document.querySelector('[data-js="textarea"]');

    const observerConfig = {
      attributes: true,
      childList: false,
      subtree: false,
    };
  
    function observerCb(mutationsList, observer) {
      for(const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
          const height = textareaEl.style.getPropertyValue('height');
          document.documentElement.style.setProperty('--textarea-height', height);
        }
      }
    }
  
    const observer = new MutationObserver(observerCb);
    observer.observe(textareaEl, observerConfig);
  }
})();