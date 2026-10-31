PortfolioUI.TextField = ({label, value='', hint='', required=false, multiline=false, maxLength, type='text', onInput}={}) => {
  const el=PortfolioUI.element,id=PortfolioUI.id(), root=el('div','field');
  const name=el('label','field__label',`${label}${required ? ' · 필수' : ''}`);name.htmlFor=id;
  const input=el(multiline?'textarea':'input');input.id=id;input.name=id;input.value=value;input.required=required;
  if(!multiline)input.type=type;if(maxLength)input.maxLength=maxLength;
  const help=el('p','field__hint');help.id=`${id}-hint`;
  const error=el('p','field__error');error.id=`${id}-error`;error.hidden=true;
  const refresh=()=>{help.textContent=[hint,maxLength?`${input.value.length} / ${maxLength}자`:''].filter(Boolean).join(' · ');};refresh();
  input.setAttribute('aria-describedby',help.id);
  input.addEventListener('input',()=>{refresh();if(onInput)onInput(input.value);});
  root.setError=message=>{error.textContent=message;error.hidden=!message;input.setAttribute('aria-invalid',String(Boolean(message)));input.setAttribute('aria-describedby',`${help.id}${message?' '+error.id:''}`);};
  root.input=input;root.append(name,input,help,error);return root;
};
