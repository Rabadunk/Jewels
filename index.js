const button = document.querySelector('#button');
button.addEventListener('click', function() {
	navigator.bluetooth.requestDevice({
		filters: [{
			name : 'C03',
			services: ['0009180d-0000-1000-8000-00705f9b34fb']
	}]
	}).then(device => {
		console.log('Got device:', device.name);
		console.log('id:', device.id);
		return device.gatt.connect();
	}).then(characteristic => {
		console.log("Reading value");
		return characteristic.readValue();
})
});
