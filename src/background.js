function clickButton(selector_id) {
	document.querySelector(selector_id).click();
}

function onCommand(command) {
	chrome.tabs.query({url: 'https://*.spotify.com/*'}, tabs => {
		// Open a spotify tab if one does not exist yet.
		if (tabs.length === 0) chrome.tabs.create({url: 'https://open.spotify.com/collection/tracks'});

		for (let tab of tabs) {
			let filter = '';

			if (tab.url.startsWith('https://open.spotify.com')) {
				switch (command) {
					case 'next':
						filter = 'button[data-testid="control-button-skip-forward"]';
						break;
					case 'previous':
						filter = 'button[data-testid="control-button-skip-back"]';
						break;
					case 'shuffle':
						filter = 'button[data-testid="control-button-shuffle"]';
						break;
					case 'repeat':
						filter = 'button[data-testid="control-button-repeat"]';
						break;
					case 'track-add':
						filter = 'button[class="Button-sc-1dqy6lx-0 gqhkFI"]';
						break;
					case 'play-pause':
						filter = 'button[data-testid="control-button-playpause"]';
						break;
					case 'mute-unmute':
						filter = 'button[data-testid="volume-bar-toggle-mute-button"]';
						break;
				}
			}

			// Apply command on only 1 spotify tab.
			if (filter.length) {
				chrome.scripting.executeScript({
					target: {tabId: tab.id},
					func: clickButton,
					args: [filter],
				});
				break;
			}
		}
	});
}

chrome.commands.onCommand.addListener(onCommand);
