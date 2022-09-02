const wrapper = document.createElement("div");
wrapper.classList.add("video-controller-container");
var panel = {
    data: {
        speed:1.0
    }
}
const videoList = document.getElementsByTagName('video')
let speedText;
const operation = {
    faster: ()=>{
        videoList[0].playbackRate += 0.1
        speedText.innerText = videoList[0].playbackRate.toFixed(1)
    },
    slower: ()=>{
        videoList[0].playbackRate -= 0.1
        speedText.innerText = videoList[0].playbackRate.toFixed(1)
    },
    "fall-back": ()=>{
        videoList[0].currentTime -= 10;
    },
    "fast-forward": ()=>{
        videoList[0].currentTime += 10;
    }
    
}
const frg = document.createDocumentFragment();
const boxTemplate = `
    <div class="video-controller">
        <div id="speed-text">${panel.data.speed.toFixed(1)}</div>
        <div id="control-operation">
            <button data-op="fall-back">«</button>
            <button data-op="slower">-</button>
            <button data-op="faster">+</button>
            <button data-op="fast-forward">»</button>
        </div>
    </div>
`;
wrapper.innerHTML = boxTemplate;
frg.appendChild(wrapper);
document.body.appendChild(frg);
speedText = document.getElementById('speed-text')
const controllerOperation = document.getElementById('control-operation');
const handleClick = (e)=>{
    console.log("eeeeee",e.target.dataset['op'])
    operation[e.target.dataset['op']]();
}
controllerOperation.addEventListener('click',handleClick)