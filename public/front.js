
class Coords{
    static x;
    static y;    
}

function getMouseCoord(x,y){
    Coords.x = Math.floor(x / BLOCK_SIZE);
    Coords.y = Math.floor(y / BLOCK_SIZE);

    return Coords;
}

function getPieceAtMousepos(occSquares,x,y){
    x = Math.floor(x / BLOCK_SIZE);
    y = Math.floor(y / BLOCK_SIZE);

    return occSquares[y][x];
    

}

function drawPieceAtMousepos(piece, x, y){

    x -= BLOCK_SIZE * PIECE_SCALE / 2;  // centers piece
    y -= BLOCK_SIZE * PIECE_SCALE / 2;

    if (piece !== 0){

        let piece_number = piece.colourAndPiece();

        image(IMAGES[piece_number], 
        Math.min(height - BLOCK_SIZE + SPACING, Math.max(SPACING, x)), 
        Math.min(height - BLOCK_SIZE + SPACING, Math.max(SPACING, y)), BLOCK_SIZE * PIECE_SCALE, BLOCK_SIZE * PIECE_SCALE);
    }
}

function draw_piece(piece,coordX,coordY){
    coordX = SPACING + coordX * BLOCK_SIZE;
    coordY = SPACING + coordY * BLOCK_SIZE;
  
    image(IMAGES[piece],coordX,coordY,BLOCK_SIZE * PIECE_SCALE,BLOCK_SIZE * PIECE_SCALE);
    
}

function draw_grid(){
    for(let y = 0; y < 8; y++ ){
        for(let x = 0; x < 4; x++){
            fill(BLACK);
            noStroke();
            square((x*2 + ((y+1) % 2)) * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE);
        } 
    }
}

function drawAllPieces(occSquares,pieceAtMouse){
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (occSquares[i][j] !== 0){
                if (pieceAtMouse !== occSquares[i][j]) draw_piece(occSquares[i][j].colourAndPiece(), j, i);
            }
        }
    }
}

function centerCanvas(){
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) * 0.25;
    canv.position(x,y);
}

function drawLegalSquares(squares){
    let row;
    let col;
   
    for (let i = 0; i < squares.length; i++){
        row = (BLOCK_SIZE / 2) + squares[i][0] * BLOCK_SIZE;
        col =  (BLOCK_SIZE/2) + squares[i][1] * BLOCK_SIZE;
        fill(80,123,101);
        ellipse(col,row,25);
    }
    
}

function drawBlockableSquares(squares){
    let row;
    let col;


    for (let i = 0; i < squares.length; i++){
        row = (BLOCK_SIZE / 2) + squares[i][0] * BLOCK_SIZE;
        col =  (BLOCK_SIZE / 2) + squares[i][1] * BLOCK_SIZE;
        fill(255,0,0);
        noStroke();
        ellipse(col, row, 30);
    } 

}

function drawInCheckLegalSquares(piecesToBlockAttack, x, y){
    let clickedCol = x
    let clickedRow = y
    var drawRow,drawCol;

    for (let i = 0; i < piecesToBlockAttack.length; i++){

        if ((clickedRow + '' + clickedCol) === piecesToBlockAttack[i].locOnCoords){ //if you click a piece which can block check
            print('inin');
            drawRow = (BLOCK_SIZE / 2) + piecesToBlockAttack[i].move[0] * BLOCK_SIZE; 
            drawCol = (BLOCK_SIZE / 2) + piecesToBlockAttack[i].move[1] * BLOCK_SIZE; 
            fill(255,51,153);
            noStroke();
            ellipse(drawCol, drawRow, 30);
        }
    }
}

function hideSelectedPiece(){

}