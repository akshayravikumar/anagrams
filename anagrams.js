var currentWord = "";

// find all words that can be made using the letters in the input
function getAnagrams(input) {
  input = $.trim(input.toLowerCase());
  currentWord = input;
  var numAns = 0;
  if (input.length == 0) {
    $("#numAns").text("Please enter a word!");
    return;
  }
  if (!(/^[a-zA-Z]+$/.test(input))) {
    $("#numAns").text("Please enter a real word!");
    return;
  }

  var wordFreq = {};
  var i = input.length;
  while (i--) {
    if (!(input[i] in wordFreq)){
      wordFreq[input[i]] = 0;
    } 
    wordFreq[input[i]]+=1;
  } 

  for (var ind = 0; ind < WORDS.length; ind++) {
    var poss = WORDS[ind];
    var freq = jQuery.extend(true, {}, wordFreq);
    var i = poss.length;
    var done = false;
    while (i-- && done == false) {

      if (poss[i] in freq) {
        freq[poss[i]] = freq[poss[i]] - 1;
        if (freq[poss[i]] == 0) {
          delete freq[poss[i]];
        }
      }
       if (Object.keys(freq).length == 0 && (poss.length - input.length) >= 0 && poss.length > 0) {
        $("#results").append("<li class = \"wordans\">" + poss.trim() + "</li>");
        numAns = numAns + 1;
        done = true;
      }
    } 

   
  }
  if (numAns == 0) {
    $("#numAns").html("There are no results for this word. :(");
  } else if (numAns == 1) {
    $("#numAns").html("There is only <b> 1 </b> result for <p id = \" input \" style=\"display:inline\"> " + input + "</p>! Clutch!");
  } else {
    $("#numAns").html("There are <b>" + numAns + "</b> results for <p id = \" input \" style=\"display:inline\"> " + input + "</p>!");
  }
  
}


// On hover, show the letters needed to make the steal
$(document).on("mouseenter touchstart", "li.wordans", function(event) {
  var poss = $(event.target).text();
  var input = currentWord;
  var wordFreq = {};
  var lettersNeeded = [];
  var i = input.length;
  while (i--) {
    if (!(input[i] in wordFreq)){
      wordFreq[input[i]] = 0;
    } 
    wordFreq[input[i]]+=1;
  } 

  var i = poss.length;

  while (i--) {
    if (poss[i] in wordFreq && wordFreq[poss[i]] > 0) {
      wordFreq[poss[i]] = wordFreq[poss[i]] - 1;
    } else{
      lettersNeeded.push(poss[i]);
    }
  }

  var message = "To get <b>" + poss + "</b>, you need the following letters: ";
  for (var ind = 0; ind < lettersNeeded.length; ind++) {
    message = message + "<b>" + lettersNeeded[ind].toUpperCase() + "</b>";
    if (ind != lettersNeeded.length - 1) {
      message = message + ", "
    }
  }
  if (lettersNeeded.length == 0) {
    message = "<b>" + poss + "</b> is an exact anagram, you need no new letters!";
  }
  $("#hover").html(message);
}); 

$(document).on("mouseleave touchend", "li.wordans", function() {
  $("#hover").html("Hover over a word to see what letters you need. ");
});


function submitSearch() {
  $("#results").empty();
  getAnagrams($("#inputWord").val());
}

// search on ENTER or click
$("#submitForm").click(function () {
  submitSearch();
});

$(".input-field").keypress(function(e) {
  if(e.which == 13) {
    submitSearch();
    return false;
  }
});



