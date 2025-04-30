let genButton = document.getElementById("gen-button");
let outputText = document.getElementById("output-text");
let copyButtons = document.getElementsByClassName("fa-copy")


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');
  
function addOutput() {
    CallGenerateText();
    let input = document.getElementById("input-prompt");

    let output = document.createElement("p");
    output.textContent = input.value;
    output.classList.add("outputs");

    let copyIcon = document.createElement("i");
    copyIcon.classList.add("fa-copy");
    copyIcon.classList.add("fa-regular")
    copyIcon.style.fontSize = "1rem"
    copyIcon.style.marginLeft = "90%";
    copyIcon.addEventListener("click", function(){
        navigator.clipboard.writeText(output.textContent).then(function() {
            console.log('Text successfully copied to clipboard');
          }).catch(function(err) {
            console.error('Error copying text: ', err);
          });
    });

    output.appendChild(copyIcon);
    outputText.appendChild(output);
    
    outputText.scrollTop = outputText.scrollHeight;

    input.value = '';
}

genButton.addEventListener("click", addOutput);

document.getElementById("input-prompt").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        
        addOutput();
    }
});

async function CallGenerateText(){
    fetch('http://localhost:8000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
          seed: document.getElementById("input-prompt").value,
    
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Server responded with:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}






// async function loadmodel(){
//     //const model = await tf.loadGraphModel('output_model\/content\/output_model\/model.json');
//     const model = await tf.loadLayersModel('output_model\/content\/output_model\/model.json');
// }

// loadmodel();

// async function loadModelAndTokenizer() {
//     // Load the model from a URL or local path
//     const model = await tf.loadLayersModel('output_model\/content\/output_model\/model.json');
    
//     // Load the tokenizer (assuming it's saved as a JSON object)
//     const tokenizer = await fetch('output_model\/content\/output_model\/tokenizer.json')
//         .then(response => response.json());
    
//     return { model, tokenizer };
// }

// async function main() {
//     const { model, tokenizer } = await loadModelAndTokenizer();
//     const seedText = "Once upon a time";
//     const nextWords = 50;
//     const maxSequenceLen = 50; // Adjust based on your model's input length
//     const temperature = 1.0;

//     const generatedText = await generateText(seedText, nextWords, maxSequenceLen, temperature, model, tokenizer);
//     console.log(generatedText);
// }

// main();