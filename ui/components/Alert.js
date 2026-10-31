PortfolioUI.Alert = ({message, tone='success', dismissible=true}={}) => {
  const root=PortfolioUI.element('div',`alert alert--${tone}`);root.setAttribute('role',tone==='error'?'alert':'status');
  const icon=PortfolioUI.element('span','',tone==='success'?'✓':'!');icon.setAttribute('aria-hidden','true');
  root.append(icon,PortfolioUI.element('p','',message));
  if(dismissible)root.append(PortfolioUI.Button({label:'닫기',variant:'outline',size:'small',onClick:()=>root.remove()}));return root;
};
