function ready(script) {
  if (document.readyState != 'loading') {
    script();
  } else {
    document.addEventListener('DOMContentLoaded', script);
  }
}

ready(function() {
  let inputs = document.querySelectorAll('#cashtags, #hashtags')
  let cashtags = inputs[0], hashtags = inputs[1]

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
    if (data.tweetsHidden === undefined ) {
      document.querySelector('#hidden-tweets').innerHTML = 0
    } else {
      document.querySelector('#hidden-tweets').innerHTML = data.tweetsHidden
    }
  })
})

