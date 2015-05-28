
function onCommand(command) {
    chrome.tabs.query({url: 'https://*.spotify.com/*'}, function(tabs) {
	
	// Open a spotify tab if one does not exist yet. 
	if (tabs.length === 0) {
	    chrome.tabs.create({url: 'https://player.spotify.com'});
	}
	
	var code_player = "document.getElementById('main').contentDocument.querySelector('#" + command +  "').click()";
	if(command=="play"){
		var code_play="document.getElementById('app-player').contentDocument.getElementById('play-pause').click()";
	}else{
		var code_play="document.getElementById('app-player').contentDocument.getElementById('" + command + "').click()";
	}
	
	
	var reg_player = new RegExp("/.+player[.]spotify[.]com/*/");
	var reg_play = new RegExp("/.+play[.]spotify[.]com/*/");
	
	// Apply command on all spotify tabs.
	for (var tab of tabs) {
		
	    if(reg_player.test(tab.url))
			chrome.tabs.executeScript(tab.id, {code: code_player});
		
	    if(reg_play.test(tab.url))
			chrome.tabs.executeScript(tab.id, {code: code_play});
		
	}
	
	// Unload background page as soon as we're done.
	window.close();
    });
};

chrome.commands.onCommand.addListener(onCommand);
