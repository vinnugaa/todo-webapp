/**
 * Open Source...
 */
// Arr determine whether a list, it returns a bool value
function isArray(arr) {
    return typeof arr === "object" && Object.prototype.toString.call(arr) === "[object Array]";
}

//Fn determine whether a function that returns a bool value
function isFunction(fn) {
    return typeof fn === "function";
}

//--------------------------------------------------
// Use recursion to implement a deep clone, you can copy a target object, and returns a complete copy
// Object type to be copied will be limited to a number, string, Boolean, date, arrays, Object object. It does not contain functions, regular objects, etc.
function cloneObject(src) {
    var o; //result
    if (Object.prototype.toString.call(src) === "[object Array]") {
        o = []; //Determine whether it is an array, and assigned an initial value
    } else {
        o = {};
    }
    for (var i in src) { //Traverse the object
        if (src.hasOwnProperty(i)) { //Discharge inherited properties
            if (typeof src[i] === "object") {
                o[i] = cloneObject(src[i]); //Recursive assignment
            } else {
                o[i] = src[i]; //Direct assignment
            }
        }
    }
    return o;
}

//--------------------------------------------------------------
// The array to re-operate, considering only elements in the array is a number or a string, returns an array of de-emphasis post
function uniqArray(arr) {
    var newArr = []; //Create an empty array
    for (var i in arr) { //Traverse the old array
        if (newArr.indexOf(arr[i]) == -1) { //If the new array does not exist in the current element
            newArr.push(arr[i]); //The new element added to the current array
        }
    }
    return newArr;
}


// Intermediate students skip this question
// Implement a simple trim function, it is used to remove a string, head and tail whitespace
// Assume only whitespace characters space, Tab
// Exercise through cycling, as well as some of the basic methods of the string, the string str respectively scanning head and tail is a continuous blank characters and delete them, and returns a complete removal of the string
function simpleTrim(str) {
    var i;
    var j;
    for (i = 0; i < str.length; i++) { //Traverse the string from the beginning
        if (str.charAt(i) != " " && str.charAt(i) != "\t") { //When the time is not empty
            break; //Out of the loop
        }
    }
    for (j = str.length - 1; j >= 0; j--) {
        if (str.charAt(j) != " " && str.charAt(j) != "\t") { //When the time is not empty
            break; //Out of the loop
        }
    }
    return str.slice(i, j + 1); //Returns substring
}
// Many students certainly could not stand for the code above, then, we realize a trim
// String head and tail removal space characters, including full-width space, Tab, etc., returns a string
// Try to use a line of simple regular expressions that subject
function trim(str) {
    if (str.length != -1) {
        return str.replace(/^\s+|\s+$/g, '');
        //Whitespace characters match the beginning and end, and the overall match
    }
}

/*
 * Remove empty elements in the array
 */
function deleteBlank(arr) {
    var arr2 = [];
    for (i = 0; i < arr.length; i++) {
        if (arr[i].match(/\s+/) || arr[i] === "") {
            continue;
        } else {
            arr2.push(arr[i]);
        }
    }
    return arr2;
}

/**
* Remove the index elements in an array
  *param {Array} arr array
  *param {Number} index index
  *return {Array} new array
 */
function deleteInArray (arr,index) {
    if (isArray(arr)&&index<arr.length) {
        return arr.slice(0, index).concat(arr.slice(index+1));
    } else{
        console.error("not a arr or index error");
    }
}
// console.log(deleteInArray());
// console.log(deleteInArray(["a","b","c"],0));
// Implement a loop through the array of methods for the implementation of each element in the array fn function and the array index and element as an argument
function each(arr, fn) {
    for (var i in arr) {
        fn(arr[i], i);
    }
}



// Gets the number of elements in the first layer of an object which returns an integer
function getObjectLength(obj) {
    return Object.keys(obj).length;
}



//---------------------------------------------------------
// To determine whether the e-mail address
function isEmail(emailStr) {
    var pattern = /^(\w+\.)*\w+@\w+(\.\w+)+$/;
    return pattern.test(emailStr);
}

// To determine whether the mobile phone number
function isMobilePhone(phone) {
    var pattern = /^(\+\d{1,4})?\d{7,11}$/;
    return pattern.test(phone);
}



//-----------------------------------------------------------
// The element to add a new style of a style called newClassName
function addClass(element, newClassName) {
    var oldClassName = element.className; //Get an old-style class
    element.className = oldClassName === "" ? newClassName : oldClassName + " " + newClassName;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var originClassName = element.className; //Get original style class
    var pattern = new RegExp("\\b" + oldClassName + "\\b"); //Using the constructor function dynamic regex
    element.className = trim(originClassName.replace(pattern, ''));
}

// SiblingNode judge whether elements and element with a parent element under the same level of return bool value
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

// Get element relative to the browser window, and returns an object {x, y}
function getPosition(element) {
    var pos = {};
    pos.x = element.getBoundingClientRect().left + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
    pos.y = element.getBoundingClientRect().top + Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    return pos;
}



//---------------------------------------------------------
// Implement a simple Query
// More than one selector bit difficult to me, I read some information that idea should be as follows:
// 1. If there is # directly check back from the #
// 2. If there is any tag tag directly to check back then
// 3. style classes, attributes, from back to front check, get all the name of its parent node, to filter match
// The above approach a little too complicated, I do a simple positive match it.
function $(selector) {

    if (!selector) {
        return null;
    }

    if (selector == document) {
        return document;
    }

    selector = trim(selector);
    if (selector.indexOf(" ") !== -1) { //If there is a space
        var selectorArr = selector.split(/\s+/); //Split into an array

        var rootScope = myQuery(selectorArr[0]); //Look first
        var i = null;
        var j = null;
        var result = [];
        //Circulation selector each element
        for (i = 1; i < selectorArr.length; i++) {
            for (j = 0; j < rootScope.length; j++) {
                result.push(myQuery(selectorArr[i], rootScope[j]));
            }
            // rootScope = result;
            // At present this method has bug
        }
        return result[0][0];
    } else { //Only a direct query
        return myQuery(selector, document)[0];
    }
}

/**
  *For a content of search results success
  *param {String} selector selectors content
  *param {Element} root the root element
  *return {NodeList} node list array may be multiple nodes may also be a
 */
function myQuery(selector, root) {
    var signal = selector[0]; //
    var allChildren = null;
    var content = selector.substr(1);
    var currAttr = null;
    var result = [];
    root = root || document; //If you do not give root, the assignment document
    switch (signal) {
        case "#":
            result.push(document.getElementById(content));
            break;
        case ".":
            allChildren = root.getElementsByTagName("*");
            // var pattern0 = new RegExp("\\b" + content + "\\b");
            for (i = 0; i < allChildren.length; i++) {
                currAttr = allChildren[i].getAttribute("class");
                if (currAttr !== null) {
                    var currAttrsArr = currAttr.split(/\s+/);
                    // console.log(currAttr);
                    for (j = 0; j < currAttrsArr.length; j++) {
                        if (content === currAttrsArr[j]) {
                            result.push(allChildren[i]);
                            // console.log(result);
                        }
                    }
                }
            }
            break;
        case "[": //Attribute Selection
            if (content.search("=") == -1) { //Only property, no value
                allChildren = root.getElementsByTagName("*");
                for (i = 0; i < allChildren.length; i++) {
                    if (allChildren[i].getAttribute(selector.slice(1, -1)) !== null) {
                        result.push(allChildren[i]);
                    }
                }
            } else { //Both properties have value
                allChildren = root.getElementsByTagName("*");
                var pattern = /\[(\w+)\s*\=\s*(\w+)\]/; //In order to separate the content before and after the equal sign
                var cut = selector.match(pattern); //Results after the separation, the array
                var key = cut[1]; //Bond
                var value = cut[2]; //Value
                for (i = 0; i < allChildren.length; i++) {
                    if (allChildren[i].getAttribute(key) == value) {
                        result.push(allChildren[i]);
                    }
                }
            }
            break;
        default: //tag
            result = root.getElementsByTagName(selector);
            break;
    }
    return result;
}

/**
 * ==================Event=======================
 */
// A response element binding to an event for event response function for the listener
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
}

// For instance:

// addEvent($(".second"), "click", function () {
//     alert("clicksecond");
// });

// Removes element target response time for the event listener event occurs
function removeEvent(element, event, listener) {
    if (element.removeEventListenr) {
        element.removeEventListenr(event, listener);
    } else if (element.detachEvent) {
        element.detachEvent("on" + event, listener);
    }
}

// To achieve the click event bindings
function addClickEvent(element, listener) {
    addEvent(element, "click", listener);
}

// Press the Enter key to achieve when the event bindings
function addEnterEvent(element, listener) {
    addEvent(element, "keydown", function(event) {
        if (event.keyCode == 13) {
            listener();
        }
    });
}

// Event Agent
function delegateEvent(element,tag,eventName,listener){
    addEvent(element, eventName, function(event){
        var target = event.target || event.srcElement;
        if(target.tagName.toLowerCase() == tag.toLowerCase()) {
            listener.call(target, event);
        }
    });
}

// Estimated that some students have begun to Tucao, function inside a pile of $ watched Halo ah, the next event in our function to do the following packaging changes:

$.on = function(selector, event, listener) {
    addEvent($(selector), event, listener);
};
$.click = function(selector, listener) {
    addClickEvent($(selector), listener);
};
$.un = function(selector, event, listener) {
    removeEvent($(selector), event, listener);
};
$.delegate = function(selector, tag, event, listener) {
    delegateEvent($(selector), tag, event, listener);
};


// ---------5 BOM-------

// Determine whether the IE browser, or version number -1
function isIE() {
    var s = navigator.userAgent.toLowerCase();
    console.log(s);
    //ie10 information:
    //mozilla/5.0 (compatible; msie 10.0; windows nt 6.2; trident/6.0)
    //ie11 information:
    //mozilla/5.0 (windows nt 6.1; trident/7.0; slcc2; .net clr 2.0.50727; .net clr 3.5.30729; .net clr 3.0.30729; media center pc 6.0; .net4.0c; .net4.0e; infopath.2; rv:11.0) like gecko
    var ie = s.match(/rv:([\d.]+)/) || s.match(/msie ([\d.]+)/);
    if (ie) {
        return ie[1];
    } else {
        return -1;
    }
}

// Set up cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var cookie = cookieName + "=" + encodeURIComponent(cookieValue);
    if (typeof expiredays === "number") {
        cookie += ";max-age=" + (expiredays * 60 * 60 * 24);
    }
    document.cookie = cookie;
}

// Get cookie value
function getCookie(cookieName) {
    var cookie = {};
    var all = document.cookie;
    if (all === "") {
        return cookie;
    }
    var list = all.split("; ");
    for (var i = 0; i < list.length; i++) {
        var p = list[i].indexOf("=");
        var name = list[i].substr(0, p);
        var value = list[i].substr(p + 1);
        value = decodeURIComponent(value);
        cookie[name] = value;
    }
    return cookie;
}

//-------------Ajax---------------
// To learn Ajax, and try their own package an Ajax method. Implement the following methods:
function ajax(url, options) {

    var dataResult; //Results data

    //Processing data
    if (typeof(options.data) === 'object') {
        var str = '';
        for (var c in options.data) {
            str = str + c + '=' + options.data[c] + '&';
        }
        dataResult = str.substring(0, str.length - 1);
    }

    // Treatment type
    options.type = options.type || 'GET';

    //Get XMLHttpRequest Object
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    // Send request
    xhr.open(options.type, url);
    if (options.type == 'GET') {
        xhr.send(null);
    } else {
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(dataResult);
    }

    // readyState
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (options.onsuccess) {
                    options.onsuccess(xhr.responseText, xhr.responseXML);
                }
            } else {
                if (options.onfail) {
                    options.onfail();
                }
            }
        }
    };
}

// Example of use:
// ajax(
//     'http://localhost:8080/server/ajaxtest', {
//         data: {
//             name: 'simon',
//             password: '123456'
//         },
//         onsuccess: function(responseText, xhr) {
//             console.log(responseText);
//         }
//     }
// );　