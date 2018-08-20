const service = 0xFFE0;
const characteristic = 0xFFE1;
const sparky = 'C03';

const button = document.querySelector('#button');
button.addEventListener('click', function() {
	navigator.bluetooth.requestDevice({ filters: [{ services: [service] }] })
	    .then(device => device.gatt.connect())
	    .then(server => server.getPrimaryService(service))
	    .then(service => service.getCharacteristic(characteristic))
	    .then(characteristic => {
	        characteristicInstance = characteristic;
			console.log("reading value");
	  	return characteristic.readValue();
	    })
	.catch(error => { console.log(error); });
});
