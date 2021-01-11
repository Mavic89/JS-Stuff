//Script to bypass typeracer's wpm verification using tesseract OCR and jcanvas, run through browser's console
var script = document.createElement('script'); script.src = "https://unpkg.com/tesseract.js@v2.1.0/dist/tesseract.min.js"; document.getElementsByTagName('head')[0].appendChild(script);
var script2 = document.createElement('script2'); script2.src = "https://cdnjs.cloudflare.com/ajax/libs/jcanvas/21.0.1/min/jcanvas.min.js"; document.getElementsByTagName('head')[0].appendChild(script2);


var elements = document.getElementsByClassName('challengeImg');

var imageOCR = elements[0].src;
var OutcomeText;
var text = document.getElementsByClassName('challengeTextArea');
var textArea = text[0];



var ImageElement = new Image(500,500);
ImageElement.src=imageOCR;

var canvas = document.createElement("CANVAS");
var ctx = canvas.getContext("2d");
ctx.drawImage(ImageElement, 0,0);
var imgData = ctx.getImageData(0,0, canvas.width, canvas.height);
//change black pixels to transparent pixels using alpha value 0
for(i = 0; i < imgData.data.length; i += 4) {
	if(imgData.data[i]==0)
	{
		imgData.data[i+3]=0;
	}

}
ctx.putImageData(imgData,0,0);

var image2Read = new Image();

image2Read.src = canvas.toDataURL();

//TESSERACT
const worker = Tesseract.createWorker({
  logger: m => console.log(m)
});
Tesseract.setLogging(true);
work();

async function work() {
   await worker.load();
   await worker.loadLanguage('eng');
   await worker.initialize('eng');

   let result = await worker.detect(image2Read);
   console.log(result.data);

   result = await worker.recognize(image2Read);
   console.log(result.data.text);
   OutcomeText = result.data.text;
   await worker.terminate();
   
   textArea.innerHTML=OutcomeText.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,'');
 }


