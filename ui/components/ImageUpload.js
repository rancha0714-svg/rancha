PortfolioUI.ImageUpload = ({label='사진 선택',maxFiles=8,onChange}={}) => {
  const el=PortfolioUI.element,root=el('div','upload'),input=el('input'),id=PortfolioUI.id();let items=[];
  input.type='file';input.accept='image/jpeg,image/png,image/webp';input.multiple=maxFiles>1;input.id=id;input.className='sr-only';
  const choose=el('label','button button--outline',label);choose.htmlFor=id;
  const hint=el('p','muted',`JPG·PNG·WebP · 장당 최대 5MB · 최대 ${maxFiles}장`);hint.id=`${id}-hint`;input.setAttribute('aria-describedby',hint.id);
  const errors=el('div'),list=el('div','upload__list');const notify=()=>onChange?.(items.map(({file,description})=>({file,description})));
  const render=()=>{list.replaceChildren();items.forEach(item=>{const row=el('div','upload__item'),img=el('img');img.src=item.url;img.alt='선택한 사진 미리보기';row.append(img,el('span','',item.file.name),PortfolioUI.TextField({label:'사진 설명',value:item.description,onInput:value=>{item.description=value;notify();}}),PortfolioUI.Button({label:'사진 제거',variant:'outline',size:'small',onClick:()=>{URL.revokeObjectURL(item.url);items=items.filter(x=>x!==item);render();notify();input.focus();}}));list.append(row);});};
  input.addEventListener('change',()=>{errors.replaceChildren();for(const file of input.files){if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>5*1024*1024||items.length>=maxFiles){errors.append(PortfolioUI.Alert({tone:'error',message:`${file.name}: 파일 형식, 5MB 제한 또는 최대 개수를 확인해주세요.`}));continue;}items.push({file,url:URL.createObjectURL(file),description:''});}input.value='';render();notify();});
  root.destroy=()=>{items.forEach(item=>URL.revokeObjectURL(item.url));root.remove();};root.append(choose,input,hint,errors,list);return root;
};
