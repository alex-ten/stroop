// Define global variables that functions will have access to
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

// Function to draw random element from array
function rand(a) {
	return a[Math.floor(Math.random() * a.length)]
}

// startTrial displays fixation cross for FIXDUR amount of time; then shows stimulus
function startTrial() {
	$("#stimulus").text("+")
    $("#stimulus").css("color", "black")
    setTimeout(showStimulus, FIXDUR)
}

// showStimulus randomly generates a Stroop stimulus and assignes a keydown event listener
// to the document which records a response when fired
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

// recordResponse checks the down-pressed key and records a Stroop response if it's legal
// response features are added to the results table
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

// hideOverlay hides the overlay element (with instructions) and starts trial
function hideOverlay(event) {
    if (event.which == 32) {
    	event.preventDefault()
        $("#overlay").css("display", "none")
        startTrial()
    }
} 

// Assign a function that hide overlay (when spacebar is pressed) to the load event
function assignKeypress() {
	$(document).on("keypress", hideOverlay)
}



// When window loads, start listening to the keypress event on document
// If event fires, run hideOverlay function
$(window).on("load", assignKeypress)
