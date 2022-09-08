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
}
