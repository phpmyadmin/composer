var __webpack_exports__ = {};
/**
 * Conditionally included if framing is not allowed.
 * @return {void}
 */
window.crossFramingProtection = () => {
  if (window.allowThirdPartyFraming) {
    return;
  }

  if (window.self !== window.top) {
    window.top.location = window.self.location;
    return;
  }

  const styleElement = document.getElementById('cfs-style'); // check if styleElement has already been removed to avoid frequently reported js error

  if (typeof styleElement === 'undefined' || styleElement === null) {
    return;
  }

  styleElement.parentNode.removeChild(styleElement);
};

//# sourceMappingURL=cross_framing_protection.js.map