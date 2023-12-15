// Add marker to map
const loadMap = (slotList) => {
    // Init map
    var map = L.map('map').setView(JSON.parse(slotList[0].coord), 21);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 21,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        autoClose: false,
    }).addTo(map);

    const markerList = [];

    slotList.forEach((slot) => {
        if (slot.isBlank) {
            const coord = JSON.parse(slot.coord);
            const marker = L.marker(coord).addTo(map);
            marker.bindPopup(`Slot ${slot.slotNumber}`);
            markerList.push(marker);
        }
    });

    // function onLocationFound(e) {
    //     var radius = e.accuracy;

    //     L.marker(e.latlng)
    //         .addTo(map)
    //         .bindPopup('You are within ' + radius + ' meters from this point')
    //         .openPopup();

    //     L.circle(e.latlng, radius).addTo(map);
    // }

    // map.on('locationfound', onLocationFound);

    // map.locate({ setView: true, maxZoom: 16 });
};
