PortfolioUI.Modal = ({title,description,confirmLabel='확인',danger=false,onConfirm}={}) => {
  const el=PortfolioUI.element,dialog=el('dialog','modal'),id=PortfolioUI.id();
  const heading=el('h2','',title);heading.id=id;dialog.setAttribute('aria-labelledby',id);
  const body=el('p','',description);body.id=`${id}-body`;dialog.setAttribute('aria-describedby',body.id);
  let previous;
  const cancel=PortfolioUI.Button({label:'취소',variant:'outline',onClick:()=>dialog.close()});cancel.autofocus=true;
  const confirm=PortfolioUI.Button({label:confirmLabel,variant:danger?'danger':'primary',onClick:async()=>{
    confirm.setLoading(true);
    try{await onConfirm?.();dialog.close();}catch{dialog.append(PortfolioUI.Alert({tone:'error',message:'처리하지 못했습니다. 다시 시도해주세요.'}));}finally{confirm.setLoading(false);}
  }});
  const actions=el('div','row');actions.append(cancel,confirm);dialog.append(heading,body,actions);
  dialog.openModal=()=>{previous=document.activeElement;if(!dialog.isConnected)document.body.append(dialog);dialog.showModal();cancel.focus();};
  dialog.addEventListener('close',()=>previous?.focus());return dialog;
};
