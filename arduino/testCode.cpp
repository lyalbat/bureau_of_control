// C++ code
//

int ledPin = 12;
int button = 7;
int previousState = 1;


void setup()
{
  pinMode(ledPin, OUTPUT);
  pinMode(button, INPUT);
  Serial.begin(9600);
}

void loop()
{
  while(digitalRead(button)!=previousState){
    if(digitalRead(button)==HIGH){
      previousState = 1;
  	  digitalWrite(ledPin, HIGH);
    }
    else{
      previousState = 0;
      digitalWrite(ledPin, LOW);
    }
    Serial.println(digitalRead(button));
  }
} 