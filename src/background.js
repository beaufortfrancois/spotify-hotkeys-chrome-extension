function onCommand(command) {
  chrome.tabs.query({url: 'https://open.spotify.com/*'}, function(tabs) {

    // Open a spotify tab if one does not exist yet.
    if (tabs.length === 0) {
      chrome.tabs.create({url: 'https://open.spotify.com'});
    }

    if (command == 'Play') {
      var selector = "button[title=Play], button[title=Pause]"
    } else {
      var selector = "button[title$=" + command + "]"
    }

    var code = "document.querySelector('" + selector + "').click()";

    // Apply command on all spotify tabs.
    for (var tab of tabs) {
      chrome.tabs.executeScript(tab.id, {code: code});
    }

    // Unload background page as soon as we're done.
    window.close();
  });
};

chrome.commands.onCommand.addListener(onCommand);
