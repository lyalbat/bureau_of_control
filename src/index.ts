import { SerialPort } from "serialport";

const port = new SerialPort({
    path: '/dev/ttyACM0',
    baudRate: 9600,
})

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