function onCommand(command) {
	chrome.tabs.query({url: 'https://*.spotify.com/*'}, tabs => {
		// Open a spotify tab if one does not exist yet.
		if (tabs.length === 0) chrome.tabs.create({url: 'https://open.spotify.com/collection/tracks'});

		for (let tab of tabs) {
			let code = '';

			if (tab.url.startsWith('https://open.spotify.com')) {
				switch (command) {
					case 'next':
						code = 'document.querySelector(".vwGw2RO2v__qDU_9c5PE").click()';
						break;
					case 'previous':
						code = 'document.querySelector(".vBPFl8zuUaCexgJTw8Uc").click()';
						break;
					case 'shuffle':
						code = 'document.querySelector(".OSNOtcFz_LbegO1zggsb").click()';
						break;
					case 'repeat':
						code = 'document.querySelector(".__1BGhJvHnvqYTPyG074").click()';
						break;
					case 'track-add':
						code = 'document.querySelector(".B77TpDT6WaoYUqQxvy4Z").click()';
						break;
					case 'play-pause':
						code = 'document.querySelector(".gro_tSi7cwspepH0as03").click()';
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
