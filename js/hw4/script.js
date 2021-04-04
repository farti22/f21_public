
let validateHook = undefined

class Computer {
  constructor(name, creator, cpu, graphic_card, ram_type, ram_size, drive_type, drive_size) {
    this.setName = name;
    this._creator = creator;
    this.setCPU = cpu;
    this.setGraphicCard = graphic_card;
    this._ram_type = ram_type;
    this.setRAMSize = ram_size;
    this._drive_type = drive_type;
    this.setDriveSize = drive_size;
    this.__className = "Computer";
  }
  get getName(){
    return this._name
  }
  get getCreator(){
    return this._creator;
  }
  get getCPU(){
    return this._cpu;
  }
  get getGraphicCard(){
    return this._graphic_card;
  }
  get getRAMType(){
    return this._ram_type;
  }
  get getRAMSize(){
    return this._ram_size;
  }
  get getDriveType(){
    return this._drive_type;
  }
  get getDriveSize(){
    return this._drive_size;
  }
  set setName( name ){
    if ( regexStringWithNums(name) ){
      this._name = name;
    } else validateHook = "(Название модели)";
  }
  set setCPU( cpu ){
    if ( regexStringWithNums(cpu) ){
      this._cpu = cpu;
    } else validateHook = "(Процессор)";
  }
  set setGraphicCard( gc ){
    if ( regexStringWithNums(gc) ) {
      this._graphic_card = gc;
    } else validateHook = "(Видеокарта)";
  }
  set setRAMSize( size ){
    if ( regexSize(size) ){
      this._ram_size = size;
    } else validateHook = "(Объём RAM)";
  }
  set setDriveSize( size ){
    if ( regexSize(size) ){
      this._drive_size = size;
    } else validateHook = "(Объём памяти)";
  }
}

class Ultrabook extends Computer {
  constructor(name, creator, cpu, graphic_card, ram_type, ram_size, drive_type, drive_size, color, screen_diagonal, screen_resolution, battery) {
    super(name, creator, cpu, graphic_card, ram_type, ram_size, drive_type, drive_size);
    this.setColor = color;
    this._screen_diagonal = screen_diagonal;
    this._screen_resolution = screen_resolution;
    this.setBattery = battery;
    this._type = "Ноутбук";
    this.__className = "Ultrabook";
  }
  get getColor(){
    return this._color;
  }
  get getScreenDiagonal(){
    return this._screen_diagonal;
  }
  get getScreenResolution(){
    return this._screen_resolution;
  }
  get getType(){
    return this._type;
  }
  get getBattery(){
    return this._battery;
  }
  set setColor( color ){
    if ( regexString(color) ){
      this._color = color;
    } else validateHook = "(Цвет корпуса)";
  }
  set setBattery( battery ){
    if ( regexSize(battery) ){
      this._battery = battery;
    } else validateHook = "(Запас энергии)";
  }
}

class Server extends Computer {
  constructor(name, creator, cpu, graphic_card, ram_type, ram_size, drive_type, drive_size, power_supply, server_rack, pci_ext) {
    super(name, creator, cpu, graphic_card, ram_type, ram_size, drive_type, drive_size);
    this.setPowerSupply = power_supply;
    this.setServerRack = server_rack;
    this._pci_ext = pci_ext;
    this._type = "Сервер";
    this.__className = "Server";
  }
  get getPowerSupply(){
    return this._power_supply;
  }
  get getServerRack(){
    return this._server_rack
  }
  get getPCIExt(){
    return this._pci_ext;
  }
  get getType(){
    return this._type;
  }
  set setPowerSupply( power ){
    if ( regexSize(power) ){
      this._power_supply = power;
    } else validateHook = "(Общая мощность БП)";
  }
  set setServerRack( cells ){
    if ( regexSize(cells) ){
      this._server_rack = cells;
    } else validateHook = "(Кол-во ячеек в стойке)";
  }
}

function regexSize( str ){
  let re =/^[^0][\d ]+$/;
  return re.test(str);
}

function regexStringWithNums( str ){
  let re =/^[а-яА-Яa-zA-Z][\wа-яА-Я\- ]+$/;
  return re.test(str)
}

function regexString( str ){
  let re =/^[а-яА-Яa-zA-Z ]+$/;
  return re.test(str)
}

function isObject(varOrObj) {
  return varOrObj !== null && typeof varOrObj === 'object';
}

function restoreObject(obj) {
  let newObj = obj;

  if (obj.hasOwnProperty("__className")) {
    let list = {Ultrabook: Ultrabook, Server: Server};
    newObj = new (list[obj["__className"]]);
    newObj = Object.assign(newObj, obj);
  }

  for (let prop of Object.keys(newObj)) {
    if (isObject(newObj[prop])) {
      newObj[prop] = restoreObject(newObj[prop]);
    }
  }
  return newObj;
}

let htmlInputUltrabook =
    `
  <h3>Ноутбук:</h3>
  <label for="selectCreator">Выберите производителя:</label>
  <select id="selectCreator">
    <option value="Lenovo">Lenovo</option>
    <option value="Acer">Acer</option>
    <option value="Dell">DELL</option>
    <option value="ASUS">ASUS</option>
    <option value="HP">HP</option>
  </select><br>
  <label for="selectScreenDiagonal">Выберите диагональ экрана(")</label>
  <select id="selectScreenDiagonal">
    <option value="15.6">15.6</option>
    <option value="14.0">14.0</option>    
    <option value="13.3">13.0</option>
    <option value="17.3">17.3</option>
  </select><br>
  <label for="selectScreenResolution">Выберите разрешение экрана</label>
  <select id="selectScreenResolution">
    <option value="1920x1080">1920x1080</option>
    <option value="1366x768">1366x768</option>    
    <option value="1600x900">1600x900</option>
    <option value="3840x2160">3840x2160</option>
  </select><br>  
  <label for="inputColor">Укажите цвет корпуса:</label>
  <input id="inputColor" required><br>
  <label for="inputBattery">Укажите запас энергии:</label>
  <input id="inputBattery" required><span class="light-text">(Вт·ч)</span><br>  
  `;

let htmlInputServer =
  `
  <h3>Сервер:</h3>
  <label for="selectCreator">Выберите производителя:</label> 
  <select id="selectCreator">
    <option value="IBM">IBM</option>
    <option value="Cisco">Cisco</option>
    <option value="Oracle">Oracle</option>
    <option value="Dell">Dell</option>
    <option value="Intel">Intel</option>
    <option value="Acer">Acer</option>
    <option value="NEC">NEC</option>
  </select><br>
  <label for="inputRack">Укажите кол-во ячеек в стойке:</label>
  <input id="inputRack" required><br>
  <label for="inputPowerSupply">Укажите общ. мощность БП:</label>
  <input id="inputPowerSupply" required><span class="light-text">(Вт)</span><br>
  <label for="selectPCI">Выберите PCIe устройство:</label> 
  <select id="selectPCI">
    <option value="Нету">Нету</option>
    <option value="GPU">GPU</option>    
    <option value="HBA">HBA</option>
    <option value="NET1">NET1</option>
    <option value="NET10">NET10</option>
    <option value="RAID">RAID</option>
  </select>  
  `;

function addToTable(obj){
  let table = document.getElementById("tbody");
  let inner =
    `
    <td>${obj.getName || "Неизвестно"}</td>
    <td>${obj.getType}</td>
    <td>${obj.getCreator}</td>
    <td>${obj.getCPU}</td>
    <td>${obj.getGraphicCard}</td>
    <td>${obj.getRAMType} ${obj.getRAMSize} GB</td>
    <td>${obj.getDriveType} ${obj.getDriveSize} GB</td>      
    <td>
      <a>Изменить</a>
      <a>Удалить</a>
    </td>         
    `;
  let tr = document.createElement('tr');
  tr.innerHTML = inner;
  table.appendChild(tr);
}

function setInfo( obj ){
  let body = document.getElementById("modalInfoBody");
  let inner = `
    <h3 class="center">${obj.getName}</h3>
    <p>Производитель: <span class="bold-text">${obj.getCreator}</span></p>
    <p>Процессор: <span class="bold-text">${obj.getCPU}</span></p>
    <p>Видеокарта: <span class="bold-text">${obj.getGraphicCard}</span></p>
    <p>Оперативная память: <span class="bold-text">[ Тип: ${obj.getRAMType} ] [ Объём: ${obj.getRAMSize} GB ]</span></p>
    <p>Жёсткий диск: <span class="bold-text">[ Тип: ${obj.getDriveType} ] [ Объём: ${obj.getDriveSize} GB ]</span></p>    
      `;
  if ( obj.getType === "Ноутбук"){
    inner += `
    <p>Экран: <span class="bold-text">[ Диагональ: ${obj.getScreenDiagonal} ] [ Разрешение: ${obj.getScreenResolution} ]</span></p>
    <p>Цвет корпуса: <span class="bold-text">${obj.getColor}</span></p>
    <p>Емкость аккумулятора: <span class="bold-text">${obj.getBattery} Вт·ч</span></p>
    `;
  }else {
    inner += `
    <p>Кол-во ячеек в стойке: <span class="bold-text">${obj.getServerRack}</span></p> 
    <p>Общая мощность БП: <span class="bold-text">${obj.getPowerSupply} Вт</span></p>  
    <p>PCIe устройство: <span class="bold-text">${obj.getPCIExt}</span></p>          
    `;
  }
  body.innerHTML = inner;
}

function editModalOptions( type, menu, obj = {} ){
  let header = menu.children[0].children[0];
  let body = menu.children[0].children[1];
  let footer = menu.children[0].children[2];

  if (type === "edit"){
    menu.style.display = "block";
    header.children[0].innerHTML = "Редактирование модели";
    footer.children[0].innerHTML = "Сохранить";
    let inputs = body.getElementsByTagName('input');
    let selects = body.getElementsByTagName('select')
    let arrInputs = [obj.getName, obj.getCPU, obj.getGraphicCard, obj.getRAMSize, obj.getDriveSize]
    let arrSelects = [obj.getType, obj.getRAMType, obj.getDriveType]
    let typePC = document.getElementById("dynamicDiv");

    if (obj.getType === "Ноутбук"){
      typePC.innerHTML = htmlInputUltrabook;
      arrInputs = [ ...arrInputs, ...[obj.getColor, obj.getBattery]];
      arrSelects = [ ...arrSelects, ...[obj.getCreator, obj.getScreenDiagonal, obj.getScreenResolution]];
    }else {
      typePC.innerHTML = htmlInputServer;
      arrInputs = [ ...arrInputs, ...[obj.getServerRack, obj.getPowerSupply]];
      arrSelects = [ ...arrSelects, ...[obj.getCreator, obj.getPCIExt]];
    }
	
    for( let i in arrInputs){
      inputs[i].value = arrInputs[i];
    }
    for( let i in arrSelects){
      selects[i].value = arrSelects[i];
    }
  } else {
    menu.style.display = "block";
    header.children[0].innerHTML = "Добавление модели";
    footer.children[0].innerHTML = "Добавить";
  }

}

function updateStorage(list) {
  localStorage.setItem("table", JSON.stringify(list) );
}

function checkValidateHook(){
  if (validateHook) {
    alert(`Поле ${validateHook} заполнено неправильно!`);
    validateHook = undefined;
    return true;
  }
  return false;
}


window.addEventListener('load', function () {
  let list = JSON.parse(localStorage.getItem("table")) || [];
  list = list.map( (obj) => restoreObject(obj) )

  for( let obj of list) {
    addToTable( obj );
  }

  let createBtn = document.getElementById("createButton");
  let modalMenu = document.getElementById("modalCreate");
  let modalInfo = document.getElementById("modalInfo")
  let modalBtn = document.getElementById("modalBtn");
  let type = document.getElementById("selectType");
  let inputs = document.getElementById("dynamicDiv");
  let table = document.getElementById("tbody");
  let tempObjIndex = 0
  inputs.innerHTML = htmlInputUltrabook;
  
  table.addEventListener('click', function () {
    let unbtn = event.target;
    let tr = unbtn.parentElement.parentElement
    let index = tr.rowIndex-1
    if (unbtn.text === "Изменить" ) {
      tempObjIndex = index;
      editModalOptions('edit', modalMenu, list[index] );
    } else if ( unbtn.text === "Удалить" ) {
      if ( confirm("Вы уверены?") ) {
        list.splice(index, 1);
        tr.remove();
        updateStorage(list)
      }
    } else {
      let index = unbtn.parentElement.rowIndex - 1;
      let obj = list[index];
      setInfo( obj );
      modalInfo.style.display = "block";
    }
  })

  createBtn.onclick = function(){
    editModalOptions('add', modalMenu );
  }

  modalBtn.onclick = function(){
    let btn = modalMenu.children[0].children[2].children[0].innerHTML;
    let arr = [
      document.getElementById( "inputName").value,
      document.getElementById( "selectCreator").value,
      document.getElementById("inputCPU").value,
      document.getElementById("inputVideoCard").value,
      document.getElementById("selectRamType").value,
      document.getElementById("inputRamSize").value,
      document.getElementById("selectDriveType").value,
      document.getElementById("inputDriveSize").value
    ];

    if (document.getElementById("selectType").value === "Ноутбук"){
      arr = arr.concat([
        document.getElementById( "inputColor").value,
        document.getElementById( "selectScreenDiagonal").value,
        document.getElementById( "selectScreenResolution").value,
        document.getElementById( "inputBattery").value
      ]);
      for( let i in arr ){
        if (arr[i] === ''){
          alert("Ошибка! Были заполнены не все поля.")
          return false;
        }
      }

      let ultrabook = new Ultrabook(...arr )
      if (checkValidateHook()) { return false; }
      if (btn === "Добавить"){
        list.push( ultrabook );
      } else {
        list[tempObjIndex] = ultrabook;
      }
    } else {
      arr = arr.concat([
        document.getElementById( "inputPowerSupply").value,
        document.getElementById( "inputRack").value,
        document.getElementById( "selectPCI").value
      ]);

      for( let i in arr ){
        if (arr[i] === ''){
          alert("Ошибка! Были заполнены не все поля.")
          return false;
        }
      }

      let server = new Server(...arr )
      if (checkValidateHook()) { return false; }
      if (btn === "Добавить"){
        list.push( server );
      } else {
        list[tempObjIndex] = server;
      }
    }
	
    updateStorage(list);
    table.innerHTML = '';
	
    for (let obj of list) {
      addToTable(obj);
    }
	
    modalMenu.style.display = "none";
  }

  type.onchange = function(){
    if (type.value === "Ноутбук") {
      inputs.innerHTML = htmlInputUltrabook;
    }else {
      inputs.innerHTML = htmlInputServer;
    }
  }
  window.onclick = function(event) {
    if (event.target === modalInfo) {
      modalInfo.style.display = "none";
    }
    if (event.target === modalMenu) {
      modalMenu.style.display = "none";
    }
  }
})