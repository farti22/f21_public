
let term = {
  Belarus:-2,
  Russian:-9,
  Ukraine:0,
  Latvia:3,
  Poland:9,
  Germany:12
}


window.addEventListener('DOMContentLoaded', function () {
  let avg = document.getElementById("avg");
  let max = document.getElementById("max");
  let table = document.querySelector("table");
  for(let i in term){
    let tr = createAndAppend("tr",'',table)
    createAndAppend('td',i,tr);
    createAndAppend('td',term[i],tr);
  }
  avg.textContent += getAvg(term)+'°C';
  max.textContent += getMax(term)+'°C';
});

function getAvg(term){
  let sum = 0, count = 0;
  for(let i in term){
    count++;
    sum += term[i];
  }
  return (sum/count).toFixed(2);
}

function getMax(term) {
  let max = -100;
  for(let i in term){ if (term[i] > max){ max = term[i]; } }
  return max;
}

function createAndAppend( name, value, parent){
  let el = document.createElement(name);
  let node = document.createTextNode(value);
  parent.appendChild(el).appendChild(node);
  return el;
}
