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
						button_id = ".ARtnAVxkbmzyEjniZXVO";
						break;
					case 'previous':
						button_id = ".FKTganvAaWqgK6MUhbkx";
						break;
					case 'shuffle':
						button_id = ".d4u88Fc9OM6kXh7FYYRj";
						break;
					case 'repeat':
						button_id = ".bQY5A9SJfdFiEvBMM6J5";
						break;
					case 'track-add':
						button_id = ".Fm7C3gdh5Lsc9qSXrQwO";
						break;
					case 'play-pause':
						button_id = ".A8NeSZBojOQuVvK4l1pS";
						break;
					case 'mute-unmute':
						button_id = ".volume-bar__icon-button";
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
