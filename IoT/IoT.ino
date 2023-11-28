#include <ArduinoJson.h>

int IRsensor[3] = {2,3,4}; // Vị trí các chân IRsensor
int data[3],check;

void setup() {
    Serial.begin(9600);
    for(int i =0;i<3;i++)
        pinMode(IRsensor[i],INPUT);
    
    Serial.println(F("Start!!!"));
}

void getSensorData() {
    for(int i =0;i<3;i++){
        check = digitalRead(IRsensor[i]); // Đọc tín hiệu từng IRsensor
        if(check!=0 && check !=1)
          data[i] = 2;
        else
          data[i] = check;
    }
}

void sendData() {
    
}

void loop() {
    StaticJsonDocument<2048> data;

    getSensorData()

    sendData()

    delay(1000);
}
