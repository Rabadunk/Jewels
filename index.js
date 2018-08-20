const service = 0xFFE0;
const characteristic = 0xFFE1;
const sparky = 'C03';

const button = document.querySelector('#button');
button.addEventListener('click', function() {
	navigator.bluetooth.requestDevice({ filters:
		name: sparky,
		services: [service]
	})
	    .then(device => device.gatt.connect())
	    .then(server => server.getPrimaryService(service))
	    .then(service => service.getCharacteristic(characteristic))
	    .then(characteristic => {
	        characteristicInstance = characteristic;
					setInterval(updateSpeed,200); //send commands every 200ms
					console.log(characteristic.readValue());
	  			return characteristic.readValue();
	    })
	.catch(error => { console.log(error); });
})
});
