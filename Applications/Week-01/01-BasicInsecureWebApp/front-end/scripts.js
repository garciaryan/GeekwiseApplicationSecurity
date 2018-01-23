// server address
let _baseUrl = "http://localhost";
let _port = "3000";

function getposts() {
    let list = document.getElementById("post-list");
    list.innerHTML = "";
    jQuery.get(`${_baseUrl}:3000/api/post`, function(data) {
        data.data.forEach((post) => {
            var newElement = document.createElement("li");
            let edit = `<a href='#' data-postid='${post.id}' data-postname='${post.name}' data-postbody='${post.body}' onclick='editpost(event)'>edit</a>`;
            let del = `<a href='#' data-postid='${post.id}' onclick='delpost(event)'>delete</a>`;
            newElement.innerHTML = `${post.id} name: ${post.name} body: ${post.body} ${edit} | ${del}`;
            list.appendChild(newElement);
        });
    });
}

function addpost(e) {
    e.preventDefault();
    let name = $("#name");
    let body = $("#body");
    let postid = $("#postid");

    let nameVal = name.val();
    let bodyVal = body.val();

    if(nameVal == "" || bodyVal == "") {
        alert('name or body cannot be blank');
        return;
    }

    if (+postid.val() === 0) {
        jQuery.post(`${_baseUrl}:${_port}/api/post`, { name: nameVal, body: bodyVal }, function(data) {
            getposts();
        });
    } else {
        $.ajax({
                method: "PUT",
                url: `${_baseUrl}:${_port}/api/post/${postid.val()}`,
                data: { name: name.val(), body: body.val() }
            })
            .done(function(msg) {
                getposts();
            });
    }

    postid.val(0);
    $("#post-submit").val('Add post');
    body.val("");
    name.val("");
}

function editpost(e) {
    e.preventDefault();
    let el = $(e.srcElement);
    let name = $("#name");
    let body = $("#body");
    let id = $("#postid");

    let nameVal = el.data("postname");
    let bodyVal = el.data("postbody");
    let idVal = el.data("postid");

    $("#post-submit").val(`Edit post #${idVal}`);
    name.val(nameVal);
    body.val(bodyVal);
    id.val(idVal);
}

function delpost(e) {
    e.preventDefault();

    let el = $(e.srcElement);
    let postid = el.data("postid");
    if(confirm(`Are you sure you want to delete post #${postid}`)) {
        $.ajax({
                method: "DELETE",
                url: `${_baseUrl}:${_port}/api/post/${postid}`
            })
            .done(function(msg) {
                getposts();
            });
    }
}


// run getposts on
$(function() {
    // server is running from same IP as front-end so get the hostname
    _baseUrl = `http://${window.location.hostname}`;
    getposts();
    $("#add-post").on('submit', addpost);

});
