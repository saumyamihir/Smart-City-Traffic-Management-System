const trafficMultiplier = {
Low: 1,
Medium: 1.3,
High: 1.6
};

const vehicleSpeed = {
Car: 60,
Bike: 45,
Bus: 40
};

/* =====================================
TRAFFIC DATA FOR ROADS
===================================== */

const routeTraffic = {

"Patna-Hajipur": "Low",

"Patna-Samastipur": "High",

"Hajipur-Muzaffarpur": "Medium",

"Samastipur-Muzaffarpur": "Low",

"Muzaffarpur-Motihari": "High"

};

/* =====================================
GET TRAFFIC BASED ON ROUTE PATH
===================================== */

function getTraffic(path) {

let highCount = 0;
let mediumCount = 0;
let lowCount = 0;


for (let i = 0; i < path.length - 1; i++) {

    const city1 = path[i];
    const city2 = path[i + 1];


    const directRoute =
        `${city1}-${city2}`;

    const reverseRoute =
        `${city2}-${city1}`;


    const traffic =
        routeTraffic[directRoute] ||
        routeTraffic[reverseRoute] ||
        "Medium";


    if (traffic === "High") {

        highCount++;

    }

    else if (traffic === "Medium") {

        mediumCount++;

    }

    else {

        lowCount++;

    }

}


/* RETURN OVERALL TRAFFIC */

if (highCount > mediumCount && highCount > lowCount) {

    return "High";

}

else if (mediumCount > highCount && mediumCount > lowCount) {

    return "Medium";

}

else if (lowCount > highCount && lowCount > mediumCount) {

    return "Low";

}


/* IF TRAFFIC COUNT IS TIED */

if (highCount > 0) {

    return "High";

}

else if (mediumCount > 0) {

    return "Medium";

}

return "Low";

}

/* =====================================
CALCULATE ROUTE
===================================== */

function calculateRoute(result, vehicle = "Car") {

/* GET DYNAMIC TRAFFIC */

const traffic =
    getTraffic(result.path);


const speed =
    vehicleSpeed[vehicle] || 60;


/* CALCULATE TIME BASED ON TRAFFIC */

const timeInHours =
    result.distance /
    (speed / trafficMultiplier[traffic]);


let estimatedTime;


if (timeInHours < 1) {

    estimatedTime =
        `${Math.round(timeInHours * 60)} Minutes`;

}

else {

    const hours =
        Math.floor(timeInHours);

    const minutes =
        Math.round(
            (timeInHours - hours) * 60
        );


    const hourText =
        hours === 1
            ? "Hour"
            : "Hours";


    if (minutes === 0) {

        estimatedTime =
            `${hours} ${hourText}`;

    }

    else {

        estimatedTime =
            `${hours} ${hourText} ${minutes} Min`;

    }

}


/* FUEL COST */

const fuelCost =
    (result.distance * 5).toFixed(0);


return {

    ...result,

    traffic,

    estimatedTime,

    fuelCost

};

}

module.exports =
calculateRoute;