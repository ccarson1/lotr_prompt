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

function addOutput(gen_text) {

  let input = document.getElementById("input-prompt");

  let output = document.createElement("p");
  output.textContent = gen_text;
  output.classList.add("outputs");

  let copyIcon = document.createElement("i");
  copyIcon.classList.add("fa-copy");
  copyIcon.classList.add("fa-regular")
  copyIcon.style.fontSize = "1rem"
  copyIcon.style.marginLeft = "90%";
  copyIcon.addEventListener("click", function () {
    navigator.clipboard.writeText(output.textContent).then(function () {
      console.log('Text successfully copied to clipboard');
    }).catch(function (err) {
      console.error('Error copying text: ', err);
    });
  });

  output.appendChild(copyIcon);
  outputText.appendChild(output);

  outputText.scrollTop = outputText.scrollHeight;

  input.value = '';
}

genButton.addEventListener("click", CallGenerateText);

document.getElementById("input-prompt").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    CallGenerateText();
  }
});

async function CallGenerateText() {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block"; 

  try {
    const response = await fetch('http://localhost:8000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({
        seed: document.getElementById("input-prompt").value,
      })
    });

    const data = await response.json();
    console.log('Server responded with:', data);
    addOutput(data['Generated Text']);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    spinner.style.display = "none";
  }
}