ymaps.ready(function () {
    let _map = $('#map');
    if (_map.length > 0) {
        let latitude = $('#latitude').val(),
            longitude = $('#longitude').val(),
            myMap = Is2bMap.init('map', [55.76, 37.64], undefined, {zoom: 15});
        if (latitude !== '' && longitude !== '') {
            let coords = [latitude, longitude];
            let circle = new ymaps.Circle([coords, 750], {}, {draggable: false, fillColor: "#5C74A577"});
            myMap.map.geoObjects.add(circle);
            myMap.map.setCenter(coords, myMap.options.zoom);
        }
    }
});
