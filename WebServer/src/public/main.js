// Init map
var map = L.map('map').setView([10.869484, 106.803428], 21);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 21,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    autoClose: false,
}).addTo(map);

// Add marker to map
const loadMap = (slotList) => {
    const markerList = [];

    slotList.forEach((slot) => {
        if (slot.isBlank) {
            coord = JSON.parse(slot.coord);
            const marker = L.marker(coord).addTo(map);
            marker.bindPopup(`Slot ${slot.slotNumber}`);
            markerList.push(marker);
        }
    });

    function onLocationFound(e) {
        var radius = e.accuracy;

        L.marker(e.latlng)
            .addTo(map)
            .bindPopup('You are within ' + radius + ' meters from this point')
            .openPopup();

        L.circle(e.latlng, radius).addTo(map);
    }

    map.on('locationfound', onLocationFound);

    map.locate({ setView: true, maxZoom: 16 });
};
