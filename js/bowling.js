var scoreSheet = [[4,3],[7,3],[5,2],[8,1],[4,6],[2,4],[8,0],[8,0],[8,2],[10,1,7]];
var frameScores = [];
var previousStrike = false;
var doubleStrikes = false;

function calculateScore() {
    frameScores = [];
    previousStrike = false;
    doubleStrikes = false;
    
    scoreSheet.forEach(getFrameScore);
    var scoreTotal = 0;

    $.each(frameScores, function(i,v){
        scoreTotal += v;
    });
    return scoreTotal;
}

function getFrameScore(v, i) {
    var frameScore = 0;
    var strikeScore = 0;

    var rollOne = getProperNumber(v[0]);
    var rollTwo = getProperNumber(v[1]);
    var rollThree = getProperNumber(v[2]);
    
    var firstTwo = rollOne + rollTwo;
    var strike = (rollOne === 10);

    if (i === 9) {
        frameScore = firstTwo >= 10 ? firstTwo + rollThree : firstTwo;
        strikeScore = firstTwo;
    } else {
        frameScore = strike ? 10 : (firstTwo > 10 ? 10 : firstTwo);
        strikeScore = frameScore;
    }
    
    //account to previous score
        //check for previous strike
    if (previousStrike === true) {
        frameScores[i - 1] += strikeScore;
        
        if (doubleStrikes) frameScores[i - 2] += rollOne;               
    }
    //check for a spare
    else if (i > 0 && frameScores[i - 1] === 10) {
        frameScores[i - 1] += rollOne;
    }

    doubleStrikes = previousStrike & strike;
    previousStrike = strike;
    frameScores[i] = frameScore;
}

function getProperNumber(myNum) {
    return typeof myNum === "number" && myNum > 0 ? (myNum >= 10 ? 10 : myNum) : 0;
}