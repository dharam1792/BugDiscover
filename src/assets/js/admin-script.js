function js_sidedrawer_toggle() {
    var x = document.getElementById("body_drawer");
    if (x.className === "body") {
        x.className += " hide-sidedrawer";
    } else {
        x.className = "body";
    }
}

function js_sidedrawer_toggle_mob() {
    var x = document.getElementById("sidedrawer");
    if (x.className === "mui--no-user-select") {
        x.className += " responsive";
    } else {
        x.className = "mui--no-user-select";
    }

    window.onclick = function(event) {
        if (event.target == x) {
          if (x.className === "mui--no-user-select") {
            x.className -= "responsive";
        } else {
            x.className = "mui--no-user-select";
        }
    }
}

}


window.onload = function() {
    var tags = document.getElementsByClassName('sidemenu-list');
    for (var i = 0; i < tags.length; i++){
        var menu = tags[i];
        menu.onclick = function() {  
           if (menu.className === "sidemenu-list") {
              menu.className += " active";
          } else {
              menu.className = "sidemenu-list";
          }
      }
  }    
}



window.onload = function() {
    var topOffset = 80;
    height =  window.innerHeight;
    height = height - topOffset;
    if (height < 1) height = 1;
    if (height > topOffset) {
        document.getElementById("content-wrapper").style.minHeight = height+"px";

    }
}

function activateModal() {
    // initialize modal element
    var modalEl = document.createElement('div');
    modalEl.style.width = '400px';
    modalEl.style.height = '300px';
    modalEl.style.margin = '100px auto';
    modalEl.style.backgroundColor = '#fff';

    // show modal
    mui.overlay('on', modalEl);
}



function checkAll(ele) {
    var checkboxes = document.getElementsByTagName('input');
    if (ele.checked) {
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].type == 'checkbox') {
                checkboxes[i].checked = true;
            }
        }
    } else {
        for (var i = 0; i < checkboxes.length; i++) {
            console.log(i)
            if (checkboxes[i].type == 'checkbox') {
                checkboxes[i].checked = false;
            }
        }
    }
}
