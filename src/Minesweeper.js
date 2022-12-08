import React, {useState} from "react";
import {GameField} from "./GameField";



class Tile{
    isCovered
    type
    flagged
    constructor(type) {
        this.isCovered = true;
        this.type = type;
        this.flagged = false;
    }
}


export class Minesweeper{

    width
    height
    bombs
    updateMethod
    grid

    constructor(height, width, bombs, updateMethode) {
        this.bombs = bombs;
        this.height = height;
        this.width = width;
        this.updateMethod = updateMethode;

        this.grid = new Array(this.height)

        console.log("new minesweeper")
        this.generateField();


    }



    flag(x, y){

        if(!this.grid[x][y].isCovered) return;


        if(this.grid[x][y].flaged) this.grid[x][y].flaged = false;
        else this.grid[x][y].flaged = true;

        this.updateMethod(this.grid);

    }



    generateField(){


        for (let i = 0; i < this.height; i++) {
            (this.grid)[i] = new Array(this.width);
        }

        //fill field initially with all 0
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.grid[i][j] = new Tile(0);
            }
        }

        //set the bombs
        let setBombs = 0;
        while (setBombs < this.bombs){
            let x = getRandomInt(this.width)
            let y = getRandomInt(this.height)

            if(this.grid[x][y].type !== null){
                this.grid[x][y].type = 10;
                setBombs++;
            }
        }

        function isValidPos(x, y, width, height) {
            if (x < 0 || y < 0 || x > width - 1 || y > height - 1)
                return 0;
            return 1;
        }

        //calculate ajacent bombs for each tile
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if(this.grid[i][j].type === 10) continue;

                let count = 0;
                if (isValidPos(i-1, j-1, this.width, this.height))
                    if(this.grid[i-1][j-1].type === 10) count++;

                if (isValidPos(i - 1, j, this.width, this.height))
                    if(this.grid[i-1][j].type === 10) count++;

                if (isValidPos(i - 1, j+1, this.width, this.height))
                    if(this.grid[i-1][j+1].type === 10) count++;

                if (isValidPos(i, j-1, this.width, this.height))
                    if(this.grid[i][j-1].type === 10) count++;

                if (isValidPos(i, j+1, this.width, this.height))
                    if(this.grid[i][j+1].type === 10) count++;

                if (isValidPos(i+1, j-1, this.width, this.height))
                    if(this.grid[i+1][j-1].type === 10) count++;

                if (isValidPos(i+1, j, this.width, this.height))
                    if(this.grid[i+1][j].type === 10) count++;

                if (isValidPos(i+1, j+1, this.width, this.height))
                    if(this.grid[i+1][j+1].type === 10) count++;


                this.grid[i][j].type = count

            }
        }

        console.log(this.grid)

    }

    openTile(x, y){

        //already uncovered
        if(!this.grid[x][y].isCovered) return;

        //don't uncover flaged tiles
        if(this.grid[x][y].flaged) return;


        //uncover tile
        this.grid[x][y].isCovered = false
        this.updateMethod(this.grid);

        //only continue when adjacent mine-count is zero
        console.log(this.grid[x][y].value)
        if(this.grid[x][y].type !== 0) return;

        //uncover all ajacent tiles
        for (let i = -1; i <= 1; i++) {
            if(x + i < 0) continue
            if(x + i >= this.width) break
            for (let j = -1; j <= 1; j++) {
                if(y + j < 0) continue
                if(y + j >= this.height) break


                //TODO what hapens if a field has 0 adjacent mines, but also a flag nect to it?

                this.openTile(x+i, y+j)

            }
        }


        this.updateMethod(this.grid);
    }




}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



