window.onload = init
const timeMap = new Set()
function init () {
    const videoList = document.getElementsByTagName('video')
    const arrList = Array.from(videoList)
    arrList.map((item,index)=>{
        const wrapper = document.createElement("div");
        const aside = document.createElement("div");
        wrapper.classList.add("video-controller-container");
        const boxTemplate = `
            <div class="video-controller">
                <div class="speed-text">${item.playbackRate.toFixed(1)}</div>
                <div class="control-operation video-controller-hide">
                    <button data-op="fall-back">«</button>
                    <button data-op="slower">-</button>
                    <button data-op="faster">+</button>
                    <button data-op="fast-forward">»</button>
                    <button data-op="save">save</buttom>
                </div>
            </div>
        `;
    
        wrapper.innerHTML = boxTemplate;
    
        let asideul = document.createElement('ul')
        asideul.classList.add('time-list')
        aside.appendChild(asideul)
    
        item.parentElement.insertBefore(wrapper,item)
        item.parentElement.insertBefore(aside,item)
        // window.onload = ()=>{
            wrapper.addEventListener('mouseenter',showControllerBtn)
            wrapper.addEventListener('mouseleave',hideControllerBtn)
            const controllerOperation = wrapper.querySelector('.control-operation')
            controllerOperation.addEventListener('click',handleClick)
            controllerOperation.addEventListener('dblclick',stopProp)
            dragPatch.patch(wrapper) // 非纯函数，修改了dom
    
            aside.addEventListener('click',goto)
            document.addEventListener('keyup', keyboard)
        // }
    })
}
const operation = {
    faster: (target)=>{
        console.log("target.parentElement.parentElement.parentElement.parentElement",target.parentElement.parentElement.parentElement.parentElement)
        const tar = target.parentElement.parentElement.parentElement.parentElement.getElementsByTagName('video')[0]
        tar.playbackRate = Math.round((tar.playbackRate+0.1)*10)/10
        target.parentElement.parentElement.querySelector('.speed-text').innerText = tar.playbackRate.toFixed(1)
    },
    slower: (target)=>{
        const tar = target.parentElement.parentElement.parentElement.parentElement.getElementsByTagName('video')[0]
        tar.playbackRate = Math.round((tar.playbackRate-0.1)*10)/10
        target.parentElement.parentElement.querySelector('.speed-text').innerText = tar.playbackRate.toFixed(1)
    },
    "fall-back": (target)=>{
        const tar = target.parentElement.parentElement.parentElement.parentElement.getElementsByTagName('video')[0]
        tar.currentTime -= 10;
    },
    "fast-forward": (target)=>{
        const tar = target.parentElement.parentElement.parentElement.parentElement.getElementsByTagName('video')[0]
        tar.currentTime += 10;
    },
    save: (target)=>{    
        const tar = target.parentElement.parentElement.parentElement.parentElement.getElementsByTagName('video')[0]
        let time = tar.currentTime
        timeMap.add(time)
        renderList()
    }
}

const stopProp = (e)=>{
    e.stopPropagation();
}
const handleClick = (e)=>{
    if(e.target.nodeName!=='BUTTON') return
    e.stopPropagation();
    operation[e.target.dataset['op']](e.target);
}
const showControllerBtn = (e)=>{
    e.stopPropagation();
    const ele = e.target.querySelector('.control-operation')
    ele.classList.remove('video-controller-hide')
}
const hideControllerBtn = (e)=>{
    e.stopPropagation();
    const ele = e.target.querySelector('.control-operation')
    ele.classList.add('video-controller-hide')
}
const keyboard = (e)=>{
    if(e.keyCode=='68'){
        let video = document.getElementsByTagName('video')[0]
        operation.faster(video)
    }
    if(e.keyCode=='65'){
        let video = document.getElementsByTagName('video')[0]
        operation.slower(video)
    }
    if(e.keyCode=='83'){
        let video = document.getElementsByTagName('video')[0]
        operation.save(video)
    }
}
const renderList = ()=>{
    let list = document.getElementsByClassName('time-list')[0]
    list.innerHTML=''
    for(let t of timeMap){
        // list.innerHTML+=`<li><button>${t}</button></li>`  
        list.innerHTML+=`<li><button>${formateTime(t)}</button></li>`  
    }
}
const goto=(e)=>{
    e.stopPropagation();
    let video = document.getElementsByTagName('video')[0]
    // video.currentTime=e.target.innerText
    video.currentTime=formateSecond(e.target.innerText)
}
const formateTime = (time)=>{
    const h = parseInt(time / 3600)
    const minute = parseInt(time / 60 % 60)
    const second = Math.ceil(time % 60)    
    const hours = h < 10 ? '0' + h : h
    const formatSecond = second > 59 ? 59 : second
    return `${hours > 0 ? `${hours}:` : ''}${minute < 10 ? '0' + minute : minute}:${formatSecond < 10 ? '0' + formatSecond : formatSecond}`
}

const formateSecond = (time)=>{
    var tt = '';
    tarr=time.split(':')
    if(tarr.length===3)
    {
        var hour = time.split(':')[0];
        var min = time.split(':')[1];
        var sec = time.split(':')[2];
        tt = Number(hour*3600) + Number(min*60) + Number(sec);
    }
    else{
        var min = time.split(':')[0];
        var sec = time.split(':')[1];
        tt =Number(min*60) + Number(sec);
    }
    return tt;
};