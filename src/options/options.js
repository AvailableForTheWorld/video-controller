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
    const keyBindings = Array.from(document.getElementsByTagName('input'));
    let cache = ''
    keyBindings.map((item)=>{
        item.addEventListener('focus',function(e){
            cache = e.target.value;
            e.target.value = ''
        })
        item.addEventListener('blur',function(e){
            if(!e.target.value){
                e.target.value = cache;
            }
        })
        item.addEventListener('input',function(e){
            if(e.target.classList.contains('keyBind')){
                console.log("inputed",e.target.value)
                if(e.target.value.length<=1&&e.target.value.charCodeAt()>=97&&e.target.value.charCodeAt()<=122){
                    e.target.value = String.fromCharCode(e.target.value.charCodeAt()-32)
                    e.target.blur()
                }
                settings[e.target.dataset['key']].key = e.target.value;
                chrome.storage.sync.set({settings:settings},function(){
                    console.log("the dataset is setted",settings)
                })
            }
            else{
                let targetValue = e.target.dataset['step'] === 'resetSpeed' ? 16 : 2;
                settings[e.target.dataset['step']].step = parseFloat(e.target.value)<=targetValue ? +parseFloat(e.target.value).toFixed(1):targetValue;
                e.target.value = e.target.value.indexOf('.')===e.target.value.lastIndexOf('.')?e.target.value.indexOf('.')===e.target.value.length-1?e.target.value:settings[e.target.dataset['step']].step:settings[e.target.dataset['step']].step
                chrome.storage.sync.set({settings:settings})
                console.log(settings)
            }
        })
    })
    chrome.storage.sync.set({settings:settings})
}
