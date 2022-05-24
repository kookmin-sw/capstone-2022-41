//vm-5ga test

#include <SoftwareSerial.h>

SoftwareSerial BTSerial(2,3); //블루투스 Pin 번호
//SoftwareSerial vmSerial(4,5);
byte readOnce[] = {0xBB, 0x00, 0x22, 0x00, 0x00, 0x22, 0x7E};
//byte readOnce[] = {0xBB, 0x00, 0x39, 0x00, 0x09, 0x00, 0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x08, 0x4D, 0x7E};
byte Container[1024]; 
/*
 * 갖고 있는 id
 * Card UID: 23 12 DF 54
 * Card UID: F3 D5 C3 54
 * Card UID: C3 DC BF 54
 * Card UID: 87 DB 77 5A
 * Card UID: 4A 46 E6 81
*/
String tag1 = " 23 12 df 54";
String tag2 = " f3 d5 c3 54";
String tag3 = " c3 dc bf 54";
String tag4 = " 87 db 77 5a";
String tag5 = " 4a 46 e6 81";
String tags[] = {tag1, tag2, tag3, tag4, tag5};
String currenttag = "";

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  BTSerial.begin(115200);
  while(!Serial);
  SPI.begin();
  //pinMode(switchPin, INPUT);
  Serial.setTimeout(2000);
  Serial.println("scan start");
  Serial.println();
}

void loop() {
  // put your main code here, to run repeatedly:
  UIDread();
}

void UIDread(){
  Serial.write(readOnce, sizeof(readOnce));
  delay(100);
  int len = Serial.available();
  if (len>0) {
    Serial.readBytes(Container, len); 
    String uid = conver(Container,len);
    for(int i = 0; i<uid.length(); i++){
      BTSerial.write(i)
    }
    BTSerial.println(uid);
    Serial.println(uid);
    
  }
}

String conver(byte data[], int len){
  String output = "";
  for(byte i = 0; i<len; i++){
    output += data[i] < 0x10 ? " 0" : " ";
    output += String (data[i], HEX);
  }
  return output;
}
