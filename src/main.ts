//TS File

function myFunction() {
  let view = document.getElementById("view");
  if (!view) return;

  let newTD = document.createElement("li");
  newTD.style.marginBottom = "5px";
  newTD.style.listStyleType = "none";
  
  let inputText = (document.getElementById("myText") as HTMLInputElement).value;

  if (!inputText.trim()) return; 

  var node = document.createTextNode(inputText);

  let doneButton = document.createElement("input");
  doneButton.type = "checkbox",
  doneButton.style.marginLeft = "10px";
  doneButton.style.marginRight = "10px"
  

  doneButton.addEventListener("click", () => {
    newTD.style.textDecoration = "line-through";
    newTD.style.color = "gray";
    doneButton.disabled = true;
    
  });
  
  newTD.appendChild(doneButton)
  newTD.appendChild(node);
  view.appendChild(newTD);


  let removeButton = document.createElement("button");
  removeButton.textContent = "Remove"
  removeButton.style.marginLeft = "10px";

  removeButton.addEventListener("click", () => {
    view.removeChild(newTD)
  });

  newTD.appendChild(removeButton);

  (document.getElementById("myText") as HTMLInputElement).value = "";
}


(window as any).myFunction = myFunction;