// Write your JavaScript code here!
window.addEventListener("load", function() {
    const form = document.querySelector("form");


    
    form.addEventListener("submit", (event) => {
        const statusList = document.getElementById("faultyItems");
        const fuelLevel = Number(document.querySelector("input[name = fuelLevel]").value);
        const cargoLevel = Number(document.querySelector("input[name = cargoMass]").value);
        formSubmission(document, statusList, "pilotName", "copilotName", fuelLevel, cargoLevel);
        console.log(statusList.style.visibility);
        event.preventDefault();
    })

    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let planetPicked = pickPlanet(listedPlanets);
        console.log(planetPicked);
        addDestinationInfo(document, planetPicked.name, planetPicked.diameter, planetPicked.star, planetPicked.distance, planetPicked.moons, planetPicked.image)
    })

   
});