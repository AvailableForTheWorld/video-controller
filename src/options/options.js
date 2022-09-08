let settings = {
    increaseSpeed: {
        key: 'D',
        step: 0.1,
    },
    decreaseSpeed: {
        key: 'A',
        step: 0.1,
    },
    resetSpeed: {
        key: 'R',
        value: 1,
    },
    markMoment: {
        key: 'S',
    },
    markRate: {
        key: 'Z',
    }
}
// chrome.storage.sync.get(['settings'],function(res){
//     console.log("now the settings is: ",res.settings)
// })
window.onload = function(){
    const keyBindings = Array.from(document.getElementsByClassName('keyBind'));
    keyBindings.map((item)=>{
        item.addEventListener('focus',function(e){
            e.target.value = ''
        })
        item.addEventListener('input',function(e){
            console.log("inputed",e.target.value)
            if(e.target.value.length<=1&&e.target.value.charCodeAt()>=97&&e.target.value.charCodeAt()<=122){
                e.target.value = String.fromCharCode(e.target.value.charCodeAt()-32)
                e.target.blur()
            }
            settings[e.target.dataset['key']].key = e.target.value;
            chrome.storage.sync.set({settings:settings},function(){
                console.log("the dataset is setted",settings)
            })
        })
    })

    document.getElementById("fast-step").onchange=((e)=>{
        settings.increaseSpeed.step = Number(e.target.value)<=2 ? +Number(e.target.value).toFixed(1):2
        e.target.value = settings.increaseSpeed.step
        chrome.storage.sync.set({settings:settings})
        console.log(settings)
    })
    document.getElementById("slow-step").onchange=((e)=>{
        settings.decreaseSpeed.step = Number(e.target.value)<=2 ? +Number(e.target.value).toFixed(1):2
        e.target.value = settings.decreaseSpeed.step
        chrome.storage.sync.set({settings:settings})
        console.log(settings)
    })
    document.getElementById("reset-value").onchange=((e)=>{
        settings.resetSpeed.value = Number(e.target.value)<=16 ? Number(e.target.value).toFixed(1):16
        e.target.value = settings.resetSpeed.value
        chrome.storage.sync.set({settings:settings})
        console.log(settings)
    })
    chrome.storage.sync.set({settings:settings})
    
}
