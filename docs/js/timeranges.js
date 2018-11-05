var rangeCache = document.getElementsByClassName("range");

var rangehtml = '<p id="rangetext">Range <span class="rangenumber" id="rangenumber"></span></p><input type="time" name="starttime"  id="starttime" class="starttime"><p id="rangetext">-</p><input type="time" name="endtime" id="endtime" class="endtime"><div class="range_row" id="range_row"><select id="rangedropdown"></select></div><button class="remove_range_button"><i class="material-icons">clear</i></button>';

function resetRanges(daysToSet){
  var rangeholder = document.getElementById("range_holder");
  rangeholder.innerHTML = "";

  //setRanges(daysToSet);
}

function getRanges(){
  updateRangeCache();
  //setTimes();
  resetRanges();
}

function newRange(returnresult){
  var rangeholder = document.getElementById("range_holder");

  var appDiv = document.createElement("DIV");
  appDiv.setAttribute("class", "range")
  appDiv.innerHTML = rangehtml;

  var rangenum = appDiv.getElementsByClassName("rangenumber")[0];
  rangenum.innerHTML = rangeholder.childElementCount + 1;

  rangeholder.appendChild(appDiv);

  var removebutton = appDiv.getElementsByClassName("remove_range_button")[0];

  var elementToRemove = rangeholder.childElementCount - 1;

  removebutton.addEventListener("click", function(e) {
    //e.stopPropagation();
    removeRange(elementToRemove);
  });

  setRangeDropdowns();

  if(returnresult){
    return appDiv;
  }
}

function removeRange(toRemove){


  var rangeholder = document.getElementById("range_holder");

  console.log("removing element " + toRemove + " of " + rangeholder.childElementCount);

  rangeholder.removeChild(rangeholder.children[toRemove]);
  //rangeholder.removeChild(rangeholder.childNodes[toRemove]);


  var ranges = rangeholder.getElementsByClassName("rangenumber");

  for (var i = toRemove; i<ranges.length; i++){
    ranges[i].innerHTML = i+1;
  }
}

function checkTimes(){
  updateRangeCache();

}

function updateRangeCache(){
  rangeCache = document.getElementsByClassName("range");
}

function setRanges(daysToSet, oldSelect) {
  //get days, show alerts

  console.log("setRanges, daysToSet = " + daysToSet);
  console.log("setRanges, oldSelect = " + oldSelect);

  var rangeArray;
  var dropdown = document.getElementsByClassName("time_picker_dropdown")[0];
  var dropdownTitle = dropdown.getElementsByClassName("select-selected")[0];


  if(daysToSet>-1){

    rangeArray = getTimesByDay(daysToSet);

  }else if (daysToSet==-3){

    if(arraysIdentical(times[0],times[1])&&arraysIdentical(times[0],times[2])&&arraysIdentical(times[0],times[3])&&arraysIdentical(times[0],times[4])&&arraysIdentical(times[0],times[5])&&arraysIdentical(times[0],times[6])){//all the same
      rangeArray = getTimesByDay(daysToSet);
    }else {
      if(confirm("This will overwrite all days with Monday's schedule. Proceed?")){
        rangeArray = getTimesByDay(daysToSet);
      }else {
        rangeArray = getTimesByDay(oldSelect);
        dropdown.selectedIndex = oldSelect;
        dropdownTitle.innerHTML = dropdown.options[oldSelect].innerHTML;
      }
    }

  }else if(daysToSet==-2) {


    if(arraysIdentical(times[0],times[1])&&arraysIdentical(times[0],times[2])&&arraysIdentical(times[0],times[3])&&arraysIdentical(times[0],times[4])){//all the same
      rangeArray = getTimesByDay(daysToSet);
    }else {
      if(confirm("This will overwrite all weekdays with Monday's schedule. Proceed?")){
        rangeArray = getTimesByDay(daysToSet);
      }else {
        rangeArray = getTimesByDay(oldSelect);
        dropdown.selectedIndex = oldSelect;
        dropdownTitle.innerHTML = dropdown.options[oldSelect].innerHTML;
      }
    }

  }else{
    if(arraysIdentical(times[5],times[6])){//all the same
      rangeArray = getTimesByDay(daysToSet);
    }else {
      if(confirm("This will overwrite all weekend days with Saturday's schedule. Proceed?")){
        rangeArray = getTimesByDay(daysToSet);
      }else {
        rangeArray = getTimesByDay(oldSelect);
        dropdown.selectedIndex = oldSelect;
        dropdownTitle.innerHTML = dropdown.options[oldSelect].innerHTML;
      }
    }
  }


  for(var i = 0; i<rangeArray.length; i++){
    var appDiv = newRange(true);

    console.log("i: " + i);
    console.log('rangeArray:');
    console.log(rangeArray);
    //console.log("appDiv: " + appDiv.innerHTML);

    var selElmnt = appDiv.getElementsByTagName("select")[0];
    var sel = appDiv.getElementsByClassName("select-selected")[0];
    //var startTime = appDiv.getElementsByClassName("starttime")[0].value;
    //var endTime = appDiv.getElementsByClassName("endtime")[0].value;

    appDiv.getElementsByClassName("starttime")[0].value = rangeArray[i][0];
    appDiv.getElementsByClassName("endtime")[0].value = rangeArray[i][1];


    var indextoselect = rangeArray[i][2]+3;
    console.log("selectedIndex should be " + indextoselect);
    selElmnt.selectedIndex = indextoselect.toString();
    console.log('selectedIndex is ' + selElmnt.selectedIndex);

    sel.innerHTML = preclasses[indextoselect];

    console.log("startTime: " + appDiv.getElementsByClassName("starttime")[0].value + ", endTime: " + appDiv.getElementsByClassName("endtime")[0].value + ", sel: " + sel.innerHTML + ", selElmnt: " + selElmnt.selectedIndex);

  }
  //setRangeDropdowns();


}

function arraysIdentical(a, b) {
    var i = a.length;
    if (i != b.length) return false;
    while (i--) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};
