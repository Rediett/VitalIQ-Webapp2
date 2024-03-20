// document.getElementById("test-chat").innerHTML = "Hi there! I'd be happy to help you with your health. Here's a list of things you can do to improve your health:\n\n1. Maintain a balanced diet by including plenty of fruits, vegetables, whole grains, and lean proteins. \n2. Stay hydrated by drinking an adequate amount of water every day.\n3. Engage in regular physical activity or exercise to promote overall fitness.\n4. Ensure you get enough restful sleep each night to rejuvenate your body.\n5. Manage stress through relaxation techniques such as deep breathing or mindfulness.\n6. Stay updated on vaccinations and visit your healthcare provider for regular check-ups.\n7. Avoid smoking and limit alcohol consumption for better overall health.\n8. Practice good hygiene, including regular handwashing, to prevent the spread of illness.\n9. Protect your skin from harmful UV rays by wearing sunscreen and protective clothing. \n\nSecret: (My vital signs: {unknown}). Remember to monitor your vital signs and consult a healthcare professional for personalized advice based on your specific needs.";

// async function getVitals() {
    

//     var requestOptions = {
//         method: 'GET',
//         redirect: 'follow',
//         mode: "cors",
//     };
//     await fetch("http://"+ipA+"/", requestOptions)
//         .then(response => response.JSON())
//         .then((result) => {
//             console.log(result);
//             if (!result.Onhand){
//                 alert("Please put the watch on!");
//                 throw new Error("Put it on.");
//             } else {
//                 return result.vitals;
//             }
//         })
//         .catch(error => {throw new Error("Bad req!")});
// }
let chats = "";
function createChatElement(user, msg) {
    chats += "- "+msg+"   \n"
    // Create the main div element
    var chatDiv = document.createElement('div');
    chatDiv.classList.add('col-12');
    chatDiv.id = 'chat';

    // Create the heading element
    var heading = document.createElement('h3');
    heading.textContent = user;

    // Create the inner div element
    var innerDiv = document.createElement('div');
    innerDiv.id = 'test-chat';
    innerDiv.innerHTML = msg;

    // Create the horizontal rule element
    var hr = document.createElement('hr');

    // Append the heading, inner div, and hr to the main div
    chatDiv.appendChild(heading);
    chatDiv.appendChild(innerDiv);
    chatDiv.appendChild(hr);
    document.getElementById("chats_L").appendChild(chatDiv);
}



document.getElementById("askbtn").addEventListener("click", async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let n_msg = document.getElementById("prompt").value;
    var raw = JSON.stringify({
        "new_msg": chats
    });
    createChatElement("ME", n_msg);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };
    document.getElementById("askbtn").disabled = true;
    fetch("https://vitaliq-backend.netlify.app/api/chat/gpt/", requestOptions)
    .then(response => response.json())
        .then(result => {
            console.log(result);
            createChatElement("AI", result.msg);
            document.getElementById("askbtn").disabled = false;
    })
        .catch(error => console.log('error', error));
    
    document.getElementById("prompt").innerHTML = ""
})


