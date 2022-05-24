#include <SoftwareSerial.h>
#include <SPI.h>
#include <MFRC522.h>

constexpr uint8_t RST_PIN = 9;
constexpr uint8_t SS_PIN = 10;

MFRC522 mfrc522(SS_PIN, RST_PIN); // RFID Pin 번호

SoftwareSerial BTSerial(2,3); //블루투스 Pin 번호 
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
  Serial.begin(9600);
  BTSerial.begin(9600);
  while(!Serial);
  SPI.begin();
  mfrc522.PCD_Init();
  Serial.println("scan start");
  Serial.println();
}

//ID 정보 String으로 전환
String dump_byte_array(byte *buffer, byte bufferSize){
  String output = "";
  for (byte i = 0; i<mfrc522.uid.size; i++){
    //Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
    //Serial.print(mfrc522.uid.uidByte[i], HEX);
    output += buffer[i] < 0x10 ? " 0" : " ";
    output += String (buffer[i], HEX);
  }
  return output;
}

int search_uid(String input_tag){
  int i=0;
  for (i = 0; i<5; i++){
    if(tags[i] == input_tag){
      return 0;
    }
  }
  return 1;
}
void loop() {
  // put your main code here, to run repeatedly:
  if (!mfrc522.PICC_IsNewCardPresent()){
    return;
  }
  if(!mfrc522.PICC_ReadCardSerial()){
    return;
  }
  
  String uid = dump_byte_array(mfrc522.uid.uidByte, mfrc522.uid.size);
//  Serial.println(uid);
  if(uid != currenttag) {
//    BTSerial.print("UID tag:");
    if(search_uid(uid) == 0){
      for(int i=0; i<uid.length(); i++){
        BTSerial.write(i);
        
      }
  //    BTSerial.write(uid)
      BTSerial.print("UID tag:");
      BTSerial.print(uid);
    }else if (search_uid(uid) == 1){
      BTSerial.print("false card");
    }
  }
  
  Serial.println();
  delay(1000);

}
