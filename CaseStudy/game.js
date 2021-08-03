const size = 25;
const countmax = 5;
let choosePlayer = 0;
let l_played = [];
let l_win = [];
let mode = 0;
let AI = false;
let InGame = false;

//Start
function Loaded() {
    choosePlayer = 0;
    let l_played = [];
    let l_win = [];
    let imgp = document.getElementById("imgPlayer");
    imgp.style.backgroundImage = "url('Images/O.png')";


    // Create board game
    let table = document.getElementById("table");
    let row = document.getElementsByClassName("row");
    let square = document.getElementsByClassName("square");
    table.innerHTML = "";
    for (y = 0; y < size; y++) {
        table.innerHTML += '<tr class="row"></tr>';
        for (x = 0; x < size; x++) {
            let div = '<div class="square" onClick="Click(id)" onMouseOver="MouseOver(id)" onMouseOut="MouseOut(id)"></div>';
            row.item(y).innerHTML += '<td class="col">' + div + '</td>';
            square.item(x + y * size).setAttribute("id", (x + y * size).toString());
            square.item(x + y * size).setAttribute("player", "-1");
        }
    }
}


//Play Game
function Click(id) {
    if (!InGame) return;
    let square = document.getElementsByClassName("square");
    let pos = parseInt(id);
    if (square.item(pos).getAttribute("player") !== "-1") return;
    let path = "url('Images/O.png')";
    if (choosePlayer === 1) path = "url('Images/X.png')";
    square.item(pos).style.backgroundImage = path;
    square.item(pos).setAttribute("player", choosePlayer.toString());
    l_played.push(pos);

    let win = WinGame();
    let playerWin = choosePlayer;

    if (!AI) {
        if (choosePlayer === 0) choosePlayer = 1;
        else choosePlayer = 0;
        let imgPlayer = "url('Images/O.png')";
        if (choosePlayer === 1) imgPlayer = "url('Images/X.png')";
        let imgp = document.getElementById("imgPlayer");
        imgp.style.backgroundImage = imgPlayer;
    } else {
        if (!win) {
            AIMode();
            win = WinGame();
            playerWin = 1;
        }
    }

    if (win) {
        let mess = '2ND Player with "X" win!!!';
        if (playerWin === 0) mess = '1ST Player with "O" win!!!';
        alert(mess);
        InGame = false;
    } else {
        let pgr = document.getElementById("pgrTime");
        pgr.value = pgr.getAttribute("max");
    }
}

// Min Max
function maxab(a, b) {
    if (a > b) return a;
    else return b;
}

function minab(a, b) {
    if (a < b) return a;
    else return b;
}


// direct square
function MouseOver(id) {
    if (!InGame) return;
    let square = document.getElementsByClassName("square");
    let pos = parseInt(id);
    square.item(pos).style.backgroundColor = "#3f3";
}

// out square
function MouseOut(id) {
    if (!InGame) return;
    let square = document.getElementsByClassName("square");
    let pos = parseInt(id);
    square.item(pos).style.backgroundColor = "#fff";
}

function WinGame() {
    let result = false;
    let Board = GetBoard();
    for (x = 0; x < size; x++) {
        for (y = 0; y < size; y++) {
            if (winHor(x, y, Board) || winVer(x, y, Board) || winCross1(x, y, Board)
                || winCross2(x, y, Board)) {
                let square = document.getElementsByClassName("square");
                for (i = 0; i < l_win.length; i++) {
                    square.item(l_win[i]).style.backgroundColor = "#FF0";
                }
                result = true;
            }
        }
    }
    return result;
}

// Win
function winHor(x, y, Board) {
    l_win = [];
    let count = 0, counto = 0;
    let player = Board[x + y * size];
    if (player === -1) return false;

    if (x > 0) {
        let p = Board[x - 1 + y * size];
        if (p !== player && p !== -1) counto++;
    }

    for (i = x; i < size; i++) {
        let p = Board[i + y * size];
        if (p === player && p !== -1) {
            count++;
            l_win.push(i + y * size);
        } else {
            if (p !== -1) counto++;
            break;
        }
    }
    if (count >= countmax) {
        if (mode === 0)
            return true;
        else if (counto >= 2) {
            return false;
        } else {
            return true;
        }
    }
    return false;
}

function winVer(x, y, Board) {
    l_win = [];
    let count = 0, counto = 0;
    let player = Board[x + y * size];
    if (player === -1) return false;

    if (y > 0) {
        let p = Board[x + (y - 1) * size];
        if (p !== player && p !== -1) counto++;
    }

    for (i = y; i < size; i++) {
        let p = Board[x + i * size];
        if (p === player && p !== -1) {
            count++;
            l_win.push(x + i * size);
        } else {
            if (p !== -1) counto++;
            break;
        }
    }
    if (count >= countmax) {
        if (mode === 0)
            return true;
        else if (counto >= 2) {
            return false;
        } else {
            return true;
        }
    }
    return false;
}

function winCross1(x, y, Board) {
    l_win = [];
    if (x > size - countmax || y < countmax - 1) return false;
    let count = 0, counto = 0;
    let player = Board[x + y * size];
    if (player === -1) return false;

    if (y < size - 1 && x > 0) {
        let p = Board[x - 1 + (y + 1) * size];
        if (p !== player && p !== -1) counto++;
    }

    for (i = 0; i <= minab(size - x, y); i++) {
        let p = Board[(x + i) + (y - i) * size];
        if (p === player && p !== -1) {
            count++;
            l_win.push((x + i) + (y - i) * size);
        } else {
            if (p !== -1) counto++;
            break;
        }
    }
    if (count >= countmax) {
        if (mode == 0)
            return true;
        else if (counto >= 2) {
            return false;
        } else {
            return true;
        }
    }
    return false;
}

function winCross2(x, y, Board) {
    l_win = [];
    if (x > size - countmax || y > size - countmax) return false;
    let count = 0, counto = 0;
    let player = Board[x + y * size];
    if (player === -1) return false;

    if (y > 0 && x > 0) {
        let p = Board[x - 1 + (y - 1) * size];
        if (p !== player && p !== -1) counto++;
    }

    for (i = 0; i < minab(size - x, size - y); i++) {
        let p = Board[(x + i) + (y + i) * size];
        if (p === player && p !== -1) {
            count++;
            l_win.push((x + i) + (y + i) * size);
        } else {
            if (p !== -1) counto++;
            break;
        }
    }
    if (count >= countmax) {
        if (mode === 0)
            return true;
        else if (counto >= 2) {
            return false;
        } else {
            return true;
        }
    }
    return false;
}

// Event
function playerVsPlayer() {
    AI = false;
    InGame = true;
    Loaded();
    InGame = true;
}

function playerVsComputer() {
    AI = true;
    Loaded();
    InGame = true;
    let pgr = document.getElementById("pgrTime");
    pgr.value = pgr.getAttribute("max");
    LoadProgress();
}


function LoadProgress() {
    if (!InGame) return;
    setTimeout(
        function () {
            let pgr = document.getElementById("pgrTime");
            pgr.value--;
            if (pgr.value > 0)
                LoadProgress();
            else {
                let mess = '2ND Player with "X" win!!!';
                if (choosePlayer === 1) mess = '1ST Player with "O" win!!!';
                alert(mess);
                InGame = false;
            }
        }, 100);
}