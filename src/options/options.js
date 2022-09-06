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
chrome.storage.sync.set({settings:settings})