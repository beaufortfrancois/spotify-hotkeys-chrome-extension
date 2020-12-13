function onCommand(command) {
	chrome.tabs.query({url: 'https://*.spotify.com/*'}, tabs => {
		// Open a spotify tab if one does not exist yet.
		if (tabs.length === 0) chrome.tabs.create({url: 'https://open.spotify.com/collection/tracks'});

		for (let tab of tabs) {
			let code = '';

			if (tab.url.startsWith('https://open.spotify.com')) {
				switch (command) {
					case 'next':
						code = 'document.querySelector(".bf01b0d913b6bfffea0d4ffd7393c4af-scss").click()';
						break;
					case 'previous':
						code = 'document.querySelector(".bc13c597ccee51a09ec60253c3c51c75-scss").click()';
						break;
					case 'shuffle':
						code = 'document.querySelector("._39234eb5c173f8b6de80ed73820b1be8-scss").click()';
						break;
					case 'repeat':
						code = 'document.querySelector(".ebfd411a126f1e7bea6133f21b4ef88e-scss").click()';
						break;
					case 'track-add':
						code = 'document.querySelector("._07bed3a434fa59aa1852a431bf2e19cb-scss").click()';
						break;
					case 'play-pause':
						code = 'document.querySelector("._82ba3fb528bb730b297a91f46acd37a3-scss").click()';
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
