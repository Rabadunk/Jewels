// Constants

//UUID for ATMega328pb
const deviceService = 0xFFE0;
const deviceCharacter = 0xFFE1;

//Name of our HM10 bluetooth module
const sparky = 'C03';

//Data array
var datacurrent = [0, 0, 0];
var datavolt = [0, 0, 0];
var datapower = [0, 0, 0];
var check = [0, 0, 0]
var powerpoint = 0;
var voltagepoint = 0;
var currentpoint = 0;
var data = '';
var start = false;
var bleCharacteristic;

// When toggle buttong is clicked turn on/off
const toggle = document.querySelector('#toggle');


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
				bleCharacteristic = characteristic;
			characteristic.addEventListener('characteristicvaluechanged',
			handleValueChange);
	    })
	.catch(error => { console.log("This is error: ", error); });
});

toggle.addEventListener('click', function() {
	if(!bleCharacteristic) {
		return;
	}

	let value = Uint8Array.of(0);
	bleCharacteristic.writeValue(value).catch(error => {
		console.log('Argh!' + error);
	});
})

// Function for sending data to front end.
function handleValueChange(event){
	var value = event.target.value.getUint8(0);
	console.log(value);

	if (value > 47 && value < 58) {
		datapower[0] = convert_to_power1(value);
	}
	else if (value > 31 && value < 42) {
		datapower[1] = convert_to_power2(value);
	}
	else if (value > 15 && value < 26) {
		datapower[2] = convert_to_power3(value);
	}
	else if (value > 111 && value < 122) {
		datavolt[0] = convert_to_volts1(value);
	}
	else if (value > 95 && value < 106) {
		datavolt[1] = convert_to_volts2(value);
	}
	else if (value > 79 && value < 90) {
		datavolt[2] = convert_to_volts3(value);
	}
	else if (value > 175 && value < 186) {
		datacurrent[0] = convert_to_current1(value);
	}
	else if (value > 159 && value < 170) {
		datacurrent[1] = convert_to_current2(value);
	}
	else if (value > 143 && value < 154) {
		datacurrent[2] = convert_to_current3(value);
	}

	if (datapower != check) {
		powerpoint = parseFloat(datapower[0].toString() + "." + datapower[1].toString() + datapower[2].toString());
		console.log(datapower);
	}

	if (datavolt != check) {
		voltagepoint = parseFloat(datavolt[0].toString() + datavolt[1].toString() + "." + datavolt[2].toString());
		console.log(datavolt);
	}

	if (datacurrent != check) {
		currentpoint = parseFloat(datacurrent[0].toString() + datacurrent[1].toString() + datacurrent[2].toString());
		console.log(datacurrent);
	}

}
