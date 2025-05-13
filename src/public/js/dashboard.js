console.log('DASHBORD SCRIPT');

const hourContainer = document.getElementById('hour');
const minuteContainer = document.getElementById('min');
const dateContainer = document.getElementById('date');
const sensorContainer = document.getElementById('sensor-container');

const ws = new WebSocket('/api/device/ws');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'device-data') {
    for (let i = 0; i < data.data.sensors.length; i++) {
      const sensor = data.data.sensors[i];
      document.getElementById(
        `${sensor.sensor_id}-${sensor.sensor_type}`
      ).textContent = sensor.sensor_value;
    }
  }
};

ws.onopen = () => console.log('Connected to WebSocket');
ws.onclose = (e) => console.log('Disconnected, ', e);

function loadDate() {
  const dateTime = new Date();
  const formatedDate = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'full',
  }).format(dateTime);
  hourContainer.textContent = String(dateTime.getHours()).padStart(2, '0');
  minuteContainer.textContent = String(dateTime.getMinutes()).padStart(2, '0');
  dateContainer.textContent = formatedDate;
}

loadDate();

setInterval(() => {
  loadDate();
}, 1000);
