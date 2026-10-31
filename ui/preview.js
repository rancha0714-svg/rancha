(() => {
  const UI=PortfolioUI;
  const mount=(id,...nodes)=>document.getElementById(id).append(...nodes);
  mount('header',UI.Header());
  mount('hero',UI.Button({label:'작업물 보기 →',size:'large',href:'#works'}));
  ['primary','secondary','outline','danger'].forEach((variant,index)=>mount('buttons',UI.Button({label:['주요 버튼','미리보기','취소','삭제'][index],variant})));
  mount('buttons',UI.Button({label:'작은 버튼',size:'small'}),UI.Button({label:'사용 불가',disabled:true}));
  mount('badges',UI.Badge({text:'기후테크'}),UI.Badge({text:'메이킹'}),UI.Badge({status:'draft'}),UI.Badge({status:'published'}));
  ['첫 번째','두 번째','세 번째'].forEach(title=>mount('cards',UI.ProjectCard({title:`${title} 작업물`,summary:'제작 과정과 배운 점을 담을 공간입니다.',tags:['예시']})));
  const name=UI.TextField({label:'이름·활동명',required:true,maxLength:30,hint:'공개할 이름을 입력해주세요.'});
  const intro=UI.TextField({label:'자기소개',multiline:true,maxLength:1000,hint:'관심 분야와 배우고 싶은 것을 적어주세요.'});
  mount('form',name,intro,UI.Button({label:'입력 확인',type:'submit'}));
  document.getElementById('form').addEventListener('submit',event=>{
    event.preventDefault();const message=name.input.value.trim()?'':'이름 또는 활동명을 입력해주세요.';name.setError(message);
    if(message){name.input.focus();return;}
    document.getElementById('feedback').replaceChildren(UI.Alert({message:'입력값을 확인했습니다. 미리보기이므로 서버에 저장하지 않습니다.'}));
  });
  mount('upload',UI.ImageUpload());
  mount('states',UI.Alert({message:'초안으로 저장했습니다. 방문자에게는 보이지 않습니다.'}),UI.Alert({tone:'warning',message:'저장하지 않은 변경 사항이 있습니다.'}),UI.Alert({tone:'error',message:'저장하지 못했습니다. 다시 시도해주세요.'}),UI.EmptyState({description:'새로운 실험과 제작 기록을 곧 소개합니다.'}));
  const modal=UI.Modal({title:'작업물을 삭제할까요?',description:'「예시 작업물」 삭제 확인 화면입니다. 이 미리보기에서는 실제 데이터가 삭제되지 않습니다.',confirmLabel:'삭제',danger:true,onConfirm:()=>mount('modal-example',UI.Alert({message:'삭제 확인 동작을 완료했습니다.'}))});
  mount('modal-example',UI.Button({label:'삭제 대화상자 열기',variant:'danger',onClick:()=>modal.openModal()}));
})();
