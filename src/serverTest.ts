import { SerialPort } from "serialport";

const port = new SerialPort({
    path: '/dev/ttyACM0',
    baudRate: 9600,
})

let clicked;

port.on('data', (data) => {
    const value = data.toString().trim();
    while(value != 0){
        console.log('Received data:', value);
        if (value === '1') {
            clicked = true;
            console.log('the led is on!');
          }
        else {
            clicked = false;
            console.log('the led is off!');
        }
        }
  });

port.write('main screen turn on', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message)
    }
    console.log('main screen is on without errors')
  })
  
  // Open errors will be emitted as an error event
  port.on('error', function(err) {
    console.log('Error: ', err.message)
  })