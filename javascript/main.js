const lists = {};
const currentList = {
  name: "Example",
  tasks: [],
  id: generateID()
};
selectList = key => {
  currentList["name"] = lists[key]["name"];
  currentList["tasks"] = lists[key]["tasks"];
  currentList["id"] = lists[key]["id"];
  currentList["key"] = key;
  render();
}
addList = () => {
  lists[Object.keys(lists).length] = {
    name: document.getElementById("newListName").value,
    tasks: [],
    ID: generateID()
  }
  render();
}
removeList = key => {
  delete lists[key];
  render();
}
addTask = name => {
  currentList["tasks"].push({
    text: name,
    completed: false,
    ID: generateID()
  });
  render();
}
removeTask = index => {
  console.log(currentList);
  currentList.tasks.splice(index, 1);
  console.log(currentList);
  render();
}
toggleTaskCompleted = index => {
  currentList.tasks[index].completed = !currentList.tasks[index].completed;
  render();
}
removeAllCompletedTasks = () => {
  currentList.tasks = currentList.tasks.filter(task => !task.completed);
  render();
}
render = () => {
  let listsHTML = '<ul class="listGroup">';
  for (const [key, value] of Object.entries(lists)) {
    listsHTML += `<div><button class="btn btn-nono" onclick="removeList(${key})"></button><span class="listGroupItem" onclick="selectList(${key})">${value.name}</span></div>`
  }

  document.getElementById('lists').innerHTML = listsHTML + '</ul>';
  document.getElementById('currentListName').innerText = currentList.name;
  
  if (Object.keys(currentList).length > 0) {
    let tasksHTML = '<ul class="listGroupFlush">'
    for (let i = 0; i < currentList.tasks.length; i++ ) {
      tasksHTML += `<button class="btn btn-nono" onclick="removeTask(${i})"></button>`
      tasksHTML += `<div class="listGroupItem completed-${currentList.tasks[i].completed}" id="${generateID()}" onclick="toggleTaskCompleted(${i})">${currentList.tasks[i].text}</div>`
    }
    document.getElementById('currentListTasks').innerHTML = tasksHTML + '</ul>';
  }
  save();
}

save = () => {
  localStorage.setItem('currentList', JSON.stringify(currentList));
  localStorage.setItem('lists', JSON.stringify(lists));
}

function generateID() {
  let ID = "";
  for(let i = 0; i < 16; i++) {ID += "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 36)]}
  return ID;
}//7,958,661,109,946,400,884,391,936
console.log(generateID())