chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "watch",
    title: "Watch",
    contexts: ["link"],
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "watch") {
    return
  }
  watch(info.linkUrl, tab.url)
})

/**
 * @param {string} url
 * @returns {string|undefined}
 */
function getIdFromUrl(url) {
  const parts = url.split("/")
  parts.pop()
  const id = parts.pop()
  return id.startsWith("tt") ? id : undefined
}

/**
 *
 * @param {string} linkUrl
 * @param {string} tabUrl
 *
 */
function watch(linkUrl, tabUrl) {
  console.log({ linkUrl, tabUrl })

  const ids = {
    link: getIdFromUrl(linkUrl),
    tab: getIdFromUrl(tabUrl),
  }

  console.log(ids)

  if (!ids.link && !ids.tab) return

  chrome.tabs.create({
    url: `https://vidsrc.to/embed/movie/${ids.link ?? ids.tab}`,
  })
}
