async function sendData(){
    const card = document.querySelector("#card");
    const coords = card.getBoundingClientRect();
    try{
        await fetch("/download", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(coords)
        });
    } catch (error){
        console.error("Send error", error);
    }
}


