import { americanOnly } from "./american-only.js";
import { britishOnly } from "./british-only.js";
import { americanToBritishSpelling } from "./american-to-british-spelling.js";
import { americanToBritishTitles } from "./american-to-british-titles.js";

let selector = document.querySelector("#locale-select");
let translateButton = document.querySelector("#translate-btn");
let textbox = document.querySelector("#text-input");
let translatedDiv = document.querySelector("#translated-sentence");
let errorbox = document.querySelector("#error-msg");
let clearButton = document.querySelector("#clear-btn")
let mode = "american-to-british";
let timeRegex = /([0-1][0-9]|2[0-3]|[0-9])(:|\.)([0-5][0-9])/gm;

selector.onchange = () => {
  mode = selector.value;
};

//the list array is being filled with the keys and values from the object
let translateList = [];
Object.keys(americanOnly).forEach(key =>
  translateList.push([key, americanOnly[key]])
);
Object.keys(americanToBritishSpelling).forEach(key =>
  translateList.push([key, americanToBritishSpelling[key]])
);
Object.keys(americanToBritishTitles).forEach(key =>
  translateList.push([key, americanToBritishTitles[key]])
);
//the britishonly object is set up differently than the other objects
Object.keys(britishOnly).forEach(key =>
  translateList.push([britishOnly[key], key])
);

//the translate function
let translate = () => {
  //translating terms
  let newString = textbox.value;
  if(mode === "american-to-british"){
	translateList.forEach((item) => {
		newString = newString.replace(item[0], "<span class='highlight'>" + item[1] + "</span>");
    //this is for the titles
		newString = newString.replace(
			item[0].charAt(0).toUpperCase() + item[0].slice(1), 
			"<span class='highlight'>" + item[1].charAt(0).toUpperCase() + item[1].slice(1) + "</span>"
		)
	})
}else{
	translateList.forEach((item) => {
		newString = newString.replace(item[1], "<span class='highlight'>" + item[0] + "</span>");
    //this is for the titles
		newString = newString.replace(
			item[1].charAt(0).toUpperCase() + item[1].slice(1), 
			"<span class='highlight'>" + item[0].charAt(0).toUpperCase() + item[0].slice(1) + "</span>"
		)
	})
}
  //for translating time formats
  let timeSep = newString.match(timeRegex);
  if (timeSep) {
    timeSep.forEach(time => {
      if (mode === "american-to-british") {
        newString = newString.replace(time, "<span class='highlight'>" + time.replace(":", ".") + "</span>");
      } else {
        newString = newString.replace(time, "<span class='highlight'>" + time.replace(".", ":") + "</span>");
      }
    });
  }
  if(newString === textbox.value){
    translatedDiv.innerText = 'Everything looks good to me!';
    return;
  }
  errorbox.innerText = '';
  if(newString === '' || newString === undefined){
    errorbox.innerText = 'Error: No text to translate';
    return;
  }
  translatedDiv.innerHTML = newString;
  //for testing purposes we return newString
  return newString;
};

translateButton.onclick = translate;
clearButton.onclick = () => {
  textbox.value = '';
  translatedDiv.innerHTML = '';
  return;
}
try {
  module.exports = {};
} catch (e) {}
