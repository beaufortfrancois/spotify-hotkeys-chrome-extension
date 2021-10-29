function onCommand(command) {
	chrome.tabs.query({url: 'https://*.spotify.com/*'}, tabs => {
		// Open a spotify tab if one does not exist yet.
		if (tabs.length === 0) chrome.tabs.create({url: 'https://open.spotify.com/collection/tracks'});

		for (let tab of tabs) {
			let code = '';

			if (tab.url.startsWith('https://open.spotify.com')) {
				switch (command) {
					case 'next':
						code = 'document.querySelector(".nCpaRcGYhTBxygEV_tLd").click()';
						break;
					case 'previous':
						code = 'document.querySelector(".L4O7J5ORFBAJ8bEMYXCi").click()';
						break;
					case 'shuffle':
						code = 'document.querySelector(".texVXEH7twFXjUJu9Llu").click()';
						break;
					case 'repeat':
						code = 'document.querySelector(".enINDdBnsAC2KVIJckWK").click()';
						break;
					case 'track-add':
						code = 'document.querySelector(".Abjch8ZuaahhQPisoyO3").click()';
						break;
					case 'play-pause':
						code = 'document.querySelector("._mdSS50sTvYB40RuPTE7").click()';
						break;
				}
			}

			// Apply command on only 1 spotify tab.
			if (code.length) {
				chrome.tabs.executeScript(tab.id, {code: code});
				break;
			}
		}
		// Unload background page as soon as we're done.
		window.close();
	});
}

chrome.commands.onCommand.addListener(onCommand);
