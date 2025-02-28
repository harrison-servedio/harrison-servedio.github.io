function updateBoard(board) {
    for (var i = 0; i < 7; i++){
        document.getElementById(String(i)).style.backgroundColor = board[i];
    };
};

function checkCorrect(b1, b2){
    var counter = 0;
    for (var i = 0; i < 7; i++){
        if (b1[i] == b2[i]) {counter++;}
    };
    return counter;
};

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    };
};


function setUp(){
    var b1 = ["red", "yellow", "blue", "black", "purple", "green", "orange"];
    var b2 = ["red", "yellow", "blue", "black", "purple", "green", "orange"];
    shuffle(b1);
    shuffle(b2);
    while (checkCorrect(b1, b2) > 3){
        shuffle(b2);
    };
    return [b1, b2]
};

function isNumeric(str) {
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
};

function startGame(){
    const startTime = performance.now();

    var set = setUp();
    var b1 = set[0];
    var b2 = set[1];

    
    updateBoard(b1);
    
    var correct = checkCorrect(b1, b2);
    document.getElementById("title").innerHTML = "Number correct: " + String(correct);

    var pivot = "";

    function click(e){
        if (isNumeric(e.target.id)) {
            if (pivot == ""){
                pivot = e.target.id;
            }
            else {
                const temp = b1[Number(pivot)];
                b1[Number(pivot)] = b1[Number(e.target.id)];
                b1[Number(e.target.id)] = temp;

                var correct = checkCorrect(b1, b2);
                document.getElementById("title").innerHTML = "Number correct: " + String(correct);

                updateBoard(b1);
                pivot = "";
                if (correct == 7){
                    const endTime = performance.now();
                    const executionTime = endTime - startTime;
                    alert("Your time was " + String(executionTime/1000) + " seconds");

                    set = setUp();
                    b1 = set[0];
                    b2 = set[1];
                
                    
                    updateBoard(b1);
                    
                    var correct = checkCorrect(b1, b2);
                    document.getElementById("title").innerHTML = "Number correct: " + String(correct);
                    startTime = performance.now();
                };
                
            };
        };
    };
    function keyDown(e){
        if (isNumeric(e.key)){
            if (1 <= Number(e.key) <= 7){
                if (pivot == ""){
                    pivot = String(Number(e.key)-1);
                }
                else {
                    const temp = b1[Number(pivot)];
                    b1[Number(pivot)] = b1[Number(e.key)-1];
                    b1[Number(e.key)-1] = temp;
    
                    var correct = checkCorrect(b1, b2);
                    document.getElementById("title").innerHTML = "Number correct: " + String(correct);
    
                    updateBoard(b1);
                    pivot = "";
                    // Check the num and update the board
                    if (correct == 7){
                        const endTime = performance.now();
                        const executionTime = endTime - startTime;
                        alert("Your time was " + String(executionTime/1000) + " seconds");
    
                        set = setUp();
                        b1 = set[0];
                        b2 = set[1];
                    
                        
                        updateBoard(b1);
                        
                        var correct = checkCorrect(b1, b2);
                        document.getElementById("title").innerHTML = "Number correct: " + String(correct);
                        startTime = performance.now();
    
                    };
                };
            };
        };
    };

    document.addEventListener('click', click);
    document.addEventListener('keydown', keyDown);

};

startGame();