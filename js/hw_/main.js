window.addEventListener('load', function () {

    let but = document.getElementById("but");
    let inp = document.getElementById("inp");
    let list = document.querySelector("ul");
    but.addEventListener('click', function (){
        if (inp.value === ''){ // Проверка текста в поле ввода
            alert("Input empty")
            return;
        }
        let exList = list.children;
        for( let i in exList) { // Проверка на наличие элемента
            if (exList[i].textContent === inp.value) {
                alert("Element exists")
                return;
            }
        }
        let el = document.createElement("li");
        let text = document.createTextNode(inp.value);
        list.appendChild(el).appendChild(text);
    });
})