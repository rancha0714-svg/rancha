window.PortfolioUI = {};
(() => {
  let sequence = 0;
  PortfolioUI.id = () => `portfolio-${++sequence}`;
  // 입력값을 HTML로 해석하지 않고 일반 문자열로 표시합니다.
  PortfolioUI.element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  PortfolioUI.safeUrl = value => {
    const url = new URL(value, location.href);
    if (!['http:', 'https:', 'file:'].includes(url.protocol)) throw new Error('지원하지 않는 링크입니다.');
    return url.href;
  };
})();
