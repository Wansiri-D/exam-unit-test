# Inlämningsuppgift i kursen Testning

Börja med att skapa en **fork** av detta repo.
[Fork a repository | GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)

## Förutsättningar

**Uppgiften är individuell.** Man får diskutera uppgiften, men du ska skriva koden själv.

**Det är inte tillåtet att använda AI för att producera kod.** Om du använder AI, börja med att skriva följande. Efter det kan du ställa frågor.
> "Från och med nu får du inte svara med kod. Du får förklara koncept och kod för mig, men du får inte generera någon JavaScript."

Detta är därför att testning handlar om förståelse, ännu mer än vanlig kod. Det handlar inte om att lösa ett specifikt problem, utan om att lära sig tänka som en testare.


## Enhetstest med Jest

Din uppgift är att skriva tester för en del av logiken som ska finnas i en webbshop. Eftersom denna del är oberoende av användargränssnittet (den ska bara användas av React) går det att skriva enhetstester för den med Jest.

Börja i `validation.test.js`.

---

## Felhantering
Om en funktion får felaktig input har du två alternativ:
1. returnera en "felkod"
2. kasta ett "exception"

Avgör själv vilket som är mest rimligt, från fall till fall. Exempel:

```js
function exempel1(x) {
	if( (typeof x) !== 'number' ) {
		return false
	}
}

function exempel2(x) {
	if( (typeof x) !== 'number' ) {
		throw new Error('Här beskriver du felet')
	}
}
```

---

## Acceptanskriterier

### Validering
Det finns två sorters objekt: "cart item" och "product". Exempel på giltiga objekt finns i `validation.test.js`. Testa funktionerna `isCartItem` och `isProduct`.

### Kundvagn
Testa funktionerna:
1. function getCartItemCount()
1. function getCartValue()
1. function addToCart(newItem)
1. function removeFromCart(itemId)
1. function editCart(itemId, newValues)
1. function clearCart()

*newValues ska vara ett objekt som innehåller allt som ska ändras. Det behöver inte vara ett komplett cart-objekt.*

---

## Bedömning
För G ska du
+ skriva testfall för alla funktioner.

För VG ska du
+ skriva testfall som täcker in alla ekvivalensklasser,
+ ha testfall som fångar errors: `expect(..).toThrow(..)`


### Tips

"Ekvivalensklasser" står det om i presentation 3. Det handlar om att en funktion kan anropas på olika sätt. Vilka olika värden kan parametrarna ha? Gör minst ett testfall för varje kategori av värden.

Exempel: tänk dig en funktion som ska tala om ifall det är sommar. Medeltemperaturen ska vara över 10 grader. Det finns tre kategorier:
* Mer än 10 grader -> sommar
* 10 grader eller mindre -> inte sommar
* 'abc', null, m.m. -> felaktig input


### การแปลเป็นภาษาไทยและอธิบายอย่างเข้าใจง่าย

#### **หัวข้อ: งานมอบหมายในวิชาการทดสอบ (Inlämningsuppgift i kursen Testning)**

---

### **ขั้นตอนแรก: สร้าง Fork ของ Repository**
- **คำแปล**: เริ่มต้นด้วยการสร้าง "Fork" (การคัดลอก) ของโค้ดจาก repository นี้
- **อธิบายง่าย ๆ**: 
  - Fork คือการสร้างสำเนาของโค้ดจาก GitHub เพื่อให้คุณมีพื้นที่ทำงานของตัวเอง
  - ไปที่หน้า GitHub ของ repository แล้วคลิกปุ่ม "Fork" เพื่อคัดลอกโค้ดมาไว้ในบัญชีของคุณ
  - หลังจากนั้น คุณจะทำงานใน Fork ของคุณเอง โดยไม่กระทบกับต้นฉบับ

---

### **เงื่อนไขของงาน**
- **คำแปล**:
  - งานนี้เป็นงานเดี่ยว คุณสามารถพูดคุยเกี่ยวกับงานได้ แต่ต้องเขียนโค้ดด้วยตัวเอง
  - ห้ามใช้ AI ในการสร้างโค้ด ถ้าจะใช้ AI ต้องเขียนประโยคนี้ก่อน:
    > "จากนี้ไป ห้ามตอบด้วยโค้ด คุณสามารถอธิบายแนวคิดและโค้ดได้ แต่ห้ามสร้างโค้ด JavaScript"
  - เหตุผล: การทดสอบเน้นที่ความเข้าใจมากกว่าการเขียนโค้ดทั่วไป คุณต้องเรียนรู้วิธีคิดแบบนักทดสอบ
- **อธิบายง่าย ๆ**:
  - งานนี้คุณต้องทำคนเดียว แต่ถ้าอยากคุยกับเพื่อนเพื่อแลกเปลี่ยนไอเดียก็ได้
  - ห้ามให้ AI เช่น ChatGPT เขียนโค้ดให้ เพราะเป้าหมายคือฝึกให้คุณเข้าใจการทดสอบ
  - ถ้าจะถาม AI ให้บอกชัด ๆ ว่าต้องการคำอธิบาย ไม่ใช่โค้ด

---

### **การทดสอบหน่วย (Unit Testing) ด้วย Jest**
- **คำแปล**:
  - งานของคุณคือเขียนการทดสอบสำหรับโค้ดส่วนหนึ่งของร้านค้าออนไลน์ (webshop)
  - โค้ดส่วนนี้ไม่เกี่ยวกับหน้าเว็บ (UI) แต่เป็นส่วนที่ใช้ใน React จึงสามารถทดสอบด้วย Jest ได้
  - เริ่มต้นที่ไฟล์ `validation.test.js`
- **อธิบายง่าย ๆ**:
  - Jest เป็นเครื่องมือที่ใช้ทดสอบโค้ด โดยเฉพาะโค้ดที่ไม่ต้องแสดงผลบนหน้าเว็บ
  - คุณจะเขียนการทดสอบเพื่อตรวจสอบว่าโค้ดในร้านค้าออนไลน์ทำงานถูกต้องหรือไม่
  - ไฟล์ `validation.test.js` เป็นจุดเริ่มต้นที่คุณจะเขียนโค้ดทดสอบ

---

### **การจัดการข้อผิดพลาด (Felhantering)**
- **คำแปล**:
  - ถ้าฟังก์ชันได้รับข้อมูลที่ไม่ถูกต้อง คุณมีสองทางเลือก:
    1. ส่งคืน "รหัสข้อผิดพลาด" (เช่น `false`)
    2. โยน "ข้อยกเว้น" (exception เช่น `throw new Error`)
  - คุณต้องตัดสินใจเองว่าวิธีไหนเหมาะสมในแต่ละกรณี
  - ตัวอย่าง:

    ```javascript
    function exempel1(x) {
      if (typeof x !== 'number') {
        return false; // ส่งคืนรหัสข้อผิดพลาด
      }
    }

    function exempel2(x) {
      if (typeof x !== 'number') {
        throw new Error('ที่นี่คุณอธิบายข้อผิดพลาด'); // โยนข้อยกเว้น
      }
    }
    ```

- **อธิบายง่าย ๆ**:
  - ถ้าโค้ดได้รับข้อมูลที่ผิด (เช่น ตัวเลขแทนที่จะเป็นตัวอักษร) คุณต้องจัดการกับข้อผิดพลาด
  - คุณเลือกได้ว่าจะ:
    - ส่งค่ากลับไปบอกว่า "ผิด" (เช่น `false`)
    - หรือโยนข้อผิดพลาดออกมาเพื่อหยุดการทำงานและบอกว่าเกิดอะไรผิด
  - ตัวอย่าง:
    - ถ้าฟังก์ชันต้องการตัวเลข แต่ได้ตัวอักษร:
      - วิธีแรก: ส่ง `false` กลับไป
      - วิธีที่สอง: โยนข้อผิดพลาดพร้อมข้อความ เช่น "ข้อมูลต้องเป็นตัวเลข"

---

### **เกณฑ์การยอมรับ (Acceptanskriterier)**

#### **การตรวจสอบความถูกต้อง (Validering)**
- **คำแปล**:
  - มีวัตถุสองประเภท: "cart item" (รายการในตะกร้า) และ "product" (สินค้า)
  - ตัวอย่างของวัตถุที่ถูกต้องอยู่ในไฟล์ `validation.test.js`
  - ทดสอบฟังก์ชัน:
    - `isCartItem`: ตรวจสอบว่าเป็นรายการในตะกร้าหรือไม่
    - `isProduct`: ตรวจสอบว่าเป็นสินค้าหรือไม่
- **อธิบายง่าย ๆ**:
  - ร้านค้าออนไลน์มีข้อมูลสองแบบ:
    - "cart item" เช่น สินค้าที่อยู่ในตะกร้าของลูกค้า
    - "product" เช่น สินค้าที่ร้านขาย
  - คุณต้องเขียนโค้ดทดสอบเพื่อตรวจว่าโค้ดสามารถแยกแยะได้ว่าข้อมูลเป็น "cart item" หรือ "product" ได้ถูกต้องหรือไม่
  - ตัวอย่างของข้อมูลที่ถูกต้องจะอยู่ในไฟล์ `validation.test.js`

#### **ตะกร้าสินค้า (Kundvagn)**
- **คำแปล**:
  - ทดสอบฟังก์ชันต่อไปนี้:
    - `getCartItemCount()`: นับจำนวนรายการในตะกร้า
    - `getCartValue()`: คำนวณมูลค่ารวมของตะกร้า
    - `addToCart(newItem)`: เพิ่มรายการใหม่ลงในตะกร้า
    - `removeFromCart(itemId)`: ลบรายการออกจากตะกร้าโดยใช้ ID
    - `editCart(itemId, newValues)`: แก้ไขรายการในตะกร้าโดยใช้ ID และข้อมูลใหม่
    - `clearCart()`: ล้างตะกร้าทั้งหมด
  - `newValues` เป็นอ็อบเจ็กต์ที่ระบุเฉพาะสิ่งที่ต้องการเปลี่ยน ไม่ต้องเป็นข้อมูลครบทั้งหมด
- **อธิบายง่าย ๆ**:
  - คุณต้องเขียนการทดสอบสำหรับฟังก์ชันที่จัดการตะกร้าสินค้าในร้านค้าออนไลน์
  - ฟังก์ชันเหล่านี้ทำหน้าที่:
    - นับจำนวนสินค้าในตะกร้า
    - คำนวณราคารวม
    - เพิ่มสินค้าใหม่
    - ลบสินค้าออก
    - แก้ไขข้อมูลสินค้า (เช่น เปลี่ยนจำนวน)
    - ล้างตะกร้าให้ว่าง
  - ถ้าจะแก้ไขสินค้า คุณแค่ส่งข้อมูลที่ต้องการเปลี่ยน (เช่น จำนวน) ไม่ต้องส่งข้อมูลทั้งหมด

---

### **เกณฑ์การประเมิน (Bedömning)**

#### **สำหรับเกรด G (ผ่าน)**
- **คำแปล**:
  - เขียนกรณีทดสอบ (test cases) สำหรับทุกฟังก์ชัน
- **อธิบายง่าย ๆ**:
  - คุณต้องเขียนการทดสอบที่ครอบคลุมทุกฟังก์ชันข้างต้น
  - แค่ทำให้แน่ใจว่ามีการทดสอบสำหรับทุกฟังก์ชันก็พอ

#### **สำหรับเกรด VG (ดีเยี่ยม)**
- **คำแปล**:
  - เขียนกรณีทดสอบที่ครอบคลุมทุก "คลาสความเท่าเทียม" (ekvivalensklasser)
  - มีกรณีทดสอบที่ตรวจจับข้อผิดพลาดโดยใช้ `expect(...).toThrow(...)`
- **อธิบายง่าย ๆ**:
  - คุณต้องทดสอบให้ครอบคลุมทุกสถานการณ์ที่เป็นไปได้ (เช่น ข้อมูลปกติ ข้อมูลผิดปกติ)
  - ต้องมีกรณีทดสอบที่ตรวจว่าโค้ดจัดการข้อผิดพลาดได้ถูกต้องหรือไม่ (เช่น โยนข้อผิดพลาดเมื่อข้อมูลไม่ถูกต้อง)

---

### **คำแนะนำ (Tips)**

#### **คลาสความเท่าเทียม (Ekvivalensklasser)**
- **คำแปล**:
  - อ่านเกี่ยวกับ "คลาสความเท่าเทียม" ในสไลด์ที่ 3
  - มันเกี่ยวกับวิธีที่ฟังก์ชันถูกเรียกใช้งานด้วยข้อมูลที่แตกต่างกัน
  - ค่าของพารามิเตอร์มีประเภทใดได้บ้าง? สร้างกรณีทดสอบอย่างน้อยหนึ่งกรณีสำหรับแต่ละประเภท
  - ตัวอย่าง: ฟังก์ชันที่บอกว่าตอนนี้เป็นฤดูร้อนหรือไม่ โดยดูจากอุณหภูมิเฉลี่ยเกิน 10 องศา มี 3 ประเภท:
    1. มากกว่า 10 องศา → เป็นฤดูร้อน
    2. 10 องศาหรือน้อยกว่า → ไม่ใช่ฤดูร้อน
    3. ข้อมูลผิด เช่น 'abc', null → ข้อมูลไม่ถูกต้อง
- **อธิบายง่าย ๆ**:
  - "คลาสความเท่าเทียม" คือการแบ่งข้อมูลที่ฟังก์ชันรับออกเป็นกลุ่ม ๆ
  - เช่น ถ้าฟังก์ชันต้องการตัวเลข คุณต้องทดสอบ:
    - ตัวเลขที่ถูกต้อง
    - ตัวเลขที่ไม่ถูกต้อง (เช่น 0 หรือลบ)
    - ข้อมูลที่ไม่ใช่ตัวเลข (เช่น ตัวอักษร)
  - คุณต้องเขียนการทดสอบอย่างน้อย 1 ครั้งสำหรับแต่ละกลุ่ม
  - ตัวอย่าง: ถ้าฟังก์ชันบอกว่าเป็นฤดูร้อนเมื่ออุณหภูมิเกิน 10 องศา คุณต้องทดสอบ:
    - อุณหภูมิ 15 องศา (เป็นฤดูร้อน)
    - อุณหภูมิ 5 องศา (ไม่เป็นฤดูร้อน)
    - ข้อมูลเช่น "abc" (ควรแจ้งข้อผิดพลาด)

---

### **สรุป**
- **เป้าหมาย**: เขียนการทดสอบด้วย Jest สำหรับโค้ดของร้านค้าออนไลน์ โดยเน้นการตรวจสอบข้อมูลและการจัดการตะกร้าสินค้า
- **ขั้นตอน**:
  1. สร้าง Fork ของ repository
  2. เริ่มเขียนการทดสอบในไฟล์ `validation.test.js`
  3. ทดสอบฟังก์ชันที่เกี่ยวกับการตรวจสอบ (`isCartItem`, `isProduct`) และตะกร้าสินค้า
  4. จัดการข้อผิดพลาดด้วยการส่งคืนรหัสหรือโยนข้อยกเว้น
  5. ครอบคลุมทุกสถานการณ์ (สำหรับเกรด VG)
- **เคล็ดลับ**:
  - คิดถึงข้อมูลทุกประเภทที่ฟังก์ชันจะได้รับ (ถูกต้อง, ผิดปกติ, ไม่ถูกต้อง)
  - ทดสอบว่าฟังก์ชันจัดการข้อผิดพลาดได้ดีหรือไม่
  - อ่านสไลด์ที่ 3 เพื่อเข้าใจ "คลาสความเท่าเทียม"
