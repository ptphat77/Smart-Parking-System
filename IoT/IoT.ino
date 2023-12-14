#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>
#include <Servo.h> 
#include <ESP8266WebServer.h>
ESP8266WebServer webServer(80);

LiquidCrystal_I2C lcd(0x3F,16,2); // có thể khác: 0x3F

int servo = D6;
Servo myServo;

int Gate_sensor = D7, isSendDataGateSensor = 0; // isSendDataGateSensor: 0 - unsent, 1 - sent

const char *ssid = "UIT Public";                          // Enter your WIFI ssid
const char *password = "";                                // Enter your WIFI password
const char *server_url = "http://10.45.50.231:3000/iot/"; // Nodejs application endpoint

StaticJsonDocument<2048> iotData;


// Set up the client objet
WiFiClient client;
HTTPClient http;

// Sensor data
const size_t dataArrSize = 3;
int IRsensor[dataArrSize] = {D2, D3, D4}; // Vị trí các chân nhận tín hiệu IR sensor

int dataArr[dataArrSize], check;
int preDataArr[dataArrSize] = {-1, -1, -1};

void setup()
{
    for (size_t i = 0; i < dataArrSize; i++)
        pinMode(IRsensor[i], INPUT);
    pinMode(Gate_sensor, INPUT);
    //-----------
    Serial.begin(9600);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("WiFi connected");
    Serial.println(WiFi.localIP());
    delay(3000);
    //-------------
    webServer.on("/opengate", openGate);
    webServer.begin();
    //------------
    lcd.init(); //Khởi tạo màn hình LCD
    lcd.backlight(); //Bật đèn màn hình lCD

    Serial.begin(9600);
    myServo.attach(servo);
    //--------------
}

void getSensorData()
{
    iotData["errorCode"] = 0;
    for (size_t i = 0; i < dataArrSize; i++)
    {
        // 0 là có vật cản, 1 là K có vật cản
        check = digitalRead(IRsensor[i]); // Đọc tín hiệu từng IRsensor
        if (check != 0 && check != 1)
        {
            iotData["errorCode"] = 1;
            dataArr[i] = 2; //2 là Sensor bị lỗi
        }
        else
            dataArr[i] = check;
    }
}

void sendData()
{
    JsonArray sensorArray = iotData.createNestedArray("data");

    bool equalPreData = true;
    for (size_t i = 0; i < dataArrSize; i++)
    {
        if(preDataArr[i] != dataArr[i]){
            JsonObject sensorData = sensorArray.createNestedObject();
            sensorData["sensorNumber"] = i;
            sensorData["isBlank"] = (bool) dataArr[i];

            equalPreData = false;
        }  
    }

    if(equalPreData == true) // Nếu dataArr trùng với preDataArr thì không gởi
        return;

    displayScreenLed();
      
    String jsonString;
    serializeJson(iotData, jsonString);
    iotData.clear();

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

void displayScreenLed()
{
    int slot = 0;
    for (size_t i = 0; i < dataArrSize; i++)
        if(dataArr[i] == 1)
        slot += 1;
    
    // In ra màn led
    if(slot != 0)
    {
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("    WELCOME!    ");
    lcd.setCursor (0,1);
    lcd.print("Slot Left: ");
    lcd.print(slot);
    } 
    else{
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("    SORRY :(    ");  
    lcd.setCursor (0,1);
    lcd.print("  Parking Full  "); 
    } 
}

void openGate()
{
    webServer.send(200, "text/html", "ok");

    Serial.println("Trong ham openGate");
    Serial.println(digitalRead(Gate_sensor));
    while(digitalRead(Gate_sensor) == 0)
    {
        myServo.write(0);
        delay(1000);
    }   
    myServo.write(90);
    delay(2000);
    
}

void loop()
{
    getSensorData();
    sendData();
    webServer.handleClient(); // handle incoming client requests.
    //delay(1000);
}
