var map = L.map('map').setView([10.869484, 106.803428], 21);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 21,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    autoClose: false,
}).addTo(map);

const markers = [
    { lat: 10.869484, lng: 106.803428, content: 'Slot 0' },
    { lat: 10.870641, lng: 106.803034, content: 'Slot 1' },
    { lat: 10.869722, lng: 106.802618, content: 'Slot 3' },
];

const markerList = [];

// Duyệt qua danh sách tọa độ và tạo marker với popup tại mỗi điểm
markers.forEach((coord) => {
    const marker = L.marker([coord.lat, coord.lng]).addTo(map);
    marker.bindPopup(coord.content);
    markerList.push(marker);
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
