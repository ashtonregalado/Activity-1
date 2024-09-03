//TS File

function handle_function() {
  let view = document.getElementById("view");
  if (!view) return;

  let task = document.createElement("li");
  task.style.marginBottom = "5px";
  task.style.listStyleType = "none";

  let inputText = (document.getElementById("myText") as HTMLInputElement).value;

  if (!inputText.trim()) return; 

  var node = document.createTextNode(inputText);

  let doneButton = document.createElement("input");
  doneButton.type = "checkbox";
  doneButton.style.marginLeft = "10px";
  doneButton.style.marginRight = "10px";
  

  doneButton.addEventListener("change", () => {
    if (doneButton.checked) {
      task.style.textDecoration = "line-through";
      task.style.color = "gray";
   
    } else {
      task.style.textDecoration = "none";
      task.style.color = "black";

    }
    
  });
  
  task.appendChild(doneButton)
  task.appendChild(node);
  view.appendChild(task);


  let removeButton = document.createElement("button");
  removeButton.textContent = "Remove"
  removeButton.style.marginLeft = "10px";

  removeButton.addEventListener("click", () => {
    view.removeChild(task)
  });

  task.appendChild(removeButton);

  (document.getElementById("myText") as HTMLInputElement).value = "";
}


(window as any).myFunction = handle_function;