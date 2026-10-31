PortfolioUI.Badge = ({text, status}={}) => PortfolioUI.element('span', `badge${status === 'draft' ? ' badge--draft' : ''}`, text ?? (status === 'draft' ? '초안' : '공개'));
