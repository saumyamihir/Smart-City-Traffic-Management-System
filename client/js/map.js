/* =====================================
   INITIALIZE MAP
===================================== */

let map = L.map("map", {
    zoomControl: true
}).setView([25.5, 82.5], 5);


/* =====================================
   SATELLITE MAP - ESRI
===================================== */

const satelliteLayer = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
        attribution: "Tiles © Esri"
    }
);


/* =====================================
   CITY + ROAD LABELS
===================================== */

const labelLayer = L.tileLayer(
    "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
    {
        attribution: "Labels © Esri"
    }
);


/* =====================================
   NORMAL MAP
===================================== */

const normalMap = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "© OpenStreetMap contributors"
    }
);


/* =====================================
   ADD DEFAULT MAP LAYERS
===================================== */

satelliteLayer.addTo(map);
labelLayer.addTo(map);


/* =====================================
   MAP LAYER CONTROL
===================================== */

L.control.layers(
    {
        "🛰 Satellite": satelliteLayer,
        "🗺 Normal Map": normalMap
    },
    {
        "📍 City Labels": labelLayer
    },
    {
        position: "topright"
    }
).addTo(map);


/* =====================================
   CITY COORDINATES
===================================== */

const cityCoordinates = {

    /* ============== BIHAR ============== */

    Patna: [25.5941, 85.1376],

    Hajipur: [25.6850, 85.2090],

    Muzaffarpur: [26.1225, 85.3906],

    Samastipur: [25.8620, 85.7795],

    Motihari: [26.6486, 84.9089],

    "Bihar Sharif": [25.1974, 85.5239],

    Gaya: [24.7914, 85.0002],

    Ara: [25.5560, 84.6630],

    Buxar: [25.5647, 83.9777],

    Begusarai: [25.4182, 86.1272],

    Darbhanga: [26.1542, 85.8918],

    Madhubani: [26.3537, 86.0715],

    Sitamarhi: [26.5954, 85.4800],

    Bettiah: [26.8028, 84.5020],

    Bhagalpur: [25.2425, 86.9842],

    Purnia: [25.7771, 87.4753],


    /* =========== UTTAR PRADESH =========== */

    Varanasi: [25.3176, 82.9739],

    Prayagraj: [25.4358, 81.8463],

    Lucknow: [26.8467, 80.9462],

    Kanpur: [26.4499, 80.3319],

    Agra: [27.1767, 78.0081],

    Noida: [28.5355, 77.3910],


    /* ============== JHARKHAND ============== */

    Ranchi: [23.3441, 85.3096],

    Bokaro: [23.6693, 86.1511],

    Dhanbad: [23.7957, 86.4304],

    Jamshedpur: [22.8046, 86.2029],


    /* =========== WEST BENGAL =========== */

    Kolkata: [22.5726, 88.3639],

    Asansol: [23.6739, 86.9524],

    Siliguri: [26.7271, 88.3953],


    /* =========== DELHI + HARYANA =========== */

    Delhi: [28.6139, 77.2090],

    Gurugram: [28.4595, 77.0266],

    Faridabad: [28.4089, 77.3178],


    /* ============== PUNJAB ============== */

    Chandigarh: [30.7333, 76.7794],

    Ludhiana: [30.9010, 75.8573],

    Amritsar: [31.6340, 74.8723]

};


/* =====================================
   VARIABLES
===================================== */

let routeLine = null;

let cityMarkers = {};

let selectedSource = null;

let selectedDestination = null;


/* =====================================
   STORE REAL ROUTE DATA
===================================== */

window.realRouteData = {
    distance: null,
    estimatedTime: null
};


/* =====================================
   DEFAULT MARKER ICON
===================================== */

const defaultIcon = L.divIcon({

    className: "custom-map-marker",

    html: `
        <div style="
            width:30px;
            height:30px;
            background:#2563eb;
            border:3px solid white;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            box-shadow:0 4px 12px rgba(0,0,0,0.4);
        ">
            📍
        </div>
    `,

    iconSize: [30, 30],

    iconAnchor: [15, 15]

});


/* =====================================
   SOURCE MARKER ICON
===================================== */

const sourceIcon = L.divIcon({

    className: "custom-map-marker source-marker",

    html: `
        <div style="
            width:42px;
            height:42px;
            background:#22c55e;
            border:4px solid white;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:20px;
            box-shadow:0 5px 15px rgba(0,0,0,0.45);
        ">
            📍
        </div>
    `,

    iconSize: [42, 42],

    iconAnchor: [21, 21]

});


/* =====================================
   DESTINATION MARKER ICON
===================================== */

const destinationIcon = L.divIcon({

    className: "custom-map-marker destination-marker",

    html: `
        <div style="
            width:42px;
            height:42px;
            background:#ef4444;
            border:4px solid white;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:20px;
            box-shadow:0 5px 15px rgba(0,0,0,0.45);
        ">
            🎯
        </div>
    `,

    iconSize: [42, 42],

    iconAnchor: [21, 21]

});


/* =====================================
   ADD CITY MARKERS
===================================== */

Object.keys(cityCoordinates).forEach(city => {

    const marker = L.marker(
        cityCoordinates[city],
        {
            icon: defaultIcon
        }
    )
    .addTo(map)
    .bindPopup(`

        <div style="text-align:center;">

            <b style="font-size:16px;">
                📍 ${city}
            </b>

            <br>

            <span style="color:#64748b;">
                Smart City Location
            </span>

        </div>

    `);

    cityMarkers[city] = marker;

});


/* =====================================
   RESET MARKERS
===================================== */

function resetMarkers() {

    Object.keys(cityMarkers).forEach(city => {

        cityMarkers[city].setIcon(
            defaultIcon
        );

    });

}


/* =====================================
   HIGHLIGHT SELECTED CITY
===================================== */

function highlightCity(city, type = "source") {

    if (!cityCoordinates[city]) {

        console.warn(
            "City coordinates not found:",
            city
        );

        return;

    }


    const coordinates =
        cityCoordinates[city];


    /* RESET PREVIOUS MARKER */

    if (type === "source" &&
        selectedSource &&
        selectedSource !== city
    ) {

        cityMarkers[selectedSource]
            .setIcon(defaultIcon);

    }


    if (type === "destination" &&
        selectedDestination &&
        selectedDestination !== city
    ) {

        cityMarkers[selectedDestination]
            .setIcon(defaultIcon);

    }


    /* SOURCE */

    if (type === "source") {

        selectedSource = city;

        cityMarkers[city].setIcon(
            sourceIcon
        );

    }


    /* DESTINATION */

    else {

        selectedDestination = city;

        cityMarkers[city].setIcon(
            destinationIcon
        );

    }


    /* ZOOM TO CITY */

    map.flyTo(
        coordinates,
        11,
        {
            duration: 1.5
        }
    );


    /* OPEN POPUP */

    if (cityMarkers[city]) {

        cityMarkers[city]
            .openPopup();

    }

}


/* =====================================
   FORMAT TIME
===================================== */

function formatRouteTime(seconds) {

    const totalMinutes =
        Math.round(seconds / 60);


    if (totalMinutes < 60) {

        return `${totalMinutes} Minutes`;

    }


    const hours =
        Math.floor(totalMinutes / 60);


    const minutes =
        totalMinutes % 60;


    if (minutes === 0) {

        return `${hours} Hour${
            hours > 1 ? "s" : ""
        }`;

    }


    return `${hours} Hour${
        hours > 1 ? "s" : ""
    } ${minutes} Min`;

}


/* =====================================
   DRAW REAL ROAD ROUTE
===================================== */

async function drawRouteOnMap(path) {

    if (!path || path.length < 2) {

        return;

    }


    /* REMOVE OLD ROUTE */

    clearRoute();


    /* GET COORDINATES */

    const coordinates = path
        .map(city => cityCoordinates[city])
        .filter(Boolean);


    if (coordinates.length < 2) {

        console.warn(
            "Not enough coordinates to draw route"
        );

        return;

    }


    /* SOURCE + DESTINATION */

    const sourceCity =
        path[0];

    const destinationCity =
        path[path.length - 1];


    /* UPDATE MARKERS */

    resetMarkers();


    if (cityMarkers[sourceCity]) {

        cityMarkers[sourceCity]
            .setIcon(sourceIcon);

    }


    if (cityMarkers[destinationCity]) {

        cityMarkers[destinationCity]
            .setIcon(destinationIcon);

    }


    try {

        /*
        =====================================
        CREATE OSRM WAYPOINTS

        OSRM FORMAT:
        longitude,latitude
        =====================================
        */

        const waypoints =
            coordinates
            .map(coord =>
                `${coord[1]},${coord[0]}`
            )
            .join(";");


        /*
        =====================================
        OSRM REAL ROAD ROUTING API
        =====================================
        */

        const url =
            `https://router.project-osrm.org/route/v1/driving/${waypoints}?overview=full&geometries=geojson`;


        const response =
            await fetch(url);


        const data =
            await response.json();


        /*
        =====================================
        CHECK ROUTE
        =====================================
        */

        if (
            !data.routes ||
            data.routes.length === 0
        ) {

            throw new Error(
                "Real route not found"
            );

        }


        const route =
            data.routes[0];


        /*
        =====================================
        CONVERT COORDINATES

        OSRM:
        [longitude, latitude]

        LEAFLET:
        [latitude, longitude]
        =====================================
        */

        const realCoordinates =
            route.geometry.coordinates
            .map(coord => [
                coord[1],
                coord[0]
            ]);


        /*
        =====================================
        DRAW REAL ROAD ROUTE
        =====================================
        */

        routeLine = L.polyline(

            realCoordinates,

            {

                color: "#2563eb",

                weight: 7,

                opacity: 0.95,

                lineJoin: "round",

                lineCap: "round"

            }

        ).addTo(map);


        /*
        =====================================
        REAL DISTANCE
        =====================================
        */

        const distanceKM =
            (
                route.distance / 1000
            ).toFixed(1);


        /*
        =====================================
        REAL TIME
        =====================================
        */

        const estimatedTime =
            formatRouteTime(
                route.duration
            );


        /*
        =====================================
        SAVE ROUTE DATA
        =====================================
        */

        window.realRouteData = {

            distance:
                distanceKM,

            estimatedTime:
                estimatedTime

        };


        console.log(
            "Real Route Distance:",
            distanceKM,
            "KM"
        );


        console.log(
            "Real Route Time:",
            estimatedTime
        );


        /*
        =====================================
        FIT MAP TO ROUTE
        =====================================
        */

        map.fitBounds(

            routeLine.getBounds(),

            {

                padding: [70, 70],

                maxZoom: 11

            }

        );


    }

    catch (error) {

        console.error(
            "Real Routing Error:",
            error
        );


        /*
        =====================================
        FALLBACK ROUTE

        If API fails,
        show city-to-city route
        =====================================
        */

        routeLine = L.polyline(

            coordinates,

            {

                color: "#2563eb",

                weight: 7,

                opacity: 0.95,

                lineJoin: "round",

                lineCap: "round",

                dashArray: "10, 10"

            }

        ).addTo(map);


        map.fitBounds(

            routeLine.getBounds(),

            {

                padding: [70, 70],

                maxZoom: 11

            }

        );

    }


    /*
    =====================================
    SCROLL TO MAP
    =====================================
    */

    setTimeout(() => {

        const mapSection =
            document.querySelector(
                ".map-card"
            );


        if (mapSection) {

            mapSection.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

        }

    }, 500);

}


/* =====================================
   CLEAR ROUTE
===================================== */

function clearRoute() {

    if (routeLine) {

        map.removeLayer(
            routeLine
        );

        routeLine = null;

    }

}