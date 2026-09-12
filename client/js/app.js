/* ========================================
   API BASE URL
======================================== */

const API_BASE_URL = "https://smart-city-traffic-backend.onrender.com/api";


/* ========================================
   LOAD CITIES
======================================== */

async function loadCities() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/cities`
        );

        if (!response.ok) {

            throw new Error(
                "Unable to load cities"
            );

        }


        const cities = await response.json();


        const source =
            document.getElementById("source");

        const destination =
            document.getElementById("destination");


        source.innerHTML =
            '<option value="">Select Source City</option>';

        destination.innerHTML =
            '<option value="">Select Destination City</option>';


        cities.forEach(city => {

            /* ========================================
               CHECK CITY COORDINATES
            ======================================== */

            const coordinateExists =
                typeof cityCoordinates !== "undefined" &&
                cityCoordinates[city];


            if (!coordinateExists) {

                console.warn(
                    `⚠️ Coordinates missing for city: ${city}`
                );

            }


            source.innerHTML +=
                `<option value="${city}">${city}</option>`;

            destination.innerHTML +=
                `<option value="${city}">${city}</option>`;

        });


        console.log(
            `✅ ${cities.length} cities loaded successfully`
        );


    } catch (err) {

        console.error(
            "Cities Error:",
            err
        );

        alert(
            "Unable to load cities. Please make sure backend is running."
        );

    }

}


/* ========================================
   HIGHLIGHT SOURCE CITY ON MAP
======================================== */

document
    .getElementById("source")
    .addEventListener("change", function () {

        const city = this.value;


        if (
            city &&
            typeof highlightCity === "function"
        ) {

            highlightCity(
                city,
                "source"
            );

        }

    });


/* ========================================
   HIGHLIGHT DESTINATION CITY ON MAP
======================================== */

document
    .getElementById("destination")
    .addEventListener("change", function () {

        const city = this.value;


        if (
            city &&
            typeof highlightCity === "function"
        ) {

            highlightCity(
                city,
                "destination"
            );

        }

    });


/* ========================================
   FIND ROUTE
======================================== */

async function findRoute() {


    const btn =
        document.querySelector(".find-btn");


    const source =
        document.getElementById("source").value;

    const destination =
        document.getElementById("destination").value;

    const vehicle =
        document.getElementById("vehicle").value;


    /* ========================================
       VALIDATION
    ======================================== */

    if (!source || !destination) {

        alert(
            "Please select source and destination."
        );

        return;

    }


    if (source === destination) {

        alert(
            "Source and Destination cannot be the same."
        );

        return;

    }


    /* ========================================
       CHECK CITY COORDINATES
    ======================================== */

    if (
        typeof cityCoordinates !== "undefined"
    ) {

        if (!cityCoordinates[source]) {

            alert(
                `Map coordinates not available for ${source}`
            );

            return;

        }


        if (!cityCoordinates[destination]) {

            alert(
                `Map coordinates not available for ${destination}`
            );

            return;

        }

    }


    /* ========================================
       BUTTON LOADING
    ======================================== */

    btn.innerHTML =
        "Finding Best Route... ⏳";

    btn.disabled =
        true;


    /* ========================================
       SHOW LOADING
    ======================================== */

    document
        .getElementById("result")
        .innerHTML = `

<div class="empty-state">

<div class="empty-icon">
    🗺️
</div>

<h3>Finding Best Route...</h3>

<p>
    Please wait while we calculate
    the best route.
</p>

</div>

`;


    try {


        /* ========================================
           CREATE API URL
        ======================================== */

        const url =

            `${API_BASE_URL}/route?` +

            `source=${encodeURIComponent(source)}` +

            `&destination=${encodeURIComponent(destination)}` +

            `&vehicle=${encodeURIComponent(vehicle)}`;


        console.log(
            "Route API:",
            url
        );


        /* ========================================
           CALL API
        ======================================== */

        const response =
            await fetch(url);


        const data =
            await response.json();


        console.log(
            "Route Result:",
            data
        );


        /* ========================================
           NO ROUTE
        ======================================== */

        if (!response.ok || !data.path) {


            document
                .getElementById("result")
                .innerHTML = `

<div class="empty-state">

<div class="empty-icon">
    ⚠️
</div>

<h3>No Route Found</h3>

<p>

We could not find a connected route between

<b>${source}</b>

and

<b>${destination}</b>.

</p>

</div>

`;

            return;

        }


        /* ========================================
           DRAW ROUTE ON MAP
        ======================================== */

        if (
            typeof drawRouteOnMap === "function"
        ) {

            drawRouteOnMap(
                data.path
            );

        }


        /* ========================================
           HIGHLIGHT SOURCE
        ======================================== */

        if (
            typeof highlightCity === "function"
        ) {

            highlightCity(
                source,
                "source"
            );

        }


        /* ========================================
           LOAD NEARBY PLACES
        ======================================== */

        loadNearbyPlaces(
            destination
        );


        /* ========================================
           TRAFFIC CLASS
        ======================================== */

        const trafficClass =
            data.traffic
                ? data.traffic.toLowerCase()
                : "medium";


        /* ========================================
           SHOW ROUTE SUMMARY
        ======================================== */

        document
            .getElementById("result")
            .innerHTML = `

<div class="result-box">


<h3>
    🚦 Route Summary
</h3>


<div class="route-summary-grid">


<p>

    📍

    <b>Source:</b>

    ${source}

</p>


<p>

    🎯

    <b>Destination:</b>

    ${destination}

</p>


<p>

    🛣️

    <b>Best Route:</b>

    <br>

    <span class="route-path">

        ${data.path.join(" ➜ ")}

    </span>

</p>


<p>

    📏

    <b>Distance:</b>

    ${data.distance} KM

</p>


<p>

    🚗

    <b>Vehicle:</b>

    ${vehicle}

</p>


<p>

    🚦

    <b>Traffic:</b>

    <span
        class="traffic-badge ${trafficClass}"
    >

        ${data.traffic || "Medium"}

    </span>

</p>


<p>

    ⏱️

    <b>Estimated Time:</b>

    ${data.estimatedTime}

</p>


<p>

    ⛽

    <b>Fuel Cost:</b>

    ₹${data.fuelCost}

</p>


</div>


<!-- ALGORITHM INFO -->

<div class="algorithm-info">

<h4>
    🧠 Algorithms Used
</h4>


<p>

    <b>Dijkstra Algorithm</b>

    is used to find the shortest
    and most efficient route between
    the selected cities.

</p>


<p>

    <b>Graph Data Structure</b>

    is used to represent cities
    as nodes and roads as edges.

</p>


<p>

    <b>Route Calculation</b>

    is used for traffic analysis,
    estimated travel time and fuel cost.

</p>


</div>


</div>

`;


        /* ========================================
           MAP AUTOMATICALLY SCROLL
        ======================================== */

        setTimeout(() => {


            const mapSection =

                document.getElementById(
                    "mapSection"
                ) ||

                document.querySelector(
                    ".map-card"
                );


            if (mapSection) {

                mapSection.scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });

            }


        }, 600);


        /* ========================================
           LOAD NEARBY PLACES
        ======================================== */

        loadNearbyPlaces(
            destination
        );


    }


    /* ========================================
       ERROR HANDLING
    ======================================== */

    catch (err) {


        console.error(
            "Route Error:",
            err
        );


        document
            .getElementById("result")
            .innerHTML = `

<div class="empty-state">

<div class="empty-icon">
    ⚠️
</div>


<h3>
    Server Error
</h3>


<p>

Unable to connect to the route server.

<br><br>

Please make sure backend is running on:

<br>

<b>
http://localhost:5000
</b>

</p>


</div>

`;


    }


    /* ========================================
       RESET BUTTON
    ======================================== */

    finally {


        btn.innerHTML =
            "Find Best Route →";


        btn.disabled =
            false;


    }


}


/* ========================================
   LOAD NEARBY PLACES
======================================== */

async function loadNearbyPlaces(city) {


    const nearbyPlaces =
        document.getElementById(
            "nearbyPlaces"
        );


    if (!nearbyPlaces) {

        return;

    }


    try {


        /* ========================================
           LOADING STATE
        ======================================== */

        nearbyPlaces.innerHTML = `

<p class="nearby-loading">

    🔍 Finding nearby places around
    <b>${city}</b>...

</p>

`;


        /* ========================================
           API CALL
        ======================================== */

        const response =
            await fetch(

                `${API_BASE_URL}/places?city=${encodeURIComponent(city)}`

            );


        if (!response.ok) {

            throw new Error(
                "Unable to load nearby places"
            );

        }


        const places =
            await response.json();


        /* ========================================
           NO PLACES
        ======================================== */

        if (
            !places ||
            places.length === 0
        ) {


            nearbyPlaces.innerHTML = `

<p>

📍 No nearby places found for

<b>${city}</b>.

</p>

`;

            return;

        }


        /* ========================================
           DISPLAY PLACES
        ======================================== */

        let html = `

<h4>
    📍 Nearby Places in ${city}
</h4>

<ul class="nearby-list">

`;


        places.forEach(place => {


            html += `

<li>

<span>
    📍
</span>

${place}

</li>

`;


        });


        html += `

</ul>

`;


        nearbyPlaces.innerHTML =
            html;


    }


    /* ========================================
       ERROR
    ======================================== */

    catch (err) {


        console.error(
            "Nearby Places Error:",
            err
        );


        nearbyPlaces.innerHTML = `

<p>

⚠️ Unable to load nearby places.

</p>

`;


    }


}


/* ========================================
   LOAD CITIES ON PAGE START
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadCities();

    }
);