function ready(script) {
  if (document.readyState != 'loading'){
    script();
  } else {
    document.addEventListener('DOMContentLoaded', script);
  }
}

ready(function() {
  let inputs = document.querySelectorAll('#hashtags, #cashtags')
  let hashtags = inputs[0]
  let cashtags = inputs[1]
  chrome.storage.local.get([
    'hashAllowed', 'cashAllowed'
  ], function(data) {
    if (Object.keys(data).length === 0) {
      chrome.storage.local.set({
        'hashAllowed': hashtags.value,
        'cashAllowed': cashtags.value
      })
    } else {
      hashtags.value = data['hashAllowed']
      cashtags.value = data['cashAllowed']
    }
  })
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', function() {
      if (inputs[i] === hashtags) {
        chrome.storage.local.set({ 'hashAllowed': hashtags.value })
      } else if (inputs[i] === cashtags) {
        chrome.storage.local.set({ 'cashAllowed': cashtags.value })
      }
    })
  }
  chrome.storage.local.get('tweetsHidden', function (data) {
    document.querySelector('#hidden-tweets').innerHTML = data.tweetsHidden
  })
})

