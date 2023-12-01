#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const char *ssid = "UIT Public";                          // Enter your WIFI ssid
const char *password = "";                                // Enter your WIFI password
const char *server_url = "http://10.45.50.231:3000/iot/"; // Nodejs application endpoint

StaticJsonDocument<2048> iotData;
JsonArray sensorData = iotData.createNestedArray("data");

// Set up the client objet
WiFiClient client;
HTTPClient http;

// int IRsensor[3] = {2,3,4}; // Vị trí các chân IRsensor
// int data[3],check;

// Sensor data
const size_t dataArrSize = 3;
int IRsensor[dataArrSize] = {D2, D3, D4}; // Vị trí các chân nhận tín hiệu IR sensor

int dataArr[dataArrSize], check;
int preDataArr[dataArrSize] = {-1, -1, -1};

void setup()
{
    for (size_t i = 0; i < dataArrSize; i++)
        pinMode(IRsensor[i], INPUT);

    Serial.begin(9600);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("WiFi connected");
    delay(3000);
}

void getSensorData()
{
    for (size_t i = 0; i < dataArrSize; i++)
    {
        // 0 là có vật cản, 1 là K có vật cản.
        check = digitalRead(IRsensor[i]); // Đọc tín hiệu từng IRsensor
        if (check != 0 && check != 1)
            dataArr[i] = 2;
        else
            dataArr[i] = check;
    }
}

void sendData()
{
    //    for (size_t i = 0; i < dataArrSize; i++)
    //    {
    //        Serial.println(preDataArr[i]);
    //    }
    //    for (size_t i = 0; i < dataArrSize; i++)
    //    {
    //        Serial.println(dataArr[i]);
    //    }
    //

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
            // Copy dataArr to preDataArr
            for (size_t i = 0; i < dataArrSize; i++)
            {
                preDataArr[i] = dataArr[i];
            }
        }
        else
        {
            Serial.print("\nResponse: Failed!");
        }
    }
    else
    {
        Serial.printf("\n[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
        http.end();
    }
    http.end();
    return;
}

void loop()
{
    getSensorData();

    for (size_t i = 0; i < dataArrSize; i++)
    {
        if (preDataArr[i] != dataArr[i])
        {
            sendData();
            break;
        }
    }

    delay(1000);
}
