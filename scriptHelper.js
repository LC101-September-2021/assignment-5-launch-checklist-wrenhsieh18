// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   const target = document.getElementById("missionTarget");
   target.innerHTML = `
   <h2>Mission Destination</h2>
   <ol>
       <li>Name: ${name}</li>
       <li>Diameter: ${diameter}</li>
       <li>Star: ${star}</li>
       <li>Distance from Earth: ${distance}</li>
       <li>Number of Moons: ${moons}</li>
   </ol>
   <img src="${imageUrl}">`;
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if ( isNaN(Number(testInput)) || Number(testInput) < 0) {
        return "Not a Number";
    } else {
        return "Is a Number"
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    //const pilotNameInput = document.querySelector(`input[name = ${pilot}]`);
    //const copilotNameInput = document.querySelector(`input[name = ${copilot}]`);
    //const fuelLevelInput = document.querySelector(`input[name = ${fuelLevel}]`);
    //const cargoLevelInput = document.querySelector(`input[name = ${cargoLevel}]`);

    //const allUserInputs = [pilotNameInput, copilotNameInput, fuelLevelInput, cargoLevelInput];
    const allUserInputs = [pilot, copilot, fuelLevel, cargoLevel];
    const allInputsVerification = allUserInputs.map( (a) => validateInput(a) );
    const verificationCode = ["Not a Number", "Not a Number", "Is a Number", "Is a Number"];
    let errorMsg = "";

    const statusList = list;
    const launchStatus = document.getElementById("launchStatus");
    
    for (let verification of allInputsVerification) {
        if (verification === 'Empty') {
            errorMsg += "All fields are required!\n";
            break;
        }
    }

    for (let i = 0; i < verificationCode.length; i++) {
        if (allInputsVerification[i] !== verificationCode[i] && allInputsVerification[i] !== "Empty") {
            errorMsg += "Make sure to enter valid information for each field!";
            break;
        }
    }

    if (errorMsg === "") {
        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`;
        document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} is ready for launch`;
        if (Number(fuelLevel) < 10000 || Number(cargoLevel) > 10000) {
            launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
            launchStatus.style.color = "rgb(199, 37, 78)";
            statusList.style.visibility = "visible";
            if (Number(fuelLevel) < 10000) {
                document.getElementById("fuelStatus").innerHTML = `Fuel level too low for launch`;
            } else{
                document.getElementById("fuelStatus").innerHTML = `Fuel level high enough for launch`;
            }
            if (Number(cargoLevel) > 10000) {
                document.getElementById("cargoStatus").innerHTML = `Cargo mass too heavy for launch`;
            } else {
                document.getElementById("cargoStatus").innerHTML = `Cargo mass low enough for launch`;
            }
        } else {
            document.getElementById("fuelStatus").innerHTML = `Fuel level high enough for launch`;
            document.getElementById("cargoStatus").innerHTML = `Cargo mass low enough for launch`;
            launchStatus.innerHTML = `Shuttle is Ready for Launch`;
            launchStatus.style.color = "green";
        }
    } else {
        window.alert(errorMsg);
    }
}

async function myFetch() {
    let planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( (response) => {
        return response.json();
    })
    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random()*planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
