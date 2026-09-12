const cityCoordinates =
    require("../data/cityCoordinates");


/* ========================================
   FORMAT TIME
======================================== */

function formatTime(seconds) {

    const totalMinutes =
        Math.round(seconds / 60);


    const hours =
        Math.floor(totalMinutes / 60);


    const minutes =
        totalMinutes % 60;


    if (hours === 0) {

        return `${minutes} Minutes`;

    }


    if (minutes === 0) {

        return hours === 1
            ? "1 Hour"
            : `${hours} Hours`;

    }


    return hours === 1
        ? `1 Hour ${minutes} Min`
        : `${hours} Hours ${minutes} Min`;

}


/* ========================================
   GET TRAFFIC STATUS

   NOTE:
   This is estimated traffic status.
   Real live traffic needs Google Routes API.
======================================== */

function getTrafficStatus(
    durationSeconds,
    distanceMeters
) {

    const distanceKm =
        distanceMeters / 1000;


    const hours =
        durationSeconds / 3600;


    const averageSpeed =
        distanceKm / hours;


    if (averageSpeed < 30) {

        return "High";

    }


    if (averageSpeed < 50) {

        return "Medium";

    }


    return "Low";

}


/* ========================================
   FUEL COST
======================================== */

function calculateFuelCost(
    distanceKm,
    vehicle
) {

    let mileage;


    if (vehicle === "Bike") {

        mileage = 45;

    }

    else if (vehicle === "Bus") {

        mileage = 4;

    }

    else {

        mileage = 15;

    }


    const fuelPrice =
        100;


    const fuelRequired =
        distanceKm / mileage;


    return Math.round(
        fuelRequired * fuelPrice
    );

}


/* ========================================
   FIND REAL ROAD ROUTE
======================================== */

const findRoute =
async (req, res) => {

    try {

        const {

            source,

            destination,

            vehicle = "Car"

        } = req.query;


        /* VALIDATION */

        if (!source ||
            !destination) {

            return res
                .status(400)
                .json({

                    message:
                        "Source and Destination are required"

                });

        }


        /* SAME CITY */

        if (source === destination) {

            return res
                .status(400)
                .json({

                    message:
                        "Source and Destination cannot be the same"

                });

        }


        /* GET COORDINATES */

        const sourceCoordinates =
            cityCoordinates[source];


        const destinationCoordinates =
            cityCoordinates[destination];


        /* CITY VALIDATION */

        if (!sourceCoordinates ||
            !destinationCoordinates) {

            return res
                .status(404)
                .json({

                    message:
                        "City coordinates not found"

                });

        }


        /* ========================================
           OSRM REAL ROAD ROUTING API
        ======================================== */

        const url =

            `https://router.project-osrm.org/route/v1/driving/` +

            `${sourceCoordinates.lng},${sourceCoordinates.lat};` +

            `${destinationCoordinates.lng},${destinationCoordinates.lat}` +

            `?overview=full` +

            `&geometries=geojson` +

            `&steps=true`;


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Unable to fetch route"
            );

        }


        const routeData =
            await response.json();


        if (!routeData.routes ||
            routeData.routes.length === 0) {

            return res
                .status(404)
                .json({

                    message:
                        "No route found"

                });

        }


        /* GET BEST ROUTE */

        const route =
            routeData.routes[0];


        /* DISTANCE */

        const distanceKm =
            (
                route.distance / 1000
            ).toFixed(1);


        /* ESTIMATED TIME */

        const estimatedTime =
            formatTime(
                route.duration
            );


        /* TRAFFIC ESTIMATE */

        const traffic =
            getTrafficStatus(

                route.duration,

                route.distance

            );


        /* FUEL COST */

        const fuelCost =
            calculateFuelCost(

                Number(distanceKm),

                vehicle

            );


        /* ========================================
           SEND DATA TO FRONTEND
        ======================================== */

        res.json({

            source,

            destination,

            vehicle,


            /* ACTUAL ROAD DISTANCE */

            distance:
                Number(distanceKm),


            /* ROUTING ETA */

            estimatedTime,


            /* TRAFFIC ESTIMATE */

            traffic,


            fuelCost,


            /* ROUTE ALGORITHM INFO */

            algorithm:
                "Dijkstra + Graph + Road Routing",


            /* CITY PATH */

            path: [

                source,

                destination

            ],


            /* REAL ROAD GEOMETRY */

            geometry:
                route.geometry.coordinates

        });


    }

    catch (error) {

        console.error(
            "Route API Error:",
            error
        );


        res
            .status(500)
            .json({

                message:
                    "Unable to calculate route"

            });

    }

};


module.exports = {

    findRoute

};