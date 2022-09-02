
var panel = {
    data: {
        speed:1.0
    }
}
const videoList = document.getElementsByTagName('video')
const arrList = Array.from(videoList)
arrList.map((item,index)=>{
    console.log("video",index," is : ",item)
    const wrapper = document.createElement("div");
    wrapper.classList.add("video-controller-container");
    const boxTemplate = `
        <div class="video-controller">
            <div class="speed-text">${panel.data.speed.toFixed(1)}</div>
            <div class="control-operation video-controller-hide">
                <button data-op="fall-back">«</button>
                <button data-op="slower">-</button>
                <button data-op="faster">+</button>
                <button data-op="fast-forward">»</button>
            </div>
        </div>
    `;
    wrapper.innerHTML = boxTemplate;
    console.log("wrapper",wrapper,wrapper.querySelector('.control-operation'))
    item.parentElement.insertBefore(wrapper,item)
    window.onload = ()=>{
        wrapper.addEventListener('mouseenter',showControllerBtn)
        wrapper.addEventListener('mouseleave',hideControllerBtn)
        const controllerOperation = wrapper.querySelector('.control-operation')
        controllerOperation.addEventListener('click',handleClick)
        controllerOperation.addEventListener('dblclick',stopProp)
    }
})
const operation = {
    faster: (target)=>{
        videoList[0].playbackRate = Math.round((videoList[0].playbackRate+0.1)*10)/10
        target.parentElement.parentElement.querySelector('.speed-text').innerText = videoList[0].playbackRate.toFixed(1)
    },
    slower: (target)=>{
        videoList[0].playbackRate = Math.round((videoList[0].playbackRate-0.1)*100)/100
        target.parentElement.parentElement.querySelector('.speed-text').innerText = videoList[0].playbackRate.toFixed(1)
    },
    "fall-back": ()=>{
        videoList[0].currentTime -= 10;
    },
    "fast-forward": ()=>{
        videoList[0].currentTime += 10;
    }
}

const stopProp = (e)=>{
    e.stopPropagation();
}
const handleClick = (e)=>{
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