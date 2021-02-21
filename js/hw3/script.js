
window.addEventListener('load', function () {

  let but = document.getElementById("but");
  let butClear = document.getElementById("but_clear");
  let inp = document.getElementById("inp");
  let list = document.querySelector("ul");
  let date =  document.getElementById("date");
  let time =  document.getElementById("time");

  const els = { ...localStorage };
  for ( let i in els){
    createAndAppend('li',i,list);
  }

  function addElement() {
    if (inp.value === '' || time.value === '' || date.value === ''){
      alert("Input empty")
      return;
    }
      let exList = list.children;
      for( let i in exList) {
        if (exList[i].textContent === inp.value) {
          alert("Element exists")
          return;
        }
      }
    localStorage.setItem(inp.value, date.value+" "+time.value);
    createAndAppend('li',inp.value,list);
  }
  but.addEventListener('click', addElement );
  document.addEventListener('keydown', function (){
    if (event.code == "Enter") {
      addElement()
    }
  });

  butClear.addEventListener('click', function (){
  	if ( confirm("You are sure?") ) {
      list.innerHTML = '';
      localStorage.clear();
    }
  })
})

var opened = '<div class = "opened"> \
  <div class = "but icon32"> \
	<img src="icon_delete.png"> \
	</div> \
	<div class = "time">\
	<p>Loading</p>\
	</div>\
	</div>'

function msToTime(s) { //https://stackoverflow.com/questions/9763441/milliseconds-to-time-in-javascript/9763479
  var pad = (n) => ('00' + n).slice(-2);
  return pad(s/3.6e6|0) + ':' + pad((s%3.6e6)/6e4|0) + ':' + pad((s%6e4)/1000|0);
}

function createAndAppend( name, value, parent){

  let el = document.createElement(name);
  let node = document.createTextNode(value);
  parent.appendChild(el).appendChild(node);

  el.onclick = function(){
  	if ( this.innerHTML.indexOf("opened") === -1){
      this.innerHTML += opened;
      let butDelete = el.children[0].children[0];
      butDelete.onclick = function(){
        if ( confirm("Are you sure?") ) {
          parent.removeChild(el);
          localStorage.removeItem( value );
        }
  		}
      let timeLeft = el.children[0].children[1];
      let interID = setInterval(() => {
        now = new Date();
        let future = new Date( localStorage.getItem( value ) )
        let left = future.getTime() - now.getTime()
        timeLeft.innerHTML = (left > 0 ? '<p>Time left: '+msToTime(left)+'</p>' : "<p>Time is up</p>");
        if ( this.innerHTML.indexOf("opened") === -1 || timeLeft.innerHTML == "<p>Time is up</p>"){
          clearInterval(interID);
        }
      }
      ,1000)
    } else {
      this.innerHTML = value;
    }
  };
  return el;
}
