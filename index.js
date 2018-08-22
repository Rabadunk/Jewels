// Constants

//UUID for ATMega328pb
const deviceService = 0xFFE0;
const deviceCharacter = 0xFFE1;

//Name of our HM10 bluetooth module
const sparky = 'C03';


// When button is clicked, start bluetooth navigator.
const button = document.querySelector('#button');
button.addEventListener('click', function() {

	navigator.bluetooth.requestDevice({ filters: [{ services: [deviceService] }] })
			// GATT connect.
	    .then(device => device.gatt.connect())
	    .then(server => server.getPrimaryService(deviceService))
	    .then(service => service.getCharacteristic(deviceCharacter))
        .then(characteristic => characteristic.startNotifications())
	    .then(characteristic => {
			characteristic.addEventListener('characteristicvaluechanged',
			handleValueChange);
	    })
	.catch(error => { console.log("This is error: ", error); });
});

// Function for sending data to front end.
function handleValueChange(event){
	var value = event.target.value.getUint8(0);
    document.getElementById("output").innerHTML = value;
}
