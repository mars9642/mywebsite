const API_URL = "https://mars86.dev/counterapi";

function ordinalSuffix(n) {
    const lastTwo = n % 100;
    const lastOne = n % 10;

    if (lastTwo >= 11 && lastTwo <= 13) {
        return n + "th";
    }
    if (lastOne === 1) return n + "st";
    if (lastOne === 2) return n + "nd";
    if (lastOne === 3) return n + "rd";
    return n + "th";
}

async function incrementCount() {
    const response = await fetch(API_URL + "/count", { method: "POST" });
    const data = await response.json();
    document.getElementById("visitor-counter").textContent = ordinalSuffix(data.count);
}

incrementCount();