/ * *
* Created by Gaohaoyang on 015.4 30
* / / /
judge whether arr is an array, and returns a bool value
function isArray (arr) {
    return typeof arr = == "object " &&Object prototype . . . toString call (arr) = == "Object Array ";
}

/judgment Fn is a function that returns a bool value
isFunction function (Fn) {
    return typeof FN = == "function";
}

/ / - - - - - - - - - - - - - - - - - - - - - - - - -
// Use of return to a depth cloning, you can copy a target object, and returns a complete copy/
/copied the object type will be limited to a number, string, boolean, date, array, Object object. Does not contain functions, that is the object of
cloneObject function (SRC) {
    VAR O;/result
    if (Object prototype . . . toString call (SRC) = == "Object Array " ) {
        o=(s); // determine if the array, and that initial value
    } else {
        o= { };
    }
    for (var I in the SRC) { //traverse the object
        if (SRC.hasOwnProperty (i) { //Drain inherited attributes
            if (typeof SRC (i) = == "Object") {
                o (i) = cloneObject (SRC (i) /recursive assignment
            } else {
                o (i) = SRC (I;/direct assignment
            } }

    }
    return O;
}

/ / - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    / / an array to the operation, considering only Array element is a number or a string, and returns a to the rear of the array
function uniqArray (arr) {
    VAR newArr =(s); // Create an empty array
    for (VAR I in arr) {/traverse the array
        if (newArr . indexOf (arr (i) == 1 ) { // if the new array, there is no current element
            newArr . Push (arr (I); // new array to the current element
        }
    }
    Return newArr;
}


/middle class skip this item
/achieving a simple trim function to remove a string to the head and tail of the blank characters
/assumes that blank character only half-width spaces, Tab
/practice through the loop, and a string of some of the basic approaches, the string str head and tail is a continuous blank characters and delete them and return a complete removal of the string
function simpleTrim (STR) {
    VAR I;
    VAR J;
    for (i = 0; I <STR.length; I++) { // start traversal string
        if (Str . charAt (i)!  =" " &&STR . charAt (i)!  = " \t") { /when is not empty for the
            break; // Break Loop
        }
    }
    for (J = str. length - 1; J >= 0; J--) {
        if (Str . charAt (J).  =" " &&STR . charAt (J)!  = " \t") { //when not to empty the
            break; // Break Loop
        }
    }
    return STR . slice (I, J + 1); // Returns the string }


/many of the students had positive for the above code could not stand it anymore, and the next, we truly achieve a trim
    /the string end to space characters to be removed, including the corner half-width spaces, Tab, returns a string
    /try to use a line and simple expressions complete the topic
    function trim (STR) {
        If (Str . length! = 1) {
            return STR . replace ( / ^ \S+ | \S+ $ /g, ' ' );
// match beginning and the end of the blank characters, and global match
        }
    }

/ *
* Remove the empty element
    * /
    function deleteBlank (arr) {
        VAR arr 2 =(s);
        for (i = 0; I < arr.length; I++) {
            if (arr (i) . match ( / \S+ /) | | arr (i) = == "") {
                continue;
            } else {
                arr 2. Push (arr (I);
            }
        }
        return arr2;
    }

    / * *
    * according to the index deleting an element in an array
    * @param { } Array arr array
    * @param number { } index index
    * @return {Array } new array
    * /
    function deleteInArray (arr, index) {
        If (isArray (arr) && index < arr.length) {
            return arr . slice (0, index). concat (arr. slice (index + 1);
        } else {
            console.Error ( "Not a arr or index error" );
        }
    } /
    /Console.log (deleteInArray ( );
// console.log (deleteInArray ( "A", "B", "C", 0);
// a traverse an array, the array, each element the FN function, and the array index and element passed in as a parameter
    each function (arr, FN) {
        for (VAR I in arr) {
            Fn (arr (I, I);
        }
    }



//Get an object inside the first layer number of elements, and returns an integer
    function getObjectLength (obj) {
        return Object . keys (obj). length;
    }



/- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// determine whether the mailbox address
        function isEmail (emailStr) {
            VAR pattern = / ^ ( \w+ \ .) * \w+ @ \w+ ( \ . \w+ ) + $ /;
            return pattern. Test (emailStr);
        }

// determine if the mobile phone number
    function isMobilePhone (phone) {
        VAR pattern = / ^ ( \ + \ {1, 4 } )?  \d {7, 11} $ /;
        return pattern. Test (phone);
    }



    / / - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /element to add a style named newClassName New Style
    addClass function (element, newClassName) {
        VAR oldClassName = element . className; //Get old style class
        element . className = oldClassName === " " ? newClassName: oldClassName +" " +newClassName;
    }

//remove the element of style oldClassName
    removeClass function (element, oldClassName) {
        VAR originClassName = element . className; //Get the style class for the
        VAR pattern = New RegExp (the " \\B" + oldClassName + " \\B" ); // Use constructor constructs dynamic expression
        element. className = trim (originClassName . replace (pattern, ' ' );
    } /

/judgment siblingNode and element is the one of the parent element of the same parent element to return to bool value
    function isSiblingNode (element, siblingNode) {
        return element . parentNode === siblingNode . parentNode;
    }

// get element relative to the browser window to return to an object {X, Y }
    function getPosition (element) {
        VAR POS = { };
        pos.x = element . getBoundingClientRect () . left + Math . Max (document . documentElement . scrollLeft, document.body.scrollLeft);
        pos.y = element . getBoundingClientRect ( ). Top + Math . Max (document . documentElement . scrollTop, document.body.scrollTop);
        return POs;
    }



    / / - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        / / For a simple Query
    /Multiple selection is a bit difficult to me, and look at the some of the information that should be as follows:
/1. If there are #, directly from # to find
    /2. If there are tag directly to find all of the tag and then to look after
    /3. style classes, attributes, and from back to front, with all of its parent node name to filter matching/
    /above is somewhat too complex, I did a simple is to match.
        function $ (selector) {

        If (!  selector) {
            return null;
        }

        If (selector == document) {
            return document;
        }

        selector = trim (selector);
        if (selector . indexOf (" ")! == - 1) { /if there is a space
            VAR selectorArr = selector.Split( / \S+ / ); // remove array

            VAR rootScope = myQuery (selectorArr (0); // The First Look
            VAR I = NULL;
            VAR J = NULL;
            VAR result = The;
        /loop selector for each element
            for (i = 1; I <selectorArr . length; I++) {
                for (J = 0; J <rootScope.length; J++) {
                    result. Push (myQuery (selectorArr (I), rootScope (J) );
                }
            /rootScope = result;
// This method is also bug
            }
            return result 0 ' 0 ';
        } else { // Only a direct query
            return myQuery (selector, document) ' 0 ';
        }
    }

/ * *
* For a content search results success
    * @param { } String selector selector content *
@param { } Element root root node element
    * @return {NodeList array } node list, it may be more than one node may also be a
    * /
    function myQuery (selector, root) {
        VAR signal = selector (0; /
        var allChildren = NULL;
        VAR content = selector.substr (1);
        VAR currAttr = NULL;
        VAR result = The;
        root = root | | document; // if not to the root, and assignment document
        switch (signal) {
            case " #" :
                result. Push (document . getElementById (content);
                break;
            case " . ":
                allChildren = root.getElementsByTagName (" * " );
// VAR pattern 0 = New RegExp ( " \\B" + content + " \\B" );
                for (i = 0; I <allChildren.length; I++) {
                    currAttr = allChildren (i) . getAttribute ( "class" );
                    if (currAttr! == null) {
                        VAR currAttrsArr = currAttr . split ( / \S+ / );
                    /Console.log (currAttr);
                        for (J = 0; J <currAttrsArr.length; J++) {
                            if (content === currAttrsArr (J) {
                                result. Push (allChildren (I);
                            /Console.log (result);
                            }
                        }
                    }
                }
                break;
            case " '":/properties Select
                If (content. Search ( " = ") == 1 ) { // Only properties, there are no value
                allChildren = root.getElementsByTagName (" * " );
                for (i = 0; I <allChildren . length; I++) {
                    if (allChildren I] . getAttribute (selector . slice (1 - 1)!  == null) {
                        result.Push (allChildren (I);
                    }
                }
            } else { /both properties and a value
                allChildren = root.getElementsByTagName (" * " );
                VAR pattern = / \ ' ( \w+ ) \s * \ = \s * ( \w+ ) \/;/in order to split before and after the equal sign content
                VAR cut = selector.match (pattern);/separation is the result of group VAR
                Key = cut 1;/type
                VAR value = cut (2;/Value
                for (i = 0; I <allChildren . length; I++) {
                    if (allChildren (i) . getAttribute (key) == value) {
                        result. Push (allChildren (I);
                    }
                }
            }
                break;
            default: /tag
                result = root.getElementsByTagName (selector);
                break;
        }
        return result;
    }

    / * *
    * Thirty-Six Stratagies", referred referred event Thirty-Six Stratagies", referred table above shows that
    * / / /
    to One element bind to an event for a response, the response function for listener
        function addEvent (element, event, listener) {
            if (element . addEventListener) {
                element. addEventListener (event, listener);
            } else if (element.attachEvent) {
                element. attachEvent ( "on" + Event, listener);
            }
        }

// for example:

    /addEvent ( $ ( " .second" ), "click", function () { //
    alert ( "clicksecond" );
// } );

// remove element object for event when an event occurs that the listener's response
    function removeEvent (element, event, listener) {
        if (element . removeEventListenr) {
            element. removeEventListenr (event, listener);
        } else if (element.detachEvent) {
            element. detachEvent ( "on" + Event and listener);
        }
    } /

/for the click event of the BIND
    function addClickEvent (element, listener) {
        addEvent (element, the "click" listener);
    }

//for the Enter key event binding
    function addEnterEvent (element, listener) {
        addEvent (element, the "keydown", function (Event) {
            if (event.keyCode == 13 ) {
                listener ( );
            }
        } );
    }

/Event Agent
    function delegateEvent (element, tag, eventName, listener) {
        addEvent (element, eventName, function (Event) {
            VAR target = event.target | | Event . srcElement;
            if (target.tagName . toLowerCase () == tag . toLowerCase () ) {
                listener.Call (target, event);
            }
        } );
    }

//estimated that there were students had already begun and the slot, the function inside the $look at that, ah, the next to our event functions as encapsulation change: $

. On = function (selector. Event and listener) {
        addEvent ( $ (selector), event and listener);
    };
    $. click = function (selector, listener) {
        addClickEvent ( $ (selector), and listener);
    };
    $. UN = function (selector, event, and listener) {
        removeEvent ( $ (selector), event and listener);
    };
    $. delegate = function (selector, tag, event, and listener) {
        delegateEvent ( $ (selector), tag, event, and listener);
    };


// - - - - - 5 BOM -

/judgment is a IE browser to return - 1 or version number
    isIE function () {
        VAR s = navigator . userAgent . toLowerCase ();
        console.log (S);
    /IE 10 of information:
            /Mozilla/5.0 (compatible; msie 10.0; Windows NT 6.2; trident/ 6.0)
    /IE 11 information:
//Mozilla/5.0 (Windows NT 6.1; trident/ 7.0; slcc2; .NET CLR 2.0 .50,727; .NET 3.5 CLR .30,729; .NET 3.0 CLR .30,729; Media Center PC 6.0; .NET 4.0 C; .NET 4.0 e; InfoPath2; RV: 11.0), like gecko
            VAR IE = S . match (/RV: ( \d) . + ) /) | | s . match (/msie ( \d) . + ) / );
        if (ie) {
            return IE 1;
        } else {
            return - 1;
        }
    } /

/setting the cookie
    function setCookie (cookieName, cookieValue, expiredays) {
        VAR cookie = cookieName + " =" + encodeURIComponent (cookieValue);
        if (typeof expiredays === "Number") {
            cookie += "; max-age=" + (expiredays * 60 * 60 * 24);
        }
        document.cookie = cookie;
    }

// get cookie value
    function getCookie (cookieName) {
        VAR cookies = { };
        VAR all = document.cookie;
        if (all = == " ") {
            return cookie;
        }
        VAR list = All. Split ("; " );
        for (VAR I = 0; I < list.length; I++) {
            VAR P = List (i) . indexOf ( " = " );
            VAR Name = List (i) . substr (0, P);
            VAR value = List (i) . substr (P + 1);
            value = decodeURIComponent (value);
            cookie the name = value;
        }
        return cookie;
    }

/- - - - - - - Ajax - - - - - - - -
//learning Ajax, and attempt to package a Ajax method. Achieve the following methods:
        function Ajax (URL, Options) {

            VAR dataResult;/results data

// Handle data
            if (typeof (options. Data) = == 'Object' ) {
                VAR STR = ' ';
                for (VAR C options in . data) {
                    STR = str + C+' = ' + options. Data 'C' + ' &';
                }
                dataResult = str.substring(0, Str.length - 1);
            }

// Handle Type
            options.Type = options.Type | | ' ' GET;

//Get XMLHttpRequest object
            VAR xhr = window. XMLHttpRequest? new XMLHttpRequest ( ): New ActiveXObject ( 'Microsoft . XMLHTTP' );

//Send Request
            xhr.Open (options. Type, URL);
            if (options.Type == 'GET') {
                xhr . Send (null);
            } else {
                xhr . setRequestHeader ( 'Content-type', 'application/X-WWW-form-urlencoded' );
                xhr . Send (dataResult);
            }

            /readyState
            xhr.onreadystatechange = function () {
                if (xhr . readyState = == 4) {
                    if (xhr . Status = == 200) {
                        if (options.onsuccess) {
                            options. onsuccess (xhr . responseText, xhr . responseXML);
                        }
                    } else {
                        If (options.onfail) {
                            options. onfail ( );
                        }
                    }
                }
            };
        }

    / / example of use:
        /Ajax (
        / 'http:// localhost:8080/Server/ajaxtest', {
    /data: {
    /Name: 'simon',
    /password: '123,456'
        / },
    /onsuccess: function (responseText, xhr) { /
    /Console.log (responseText);
// }
/ }
/ );