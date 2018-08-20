const button = document.querySelector("#button");

button.addEventListener("click", async function() {
	navigator.bluetooth.requestDevice({
		filters: [{
			name: "C03"
		}]
	}).then(device => {
		console.log("Got device: ", device.name);
		document.getElementById("output").innerHTML = "DeviceId:" + device.id;
	})
