function ready(script) {
  if (document.readyState != 'loading'){
    script();
  } else {
    document.addEventListener('DOMContentLoaded', script);
  }
}

ready(function() {
  let inputs = document.querySelectorAll('#cashtags, #hashtags')
  let cashtags = inputs[0], hashtags = inputs[1]
  chrome.storage.local.get([ 'cashAllowed', 'hashAllowed' ],
    function(data) {
        cashtags.value = data['cashAllowed']
        hashtags.value = data['hashAllowed']
      }
  )

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', function() {
      if (inputs[i] === cashtags) {
        chrome.storage.local.set({ 'cashAllowed': cashtags.value })
      } else if (inputs[i] === hashtags) {
        chrome.storage.local.set({ 'hashAllowed': hashtags.value })
      }
    })
  }

  chrome.storage.local.get('tweetsHidden', function (data) {
    let countElement = document.querySelector('#hiddenTweets')
    if (data.tweetsHidden === undefined || performance.navigation.type === 1) {
      countElement.innerHTML = 0
    } else {
      countElement.innerHTML = data.tweetsHidden
      console.log("else called")
    }
  })
})

