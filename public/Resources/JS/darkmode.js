window.addEventListener('load', (event) => {
	const darkModeSwitch = document.createElement('label');
	darkModeSwitch.className = 'switch no-print';
	darkModeSwitch.innerHTML = `
    <img class="switch-icon" src="Assets/lightbulb-regular.svg">
      <input type="checkbox" id="dark-mode-toggle">
      <span class="slider"></span>
    `;

	// Append the switch to the body
	document.body.appendChild(darkModeSwitch);
	const toggleSwitch = document.querySelector('#dark-mode-toggle');

	toggleSwitch.addEventListener('change', function () {
		document.body.classList.toggle('dark-mode', this.checked);
	});
});
