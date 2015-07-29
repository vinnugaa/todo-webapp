//Global Variables
var currentCateId = -1; //Current Category id
var currentCateTable = "AllCate"; //The current classification
var currentTaskId = -1; //Current task id

initAll();

function initAll() {
    // localStorage.clear();
    initDataBase(); //Initial Data
    initCates(); //Initialization Category
    initModal(); //Initialization modal box
    $("#task-list").innerHTML = createTaskList(queryAllTasks()); //Initialization modal box
    cateTaskStatusController(); //Task Status Classification
    generateTaskById(-1); //Initialization Task Details
    addClass($("[taskid]"), "active"); //The first attribute of the element has highlighted taskid
    // clickSaveOrCancel(); //Save or discard task
    listAllStorage();
}

//*******Database Design************

/**
  *
  * Use ideological database, build three tables.
  * CateJson Category
  * ChildCateJson subcategories
  * TaskJson task
  *
  * Classification cate
  * ----------------------
  * Id * | name | child (fk)
  * ----------------------
  *
  * Sub-classification childCate
  * ----------------------------
  * Id * | pid | name | child (fk)
  * ----------------------------
  *
  * Task table task
  * ------------------------------------------
  * id* | pid | finish | name | date | content
  * ------------------------------------------
 */
function initDataBase() {
    if (!localStorage.cate || !localStorage.childCate || !localStorage.task) {

        var cateJson = [{
                "id": 0,
                "name": "Default Category",
                "child": [0]
            }
            /*, {
            "id": 1,
            "name": "Jobs",
            "child": [1, 2]
        }, {
            "id": 2,
            "name": "Life",
            "child": [3]
        }*/
        ];

        var childCateJson = [{
                "id": 0,
                "pid": 0,
                "name": "The default sub-categories",
                "child": [-1],
            }
            /*, {
            "id": 1,
            "pid": 1,
            "name": "Front End",
            "child": [0, 1, 2],
        }, {
            "id": 2,
            "pid": 1,
            "name": "Server",
            "child": [3],
        }, {
            "id": 3,
            "pid": 2,
            "name": "Eat",
            "child": [],
        }*/
        ];

        var taskJson = [{
                "id": -1,
                "pid": 0,
                "finish": true,
                "name": "Instructions for use",
                "date": "2015-06-05",
                "content": "This application is off-line application, data will be stored on the local hard disk <br /> <br /> <br /> category list on the left to the middle of the current category <br> right of the task list for the task can add more details <br /> <br/> delete categories, add tasks, modify tasks, and to mark the task is completed, and other functions",
            }
            /*, {
            "id": 0,
            "pid": 1,
            "finish": true,
            "name": "task1",
            "date": "2015-05-10",
            "content": "Life 1",
        }, {
            "id": 1,
            "pid": 1,
            "finish": false,
            "name": "Sass",
            "date": "2015-05-31",
            "content": "Learning Mu class network video Sass",
        }, {
            "id": 2,
            "pid": 1,
            "finish": false,
            "name": "AMD",
            "date": "2015-05-31",
            "content": "Learning AMD",
        }, {
            "id": 3,
            "pid": 2,
            "finish": false,
            "name": "drools",
            "date": "2015-06-31",
            "content": "Research drools inference engine",
        }*/
        ];

        // DataBase init
        localStorage.cate = JSON.stringify(cateJson);
        localStorage.childCate = JSON.stringify(childCateJson);
        localStorage.task = JSON.stringify(taskJson);
    }
}

// *********query*************
/**
  * All categories
  *return {Array} object array
 */
function queryCates() {
    return JSON.parse(localStorage.cate);
}

/**
  * Inquiry by id classification temporarily useless to
  *param {Number} id
  *return {Object} a classification object
 */
function queryCateById(id) {
    var cate = JSON.parse(localStorage.cate);
    for (var i = 0; i < cate.length; i++) {
        if (cate[i].id == id) {
            return cate[i];
        }
    }
}

/**
  * Based on the number of primary classification task id query
  *param {Number} id Main Category id
  *return {Number} number of tasks
 */
function queryTasksLengthByCateId(id) {
    var cate = queryCateById(id);
    var result = 0;
    if (cate.child.length !== 0) {
        for (var i = 0; i < cate.child.length; i++) {
            var childCate = queryChildCatesById(cate.child[i]);
            result += childCate.child.length;
        }
    }
    return result;
}

/**
  *Main Category query tasks depending on the number
  *param {Object} cateObject main classification object
  *return {Number} number of tasks
 */
function queryTasksLengthByCate(cateObject) {
    var result = 0;
    if (cateObject.child.length !== 0) {
        for (var i = 0; i < cateObject.child.length; i++) {
            var childCate = queryChildCatesById(cateObject.child[i]);
            result += childCate.child.length;
        }
    }
    return result;
}
// console.log(queryTasksLengthByCateId(0));
// console.log(queryTasksLengthByCateId(1));
// console.log(queryTasksLengthByCateId(2));
// console.log(queryCateById(1));

/**
 *Find all sub-categories
  *return {Array} sub category object array
 */
function queryAllChildCates() {
    return JSON.parse(localStorage.childCate);
}
/**
 * Find sub-categories according to id
  *param {Number} id
  *return {Object} Object subcategories
 */
function queryChildCatesById(id) {
    var childCate = JSON.parse(localStorage.childCate);
    for (var i = 0; i < childCate.length; i++) {
        if (childCate[i].id == id) {
            return childCate[i];
        }
    }
}
console.log(queryChildCatesById(0));
// console.log("queryChildCatesById----->" + queryChildCatesById(0));
// console.log(queryChildCatesById(0));

// console.log("queryChildCatesByIdArray---->" + queryChildCatesByIdArray([0, 1]));
// console.log(queryChildCatesByIdArray([0, 1]));
/**
* Based on a query id array subcategories
  *param {Array} idArr id array
  *return {Array} sub category object array
 */
function queryChildCatesByIdArray(idArr) {
    if (isArray(idArr)) {
        var cateArr = [];
        for (var i = 0; i < idArr.length; i++) {
            cateArr.push(queryChildCatesById(idArr[i]));
        }
        return cateArr;
    }
}

/**
* Discover all tasks
  *param {Boolean} status job completion status
  *return Array of task objects {Array}
 */
function queryAllTasks(status) {
    var tasksArr = JSON.parse(localStorage.task);
    var resultArr = [];
    if (status !== undefined) {
        for (var i = 0; i < tasksArr.length; i++) {
            if (status) {
                if (tasksArr[i].finish === true) {
                    resultArr.push(tasksArr[i]);
                }
            } else {
                if (tasksArr[i].finish === false) {
                    resultArr.push(tasksArr[i]);
                }
            }
        }
        return resultArr;
    } else {
        return tasksArr;
    }
}
// console.log(queryAllTasks(true));

/**
  *The date specified query task in the task list
  *param {String} date date string
  *param {Array} taskArr specified task list object
  *return Array of task objects {Array}
 */
function queryTasksByDateInTaskArr(date, taskArr) {
    var tasks = [];
    // var allTasks = queryAllTasks();
    for (var i = 0; i < taskArr.length; i++) {
        if (taskArr[i].date == date) {
            tasks.push(taskArr[i]);
        }
    }
    return tasks;
}

/**
 * According id query tasks
  *param {Number} id Task id
  *return {Object} a task object
 */
function queryTaskById(id) {
    var allTasks = queryAllTasks();
    for (var i = 0; i < allTasks.length; i++) {
        if (allTasks[i].id == id) {
            return allTasks[i];
        }
    }
}
// console.log("queryTaskById(3)");
// console.log(queryTaskById(3));

/**
* According to the sub-classification id query tasks
  *param {Number} id id subcategories
  *param {String} status job completion status
  *return Array of task objects {Array}
 */
function queryTasksByChildCateId(id, status) {
    var resultArr = [];
    var tempArr = queryChildCatesById(id).child;
    console.log("Sub-classification object  child Field Contents---->" + tempArr);
    for (var i = 0; i < tempArr.length; i++) {
        var task = queryTaskById(tempArr[i]);
        if (status !== undefined) {
            console.log(status);
            if (status) {
                if (task.finish === true) {
                    resultArr.push(task);
                }
            } else {
                if (task.finish === false) {
                    resultArr.push(task);
                }
            }
        } else {
            resultArr.push(task);
        }
    }
    console.log(resultArr + "----------success");
    return resultArr;

}
// console.log("Single test");
// console.log(queryTasksByChildCateId(0, false));

/**
* Based on Main Category id query tasks
  *param {Number} id Main Category id
  *param {String} status job completion status
  *return Array of task objects {Array}
 */
function queryTasksByCateId(id, status) {
    var resultArr = [];
    var cateChild = queryCateById(id).child;
    for (var i = 0; i < cateChild.length; i++) {
        if (status !== undefined) {
            console.log(status);
            resultArr = resultArr.concat(queryTasksByChildCateId(cateChild[i], status));
        } else {
            resultArr = resultArr.concat(queryTasksByChildCateId(cateChild[i]));
        }
    }
    return resultArr;
}
// console.log(queryTasksByCateId(1, true));
console.log(queryTasksByCateId(0));


//**********************ADD**************************
/**
* Add categories
  *param {String} name category name
 */
function addCate(name) {
    if (!name) {
        console.log("name is undefined");
    } else {
        var cateJsonTemp = JSON.parse(localStorage.cate);
        var newCate = {};
        newCate.id = cateJsonTemp[cateJsonTemp.length - 1].id + 1;
        newCate.name = name;
        newCate.child = [];
        cateJsonTemp.push(newCate);
        localStorage.cate = JSON.stringify(cateJsonTemp);
        console.log(cateJsonTemp);
        console.log(newCate);
    }
}

/**
 * Add a sub-category
  *param {Number} pid parent id
  *param {String} name sub-category name
 */
function addChildCate(pid, name) {
    if (!pid || !name) {
        console.log("pid or name is undefined");
    } else {
        var childCateJsonTemp = JSON.parse(localStorage.childCate);
        var newChildCate = {};
        newChildCate.id = childCateJsonTemp[childCateJsonTemp.length - 1].id + 1;
        newChildCate.pid = pid;
        newChildCate.name = name;
        newChildCate.child = [];

        childCateJsonTemp.push(newChildCate);
        localStorage.childCate = JSON.stringify(childCateJsonTemp);

        //At the same time add a digital classification of the parent child
        updateCateChildByAdd(pid, newChildCate.id);

    }
}

/**
* Adding a task
 *param {Object} taskObject task object, but it does not contain the id attribute
 */
function addTask(taskObject) {
    var taskArr = queryAllTasks();
    taskObject.id = taskArr[taskArr.length - 1].id + 1; //id Gerertate
    taskArr.push(taskObject);
    console.log(taskObject);
    console.log(taskArr);

    updateChildCateChildByAdd(taskObject.pid, taskObject.id); //Update sub-categories of child fields
    localStorage.task = JSON.stringify(taskArr);

    return taskObject.id; //The current task id returned, easy call
}
// console.log(queryAllTasks()[queryAllTasks().length-1].id+1);
// {
//            "id": 4,
//            "pid": 2,
//            "finish": false,
//            "name": "Operation and maintenance",
//            "date": "2015-05-31",
//            "content": "Database Backup",
//        }
//*****************UPDATE*******************
/**
* Update Classification child fields
  * Add a childId to the classification of the object in the id
  *param {Number} id id to be updated classification
  *param {Number} childId to add childId
 * @return {[type]}         [description]
 */
function updateCateChildByAdd(id, childId) {

    var cate = JSON.parse(localStorage.cate);
    for (var i = 0; i < cate.length; i++) {
        if (cate[i].id == id) {
            cate[i].child.push(childId);
        }
    }
    localStorage.cate = JSON.stringify(cate);
}
/**
  * Update Classification child fields
  * Remove a childId in this classification object in the id
  *param {Number} id id to be updated classification
  *param {Number} childId to delete childIdd
 * @return {[type]}         [description]
 */
function updateCateChildByDelete(id, childId) {
    var cate = JSON.parse(localStorage.cate);
    for (var i = 0; i < cate.length; i++) {
        if (cate[i].id == id) {
            for (var j = 0; j < cate[i].child.length; j++) {
                if (cate[i].child[j] == childId) {
                    cate[i].child = deleteInArray(cate[i].child, j);
                }
            }
        }
    }
    localStorage.cate = JSON.stringify(cate);
}
// updateCateChildByAdd(1,3);
// listAllStorage();
// console.log("updateCateChildByDelete");
// updateCateChildByDelete(1, 0);
// listAllStorage();

/**
  * Update sub-categories of child fields
  * Add a childId in the id of the object in sub-categories
  * When you add a task use
  *param {Number} id id subcategories
  *param {Number} childId to add childId
 * @return {[type]}         [description]
 */
function updateChildCateChildByAdd(id, childId) {
    var childCate = queryAllChildCates();
    for (var i = 0; i < childCate.length; i++) {

        if (childCate[i].id == id) {
            childCate[i].child.push(childId);
        }
    }
    localStorage.childCate = JSON.stringify(childCate);
}
// updateChildCateChildByAdd(0,1000);
// listAllStorage();

/**
* According to the task id update task status
  *param {Number} taskId task id
 * @return {[type]}        [description]
 */
function updateTaskStatusById(taskId) {
    var allTasks = queryAllTasks();
    for (var i = 0; i < allTasks.length; i++) {
        if (allTasks[i].id == taskId) {
            allTasks[i].finish = true;
        }
    }
    localStorage.task = JSON.stringify(allTasks);
}
// updateTaskStatusById(4);
// listAllStorage();

/**
 * Modify task
  *param {Number} id Task id
  *param {String} name Job Title
  *param {String} date task dates
  *param {String} content Quest Content
 * @return {[type]}         [description]
 */
function updateTaskById(id, name, date, content) {
    var allTasks = queryAllTasks();
    for (var i = 0; i < allTasks.length; i++) {
        if (allTasks[i].id == id) {
            allTasks[i].name = name;
            allTasks[i].date = date;
            allTasks[i].content = content;
        }
    }
    localStorage.task = JSON.stringify(allTasks);
}

//**************DELETE*****************

/**
 *According to delete the Category id
  *param {Number} id Main Category id
  *return {[Type]} [description]
 */
function deleteCate(id) {
    var result = [];
    var cateArr = queryCates();
    for (var i = 0; i < cateArr.length; i++) {
        if (cateArr[i].id == id) {
            result = deleteInArray(cateArr, i);
            if (cateArr[i].child.length !== 0) {
                for (var j = 0; j < cateArr[i].child.length; j++) {
                    deleteChildCate(cateArr[i].child[j]);
                }
            }
        }
    }
    localStorage.cate = JSON.stringify(result);
}
// deleteCate(1);
// listAllStorage();
// initCates();
/**
* Delete sub-categories according to id
  *param {Number} id id subcategories
  *return {[Type]} [description]
 */
function deleteChildCate(id) {
    var result = [];
    var childCateArr = queryAllChildCates();
    for (var i = 0; i < childCateArr.length; i++) {
        if (childCateArr[i].id == id) {
            result = deleteInArray(childCateArr, i);
            //Update the parent node childId field
            updateCateChildByDelete(childCateArr[i].pid, childCateArr[i].id);
            //View child
            if (childCateArr[i].child.length !== 0) {
                for (var j = 0; j < childCateArr[i].child.length; j++) {
                    deleteTaskById(childCateArr[i].child[j]);
                }
            }
        }
    }
    localStorage.childCate = JSON.stringify(result); //save
}
// deleteChildCate(0);
// listAllStorage();
// initCates();

/**
 * According to delete a task id
  *param {Number} id Task id
 * @return {[type]}    [description]
 */
function deleteTaskById(id) {
    var result = [];
    var allTasksArr = queryAllTasks();
    for (var i = 0; i < allTasksArr.length; i++) {
        if (allTasksArr[i].id == id) {
            result = deleteInArray(allTasksArr, i);
        }
    }
    localStorage.task = JSON.stringify(result); //save
}
// deleteTaskById(0);
// listAllStorage();
/**
* List used to test all the stored content
  *return {[Type]} [description]
 */
function listAllStorage() {
    console.log("=============listAllStorage==============");
    for (var i = 0; i < localStorage.length; i++) {
        var name = localStorage.key(i);
        var value = localStorage.getItem(name);
        console.log("name----->" + name);
        console.log("value---->" + value);
        console.log("---------------------");
    }
    console.log("======End=======listAllStorage==============");
}



//**********Page Control**************



//Initialization Category
function initCates() {

    var cate = queryCates(); //Isolated All Categories
    var tempStr = '<ul>';
    var defaultChildCate = queryChildCatesById(0);

    for (var i = 0; i < cate.length; i++) {
        var liStr = "";

        if (cate[i].child.length === 0) {
            // if (i === 0) {
            //     liStr = '<li><h2 cateid=' + cate[i].id + ' onclick="clickCate(this)"><i class="fa fa-folder-open"></i><span>' + cate[i].name + '</span> (' + queryTasksLengthByCate(cate[i]) + ')</h2></li>';
            // } else {
            liStr = '<li><h2 cateid=' + cate[i].id + ' onclick="clickCate(this)"><i class="fa fa-folder-open"></i><span>' + cate[i].name + '</span> (' + queryTasksLengthByCate(cate[i]) + ')<i class="fa fa-trash-o" onclick="del(event,this)"></i></h2></li>';
            // }
        } else {
            if (i === 0) {
                // var childCateDefault = queryChildCatesById(0);
                // liStr = '<li><h2 cateid=' + cate[i].id + ' onclick="clickCate(this)"><i class="fa fa-folder-open"></i><span>' + cate[i].name + '</span> (' + queryTasksLengthByCate(cate[i]) + ')</h2><ul><li><h3 cateid=' + childCateArr[j].id + ' onclick="clickCate(this)"><i class="fa fa-file-o"></i><span>' + childCateDefault.name + '</span> (' + childCateDefault.length + ')</h3></li>';
                liStr = '<li><h2 cateid=0 onclick="clickCate(this)"><i class="fa fa-folder-open"></i><span>' + cate[i].name + '</span> (1)</h2><ul><li><h3 cateid=0 onclick="clickCate(this)"><i class="fa fa-file-o"></i><span>' + defaultChildCate.name + '</span> (' + defaultChildCate.child.length + ')</h3></li>';
            } else {
                liStr = '<li><h2 cateid=' + cate[i].id + ' onclick="clickCate(this)"><i class="fa fa-folder-open"></i><span>' + cate[i].name + '</span> (' + queryTasksLengthByCate(cate[i]) + ')<i class="fa fa-trash-o" onclick="del(event,this)"></i></h2><ul>';
                var childCateArr = queryChildCatesByIdArray(cate[i].child);
                for (var j = 0; j < childCateArr.length; j++) {
                    var innerLiStr = "";
                    innerLiStr = '<li><h3 cateid=' + childCateArr[j].id + ' onclick="clickCate(this)"><i class="fa fa-file-o"></i><span>' + childCateArr[j].name + '</span> (' + childCateArr[j].child.length + ')<i class="fa fa-trash-o" onclick="del(event,this)"></i></h3></li>';
                    liStr += innerLiStr;
                }
                liStr += '</ul></li>';
            }
        }
        tempStr += liStr;
    }
    tempStr += '</ul>';
    //Write List content area
    $("#listcontent").innerHTML = tempStr;
    //Set the number of all tasks
    $(".list-title span").innerHTML = queryAllTasks().length;
}

/**
* Click on the trash can icon
  *param {Object} e event object
  *param {Object} element element
 * @return {[type]}         [description]
 */
function del(e, element) {
    //这里要阻止事件冒泡
    window.event ? window.event.cancelBubble = true : e.stopPropagation();
    console.log("=====del======");
    var cateClicked = element.parentNode;
    if (cateClicked.tagName.toLowerCase() === "h2") {
        console.log("h2");
        cateClicked.getAttribute("cateid");
        console.log(cateClicked.getAttribute("cateid"));
        var r = confirm("Are you sure you delete a category?");
        if (r === true) {
            deleteCate(cateClicked.getAttribute("cateid"));
        }
    } else if (cateClicked.tagName.toLowerCase() === "h3") {
        console.log("h3");
        console.log(cateClicked.getAttribute("cateid"));
        var rr = confirm("Are you sure you delete a category?");
        if (rr === true) {
            deleteChildCate(cateClicked.getAttribute("cateid"));
        }
    }
    initCates();
    $("#task-list").innerHTML = createTaskList(queryAllTasks()); //Initialization Task List
}

/**
 * Add categories
 */
function clickAddCate() {
    console.log("=========clickAddCate===========");
    var cover = $(".cover");
    cover.style.display = "block";
}

/**
 * Initialization modal box
 *
 */
function initModal() {
    var cate = queryCates();
    var selectContent = '<option value="-1">New Main Category</option>';
    for (var i = 1; i < cate.length; i++) {
        selectContent += '<option value="' + cate[i].id + '">' + cate[i].name + '</option>';
    }
    $("#modal-select").innerHTML = selectContent;
    $("#newCateName").value = "";
}

/**
 * Cancel button
 */
function cancel() {
    $(".cover").style.display = "none";
}

/**
 * Confirmation button
 */
function ok() {
    console.log("----click ok----");
    console.log($("#modal-select").value);
    var selectValue = $("#modal-select").value;
    var newCateName = $("#newCateName").value;
    if (newCateName === "") {
        alert("Please enter the category name");
    } else {
        if (selectValue == -1) {
            console.log("New Main Category");
            addCate(newCateName);
        } else {
            console.log("Increase classification");
            addChildCate(selectValue, newCateName);
        }
        initCates(); //Initialization Category
        $(".cover").style.display = "none";
    }
    initModal();
}

/**
 * Click Categories
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
function clickCate(element) {
    console.log("=======clickCate=======");
    console.log(element);
    var taskList = $("#task-list");
    setHighLight(element); //BBCode

    console.log(element.getAttribute("cateid"));
    var cateId = element.getAttribute("cateid");
    if (cateId == -1) { //Click on All Categories
        taskList.innerHTML = createTaskList(queryAllTasks());
        currentCateId = -1;
        currentCateTable = "AllCate";
    } else { //Click on the main category or sub-category on
        if (element.tagName.toLowerCase() == "h2") {
            console.log("main cate--->" + cateId);
            taskList.innerHTML = createTaskList(queryTasksByCateId(cateId));
            currentCateId = cateId;
            currentCateTable = "cate";
        } else {
            console.log("childCate--->" + cateId);
            //Sub Categories
            console.log(queryTasksByChildCateId(cateId));
            taskList.innerHTML = createTaskList(queryTasksByChildCateId(cateId));
            currentCateId = cateId;
            currentCateTable = "childCate";
        }
    }

    //All of the above default status button Jump
    cleanAllActiveOnStatusButton();
    addClass($("#all-tasks"), "active");
    addClass($("[taskid]"), "active"); //The first attribute of the element has highlighted taskid

    generateTaskById(currentTaskId);
}

/**
* Set Highlight
  *param {Object} element clicked element objects
 */
function setHighLight(element) {
    cleanAllActive();
    addClass(element, "active");
}

/**
 * Clear all highlighted
 * @return {[type]} [description]
 */
function cleanAllActive() {
    removeClass($("#allTasks"), "active");
    var h2Elements = $("#listcontent").getElementsByTagName('h2');
    for (var i = 0; i < h2Elements.length; i++) {
        removeClass(h2Elements[i], "active");
    }
    var h3Elements = $("#listcontent").getElementsByTagName('h3');
    for (var j = 0; j < h3Elements.length; j++) {
        removeClass(h3Elements[j], "active");
    }
}

/**
* Create a task list
  *param {Array} taskArr task object array
  *return {String} string html code
 */
function createTaskList(taskArr) {
    var tempStr = "";
    console.log("dateTasksArr------->");
    console.log(taskArr);
    if (taskArr.length === 0) {
        tempStr = "";
    } else {

        var dateTasksArr = createDateData(taskArr);
        console.log("dateTasksArr------->" + dateTasksArr);
        for (var i = 0; i < dateTasksArr.length; i++) {
            var innerLiStr = "<div>" + dateTasksArr[i].date + "</div><ul>";
            for (var j = 0; j < dateTasksArr[i].tasks.length; j++) {
                var finishOrNotStr = "";
                if (dateTasksArr[i].tasks[j].finish) {
                    finishOrNotStr = '<li class="task-done" taskid="' + dateTasksArr[i].tasks[j].id + '" onclick="clickTask(this)"><i class="fa fa-check"></i> ' + dateTasksArr[i].tasks[j].name + '</li>';
                } else {
                    finishOrNotStr = '<li taskid="' + dateTasksArr[i].tasks[j].id + '" onclick="clickTask(this)">' + dateTasksArr[i].tasks[j].name + '</li>';
                }

                // innerLiStr += '<li taskid="' + dateTasksArr[i].tasks[j].id + '" onclick="clickTask(this)">' + dateTasksArr[i].tasks[j].name + '</li>';
                innerLiStr += finishOrNotStr;
            }
            innerLiStr += "</ul>";
            tempStr += innerLiStr;
        }
    }
    // console.log(tempStr);
    return tempStr;
}
// console.log(createTaskList(queryAllTasks()));

/**
* Create date data format
  *param {Array} taskArr task array
  *return {Array} Date task array of objects
 */
function createDateData(taskArr) {
    var dateArr = []; //Date Array
    var newDateTasks = []; //Date data format array
    // The date you want the task archive
     // 1. All dates first appeared extract
     // 2. Sort by date
     // 3. Date of check out tasks according to an array of objects
     // 4. Combinations of dates and tasks array of objects

     // Remove all time
    for (var i = 0; i < taskArr.length; i++) {
        if (dateArr.indexOf(taskArr[i].date) == -1) {
            dateArr.push(taskArr[i].date);
        }
    }
    console.log(dateArr);
    console.log(taskArr);

    //Sort by date
    dateArr = dateArr.sort();

    //Find a task object based on time
    for (var j = 0; j < dateArr.length; j++) {
        var tempObject = {};
        tempObject.date = dateArr[j];
        tempObject.tasks = queryTasksByDateInTaskArr(dateArr[j], taskArr);
        newDateTasks.push(tempObject);
    }
    currentTaskId = newDateTasks[0].tasks[0].id;
    return newDateTasks;
}

/**
 * Classification task state control buttons
 * @return {[type]} [description]
 */
function cateTaskStatusController() {
    addClickEvent($("#all-tasks"), function() {
        console.log("click all tasks");
        cateTaskStatusControllerHelper(this);
    });
    addClickEvent($("#unfinish-tasks"), function() {
        console.log("click unfinish tasks");
        cateTaskStatusControllerHelper(this, false);
    });
    addClickEvent($("#finished-tasks"), function() {
        console.log("click finished-tasks");
        cateTaskStatusControllerHelper(this, true);
    });
}

/**
* Task list status switching assistant
  * Depending on the status of different, modify different html code
  *
  *param {Boolean} finish completion status
 */
function cateTaskStatusControllerHelper(element, finish) {
    cleanAllActiveOnStatusButton(); //清除状态按钮高亮
    addClass(element, "active");

    var taskList = $("#task-list");

    if (currentCateId == -1) {
        taskList.innerHTML = createTaskList(queryAllTasks(finish));
    } else {
        if (currentCateTable == "cate") {
            taskList.innerHTML = createTaskList(queryTasksByCateId(currentCateId, finish));
        } else {
            console.log("**************************");
            console.log(currentCateId);
            taskList.innerHTML = createTaskList(queryTasksByChildCateId(currentCateId, finish));
            console.log("*********** END **********");
        }
    }
}

/**
* Clear Status button is highlighted
 */
function cleanAllActiveOnStatusButton() {
    removeClass($("#all-tasks"), "active");
    removeClass($("#unfinish-tasks"), "active");
    removeClass($("#finished-tasks"), "active");
}

/**
  *Click task
  *param {Object} element clicked li objects
 * @return {[type]}         [description]
 */
function clickTask(element) {

    var taskId = element.getAttribute("taskid");

    currentTaskId = taskId;

    generateTaskById(taskId);

    cleanTasksHighLight();
    addClass(element, "active");
}

/**
* Generate specific content based on the right of the task id
  *param {Number} taskId task id
  *return {[Type]} [description]
 */
function generateTaskById(taskId) {
    var task = queryTaskById(taskId);

    $(".todo-name").innerHTML = task.name;
    $(".task-date span").innerHTML = task.date;
    $(".content").innerHTML = task.content;

    $(".button-area").style.display = "none";

    var manipulate = $(".manipulate");
    if (task.finish) { //If completed
        manipulate.innerHTML = "";
    } else { //Incomplete
        manipulate.innerHTML = '<a onclick="checkTaskDone()"><i class="fa fa-check-square-o"></i></a><a onclick="changeTask()"><i class="fa fa-pencil-square-o"></i></a>';
    }
}

/**
 * Highlight cleanup task list
 */
function cleanTasksHighLight() {
    var aLi = $("#task-list").getElementsByTagName('li');
    for (var i = 0; i < aLi.length; i++) {
        removeClass(aLi[i], "active");
    }
}

/**
 * Click the Add Task button
 * @return {[type]} [description]
 */
function clickAddTask() {
    console.log("clickAddTask");
    // $(".right").innerHTML = '';

    // If the current main category No subcategories, suggesting that first establish a sub-category
    // if (currentCateId != -1) {

    // }
    // var cateChild = queryCateById(currentCateId).child;
    if (currentCateId != -1 && currentCateTable == "cate" && queryCateById(currentCateId).child.length === 0) {
        alert("Please create sub-classification");
    } else {
        $(".todo-name").innerHTML = '<input type="text" class="input-title" placeholder="Please enter a title">';
        $(".manipulate").innerHTML = "";
        $(".task-date span").innerHTML = '<input type="date" class="input-date">';
        $(".content").innerHTML = '<textarea class="textarea-content" placeholder="Please enter task content"></textarea>';
        $(".button-area").innerHTML = '<span class="info"></span>                    <button class="save">Save</button>                    <button class="cancel-save">Cancel</button>';
        $(".button-area").style.display = "block";
        clickSaveOrCancel();
    }
}

/**
 * Click Save or discard task
 * @return {[type]} [description]
 */
function clickSaveOrCancel() {
    addClickEvent($(".save"), function() {
        console.log("save");
        console.log(currentCateId);
        console.log(currentCateTable);

        var title = $(".input-title");
        var content = $(".textarea-content");
        var date = $(".input-date");
        var info = $(".info");

        if (title.value === "") {
            info.innerHTML = "The title can not be empty";
        } else if (date.value === "") {
            info.innerHTML = "Date can not be empty";
        } else if (content.value === "") {
            info.innerHTML = "Can not be empty";
        } else {
            var taskObject = {};
            taskObject.finish = false;
            taskObject.name = title.value;
            taskObject.content = content.value;
            taskObject.date = date.value;

            //The process of pid
            if (currentCateTable === "AllCate") { //If you focus on all categories
                taskObject.pid = 0;
            } else if (currentCateTable === "cate") {
                taskObject.pid = queryCateById(currentCateId).child[0];
            } else {
                taskObject.pid = currentCateId;
            }
            console.log(taskObject);

            var curTaskId = addTask(taskObject);

            initCates(); //Initialization Category

            //Update Task List
            var taskList = $("#task-list");
            if (currentCateTable === "AllCate") { //If you focus on all categories
                taskList.innerHTML = createTaskList(queryAllTasks());
            } else if (currentCateTable === "cate") {
                taskList.innerHTML = createTaskList(queryTasksByCateId(currentCateId));
            } else {
                taskList.innerHTML = createTaskList(queryTasksByChildCateId(currentCateId));
            }
            //Update details area
            currentTaskId = curTaskId;
            generateTaskById(curTaskId); //Initialization Task Details
        }
    });
    addClickEvent($(".cancel-save"), function() {
        console.log("cancel save");
        generateTaskById(currentTaskId);
    });
}

/**
 * Click Finish
 * @return {[type]} [description]
 */
function checkTaskDone() {
    var r = confirm("OK to mark the task as complete it?");
    if (r) {

        console.log(currentTaskId);
        updateTaskStatusById(currentTaskId); //Update Status
        listAllStorage();
        console.log(currentTaskId);
        generateTaskById(currentTaskId);
        console.log(currentTaskId);
        var temp = currentTaskId;
        //Update Task List
        var taskList = $("#task-list");
        if (currentCateTable === "AllCate") { //If you focus on all categories
            taskList.innerHTML = createTaskList(queryAllTasks());
        } else if (currentCateTable === "cate") {
            taskList.innerHTML = createTaskList(queryTasksByCateId(currentCateId));
        } else {
            taskList.innerHTML = createTaskList(queryTasksByChildCateId(currentCateId));
        }

        currentTaskId = temp;
    }
}

/**
 * Click Edit
 * @return {[type]} [description]
 */
function changeTask() {
    var task = queryTaskById(currentTaskId);
    $(".todo-name").innerHTML = '<input type="text" class="input-title" placeholder="Please enter a title" value="' + task.name + '">';
    $(".manipulate").innerHTML = "";
    $(".task-date span").innerHTML = '<input type="date" class="input-date" value="' + task.date + '">';
    $(".content").innerHTML = '<textarea class="textarea-content" placeholder="Please enter the task content">' + task.content + '</textarea>';
    $(".button-area").innerHTML = '<span class="info"></span>                    <button class="save">Save</button>                    <button class="cancel-save">Give Up</button>';
    $(".button-area").style.display = "block";
    changeSaveOrNot();
}

/**
 * Save or no modification
 * @return {[type]} [description]
 */
function changeSaveOrNot() {
    addClickEvent($(".save"), function() {

        var title = $(".input-title");
        var content = $(".textarea-content");
        var date = $(".input-date");
        var info = $(".info");

        if (title.value === "") {
            info.innerHTML = "The title can not be empty";
        } else if (date.value === "") {
            info.innerHTML = "Date can not be empty";
        } else if (content.value === "") {
            info.innerHTML = "Can not be empty";
        } else {
            /*var taskObject = {};
            taskObject.finish = false;
            taskObject.name = title.value;
            taskObject.content = content.value;
            taskObject.date = date.value;*/
            console.log("before save change, check currentTaskId");
            console.log(currentTaskId);
            updateTaskById(currentTaskId, title.value, date.value, content.value);
            generateTaskById(currentTaskId);
            console.log(currentTaskId);
            var temp = currentTaskId;
            //Update Task List
            var taskList = $("#task-list");
            if (currentCateTable === "AllCate") { //If you focus on all categories
                taskList.innerHTML = createTaskList(queryAllTasks());
            } else if (currentCateTable === "cate") {
                taskList.innerHTML = createTaskList(queryTasksByCateId(currentCateId));
            } else {
                taskList.innerHTML = createTaskList(queryTasksByChildCateId(currentCateId));
            }

            currentTaskId = temp;
        }
    });

    addClickEvent($(".cancel-save"), function() {
        generateTaskById(currentTaskId);
    });
}

/*[{
    date: "2015-06-05",
    tasks: [{
        "id": 0,
        "pid": 1,
        "finish": true,
        "name": "task1",
        "content":Check1",
    }, {
        "id": 1,
        "pid": 1,
        "finish": true,
        "name": "task1",
        "content":"Check1",
    }]
},{
    date: "2015-06-06",
    tasks: [{
        "id": 2,
        "pid": 1,
        "finish": true,
        "name": "task1",
        "content":"Check1",
    }, {
        "id": 3,
        "pid": 1,
        "finish": true,
        "name": "task1",
        "content":"Check1",
    }]
}]*/

/*var taskJson = [{
    "id": 0,
    "pid": 1,
    "finish": true,
    "name": "task1",
    "date": "2015-05-10",
    "content": "Check1",
}, {
    "id": 1,
    "pid": 1,
    "finish": false,
    "name": "Sass",
    "date": "2015-05-31",
    "content": "Learning Mu class network video Sass",
}, {
    "id": 2,
    "pid": 1,
    "finish": false,
    "name": "AMD",
    "date": "2015-05-31",
    "content": "Learning AMD",
}];*/