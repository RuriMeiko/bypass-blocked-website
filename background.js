chrome.webNavigation.onErrorOccurred.addListener(
	function (details) {
		if (details.error === "net::ERR_CONNECTION_REFUSED" || details.error === "net::ERR_NAME_NOT_RESOLVED") {
			const url = new URL(details.url);
			const modifiedOrigin = url.origin.replace(/\./g, "-");
			const googleHost = ".translate.goog";
			const new_url =
				modifiedOrigin +
				googleHost +
				url.pathname +
				`?_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp`;
			chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
				var currentTab = tabs[0];
				chrome.tabs.update(currentTab.id, { url: new_url });
			});
		}
	},
	{ url: [{ schemes: ["http", "https"] }] }
);
