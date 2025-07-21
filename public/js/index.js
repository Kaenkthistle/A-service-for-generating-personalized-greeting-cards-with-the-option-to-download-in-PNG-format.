document.addEventListener("DOMContentLoaded", () => {
    const autoForm = document.getElementById("autoForm");
    const feastChanger = autoForm.querySelector("#feastChanger");
    const genderChanger = autoForm.querySelector("#genderChanger");
    feastChanger.children[1].disabled = genderChanger.value === "male";
    genderChanger.children[0].disabled = feastChanger.value === "8m";
    feastChanger.children[2].disabled = genderChanger.value === "female";
    genderChanger.children[1].disabled = feastChanger.value === "23f";
    genderChanger.addEventListener("change", () => {
        feastChanger.children[1].disabled = genderChanger.value === "male";
        feastChanger.children[2].disabled = genderChanger.value === "female";
    });
    feastChanger.addEventListener("change", () => {
        genderChanger.children[0].disabled = feastChanger.value === "8m";
        genderChanger.children[1].disabled = feastChanger.value === "23f";
    });
});
window.addEventListener('pageshow', () => {
    document.getElementById('autoForm').reset();
});
    
