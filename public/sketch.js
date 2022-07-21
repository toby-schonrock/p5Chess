var canv;
const BLACK = 'rgb(140,162,173)';
const WHITE = 'rgb(222,237,230)';

let IMAGES = {};

let board;

let MouseDown;
let pieceAtMouse;

let BIN_PIECES = {
    20: 'b_bishop', 17: 'b_king', 19: 'b_knight', 18: 'b_pawn', 22: 'b_queen', 21: 'b_rook',
    12: 'w_bishop', 9: 'w_king', 11: 'w_knight', 10: 'w_pawn', 14: 'w_queen', 13: 'w_rook'
}

function preload(){
    for (im in BIN_PIECES){
        IMAGES[im] = loadImage('./classic_hq/' + BIN_PIECES[im] + '.png');
    }
}

function setup() {
    canv = createCanvas(windowHeight * 0.8, windowHeight * 0.8);

    PIECE_SCALE = 0.75;
    BLOCK_SIZE = (windowHeight * 0.8) / 8; //can be width but it is a square
    SPACING = Math.floor((BLOCK_SIZE * (1 - PIECE_SCALE)) / 2);
    
    board = new Board('rnbqkbnr/1ppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');

    centerCanvas();
} 

function draw() {
    background(WHITE);
    draw_grid();
    drawAllPieces(board.avPieces);

    if (MouseDown){
        drawPieceAtMousepos(pieceAtMouse,mouseX,mouseY);
    }

}

function mousePressed(){
  
    pieceAtMouse = getPieceAtMousepos(board.avPieces,mouseX,mouseY); //returns type Piece
    MouseDown = true;
    
}

function mouseReleased(){
    MouseDown = false;

    let destCoords = getMouseCoord(mouseX,mouseY); // returns coord for array [0,0] [1,1] etc.
    if (board.isLegal(pieceAtMouse,destCoords.y,destCoords.x)){ //x and y are flipped as y is the equivalent to row
        pieceAtMouse.updatePos(board.avPieces,board.occSquares,destCoords.y,destCoords.x);
    }
}

function windowResized(){
    resizeCanvas(windowHeight * 0.8, windowHeight * 0.8);
    centerCanvas();
    BLOCK_SIZE = (windowHeight * 0.8) / 8; //can be width but it is a square
    SPACING = Math.floor((BLOCK_SIZE * (1 - PIECE_SCALE)) / 2);
}






