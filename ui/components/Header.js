PortfolioUI.Header = ({title='기후테크 · 메이킹',homeHref='#',links=[{label:'자기소개',href:'#about'},{label:'작업물',href:'#works'}]}={}) => {
  const el=PortfolioUI.element,root=el('header','header'),inner=el('div','container header__inner'),brand=el('a','',title);brand.href=PortfolioUI.safeUrl(homeHref);
  const nav=el('nav');nav.setAttribute('aria-label','주 메뉴');links.forEach(item=>{const link=el('a','',item.label);link.href=PortfolioUI.safeUrl(item.href);if(item.current)link.setAttribute('aria-current','page');nav.append(link);});inner.append(brand,nav);root.append(inner);return root;
};
