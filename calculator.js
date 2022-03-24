const arrayv = JSON.parse(sessionStorage.getItem("arrayv")) || [];
const position = JSON.parse(sessionStorage.getItem("position")) || [];
function positionValues(divId,left,top){
    var ctr = 0;
    for(var i=0;i<position.length;i++){
        if(position[i][0]==divId){
            position[i][1]=left;
            position[i][2]=top;
            ctr++;
        }
    }
    if(ctr == 0 || position.length == 0){
        position.push([
        divId,
        left,
        top,
    ]);
    }
    sessionStorage.setItem('position', JSON.stringify(position));
}
function addValues(txtId,txtValue) {
    var ctr=0;
    for(var i=0;i<arrayv.length;i++){
            if(arrayv[i][0]==txtId){
                arrayv[i][1]=txtValue;
                ctr++;
            }
    }
    if(ctr == 0 || arrayv.length == 0){
        arrayv.push([
        txtId,
        txtValue,
    ]);
    }
    sessionStorage.setItem('arrayv', JSON.stringify(arrayv));//[res0,99][res2,44]
}
var q = 0;
Notification.requestPermission();
const Player = document.getElementById('player2');
let playY;
const myFrame = document.getElementById("myFrame");
class Calculator {
    constructor() {
        let buttonValues = [["AC", "+/-", "%", "/"], ["9", "8", "7", "*"], ["4", "5", "6", "-"], ["3", "2", "1", "+"], [",", "0", ".", "="]];
        this.mainDiv = document.createElement("div");
        this.mainDiv.className += "mainContainer";
        this.mainDiv.id = "div"+q;
        this.mainDiv.draggable = true;
        this.txtAreaDiv = document.createElement("div");
        this.txtArea = document.createElement("textarea");
        this.txtArea.className += "result1";
        this.txtArea.id = "res"+q;
        q++;
        this.txtAreaDiv.appendChild(this.txtArea);
        this.mainDiv.appendChild(this.txtAreaDiv);
        this.populateUI(buttonValues);
        this.mainDiv.addEventListener("dragstart",(event) =>{
            var style = window.getComputedStyle(event.target, null);
            var str = (parseInt(style.getPropertyValue("left")) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top")) - event.clientY) + ',' + event.target.id;
            console.log(str);
            event.dataTransfer.setData("Text", str);
            console.log(10);
        });
    }
    populateUI(buttonValues) {
        this.buttonValues = buttonValues;
        const line1 = document.createElement("div");
        let times = 0;
        for (let j = 0; j < 5; j++)
        {
            for (let i = 0; i < 4; i++)
            {
                const button = document.createElement("button");
                button.textContent = buttonValues[j][i];
                if (i == 3) {
                    button.style.backgroundColor = "f57e72";
                }
                if(button.textContent != null){
                    button.onclick = function(){
                        this.txtArea.value += buttonValues[j][i];
                        addValues(
                            this.txtArea.id,
                            this.txtArea.value,
                        );
                    }.bind(this)
                }
                line1.appendChild(button);
                if (button.textContent == "AC") {
                    button.onclick = function () {
                        this.clear();
                    }.bind(this)
                }
                
                if (button.textContent == "=") {
                    button.onclick = function () {
                        let x = this.txtArea.value;
                        let currentId = this.txtArea.id;
                        myFrame.contentWindow.postMessage([currentId,x],"*");
                        window.addEventListener('message',(event) =>{
                            if(event.origin !== "*"){
                                let arr = [];
                                arr = event.data;
                                const resultId = arr[0];
                                if(resultId == this.txtArea.id){
                                  this.txtArea.value = arr[1];
                                }
                                addValues(
                                    this.txtArea.id,
                                    this.txtArea.value,
                                );
                              const notification = new Notification(this.txtArea.value);
                            }
                        },false);
                        if(times == 0){
                            console.log(times);
                            playY = Player.src += '?autoplay=1';
                            times++;
                          }
                        else{
                            console.log(times);
                            playY = playY.slice(0, -11);
                            Player.src = playY;
                            if(times == 1){
                                console.log(times);
                                playY = Player.src += '?autoplay=1';
                            }
                        }
                        
                    }.bind(this)
                }
            }
        }
        this.mainDiv.appendChild(line1);
        document.body.appendChild(this.mainDiv);
    }
    clear() {
        this.txtArea.value = "";
    }
    evaluate(values) {
        let y = eval(values);
        return y;
    }
}
var counter = 0;

let Click = document.getElementById("btn");
Click.addEventListener('click', function (createCalculator) {
    createCalculator.preventDefault();
    ++counter;
    sessionStorage.setItem('count',counter);
    const d = new Calculator();
    var times = 1;
    if(times == 1){
        console.log(times);
        playY = playY.slice(0, -11);
        Player.src = playY;
        times++;
    }
})
function storage() {
    counter = sessionStorage.getItem('count');
    for (var i = 0; i < counter; i++) {
        const y = "res"+i;
        const x = "div"+i;
        const d = new Calculator();
        for(let j=0;j<arrayv.length;j++)
        {
            for(let k=0;k<2;k++)
            {
               if(y == arrayv[j][0]){
                   d.txtArea.value = arrayv[j][1];
               }
            }
        }
        for(let a=0;a<position.length;a++){
            if(x == position[a][0]){
                var element = document.getElementById(position[a][0]);
                element.style.left = position[a][1];
                element.style.top = position[a][2];
                log
            }
        }
    }
}
function drop(event) {
    var offset = event.dataTransfer.getData("Text").split(',');
    var dm = document.getElementById(offset[2]);
    dm.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
    console.log(dm.style.left);
    dm.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
    console.log(dm.style.top);
    positionValues(
        dm.id,
        dm.style.left,
        dm.style.top,
    );
    event.preventDefault();
    return false;
}
function drag_over(event) {
    event.preventDefault();
    return false;
}
