//Create and display basic globe
var viewerDiv = document.getElementById('viewerDiv');
var placement = {
    coord: new itowns.Coordinates('EPSG:4326', 2.35, 48.8),
    range: 25e2
};
var view = new itowns.GlobeView(viewerDiv, placement);

//Add texture of ortho pictures
var orthoSource = new itowns.WMTSSource({
    url: 'http://wxs.ign.fr/3ht7xcw6f7nciopo16etuqp2/geoportail/wmts',
    crs: 'EPSG:3857',
    name: 'ORTHOIMAGERY.ORTHOPHOTOS',
    tileMatrixSet: 'PM',
    format: 'image/jpeg',
});

var orthoLayer = new itowns.ColorLayer('Ortho', {
    source: orthoSource,
});

view.addLayer(orthoLayer);

//Add elevation
var elevationSource = new itowns.WMTSSource({
    url: 'http://wxs.ign.fr/3ht7xcw6f7nciopo16etuqp2/geoportail/wmts',
    crs: 'EPSG:4326',
    name: 'ELEVATION.ELEVATIONGRIDCOVERAGE.SRTM3',
    tileMatrixSet: 'WGS84G',
    format: 'image/x-bil;bits=32',
    zoom: {min: 3, max: 10}
});

var elevationLayer = new itowns.ElevationLayer('MNT_WORLD', {
    source: elevationSource,
});

view.addLayer(elevationLayer);

window.addEventListener("keydown", function (event) {
    let cameraPosition = view.camera.position('EPSG:4978');
    let cameraTargetPosition = view.controls.getCameraTargetPosition();
    let vectorDirection = {x:cameraTargetPosition.x-cameraPosition.x, y:cameraTargetPosition.y-cameraPosition.y, z:cameraTargetPosition.z-cameraPosition.z};
    let vectorDirectionNorme = normalize(vectorDirection);
    switch (event.keyCode) {
        case 72:
            //left
            console.log("left");
            console.log(view.camera.position('EPSG:4978'));
            console.log(cameraTargetPosition);
            break;
        case 85:
            //up
            console.log("up");
            console.log(cameraPosition );
            console.log(cameraTargetPosition);
            console.log(vectorDirection);

            view.camera.position.set(cameraPosition.x)
            break;
        case 75:
            //right
            console.log("right");
            break;
        case 74:
            //down
            console.log("down");
            break;
        case 32:
            console.log("case spacebar")
            break;
        
    }
  });

  function normalize(vector) {
    let norm = Math.sqrt(vector.x**2+vector.y**2+vector.z**2);
    vector.x = vector.x/norm;
    vector.y = vector.y/norm;
    vector.z = vector.z/norm;
    return vector;
  }