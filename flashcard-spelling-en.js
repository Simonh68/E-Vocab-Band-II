window.addEventListener("DOMContentLoaded",()=>{
  const front=document.getElementById("cardFront");
  const hint=front.querySelector(":scope > .hint");
  const cardFoot=document.createElement("div");
  const spellButton=document.createElement("button");
  cardFoot.className="card-foot";
  spellButton.className="spell";
  spellButton.id="spellBtn";
  spellButton.type="button";
  spellButton.textContent="ABC · Spell";
  spellButton.hidden=true;
  cardFoot.append(spellButton,hint);
  front.appendChild(cardFoot);

  let spellingRunId=0;

  function isSpellableHeadword(text){
    return /^[A-Za-z]+$/.test(text.trim());
  }

  function sleep(milliseconds){
    return new Promise(resolve=>setTimeout(resolve,milliseconds));
  }

  function clearLetterHighlight(){
    const wordElement=document.getElementById("wordEn");
    wordElement.classList.remove("spelling");
    wordElement.querySelectorAll(".word-letter").forEach(letter=>letter.classList.remove("active"));
  }

  function stopSpelling(cancelSpeech){
    spellingRunId+=1;
    clearLetterHighlight();
    spellButton.disabled=false;
    if(cancelSpeech&&"speechSynthesis" in window)window.speechSynthesis.cancel();
  }

  function renderHeadword(){
    stopSpelling(false);
    const item=words[currentIndex];
    const text=item.en.trim();
    const wordElement=document.getElementById("wordEn");
    const spellable=isSpellableHeadword(text);
    wordElement.classList.toggle("spellable",spellable);
    wordElement.replaceChildren();
    spellButton.hidden=!spellable;
    spellButton.disabled=false;

    if(!spellable){
      wordElement.textContent=item.en;
      spellButton.removeAttribute("aria-label");
      return;
    }

    const accessibleWord=document.createElement("span");
    accessibleWord.className="sr-only";
    accessibleWord.textContent=text;
    wordElement.appendChild(accessibleWord);
    Array.from(text).forEach(character=>{
      const letter=document.createElement("span");
      letter.className="word-letter";
      letter.dataset.letter=character.toUpperCase();
      letter.setAttribute("aria-hidden","true");
      letter.textContent=character;
      wordElement.appendChild(letter);
    });
    spellButton.setAttribute("aria-label","Spell the word "+text);
  }

  function speakLetter(letter,runId){
    return new Promise(resolve=>{
      if(runId!==spellingRunId||!("speechSynthesis" in window)){
        setTimeout(resolve,340);
        return;
      }
      const utterance=new SpeechSynthesisUtterance(letter);
      utterance.lang="en-US";
      utterance.rate=1;
      utterance.onend=resolve;
      utterance.onerror=resolve;
      window.speechSynthesis.speak(utterance);
    });
  }

  async function spellCurrentHeadword(event){
    event.stopPropagation();
    const item=words[currentIndex];
    if(!isSpellableHeadword(item.en))return;
    clearTimeout(scheduleWordSpeech.timer);
    stopSpelling(true);
    const runId=spellingRunId;
    const startingIndex=currentIndex;
    const wordElement=document.getElementById("wordEn");
    const letters=Array.from(wordElement.querySelectorAll(".word-letter"));
    spellButton.disabled=true;
    announce("Spelling started.");

    await speakLetter(item.en,runId);
    if(runId!==spellingRunId||startingIndex!==currentIndex||card.classList.contains("flipped"))return;
    await sleep(180);
    wordElement.classList.add("spelling");

    for(const letter of letters){
      if(runId!==spellingRunId||startingIndex!==currentIndex||card.classList.contains("flipped"))return;
      letters.forEach(candidate=>candidate.classList.remove("active"));
      letter.classList.add("active");
      await speakLetter(letter.dataset.letter,runId);
      await sleep(120);
    }

    if(runId===spellingRunId&&startingIndex===currentIndex){
      clearLetterHighlight();
      await sleep(180);
      await speakLetter(item.en,runId);
    }

    if(runId===spellingRunId&&startingIndex===currentIndex){
      spellButton.disabled=false;
      announce("Spelling complete.");
    }
  }

  spellButton.addEventListener("click",spellCurrentHeadword);
  document.getElementById("audioStart").addEventListener("click",()=>stopSpelling(true),{capture:true});

  const originalUpdateCard=updateCard;
  updateCard=function(){
    stopSpelling(true);
    originalUpdateCard();
    renderHeadword();
  };

  const originalToggleCard=toggleCard;
  const flipButton=document.getElementById("flipButton");
  flipButton.removeEventListener("click",originalToggleCard);
  toggleCard=function(event){
    stopSpelling(true);
    return originalToggleCard(event);
  };
  flipButton.addEventListener("click",toggleCard);

  const originalSpeakText=speakText;
  speakText=function(text){
    stopSpelling(false);
    return originalSpeakText(text);
  };

  updateCard();
});
