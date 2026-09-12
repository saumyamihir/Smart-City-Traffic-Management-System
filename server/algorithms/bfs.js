function bfsPlaces(city, places) {

    // City data available hai
    if (places[city]) {

        return places[city];

    }

    // Agar city ke nearby places available nahi hain
    return [
        "City Center",
        "Government Hospital",
        "Main Railway Station",
        "SBI ATM",
        "Petrol Pump"
    ];

}

module.exports = bfsPlaces;