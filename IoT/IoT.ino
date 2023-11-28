#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const char *ssid = "CT";                                   // Enter your WIFI ssid
const char *password = "camtu1974";                        // Enter your WIFI password
const char *server_url = "http://192.168.0.104:3000/iot/"; // Nodejs application endpoint

StaticJsonDocument<2048> iotData;
JsonArray sensorData = iotData.createNestedArray("data");

// Set up the client objet
WiFiClient client;
HTTPClient http;

// int IRsensor[3] = {2,3,4}; // Vị trí các chân IRsensor
// int data[3],check;

// Sensor data
const size_t dataArrSize = 3;
int dataArr[dataArrSize] = {1, 1, 1};

void setup()
{
    Serial.begin(9600);

    delay(3000);
    Serial.begin(9600);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("WiFi connected");
    delay(1000);
}

void getSensorData()
{
    for (size_t i = 0; i < dataArrSize; i++)
    {
        check = digitalRead(IRsensor[i]); // Đọc tín hiệu từng IRsensor
        if (check != 0 && check != 1)
            dataArr[i] = 2;
        else
            dataArr[i] = check;
    }
}

void sendData()
{

    iotData["errorCode"] = 0;
    for (size_t i = 0; i < dataArrSize; i++)
    {
        sensorData[i] = dataArr[i];
    }

    String jsonString;
    serializeJson(iotData, jsonString);

    Serial.print("\njson string: ");
    Serial.print(jsonString);

    http.begin(client, server_url);
    http.addHeader("Content-Type", "application/json");
    int httpCode = http.POST(jsonString);
    if (httpCode > 0)
    {
        if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY)
        {
            Serial.print("\nResponse: Success!");
        }
    }
    else
    {
        Serial.printf("\n[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }
    http.end();
}

void loop()
{
    getSensorData();

    sendData();

    delay(3000);
}