import { Component } from "@angular/core";
import { createWorker } from "tesseract.js";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "tesseract.js-angular-app";
  ocrResult = "Recognizing...";
  img =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyLNQKqimhjk-ePpcN4Fd5A_yhcNlsz4GQQMmOldlVfA52WbqICTduYXgWP93QZ6xtxb8&usqp=CAU";
  constructor() {
    this.doOCR();
  }
  async doOCR() {
    const worker = createWorker({
      logger: m => console.log(m)
    });
    await worker.load();
    await worker.loadLanguage("https://github.com/ahmed-tea/tessdata_Arabic_Numbers/raw/master/ara_number.traineddata");
    await worker.initialize("ara_number");
    await worker.setParameters({
      tessedit_char_whitelist: "۱۲۳٤٥٦۷۸۹۰"
      // tessedit_char_whitelist: '123',
    });
    const {
      data: { text }
    } = await worker.recognize(this.img);
    this.ocrResult = text;
    console.log(text);
    await worker.terminate();
  }
}

// import { Component } from "@angular/core";
// import { createWorker } from "tesseract.js";

// @Component({
//   selector: "app-root",
//   templateUrl: "./app.component.html",
//   styleUrls: ["./app.component.css"]
// })
// export class AppComponent {
//   title = "tesseract.js-angular-app";
//   ocrResult = "Recognizing...";
//   constructor() {
//     this.doOCR();
//   }
//   async doOCR() {
//     const worker = createWorker({
//       logger: m => console.log(m)
//     });
//     await worker.load();
//     await worker.loadLanguage("ara");
//     await worker.initialize("ara");
// await worker.setParameters({
//     tessedit_char_whitelist: '١٢٣',
//     // tessedit_char_whitelist: '123',
//   });
//     const {
//       data: { text }
//     } = await worker.recognize(
//       "https://image.shutterstock.com/image-vector/eastern-arabic-numbers-numerals-260nw-1841917171.jpg"
//     );
//     this.ocrResult = text;
//     console.log(text);
//     await worker.terminate();
//   }
// }
