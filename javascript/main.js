const lists = {};
const currentList = {
  name: "Example List",
  tasks: [{text: "Example Item", completed: false}]
}
selectList = (key) => {
  currentList["name"] = lists[key]["name"];
  currentList["tasks"] = lists[key]["tasks"];
  currentList["id"] = lists[key]["id"];
  currentList["key"] = key;
  render();
}
addList = () => {
  lists[Object.keys(lists).length] = {
    name: document.getElementById("newListName").value,
    tasks: []
  }
  render();
}
removeList = (key) => {
  delete lists.key;
  render();
}
addTask = (name) => {
  currentList[tasks].push({
    text: name,
    completed: false
  });
  render();
}
removeTask = (index) => {
  currentList[tasks].splice(index, 1);
  render();
}
toggleTaskCompleted = (index) => {
  currentList[tasks][index][completed] = !currentList[tasks][index][completed];
  render();
}
removeAllCompletedTasks = () => {
  const buffer = [];
  for (let i = 0; i < currentList[tasks].length; i++) {
    if (currentList[tasks][i].completed) {
      buffer.push(i);
    }
  }
  buffer.forEach((j) => removeTask(j))
}
render = () => {
  let listsHTML = '<ul class="listGroup">';
  for (const [key, value] of Object.entries(lists)) {
    listsHTML += `<li class="listGroupItem" onclick="selectList(${key})">${value.name}</li>`
  }

  document.getElementById('lists').innerHTML = listsHTML + '</ul>';
  document.getElementById('currentListName').innerText = currentList.name;
  let tasksHTML = '<ul class="listGroupFlush">'
  currentList.tasks.forEach((task) => tasksHTML += `<li class="listGroupItem">${task.text}</li>`)

  document.getElementById('currentListTasks').innerHTML = tasksHTML + '</ul>';
}