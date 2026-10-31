PortfolioUI.Button = ({label, variant='primary', size='default', disabled=false, type='button', href, onClick}={}) => {
  const node = PortfolioUI.element(href ? 'a' : 'button', `button button--${variant} button--${size}`, label);
  if (href) node.href = PortfolioUI.safeUrl(href);
  else {node.type = type; node.disabled = disabled;}
  if (onClick) node.addEventListener('click', onClick);
  node.setLoading = loading => {
    if (href) return;
    node.disabled = loading || disabled;
    node.setAttribute('aria-busy', String(loading));
    node.textContent = loading ? '처리 중…' : label;
  };
  return node;
};
