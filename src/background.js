function onCommand(command) {
  chrome.tabs.query({url: 'https://*.spotify.com/*'}, function(tabs) {

    // Open a spotify tab if one does not exist yet.
    if (tabs.length === 0) {
      chrome.tabs.create({url: 'https://open.spotify.com'});
    }

    // Apply command on all spotify tabs.
    for (var tab of tabs) {

      var code = '';
      if (tab.url.startsWith('https://play.spotify.com')) {
        code = "document.getElementById('app-player').contentDocument.getElementById('" + command + "').click()";
      } else if (tab.url.startsWith('https://open.spotify.com')) {
        switch (command) {
          case 'next': code = 'document.querySelector(".spoticon-skip-forward-24").click()'; break;
          case 'previous': code = 'document.querySelector(".spoticon-skip-back-24").click()'; break;
          case 'shuffle': code = 'document.querySelector(".spoticon-shuffle-16").click()'; break;
          case 'repeat': code = 'document.querySelector(".spoticon-repeat-16").click()'; break;
          case 'play-pause': code = '(document.querySelector(".spoticon-play-32") || document.querySelector(".spoticon-pause-32")).click()'; break;
        }
      }
      if (code.length) {
        chrome.tabs.executeScript(tab.id, {code: code});
      }
    }

    // Unload background page as soon as we're done.
    window.close();
  });
};

chrome.commands.onCommand.addListener(onCommand);
