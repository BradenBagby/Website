function blinkLinks() {
	//fade out all links
	const links = document.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		const link = links[i];
		link.style.color = '#007bff';
		// link.style.textDecoration = "underline";
	}

	setTimeout(function () {
		const links = document.getElementsByTagName('a');
		for (var i = 0; i < links.length; i++) {
			const link = links[i];
			link.style.color = 'inherit';
			//link.style.textDecoration = "";
		}
	}, 2000);
}

window.addEventListener('load', (event) => {
	blinkLinks();

	setInterval(function () {
		blinkLinks();
	}, 15000);
});
