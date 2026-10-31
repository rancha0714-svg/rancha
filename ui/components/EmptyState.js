PortfolioUI.EmptyState = ({title='첫 작업물을 준비하고 있습니다',description='',action}={}) => {
  const el=PortfolioUI.element,root=el('div','empty');root.append(el('h3','',title));if(description)root.append(el('p','muted',description));if(action)root.append(PortfolioUI.Button(action));return root;
};
