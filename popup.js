function ready(script) {
  if (document.readyState != 'loading'){
    script();
  } else {
    document.addEventListener('DOMContentLoaded', script);
  }
}

ready(function() {
  let inputs = document.querySelectorAll('#cashtags, #hashtags')
  let cashtags = inputs[0]
  let hashtags = inputs[1]
  chrome.storage.local.get([
    'cashAllowed', 'hashAllowed'
  ], function(data) {
    if (Object.keys(data).length === 0) {
      chrome.storage.local.set({
        'cashAllowed': cashtags.value,
        'hashAllowed': hashtags.value
      })
    } else {
      cashtags.value = data['cashAllowed']
      hashtags.value = data['hashAllowed']
    }
  })
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
    document.querySelector('#hidden-tweets').innerHTML = data.tweetsHidden
  })
})

