import React, {useState} from "react";
import {GameField} from "./GameField";



class Tile{
    isCovered
    type
    flaged
    constructor(type) {
        this.isCovered = true;
        this.type = type;
        this.flaged = false;
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
        if(this.grid[x][y].type === 0){
            this.grid[x][y].type = 1
        }
        else if(this.grid[x][y].type === 1){
            this.grid[x][y].type = 0
        }

        this.updateMethod(this.grid);
    }




}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



