let hashAllowed, cashAllowed
let tweetsHidden = 0

chrome.storage.local.get(['hashAllowed', 'cashAllowed'], function (data) {
  hashAllowed = parseInt(data.hashAllowed)
  cashAllowed = parseInt(data.cashAllowed)
})

function checkTweets() {
  console.log(hashAllowed)
  console.log(cashAllowed)
  let tweetsList = document.querySelectorAll(
    'div[aria-label="Timeline: Search timeline"] article:not([hidden])')
  for (let i = 0; i < tweetsList.length; i++) {
    let tweet = tweetsList[i]
    let tweetTextElement = tweet.querySelector('div[lang][dir="auto"]')
    if (tweetTextElement){
      let aTags = tweetTextElement.querySelectorAll('a')
      let hashtagsCount = 0, cashtagsCount = 0
      for (let i = 0; i < aTags.length; i++) {
        if (/^#/.test(aTags[i].textContent)) {
          hashtagsCount++
          if (hashtagsCount > hashAllowed) {
            tweet.parentElement.parentElement.style.display = 'none'
            tweet.setAttribute('hidden', 1)
            tweetsHidden++
            break
          }
        } else if (/^\$/.test(aTags[i].textContent)) {
          cashtagsCount++
          if (cashtagsCount > cashAllowed) {
            tweet.parentElement.parentElement.style.display = 'none'
            tweetsHidden++
            break
          }
        }
      }
    }
  }
  chrome.storage.local.set({ 'tweetsHidden': tweetsHidden })
}

let Observer = new MutationObserver(function() {
  if (document.querySelector('article')) {
    if (chrome.runtime.id == undefined) {
      location.reload()
      return
    }
    checkTweets()
  }
}).observe(document, { childList: true, subtree: true })
