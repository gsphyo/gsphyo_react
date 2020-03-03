const express = require("express");
const xlsx = require("xlsx");
const app = express();
const port = 8080;

var excelHandler = {
  getExcelFileName: function(){
    return 'test.xlsx';
  },
  getSheetName: function(){
    return 'test sheet';
  },
  // getExcelData: function(){

  // },
  getWorksheet: function(){
    return xlsx.utils.testToSheet((this.getExcelData()));
  }
}

app.get("/", (req, res) => {
  // quickstart().catch(console.error);
  // const result = imageTextDetect().catch(console.error);
  imageTextDetect().catch(console.error);
  console.log(result);
  res.send("test");
});

async function imageTextDetect() {
  const vision = require("@google-cloud/vision");

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const fileName = 'Local image file, e.g. /path/to/image.png';

  // Performs text detection on the local file
  let detectionArr = [];
  const [result] = await client.textDetection("./resources/test.jpg");
  const detections = result.textAnnotations;
  console.log("Text:");
  detections.forEach(text => {
    detectionArr.push(text.description);
    // detectionArr += text.description;
    // console.log(text.description);
  });
  // console.log(detectionArr);
  // return detectionArr;
}

app.listen(port, () => console.log(`Express Servr Listening on port ${port}`));
