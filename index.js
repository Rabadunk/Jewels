const button = document.querySelector("#button");

button.addEventListener("click", async function() {
	navigator.bluetooth.requestDevice({
		filters: [{
			name: "C03"
		}]
	}).then(device => {
		console.log("Got device: ", device.name);
		document.getElementById("output").innerHTML = "DeviceId:" + device.id;
	}).then(characteristic => {
  // Set up event listener for when characteristic value changes.
  characteristic.addEventListener('characteristicvaluechanged',
                                  handleBatteryLevelChanged);
  // Reading Battery Level...
  return characteristic.readValue();
}).catch(error => { console.log(error); });
});


function handleBatteryLevelChanged(event) {
  let batteryLevel = event.target.value.getUint8(0);
  console.log('Battery percentage is ' + batteryLevel);
}
