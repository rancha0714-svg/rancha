PortfolioUI.ProjectCard = ({title, summary, href, image, imageAlt='', date, tags=[]}) => {
  const el = PortfolioUI.element;
  const card = el(href ? 'a' : 'article', 'card');
  if (href) card.href = PortfolioUI.safeUrl(href);
  const fallback = () => {const box=el('div','card__image placeholder','♧'); box.setAttribute('aria-hidden','true'); return box;};
  if (image) {
    const img=el('img','card__image'); img.src=PortfolioUI.safeUrl(image); img.alt=imageAlt; img.loading='lazy';
    img.addEventListener('error',()=>img.replaceWith(fallback()),{once:true}); card.append(img);
  } else card.append(fallback());
  const body=el('div','card__body'); body.append(el('h3','',title),el('p','card__summary muted',summary));
  if(date){const time=el('time','card__meta',date);time.dateTime=date;body.append(time);}
  const labels=el('div','row'); tags.slice(0,5).forEach(text=>labels.append(PortfolioUI.Badge({text})));body.append(labels);card.append(body);return card;
};
