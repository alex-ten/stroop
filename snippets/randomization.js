const COLORS = ['red', 'blue', 'green', 'yellow']
const STRINGS = [
	"RED", "BLUE", "GREEN", "YELLOW", 
    "XXX", "XXXX", "XXXXX", "XXXXXX"
]

function rand(a) {
    return a[Math.floor(Math.random() * a.length)]
}

function showStimulus() {
	const string = rand(STRINGS)
    const color = rand(COLORS)
    $("#stimulus").text(string)
    $("#stimulus").css("color", color)
}


// What happens when page loads
$(window).on("load", showStimulus)