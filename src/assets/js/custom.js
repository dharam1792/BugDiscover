function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "menu-list") {
        x.className += " responsive";
    } else {
        x.className = "menu-list";
    }
}



window.onscroll = function () {
    var height = window.scrollY;
    if(height>1){
        var element = document.getElementById("header");
        element.classList.add("header-fixed");
    }
    else{
        var element = document.getElementById("header");
        element.classList.remove("header-fixed");

    }
}


function openMyModal(id){


    // Get the modal
    var modal = document.getElementById('myModal'+id);

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn"+id);

    // Get the <span> element that closes the modal
    var span = document.getElementById("modalClose"+id);

    // When the user clicks on the button, open the modal 

    modal.style.display = "block";

    /*btn.onclick = function() {
        modal.style.display = "block";
    }*/

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }


    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


}
