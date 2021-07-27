const VALUE_EMPTY = 1;
const VALUE_X = 2;
const VALUE_O = 3;
const DEFAULT_COLS = 10;
const DEFAULT_ROWS = 10;
const DEFAULT_CELL_SIZE = 40;

function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.value = VALUE_EMPTY;
    this.getHtml = function(){
        let top = x * DEFAULT_CELL_SIZE;
        let left = y * DEFAULT_CELL_SIZE;
        let cellHtml = '<div id="cell-'+x+'-'+y+'" onclick="play('+x+','+y+')" class="cell" style="position: absolute; width: '+
            DEFAULT_CELL_SIZE+'px; height:'+
            DEFAULT_CELL_SIZE+'px; left:'+
            left+'px; top:'+
            top+'px; line-height: '+
            DEFAULT_CELL_SIZE+'px;"></div>';
        return cellHtml;
    };

    this.draw = function () {
        let cellDiv = document.getElementById("cell-"+x+"-"+y);
        switch (this.value){
            case VALUE_X:
                cellDiv.innerHTML = "X";
                break;
            case VALUE_O:
                cellDiv.innerHTML = "O";
                break;
            default:
                cellDiv.innerHTML = "";
                break;
        }
    }
}

function GameBoard(rows, cols, elementId) {
    this.rows = rows;
    this.cols = cols;
    this.elementId = elementId;
    this.turn = VALUE_O;
    this.cells = [];
    this.isOver = false;

    this.draw = function () {
        let gameBoardDiv = document.getElementById(this.elementId);
        gameBoardDiv.innerHTML = "";
        for(let i = 0; i < this.rows; i++){
            let row = [];
            this.cells.push(row);
            for(let j = 0; j < this.cols; j++){
                let cell = new Cell(i, j);
                row.push(cell);
                gameBoardDiv.innerHTML += cell.getHtml();
            }
        }
    };

    this.play = function (x, y) {
        if(this.isOver) {
            return;
        }
        let cell = this.cells[x][y];
        if(cell.value === VALUE_EMPTY){
            cell.value = this.turn;
            cell.draw();
            this.check(x, y);
            if(this.turn === VALUE_O){
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
        let i = 1;
        while((y + i < this.cols) && this.cells[x][y + i].value ===  cell.value){
            count++;
            i++;
        }
        let i1 = 1;
        while((y - i1 >= 0) && this.cells[x][y - i1].value ===  cell.value){
            count++;
            i++;
        }
        this.endGame(count);
        //Vertical
        let count2 = 1;
        let i2 = 1;
        while((x + i < this.rows) &&this.cells[x + i][y].value ===  cell.value){
            count++;
            i++;
        }
        let i3 = 1;
        while((x - i3 >= 0) &&this.cells[x - i3][y].value ===  cell.value){
            count2++;
            i3++;
        }
        this.endGame(count);
        //Left diagonal
        let count3 = 1;
        let i4 = 1;
        let j1 = 1;
        while((y + i4 < this.cols) && (x + i4 < this.rows) && this.cells[x + i4][y + j1].value ===  cell.value){
            count3++;
            i4++;
            j1++;
        }
        let i5 = 1;
        let j2 = 1;
        while((x - i5 >= 0) && (y - j2 >= 0) && this.cells[x - i5][y - j2].value ===  cell.value){
            count3++;
            i5++;
            j2++;
        }
        this.endGame(count);
        //Right diagonal
        let count4 = 1;
        let i6 = 1;
        let j3 = 1;
        while((y + j3 < this.cols) && (x - i6 >= 0) && this.cells[x - i6][y + j3].value ===  cell.value){
            count4++;
            i6++;
            j3++;
        }
        let i7 = 1;
        let j4 = 1;
        while((y - j4 >= 0) && (x + i7 < this.rows) &&this.cells[x + i7][y - j4].value ===  cell.value){
            count4++;
            i7++;
            j4++;
        }
        this.endGame(count);
    };

    this.endGame = function (count) {
        if(count >= 5){
            this.isOver = true;
            alert("You won!!!");
        }
    };
}

function play(x, y) {
    gameBoard.play(x, y);
}

function start() {
    gameBoard = new GameBoard(DEFAULT_ROWS, DEFAULT_COLS, "game-board");
    gameBoard.draw();
}
let gameBoard;
start();