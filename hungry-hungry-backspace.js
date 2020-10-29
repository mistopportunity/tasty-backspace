const cursorStates = {None: 0, Backspace: 1, Delete: 2};

const animatedCursorClass = "animated-tasty-cursor";
const hiddenCursorClass = "hidden-cursor";

const isDeletionKey = code => {
    return code === "Backspace" || code === "Delete";
};

const animatedCursor = document.createElement("div");
animatedCursor.className = animatedCursorClass;
document.body.appendChild(animatedCursor);

let cursorState = null;

const setCursorState = ID => {
    if(ID === cursorState) return;
    cursorState = ID;

    let newClass = "hidden";
    switch(ID) {
        case cursorStates.Backspace:
            newClass = "reverse";
            break;
        case cursorStates.Delete:
            newClass = "forward";
            break;
    }
    if(newClass === "hidden") {
        document.body.classList.remove(hiddenCursorClass);
    } else {
        document.body.classList.add(hiddenCursorClass);
    }
    animatedCursor.className = `${animatedCursorClass} ${newClass}`;
};
setCursorState(cursorStates.None);

const eventTarget = window;
eventTarget.addEventListener("keydown",({code})=>{
    if(!isDeletionKey(code)) return;
    setCursorState(cursorStates[code]);
});
eventTarget.addEventListener("keyup",({code})=>{
    if(!isDeletionKey(code)) return;
    setCursorState(cursorStates.None);
});

/* Animated cursors cannot be done with CSS alone. Approximate mouse location */
eventTarget.addEventListener("mousemove",({clientX,clientY})=>{
    Object.assign(animatedCursor.style,{
        top: clientY + "px", left: clientX + "px"
    });
});
