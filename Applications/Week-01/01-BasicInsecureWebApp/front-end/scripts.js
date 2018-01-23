// server address
let _baseUrl = "http://localhost";
let _port = "3000";

function getCars() {
    let list = document.getElementById("car-list");
    list.innerHTML = "";
    clearEdit();

    jQuery.get(`${_baseUrl}:${_port}/api/car`, function(data) {
        data.data.forEach((car) => {
            var newElement = document.createElement("li");
            let edit = `<a href='#' data-carid='${car.id}' data-carmake='${car.make}' data-carmodel='${car.model}' onclick='editCar(event)'>edit</a>`;
            let del = `<a href='#' data-carid='${car.id}' onclick='delCar(event)'>delete</a>`;
            newElement.innerHTML = `${car.id} Make: ${car.make} Model: ${car.model} ${edit} | ${del}`;
            list.appendChild(newElement);
        });
    });
}

function searchCars(e) {
    e.preventDefault();
    console.log('search')
    let list = document.getElementById("car-list");
    list.innerHTML = "";
    let searchVal = $('#search').val();
    console.log(searchVal)
    clearEdit();

    jQuery.post(`${_baseUrl}:${_port}/api/car/search`, { search: searchVal }, function(data) {
        data.data.forEach((car) => {
            var newElement = document.createElement("li");
            let edit = `<a href='#' data-carid='${car.id}' data-carmake='${car.make}' data-carmodel='${car.model}' onclick='editCar(event)'>edit</a>`;
            let del = `<a href='#' data-carid='${car.id}' onclick='delCar(event)'>delete</a>`;
            newElement.innerHTML = `${car.id} Make: ${car.make} Model: ${car.model} ${edit} | ${del}`;
            list.appendChild(newElement);
        });
    });
}

function addCar(e) {
    e.preventDefault();
    let make = $("#make");
    let model = $("#model");
    let carid = $("#carid");

    let makeVal = make.val();
    let modelVal = model.val();

    if (makeVal == "" || modelVal == "") {
        alert('Make and Model cannot be blank');
        return;
    }

    if (+carid.val() === 0) {
        jQuery.post(`${_baseUrl}:${_port}/api/car`, { make: makeVal, model: modelVal }, function(data) {
            getCars();
        });
    } else {
        $.ajax({
                method: "PUT",
                url: `${_baseUrl}:${_port}/api/car/${carid.val()}`,
                data: { make: make.val(), model: model.val() }
            })
            .done(function(msg) {
                getCars();
            });
    }
}

function editCar(e) {
    e.preventDefault();
    let el = $(e.srcElement);
    let make = $("#make");
    let model = $("#model");
    let id = $("#carid");


    let makeVal = el.data("carmake");
    let modelVal = el.data("carmodel");
    let idVal = el.data("carid");

    id.val(idVal);
    $("#car-submit").val('Edit Car');
    model.val(modelVal);
    make.val(makeVal);
}

function delCar(e) {
    e.preventDefault();

    let el = $(e.srcElement);
    let carid = el.data("carid");
    if (confirm(`Are you sure you want to delete car #${carid}`)) {
        $.ajax({
                method: "DELETE",
                url: `${_baseUrl}:${_port}/api/car/${carid}`
            })
            .done(function(msg) {
                getCars();
            });
    }
}

function clearEdit() {
    let make = $("#make");
    let model = $("#model");
    let carid = $("#carid");
    carid.val(0);
    $("#car-submit").val('Add Car');
    model.val("");
    make.val("");
}


// run getCars on 
$(function() {
    // server is running from same IP as front-end so get the hostname
    _baseUrl = `http://${window.location.hostname}`;
    getCars();
    $("#add-car").on('submit', addCar);
    $("#search-car").on('submit', searchCars);
    $("#car-showall").on('click', getCars);
});