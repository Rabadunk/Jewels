const button = document.querySelector('#button');
button.addEventListener('click', function() {
	navigator.bluetooth.requestDevice({
		acceptAllDevices: true
	}).then(device => {
		console.log('Got device:', device.name);
		console.log('id:', device.id);
	});
});
