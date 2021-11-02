let hashAllowed, cashAllowed
let tweetsHidden = 0

chrome.storage.local.get(['cashAllowed', 'hashAllowed'], function (data) {
  cashAllowed = parseInt(data.cashAllowed)
  hashAllowed = parseInt(data.hashAllowed)
})

function checkTweets() {
  let tweetsList = document.querySelectorAll(
    'div[aria-label="Timeline: Search timeline"] article:not([hidden])')
  for (let i = 0; i < tweetsList.length; i++) {
    let tweet = tweetsList[i]
    console.log(tweet)
    let tweetTextElement = tweet.querySelector('div[lang][dir="auto"]')
    if (tweetTextElement){
      console.log(tweetTextElement)
      let aTags = tweetTextElement.querySelectorAll('a')
      let  cashtagsCount = 0, hashtagsCount = 0
      for (let i = 0; i < aTags.length; i++) {
        if (/^\$/.test(aTags[i].textContent)) {
          cashtagsCount++
          if (cashtagsCount > cashAllowed) {
            tweet.parentElement.parentElement.style.display = 'none'
            tweet.setAttribute('hidden', 1)
            tweetsHidden++
            console.log("Cashtags fired")
            break
          }
        } else if (/^#/.test(aTags[i].textContent)) {
          hashtagsCount++
          if (hashtagsCount > hashAllowed) {
            tweet.parentElement.parentElement.style.display = 'none'
            tweet.setAttribute('hidden', 1)
            tweetsHidden++
            console.log("Hashtags fired")
            break
          }
        }
      }
    }
  }
  chrome.storage.local.set({ 'tweetsHidden': tweetsHidden })
}

function searchListener() {
  let searchElement = document.querySelector('input[data-testid="SearchBox_Search_Input"]')
  searchElement.addEventListener('change', function () {
    tweetsHidden = 0
    chrome.storage.local.set({ 'tweetsHidden': tweetsHidden })
  })
}

function InvalidatedContext() {
  if (chrome.runtime.id == undefined) {
      location.reload()
      return true
  }
}

window.addEventListener('beforeunload', function (event) {
  if (InvalidatedContext()) return
  chrome.storage.local.set({ 'tweetsHidden': 0 })
})

let Observer = new MutationObserver( function() {
  let tweetElement = document.querySelector('article')
  if (tweetElement) {
    if (InvalidatedContext()) return
    checkTweets()
    searchListener()
  }
}).observe(document, { childList: true, subtree: true })
