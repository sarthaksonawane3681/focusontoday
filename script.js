let progresscount=document.querySelector('progress')
let taketaskInput=document.querySelector('.js-task-input')
let addtaskButton=document.querySelector('.addlist')
let taskdiv=document.querySelector('.addedtasklist')
let totaltask=document.querySelector('.totaltask')
let classcompleted=document.querySelectorAll('.completed')
let resetbutton=document.querySelector('.reset')
let ResultNote=document.querySelector(".ResultNote")

taskdiv.innerHTML="Add Your First Task</br></br><Code><b>Note: </b>U Can Add maximum 5 Tasks Only</Code>";
let tasklist=JSON.parse(localStorage.getItem('b')) || [];
progresscount.value=`${tasklist.length}`
ResultNote.innerHTML=`Try To Complete All Tasks Til, the end of the Day`
startagain();
function startagain(){


    
    
let alllist=JSON.parse(localStorage.getItem('addtoLS'))||[]
let newlist='';

tasklist.forEach((element,index) => {
    addremoveelement(element,index,'')
    
    
});
function addremoveelement(element="",index,innerele=""){
    if(element===""){
        console.log(index,innerele)
        alllist[index]=`<div class="innerlist">
        <input type="checkbox" name="Tdone" class="taskchecked">${innerele}`
        localStorage.setItem('addtoLS',JSON.stringify(alllist))
        regenerate(alllist)
    }else if(innerele===""){
        alllist[index]=`<div class="innerlist">
        <input type="checkbox" name="Tdone" class="taskchecked"><p id="${index}p">${element}</p></div>`
        // localStorage.setItem('addtoLS',JSON.stringify(alllist))
        regenerate(alllist)
    }
    
    localStorage.setItem('addtoLS',JSON.stringify(alllist))
}
function regenerate(al){
    console.log(al)
    newlist=''
    for(let i=0;i<al.length;i++){
        
        newlist+=al[i]
    }
    
    taskdiv.innerHTML=newlist;
    
}


let countcheck=document.querySelectorAll('.taskchecked')
countcheck.forEach((el,index)=>{
    // console.log(el.outerHTML+" "+index)
    el.addEventListener('click',(ev)=>{
        let a=confirm('Wah bhai task Complete Kar liya!!...To kr de list se delete')
            if(a){
                tasklist.splice(index,1)
                localStorage.setItem('b',JSON.stringify(tasklist))
                alllist.splice(0,alllist.length)
                localStorage.setItem('addtoLS',JSON.stringify(alllist))
                setTimeout(()=>{
                    location.reload()
                })
            }
        })
    
})

   resetbutton.addEventListener('dblclick',()=>{
    // console.log(hh)
        taketaskInput.value=""
        newlist='';
        tasklist.splice(0,tasklist.length)
        taskdiv.innerHTML="Add Your First Task</br></br><Code>U Can Add maximum 5 Tasks Only</Code>";
        alllist.splice(0,alllist.length)
        localStorage.setItem('b',JSON.stringify(tasklist))
        localStorage.setItem('addtoLS',JSON.stringify(alllist))
        progresscount.value=`${tasklist.length}` 
        startagain()
    }
    )
totaltask.innerHTML=`Total- ${tasklist.length} Tasks`;

}

addtaskButton.addEventListener('click',()=>{
    if(progresscount.value<5){

    if(taketaskInput.value==''){
        alert('add task first')
    }else{    
        tasklist.push(taketaskInput.value)
        localStorage.setItem('b',JSON.stringify(tasklist))
        progresscount.value=`${tasklist.length}`
    
    refresh(taketaskInput.value)
    taketaskInput.value='';
        startagain()
    }
    }else{
        alert('Bhai pahale jo task leke rakhe hai o to complete kr le')
    }
    
   
})
taketaskInput.addEventListener('keydown',(event)=>{
    if(tasklist.length<5){
        if(taketaskInput.value===''){
        // alert('add task first')
    }else if(event.key==='Enter'){    
    tasklist.push(taketaskInput.value)
    localStorage.setItem('b',JSON.stringify(tasklist))
    progresscount.value=`${tasklist.length}`
    refresh(taketaskInput.value)
    taketaskInput.value='';
        startagain()
    }
    }else{
        taketaskInput.addEventListener("keydown", e => e.preventDefault());
        taketaskInput.value=''
        alert('Bhai pahale jo task leke rakhe hai o to complete kr le')
    }
    
})


function refresh(value){
    let list=document.createElement('div');
    list.classList.add('innerlist')
    let addcheckbox=document.createElement('input')
    addcheckbox.type="checkbox";
    addcheckbox.name="Tdone";
    addcheckbox.classList.add('taskchecked');
    list.appendChild(addcheckbox)
    let createp=document.createElement('p')
    createp.textContent=`${value}`
    list.appendChild(createp)
    // console.log(list)
    taskdiv.append(list);   
}

