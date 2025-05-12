function repeatedNumber(number, array){
    let cont = 0;
    for (let value of array){
        if (value === 0) return true
        if (value == number) cont++
        if (cont > 1) return true
    }
    return false
}
function reapeatInLine(sudoku, number, posLine){
    const sudokuLine = sudoku[posLine].map((v) => v.value)
    return repeatedNumber(number, sudokuLine)
}
function reapeatInColumn(sudoku, number, posColumn){
    let sudokuColumn = []
    for (let i = 0; i < 9; i++){
        sudokuColumn.push(sudoku[i][posColumn].value);
    }
    return repeatedNumber(number, sudokuColumn)
}
function createQuadrant(sudoku, posLine, posColumn){
    const quadrantSize = 3;
    const startLine = Math.floor(posLine / quadrantSize) * quadrantSize
    const endLine = startLine + quadrantSize
    const startColumn =  Math.floor(posColumn / quadrantSize) * quadrantSize
    const endColumn = startColumn + quadrantSize
    let quadrant = []
    for (let i = startLine; i < endLine; i++){
        for (let j = startColumn; j < endColumn; j++){
            quadrant.push(sudoku[i][j].value)
        }
    }
    return quadrant
}
function reapeatInQuadrant(sudoku, number, posLine, posColumn){
    const quadrant = createQuadrant(sudoku, posLine, posColumn)
    return repeatedNumber(number, quadrant)
}

function isGameFinished(sudoku, number, posLine, posColumn){
    return (!reapeatInLine(sudoku, number, posLine) && 
            !reapeatInColumn(sudoku, number, posColumn) &&
            !reapeatInQuadrant(sudoku, number, posLine, posColumn))
}

export { isGameFinished }