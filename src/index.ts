import express from 'express';
import { SerialPort } from "serialport";
import bodyParser from 'body-parser';

const app = express();

const portPath = '/dev/ttyACM0'; 
const baudRate = 9600; 
let ledON;

const myPort = new SerialPort({
    path: portPath,
    baudRate,
})

myPort.on('data', (data) => {
  const value = data.toString().trim();
  console.log('Received data:', value);
  if (value === '1') {
    ledON = true;
  } else if (value === '0') {
    ledON = false;
  }
});

app.use(bodyParser.json());

app.post('/api/updateClickedState', (req, res) => {
  const { ledON } = req.body;
  console.log('Received clicked state:', ledON);
  myPort.write(ledON ? '1' : '0', (error) => {
    if (error) {
      console.log('Error writing to serial port:', error);
      res.status(500).json({ error: 'Failed to update clicked state' });
    } else {
      console.log('Clicked state updated successfully');
      res.status(200).json({ success: true });
    }
  });
});

// Serve static files from the "client/build" directory
app.use(express.static('../static'));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

