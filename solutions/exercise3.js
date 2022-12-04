// ! Make sure you have added the overlay element to your HTML document.

const FIXDUR = 10
const COLORS = ['red', 'blue', 'green', 'yellow']
const STRINGS = [
	"RED", "BLUE", "GREEN", "YELLOW", 
    "XXX", "XXXX", "XXXXX", "XXXXXX"
]
const RESPS = {
	37: "Y",
    38: "G",
    39: "R",
    40: "B"
}
let TRIAL = 0

function rand(a) {
	return a[Math.floor(Math.random() * a.length)]
}

function startTrial() {
	$("#stimulus").text("+")
    $("#stimulus").css("color", "black")
    setTimeout(showStimulus, FIXDUR)
}

function showStimulus() {
	const string = rand(STRINGS)
    const color = rand(COLORS)
    $("#stimulus").text(string)
    $("#stimulus").css("color", color)
    let params = {
    	string: string,
        color: color,
        startTime: Date.now(),
    }
    $(document).one("keydown", params, recordResponse);
}

function recordResponse(event) {
	event.preventDefault()
	const rt = Date.now() - event.data.startTime
    if (event.which in RESPS) {
        TRIAL += 1
        const trialCol    = `<td>${TRIAL}</td>`
        const stringCol   = `<td>${event.data.string}</td>`
        const colorCol    = `<td>${event.data.color}</td>`
        const responseCol = `<td>${RESPS[event.which]}</td>`
        const rtCol       = `<td>${rt}</td>`
        const allCols = trialCol + stringCol + colorCol + responseCol + rtCol
        $('#results > table').append(`<tr>${allCols}</tr>`);
        startTrial()
    }
}

function hideOverlay(event) {
    if (event.which == 32) {
    	event.preventDefault()
        $("#overlay").css("display", "none")
        startTrial()
    }
}

// ADD EVENT LISTENERS
$(window).on("load", function (event) {
    $(document).on("keypress", hideOverlay);
})