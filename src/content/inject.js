
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
            <div class="control-operation">
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
        const controllerOperation = wrapper.querySelector('.control-operation')
        controllerOperation.addEventListener('click',handleClick)
    }
})
const operation = {
    faster: (target)=>{
        videoList[0].playbackRate += 0.1
        target.parentElement.parentElement.querySelector('.speed-text').innerText = videoList[0].playbackRate.toFixed(1)
    },
    slower: (target)=>{
        videoList[0].playbackRate -= 0.1
        target.parentElement.parentElement.querySelector('.speed-text').innerText = videoList[0].playbackRate.toFixed(1)
    },
    "fall-back": ()=>{
        videoList[0].currentTime -= 10;
    },
    "fast-forward": ()=>{
        videoList[0].currentTime += 10;
    }
}

const handleClick = (e)=>{
    operation[e.target.dataset['op']](e.target);
}
