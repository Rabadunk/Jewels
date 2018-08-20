const button = document.querySelector('#button');
button.addEventListener('click', function() {
	navigator.bluetooth.requestDevice({
		filters: [{
			name : 'C03'
	}]
	}).then(device => {
		console.log('Got device:', device.name);
		console.log('id:', device.id);
		document.getElementById('#output').innerHTML= "Device id" + device.id;
	});
});
