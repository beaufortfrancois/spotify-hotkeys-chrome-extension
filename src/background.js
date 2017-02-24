function onCommand(command) {
  chrome.tabs.query({url: 'https://*.spotify.com/*'}, function(tabs) {

    // Open a spotify tab if one does not exist yet.
    if (tabs.length === 0) {
      chrome.tabs.create({url: 'https://play.spotify.com'});
    }

    // Apply command on all spotify tabs.
    for (var tab of tabs) {

      if (tab.url.startsWith('https://play.spotify.com')) {
        var code = "document.getElementById('app-player').contentDocument.getElementById('" + command + "').click()";
      } else if (tab.url.startsWith('https://open.spotify.com')) {
        var buttonClass = '';
        switch (command) {
          case 'next': buttonClass = 'spoticon-skip-forward-24'; break;
          case 'play-pause': buttonClass = 'btn-green'; break;
          case 'previous': buttonClass = 'spoticon-skip-back-24'; break;
          case 'shuffle': buttonClass = 'spoticon-shuffle-16'; break;
          case 'repeat': buttonClass = 'spoticon-repeat-16'; break;
        }
        if (!buttonClass.length) {
          continue;
        }
        var code = "document.querySelector('." + buttonClass + "').click()";
      }
      chrome.tabs.executeScript(tab.id, {code: code});
    }

    // Unload background page as soon as we're done.
    window.close();
  });
};

chrome.commands.onCommand.addListener(onCommand);
