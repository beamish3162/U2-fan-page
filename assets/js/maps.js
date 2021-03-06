var map;
/*-------------------------------------------function allows us to create the markers and info windows on each marker will be calle don in next function---*/
function plotPointsOnMap(locations, centerPoints) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: centerPoints,
        zoom: 2,
    });
    locations.forEach(function(eachLocation) {
        const marker = new google.maps.Marker({
            position: {
                lat: parseFloat(eachLocation.lat),
                lng: parseFloat(eachLocation.lng),
            },
            map: map,
            title: eachLocation.name,
        });
        // content in info windows aswell as listeners added to know when to use them
        var contentString =
            "<h3>" +
            eachLocation.name +
            "</h3>" +
            "<br>" +
            "<p>" +
            "<b>" +
            eachLocation.city +
            "</b>" +
            " on the " +
            eachLocation.date +
            "</p>";
        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            disableAutoPan: true,
        });
        marker.addListener("click", function() {
            map.setZoom(5);
            map.setCenter(marker.getPosition());
        });
        marker.addListener("mouseover", function() {
            infowindow.open(map, marker);
        });
        marker.addListener("mouseout", function() {
            infowindow.close(map, marker);
        });
    });
}
/*-------------------------------------------function which creates map and calls on the other funcitons wit hthe parameters of the respective arrays in stadium.js---*/
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 39.0997,
            lng: -94.5786
        },
        zoom: 3,
    });
    // Plot US locations
    plotPointsOnMap(usStadiums, centerOfUS);
    ShowPointsTable(usStadiums);
    document.getElementById("US-drop").onclick = function() {
        plotPointsOnMap(usStadiums, centerOfUS);
        ShowPointsTable(usStadiums);
    };
    // Plot EU locations
    document.getElementById("EU-drop").onclick = function() {
        plotPointsOnMap(euStadiums, centerOfEU);
        ShowPointsTable(euStadiums);
    };
    // Plot rest of world locations
    document.getElementById("RW-drop").onclick = function() {
        plotPointsOnMap(rwStadiums, centerOfRW);
        ShowPointsTable(rwStadiums);
    };
}
/*-------------------------------------------function which brings up table of content below map for the three different legs---*/
function ShowPointsTable(locations) {
    var tableRows = "";
    var tableHeaders = "";
    tableHeaders = tableHeaders + (`
            <span>
               Stadium
            </span> 
            <span>
               City
            </span> 
            <span>
               Date
            </span> 
     `);
    locations.forEach((eachLocation) => {
        tableRows += (`
            <span>
               ${eachLocation.name}
            </span>
            <span>
               ${eachLocation.city}
            </span>
            <span>
               ${eachLocation.date}
            </span>
        `);
    });
    document.getElementById("table").innerHTML =
        "<h1 class='table-headers'>Tour Info</h1>" +
        "<div class='table-style'>" +
        tableHeaders +
        "</div>" +
        "<div class='table-style'>" +
        tableRows +
        "</div>" +
        "<button onclick='NewTab()' class='tour-links' >Click for ticket master link for tour!</button>";
}
/*-------------------------------------------function to create new tab for button link---*/
function NewTab() {
    window.open("https://www.ticketmaster.ie/u2-tickets/artist/736365", "_blank");
}