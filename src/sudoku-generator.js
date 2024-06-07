class Sudoku {
    constructor(N, K) {
        this.N = N;
        this.K = K;

        const SRNd = Math.sqrt(N);
        this.SRN = Math.floor(SRNd);

        this.mat = Array.from({
            length: N
        }, () => Array.from({
            length: N
        }, () => 0));
    }

    fillValues() {
        this.fillDiagonal();
        this.fillRemaining(0, this.SRN);
        this.removeKDigits();
    }

    fillDiagonal() {
        for (let i = 0; i < this.N; i += this.SRN) {
            this.fillBox(i, i);
        }
    }

    unUsedInBox(rowStart, colStart, num) {
        for (let i = 0; i < this.SRN; i++) {
            for (let j = 0; j < this.SRN; j++) {
                if (this.mat[rowStart + i][colStart + j] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    fillBox(row, col) {
        let num = 0;
        for (let i = 0; i < this.SRN; i++) {
            for (let j = 0; j < this.SRN; j++) {
                while (true) {
                    num = this.randomGenerator(this.N);
                    if (this.unUsedInBox(row, col, num)) {
                        break;
                    }
                }
                this.mat[row + i][col + j] = num;
            }
        }
    }

    randomGenerator(num) {
        return Math.floor(Math.random() * num + 1);
    }

    checkIfSafe(i, j, num) {
        return (
            this.unUsedInRow(i, num) &&
            this.unUsedInCol(j, num) &&
            this.unUsedInBox(i - (i % this.SRN), j - (j % this.SRN), num)
        );
    }

    unUsedInRow(i, num) {
        for (let j = 0; j < this.N; j++) {
            if (this.mat[i][j] === num) {
                return false;
            }
        }
        return true;
    }

    unUsedInCol(j, num) {
        for (let i = 0; i < this.N; i++) {
            if (this.mat[i][j] === num) {
                return false;
            }
        }
        return true;
    }

    fillRemaining(i, j) {
        if (i === this.N - 1 && j === this.N) {
            return true;
        }

        if (j === this.N) {
            i += 1;
            j = 0;
        }

        if (this.mat[i][j] !== 0) {
            return this.fillRemaining(i, j + 1);
        }

        for (let num = 1; num <= this.N; num++) {
            if (this.checkIfSafe(i, j, num)) {
                this.mat[i][j] = num;
                if (this.fillRemaining(i, j + 1)) {
                    return true;
                }
                this.mat[i][j] = 0;
            }
        }

        return false;
    }

    removeKDigits() {
        let count = this.K;

        while (count !== 0) {
    
            let i = Math.floor(Math.random() * this.N);
            let j = Math.floor(Math.random() * this.N);
            if (this.mat[i][j] !== 0) {
                count--;
                this.mat[i][j] = 0;
            }
        }
        return;
    }
}

function processSudoku(sudoku){
    let result = []

    for (let line of sudoku){
        let newLine = []
        for (let value of line){
            if (value > 0){
                newLine.push({i: 1, v: value})
            }
            else{
                newLine.push({i: -1, v: 0})
            }
        }
        result.push(newLine)
    }
    return result
}

function getSudokuGame(difficulty){
    const N = 9
    let k
    if (difficulty == "easy"){
        k = 20
    }
    else if (difficulty == "medium"){
        k = 35
    }
    else{
        k = 45
    }
    const sudoku = new Sudoku(N, k)
    sudoku.fillValues()

    return processSudoku(sudoku.mat)
}

export default getSudokuGame