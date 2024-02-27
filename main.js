var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
const speakBtn = document.querySelector('#speakBtn');

var counter = 1;
var punten = 0;

const recognition = new SpeechRecognition();
recognition.lang = 'nl-BE';


const synth = window.speechSynthesis;
let utterance1 = new SpeechSynthesisUtterance("Wie is de koning van België?");
let utterance2 = new SpeechSynthesisUtterance("Wat is de hoofdstad van Frankrijk");
let utterance3 = new SpeechSynthesisUtterance("Hoeveel dagen zijn er in een jaar?");

utterance1.lang = "nl-BE"
utterance1.rate = 0.9;
utterance1.pitch = 1.2;

utterance2.lang = "nl-BE"
utterance2.rate = 0.9;
utterance2.pitch = 1.2;

utterance3.lang = "nl-BE"
utterance3.rate = 0.9;
utterance3.pitch = 1.2;

function matchVoiceToLang(voice){
  if(voice.lang == utterance1.lang){
      return true;
  } else if(voice.lang == utterance2.lang){
    return true;
  }else if(voice.lang == utterance3.lang){
    return true;
  }
  return false;
}

synth.onvoiceschanged =  () => {

  let voices = synth.getVoices().filter(matchVoiceToLang);
  console.log(voices)
  utterance1.voice = voices[0];
  utterance2.voice = voices[0];
  utterance3.voice = voices[0];




}


synth.speak(utterance1);

recognition.onresult = function (event) {
  console.log(event);
  const transcript = event.results[0][0].transcript;
  console.log(transcript);
  document.querySelector("#output").innerHTML += transcript + "<br>";
  speakBtn.disabled = false;

  var points = document.querySelector('.points');
  if(transcript.includes("Philippe")) {
    console.log("Correct antwoord: Philippe");
    punten += 1;
    points.innerHTML = punten;
    document.body.style.backgroundColor = "green";
    synth.speak(utterance2)

  } else if (transcript.includes("Parijs")) {
    console.log("Correct antwoord: Parijs");
    punten += 1;
    points.innerHTML = punten;
    document.body.style.backgroundColor = "green";
    synth.speak(utterance3)
  } else if (transcript.includes("365")) {
    console.log("Correct antwoord: 365");
    punten += 1;
    points.innerHTML = punten;
    document.body.style.backgroundColor = "green";

  } else {
    console.log("Onjuist antwoord: " + transcript);
    document.body.style.backgroundColor = "red";
  }
}

speakBtn.addEventListener("click", function () {
  recognition.start();
  speakBtn.disabled = true;
});
