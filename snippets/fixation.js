// Add this to the top of your JS code
// (just to keep variable declarations together)
const FIXDUR = 1000

// Add this after showStimulus function
function startTrial() {
	$("#stimulus").text("+")
    $("#stimulus").css("color", "black")
    setTimeout(showStimulus, FIXDUR)
}

// Change what happens on page load to startTrial
$(window).on("load", function (event) {
    startTrial()
})