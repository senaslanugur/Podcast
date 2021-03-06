
function get_popular(){
  var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                myArr = JSON.parse(myArr.contents)
                // console.log(myArr)
                var popular_div = document.getElementById("content")

                for(var i = 0; i<myArr.length;i++){
                  popular_div.innerHTML += '<div><img  style="border-radius: 40%;" onclick=go_listen(this) id ="https://www.podcastrepublic.net/podcast/'+myArr[i].pId+'+'+myArr[i].imageHD+'+'+myArr[i].title+'" class="item" src="'+myArr[i].imageHD+'"/><h5 class="fw-bolder">'+myArr[i].title+'</h5> by '+myArr[i].publisher+'</div>'

                }

            }
        };

        xmlhttp.open('GET', document.location.protocol + '//api.allorigins.win/get?url='+escape("https://www.podcastrepublic.net/api/popular", true));
        xmlhttp.send();
}


const gap = 200;
const carousel = document.getElementById("carousel"),
  content = document.getElementById("content"),
  next = document.getElementById("next"),
  prev = document.getElementById("prev");

next.addEventListener("click", e => {
  carousel.scrollBy(width + gap, 0);
  if (carousel.scrollWidth !== 0) {
    prev.style.display = "flex";
  }
  if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "none";
  }
});
prev.addEventListener("click", e => {
  carousel.scrollBy(-(width + gap), 0);
  if (carousel.scrollLeft - width - gap <= 0) {
    prev.style.display = "none";
  }
  if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "flex";
  }
});

let width = carousel.offsetWidth;
window.addEventListener("resize", e => (width = carousel.offsetWidth));

var exp = new Date();

exp.setTime(exp.getTime() + 3 * 24 * 60 * 60 * 1000);

document.cookie="region=" + "tr" + ";expires=" + exp.toGMTString() + ";path=/"+";domain=www.podcastrepublic.net";

function get_data(){

  var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                // console.log(myArr.contents)
                var el = document.createElement( 'html' );
                el.innerHTML = myArr.contents;
                var span  = el.getElementsByClassName("thumbnail") // Live NodeList of your anchor element
                var caption  = el.getElementsByClassName("caption")
                var urls = el.getElementsByTagName("a")
                var htr = document.getElementById("interface")
                for(var i=12;i<span.length;i++){
                  // for backup index
                  // htr.innerHTML += '<a href="./category_result.html" style=" text-decoration: none; color:black;" <div class="row gx-lg-5" id="https://www.podcastrepublic.net'+urls[i+13].getAttribute("href")+'" onclick="category_result(this)"> <div class="col-lg-6 col-xxl-4 mb-5" ><div class="card bg-light border-0 h-100" ><div class="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0" >'+
                  //                   '<div class="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4">'+ span[i].innerHTML+'</div><h2 class="fs-4 fw-bold">'+caption[i].innerHTML+'</h2>'+
                  //                   '<p class="mb-0"></p></div></div></div></a>'
                  htr.innerHTML += '<a href="./category_result.html" style=" text-decoration: none; color:black;"> <div class="col mb-5" id="https://www.podcastrepublic.net'+urls[i+13].getAttribute("href")+'" onclick="category_result(this)"> <div class="card h-100" style="box-shadow:  #92B4EC -5px 5px">'+
                                  '<div class="card-body p-4"><div class="text-center"><br><div class="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4">'+span[i].innerHTML+'</div>'+
                                  '<h5 class="fw-bolder">'+caption[i].getElementsByTagName("h4")[0].innerHTML+'</h5></div></div></div></div>'
                                  // console.log(caption[i].getElementsByTagName("h4")[0].innerHTML)
                }

            }
        };

        xmlhttp.open('GET', document.location.protocol + '//api.allorigins.win/get?url='+escape("https://www.podcastrepublic.net", true));
        xmlhttp.send();
}
get_popular()
get_data()

function go_listen(d){

  var podcasts = d.id
  var url = podcasts.split("+")[0]
  var image = podcasts.split("+")[1]
  var title = podcasts.split("+")[2]

  var obj = []
  var item = {}
  item["url"] = url
  item["image"] = image
  item["title"] = title
  obj.push(item)

  var db  = Object.entries(localStorage)
  var keys = []
  for(var i=0; i<db.length;i++){
    keys.push(db[i][0])
  }

  if(keys.includes("recently")){
    var db_recent = JSON.parse(localStorage.getItem("recently"))
    db_recent.push(obj)
    localStorage.setItem("recently",JSON.stringify(db_recent))
  }else{
    localStorage.setItem("recently",JSON.stringify(obj))
  }

  localStorage.setItem("podcasts",url)
  window.location.href= "./listen.html"
}
$("#searchgeneral").mouseup(function() {
    generalSearch = document.getElementById("generalSearch").value


    if(generalSearch === ""){
      alert("empty")
    }else{
      url = "https://www.podcastrepublic.net/search?title=" + generalSearch
      localStorage.setItem("url",url)
      location.href = "./search.html";
    }

});

function about(){
  Swal.fire({
    toast: true,
    title: 'Podcast',
    html:"You can give us your feedback <a href='mailto:senaslanugur@gmail.com'><b><u> here.</b></u></a> <br> <p>&copy;Copyright 2022. All Rights Reserved.<br> <b>USoft </b>by senaslanbilisim </p>",
    imageUrl: 'assets/podcast.png',
    imageAlt: 'Custom image',
  });
  }

  function recently_list(){
    var db  = Object.entries(localStorage)
    var keys = []
    for(var i=0; i<db.length;i++){
      keys.push(db[i][0])
    }

    if(keys.includes("recently")){
      console.log("var")
      // console.log(JSON.parse(localStorage.getItem("recently"))[0].url)
      var db_recent = JSON.parse(localStorage.getItem("recently"))
      var recently = document.getElementById("recently")
      var content2 = document.getElementById("content2")
      db_recent = db_recent.reverse()
      for(var i=0;i<db_recent.length-1;i++){
        content2.innerHTML += '<div><img  style="border-radius: 40%;" onclick=go_listen(this) id ="https://www.podcastrepublic.net/podcast/'+db_recent[i][0].url+'+'+db_recent[i][0].image+'+'+db_recent[i][0].title+'" class="item" src="'+db_recent[i][0].image+'"/><h5 class="fw-bolder">'+db_recent[i][0].title+'</h5></div>'
      }
      content2.innerHTML += '<div><img  style="border-radius: 40%;" onclick=go_listen(this) id ="https://www.podcastrepublic.net/podcast/'+db_recent[db_recent.length-1].url+'+'+db_recent[db_recent.length-1].image+'+'+db_recent[db_recent.length-1].title+'" class="item" src="'+db_recent[db_recent.length-1].image+'"/><h5 class="fw-bolder">'+db_recent[db_recent.length-1].title+'</h5></div>'

    }else{
      var recently = document.getElementById("recently")
      recently.style.display="none";
    }


  }

  recently_list()
