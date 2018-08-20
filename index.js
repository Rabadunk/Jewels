const button = document.querySelector('#button');
button.addEventListener('click', function() {
	navigator.bluetooth.requestDevice({
		filters: [{
			services: ['battery_service']
		}]
	}).then(device => {
		console.log('Got device:', device.name);
		console.log('id:', device.id);
	});
});
