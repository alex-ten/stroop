// Add these variables to the top of your JS code
// (just to keep variable declarations together)
const RESPS = {
	37: "Y",
    38: "G",
    39: "R",
    40: "B"
}
let TRIAL = 0

// Add this function to your JS tab
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

// Update your showStimulus function as with new code as follows
function showStimulus() {
	const string = rand(STRINGS)
    const color = rand(COLORS)
    $("#stimulus").text(string)
    $("#stimulus").css("color", color)

    // New code ========================================
    const params = {
    	string: string,
        color: color,
        startTime: Date.now(),
    }
    $(document).one("keydown", params, recordResponse);
    // =================================================
}