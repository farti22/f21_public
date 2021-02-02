window.addEventListener('load', function () {

    let butPage = document.getElementById("but_page");
    let butStyle = document.getElementById("but_style");
    butPage.addEventListener('click', function (){
      window.location.href = "https://www.google.com/";
    });
    butStyle.addEventListener('click', function(){
      document.body.style.backgroundColor = "gray";
    });
});
