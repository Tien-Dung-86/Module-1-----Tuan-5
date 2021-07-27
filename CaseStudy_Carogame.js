const VALUE_EMPTY = 1;
const VALUE_X = 2;
const VALUE_O = 3;
const DEFAULT_COLS = 10;
const DEFAULT_ROWS = 10;

// function Cell(x, y) {
//     this.x = x;
//     this.y = y;
//     this.value = VALUE_EMPTY;
    // this.getHtml = function () {
    //     let top = x * DEFAULT_CELL_SIZE;
    //     let left = y * DEFAULT_CELL_SIZE;
    //     let cell = '<div id="cell-' + x + '-' + y + '" onclick="play(' + x + ',' + y + ')" class="cell" style="position: absolute; width: ' +
    //         DEFAULT_CELL_SIZE + 'px; height:' +
    //         DEFAULT_CELL_SIZE + 'px; left:' +
    //         left + 'px; top:' +
    //         top + 'px; line-height: ' +
    //         DEFAULT_CELL_SIZE + 'px;"></div>';
    //     return cell;
    // };

//     this.draw = function () {
//         let cellDiv = document.getElementById("cell-" + x + "-" + y);
//         switch (this.value) {
//             case VALUE_X:
//                 cellDiv.innerHTML = "X";
//                 break;
//             case VALUE_O:
//                 cellDiv.innerHTML = "O";
//                 break;
//             default:
//                 cellDiv.innerHTML = "";
//                 break;
//         }
//     }
// }

function DivBoard(rows, cols, elementId) {
    this.rows = rows;
    this.cols = cols;
    this.elementId = elementId;
    this.turn = VALUE_O;
    this.cells = [];
    this.isOver = false;

    this.draw = function () {
        let gameBoardDiv = document.getElementById(this.elementId);
        gameBoardDiv.innerHTML = "";
        for (let i = 0; i < this.rows; i++) {
            let row = [];
            this.cells.push(row);
            for (let j = 0; j < this.cols; j++) {
                let cell = new Cell(i, j);
                row.push(cell);
                gameBoardDiv.innerHTML += cell.getHtml();
            }
        }
    };

    this.play = function (x, y) {
        if (this.isOver) {
            return;
        }
        let cell = this.cells[x][y];
        if (cell.value === VALUE_EMPTY) {
            cell.value = this.turn;
            cell.draw();
            this.check(x, y);
            if (this.turn === VALUE_O) {
                this.turn = VALUE_X;
            } else {
                this.turn = VALUE_O;
            }
        } else {
            alert("Cell is not empty");
        }
    };

    this.check = function (x, y) {
        let cell = this.cells[x][y];
        //Horizontal
        let count = 1;
        let i1 = 1;
        while ((y + i1 < this.cols) && this.cells[x][y + i1].value === cell.value) {
            count++;
            i1++;
        }
        let i2 = 1;
        while ((y - i2 >= 0) && this.cells[x][y - i2].value === cell.value) {
            count++;
            i2++;
        }
        this.endGame(count);
        //Vertical
        let count2 = 1;
        let i3 = 1;
        while ((x + i3 < this.rows) && this.cells[x + i3][y].value === cell.value) {
            count2++;
            i3++;
        }
        let i4 = 1;
        while ((x - i4 >= 0) && this.cells[x - i4][y].value === cell.value) {
            count2++;
            i4++;
        }
        this.endGame(count);
        //Left diagonal
        let count3 = 1;
        let i5 = 1;
        let j1 = 1;
        while ((y + i5 < this.cols) && (x + i5 < this.rows) && this.cells[x + i5][y + j1].value === cell.value) {
            count3++;
            i5++;
            j1++;
        }
        let i6 = 1;
        let j2 = 1;
        while ((x - i6 >= 0) && (y - j2 >= 0) && this.cells[x - i6][y - j2].value === cell.value) {
            count3++;
            i6++;
            j2++;
        }
        this.endGame(count);
        //Right diagonal
        let count4 = 1;
        let i7 = 1;
        let j3 = 1;
        while ((y + j3 < this.cols) && (x - i7 >= 0) && this.cells[x - i7][y + j3].value === cell.value) {
            count4++;
            i7++;
            j3++;
        }
        let i8 = 1;
        let j4 = 1;
        while ((y - j4 >= 0) && (x + i8 < this.rows) && this.cells[x + i8][y - j4].value === cell.value) {
            count4++;
            i8++;
            j4++;
        }
        this.endGame(count);
    };

    this.endGame = function (count) {
        if (count >= 5) {
            this.isOver = true;
            alert("You won!!!");
        }
    };
}

function play(x, y) {
    DivBoard.play(x, y);
}

function start() {
    let divboard = new DivBoard(DEFAULT_ROWS, DEFAULT_COLS, "divBoard");
    divboard.draw();
}

let divboard;
start();
