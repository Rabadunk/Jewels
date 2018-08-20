const button = document.querySelector('#button');
button.addEventListener('click', function() {
	navigator.bluetooth.requestDevice({
		filters: [{
			name : 'C03'
	}]
	}).then(device => {
		console.log('Got device:', device.name);
		console.log('id:', device.id);
	}).then(characteristic => {
		console.log(characteristic.readValue());
		return characteristic.readValue();
})
});
