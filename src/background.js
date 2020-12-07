function onCommand(command) {
	chrome.tabs.query({url: 'https://*.spotify.com/*'}, tabs => {
		// Open a spotify tab if one does not exist yet.
		if (tabs.length === 0) chrome.tabs.create({url: 'https://open.spotify.com/collection/tracks'});

		// Apply command on all spotify tabs.
		for (let tab of tabs) {
			let code = '';
			if (tab.url.startsWith('https://open.spotify.com'))
				switch (command) {
					case 'next':
						code = 'document.querySelector("[title=\\"Next\\"]").click()';
						break;
					case 'previous':
						code = 'document.querySelector("[title=\\"Previous\\"]").click()';
						break;
					case 'shuffle':
						code = '(document.querySelector("[title=\\"Enable shuffle\\"]")?.click() || document.querySelector("[title=\\"Disable shuffle\\"]")?.click())'
						break;
					case 'repeat':
						code = '(document.querySelector(".spoticon-repeat-16")?.click() || document.querySelector(".spoticon-repeatonce-16")?.click())'
						break;
					case 'track-add':
						code = '(document.querySelector("[title=\\"Save to Your Library\\"]")?.click() || document.querySelector("[title=\\"Remove from Your Library\\"]")?.click())';
						break;
					case 'play-pause':
						code = '(document.querySelector("[title=\\"Play\\"]")?.click() || document.querySelector("[title=\\"Pause\\"]")?.click())';
						break;
				}
			if (code.length) chrome.tabs.executeScript(tab.id, {code: code});
		}
		// Unload background page as soon as we're done.
		window.close();
	});
}

chrome.commands.onCommand.addListener(onCommand);
