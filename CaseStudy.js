const size = 16;
const countmax = 5;
let CPlayer = 0; // Current Player (0 is O,1 is X)
let InGame = false;
let l_played = [], l_win = [];
let mode = 0; // 0: no block; 1: block
// let AI = false;

//New Game
function Loaded() {
    CPlayer = 0; // Current Player (0 is O,1 is X)
    l_played = [];
    l_win = [];
    let imgp = document.getElementById("imgPlayer");
    imgp.style.backgroundImage = "url('Images/Opng.png')";


    let table = document.getElementById("table");
    let row = document.getElementsByClassName("row");
    let square = document.getElementsByClassName("square");

// table game
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

function playGame() {
    let rows = document.getElementById("row").value;
    let columns = document.getElementById("column").value;
    document.getElementById("caro").innerHTML = render(rows, columns);
}

//Play Game
function Click(id) {
    if (!InGame) return;
    let square = document.getElementsByClassName("square");
    let pos = parseInt(id);
    if (square.item(pos).getAttribute("player") !== "-1") return;
    let path = "url('Images/Opng.png')";
    if (CPlayer === 1) path = "url('Images/Xpng.png')";
    square.item(pos).style.backgroundImage = path;
    square.item(pos).setAttribute("player", CPlayer.toString());
    l_played.push(pos);

    let win = WinGame();
    let pwin = CPlayer;

    if (!AI) {
        if (CPlayer === 0) CPlayer = 1;
        else CPlayer = 0;

        let iplayer = "url('Images/Opng.png')";
        if (CPlayer === 1) iplayer = "url('Images/Xpng.png')";
        let imgp = document.getElementById("imgPlayer");
        imgp.style.backgroundImage = iplayer;
    } else {
        if (!win) {
            AIMode();
            win = WinGame();
            pwin = 1;
        }
    }

    if (win) {
        let mess = 'Player with "X" win!!!';
        if (pwin === 0) mess = 'Player with "O" win!!!';
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

// di chuyển mouse hướng vào ô
function MouseOver(id) {
    if (!InGame) return;
    let square = document.getElementsByClassName("square");
    let pos = parseInt(id);
    square.item(pos).style.backgroundColor = "#3f3";
}

// di chuyển mouse ra ngoài ô
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
        if (mode === 0) {
            return true;
        } else if(counto >= 2) {
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

// các sự kiện
function P_vs_P() {
    AI = false;
    Loaded();
    InGame = true;
    let pgr = document.getElementById("pgrTime");
    pgr.value = pgr.getAttribute("max");
    LoadProgress();
}

function P_vs_C() {
    AI = true;
    Loaded();
    InGame = true;
    let pgr = document.getElementById("pgrTime");
    pgr.value = pgr.getAttribute("max");
    LoadProgress();
}
