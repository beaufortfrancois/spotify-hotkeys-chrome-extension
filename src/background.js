function onCommand(command) {
	chrome.tabs.query({url: 'https://*.spotify.com/*'}, tabs => {
		// Open a spotify tab if one does not exist yet.
		if (tabs.length === 0) chrome.tabs.create({url: 'https://open.spotify.com/collection/tracks'});

		for (let tab of tabs) {
			let code = '';

			if (tab.url.startsWith('https://open.spotify.com')) {
				switch (command) {
					case 'next':
						code = 'document.querySelector(".ARtnAVxkbmzyEjniZXVO").click()';
						break;
					case 'previous':
						code = 'document.querySelector(".FKTganvAaWqgK6MUhbkx").click()';
						break;
					case 'shuffle':
						code = 'document.querySelector(".d4u88Fc9OM6kXh7FYYRj").click()';
						break;
					case 'repeat':
						code = 'document.querySelector(".bQY5A9SJfdFiEvBMM6J5").click()';
						break;
					case 'track-add':
						code = 'document.querySelector(".Fm7C3gdh5Lsc9qSXrQwO").click()';
						break;
					case 'play-pause':
						code = 'document.querySelector(".A8NeSZBojOQuVvK4l1pS").click()';
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
