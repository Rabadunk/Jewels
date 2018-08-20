const deviceService = 0xFFE0;
const deviceCharacter = 0xFFE1;
const sparky = 'C03';
const button = document.querySelector('#button');

button.addEventListener('click', function() {

	navigator.bluetooth.requestDevice({ filters: [{ services: [deviceService] }] })
	    .then(device => device.gatt.connect())
	    .then(server => server.getPrimaryService())
	    .then(service => service.getCharacteristic())
        .then(characteristic => characteristic.startNotifications())
	    .then(characteristic => {
			characteristic.addEventListener('characteristicvaluechanged',
			handleValueChange);
	    })
	.catch(error => { console.log("This is error: ", error); });
});

function handleValueChange(event){
	var value = event.target.value.getUint8(0);
    console.log('Our value is: ', value);
}
