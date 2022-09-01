const wrapper = document.createElement("div");
wrapper.classList.add("video-controller-container");
var panel = {
    data: {
        speed:1.0
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