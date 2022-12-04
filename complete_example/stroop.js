const FIXDUR = 10
const COLORS = ['red', 'blue', 'green', 'yellow']
const STRINGS= [
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
	let rt = Date.now() - event.data.startTime
    if (event.which in RESPS) {
        TRIAL += 1
        addData(
        	trial    = TRIAL,
            string   = event.data.string,
            color    = event.data.color,
            response = RESPS[event.which],
            rt       = rt
        )
        startTrial()
    }
}

function addData(trial, string, color, response, rt) {
	const trialCol    = `<td>${trial}</td>`
    const stringCol   = `<td>${string}</td>`
    const colorCol    = `<td>${color}</td>`
    const responseCol = `<td>${response}</td>`
    const rtCol       = `<td>${rt}</td>`
    const allCols = trialCol + stringCol + colorCol + responseCol + rtCol
	$('#results > table').append(`<tr>${allCols}</tr>`);
}

function hideOverlay(event) {
    if (event.which == 32) {
    	event.preventDefault()
        $("#overlay").css("display", "none")
        startTrial()
    }
}

// ADD EVENT LISTENERS
window.onload = (event) => {
    $(document).on("keypress", hideOverlay);
};
