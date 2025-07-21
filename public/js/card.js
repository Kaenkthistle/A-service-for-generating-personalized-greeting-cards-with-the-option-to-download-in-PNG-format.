async function sendData(){
    const card = document.querySelector("#card");
    const xfio = document.querySelector("#fio");
    const xgender = document.querySelector("#gender");
    const xfeast = document.querySelector("#feast");
    const obj ={
        fio: xfio.innerText.slice(0, -1),
        gender: xgender.innerText,
        feast: xfeast?.innerText
    }
    try{
        await fetch("/download", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(obj)
        });
    } catch (error){
        console.error("Send error", error);
    }
    console.log("+");
    window.location.href="/download";
}
