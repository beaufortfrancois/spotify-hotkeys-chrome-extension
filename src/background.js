function clickButton(selector_id) {
	document.querySelector(selector_id).click();
}

function onCommand(command) {
	chrome.tabs.query({url: 'https://*.spotify.com/*'}, tabs => {
		// Open a spotify tab if one does not exist yet.
		if (tabs.length === 0) chrome.tabs.create({url: 'https://open.spotify.com/collection/tracks'});

		for (let tab of tabs) {
			let button_id = '';

			if (tab.url.startsWith('https://open.spotify.com')) {
				switch (command) {
					case 'next':
						button_id = ".mnipjT4SLDMgwiDCEnRC";
						break;
					case 'previous':
						button_id = ".fn72ari9aEmKo4JcwteT";
						break;
					case 'shuffle':
						button_id = ".KVKoQ3u4JpKTvSSFtd6J";
						break;
					case 'repeat':
						button_id = ".Vz6yjzttS0YlLcwrkoUR";
						break;
					case 'track-add':
						button_id = ".Fm7C3gdh5Lsc9qSXrQwO";
						break;
					case 'play-pause':
						button_id = ".vnCew8qzJq3cVGlYFXRI";
						break;
					case 'mute-unmute':
						button_id = ".FZhaXNtbN3Crwrgd0TA7";
						break;
				}
			}

			// Apply command on only 1 spotify tab.
			if (button_id.length) {
				chrome.scripting.executeScript({
					target: {tabId: tab.id},
					func: clickButton,
					args: [button_id],
				});
				break;
			}
		}
	});
}

chrome.commands.onCommand.addListener(onCommand);
