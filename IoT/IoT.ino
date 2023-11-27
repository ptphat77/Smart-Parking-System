#include <ArduinoJson.h>

void setup() {
    Serial.begin(9600);

    Serial.println(F("Start!!!"));
}

void getSensorData() {
    StaticJsonDocument<2048> data;

}

void sendData() {
    
}

void loop() {
    StaticJsonDocument<2048> data;

    data = getSensorData()

    sendData()

    delay(1000);
}