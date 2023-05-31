import {v4 as uuidV4} from "uuid";

interface Task {
  id:string,
  title:string,
  completed:boolean,
  createdAt: Date
}

const input = document.getElementById("new-task-title") as HTMLFormElement | null;
const form = document.getElementById("new-task-form") as HTMLInputElement;
const list = document.querySelector<HTMLUListElement>("#list-items");

let tasks: Task[] = loadTask();

tasks.forEach(addNewTask);

form?.addEventListener("submit" , e => {
  
  e.preventDefault();
  
  if(input?.value == "" || input?.value == null) return

  const newtask :Task = {
    id:uuidV4(),
    title:input.value,
    completed:false,
    createdAt : new Date()
  }
  tasks.push(newtask);
   saveTask();
  addNewTask(newtask);
  input.value ="";  
})

function addNewTask(task:Task){
  console.log(task.title);
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");

  checkbox.addEventListener("change",()=>{
    task.completed = checkbox.checked;
    console.log(task.completed);
    saveTask();
  })
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox,task.title);
  item.append(label);
  list?.append(item);
}

function saveTask(){
  localStorage.setItem("TASKS" ,JSON.stringify(tasks));
}
function loadTask(){
  let taskJson = localStorage.getItem("TASKS");
  if(taskJson==null) return []
  return JSON.parse(taskJson);

}