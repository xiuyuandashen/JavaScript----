//创建一个数组用来保存代办事项
if (localStorage.getItem("todolist") == undefined) {
    var todolist = [];
} else {
    var todolist = JSON.parse(localStorage.getItem("todolist"))
}


var doinglistDiv = document.querySelector(".doing .list")
var donelistDiv = document.querySelector(".done .list")
var inputDom = document.querySelector("#input")
var mainDiv = document.querySelector(".main")
var wcindex = 0;
var wwcindex = 0;
var wwcnum = document.querySelector(".doing .num")
var wcnum = document.querySelector(".done .num")
rander(todolist)
inputDom.onkeydown = function(event) {
    //console.log(event);
    if (event.key == 'Enter') {
        console.log(event);
        var value = inputDom.value;
        var objitem = {
            content: value,
            isDone: false
        }

        todolist.push(objitem) //将代办时间放入数组

        //console.log(todolist)
        rander(todolist)
    }
}

//${变量} 可以直接在字符串中引入变量
function rander(todolist) {
    //将数组转换成json格式字符串
    var json = JSON.stringify(todolist)
    localStorage.setItem("todolist", json)

    //每次渲染前清空
    donelistDiv.innerHTML = ""
    doinglistDiv.innerHTML = ""
    todolist.forEach(function(item, i) {
        var todoitem = document.createElement("div")
        todoitem.className = 'todoitem'
        if (item.isDone) {
            todoitem.innerHTML = `
            <input type="checkbox" checked="checked" data-index="${i}" >
            <div class="content">` + item.content + `</div>
            <div class="del"  data-index="${i}" >删除</div>`
            donelistDiv.appendChild(todoitem)
            wcindex++;
        } else {
            todoitem.innerHTML = `
            <input type="checkbox"  data-index="${i}" >
            <div class="content">` + item.content + `</div>
            <div class="del"  data-index="${i}" >删除</div>`
            doinglistDiv.appendChild(todoitem)
            wwcindex++;
        }
    })
    wcnum.innerText = wcindex;
    wwcnum.innerText = wwcindex;
    wcindex = 0;
    wwcindex = 0;
}
//onchange事件是该对象内容发生改变是触发 
doinglistDiv.onchange = function(e) {
    //console.log(e)
    var index = parseInt(e.target.dataset.index);
    todolist[index].isDone = true;
    rander(todolist)
}

donelistDiv.onchange = function(e) {
    //console.log(e)
    var index = parseInt(e.target.dataset.index);
    todolist[index].isDone = false;
    rander(todolist)
}
mainDiv.onclick = function(e) {
    if (e.target.className == 'del') {
        var index = parseInt(e.target.dataset.index);
        todolist.splice(index, 1)
        rander(todolist)
    }
}