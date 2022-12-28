import React, {useState} from "react";
import {GameField} from "./GameField";



class Tile{
    isCovered
    //count of adjacent bombs. 10 means this field is a Bomb
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

        //don't uncover flaged tiles
        if(this.grid[x][y].flaged) return;

        //already uncovered and unsatisfied
        if(!this.grid[x][y].isCovered && !this.isSatisfied(x, y)) return;


        //uncover tile
        this.grid[x][y].isCovered = false
        this.updateMethod(this.grid);
        //TODO watch out for mines

        //only continue when adjacent mine-count is zero
        if(this.grid[x][y].type !== 0 && !this.isSatisfied(x, y)) return;

        //uncover all ajacent tiles
        for (let i = -1; i <= 1; i++) {
            if(x + i < 0) continue
            if(x + i >= this.width) break
            for (let j = -1; j <= 1; j++) {
                if(y + j < 0) continue
                if(y + j >= this.height) break


                //TODO what hapens if a field has 0 adjacent mines, but also a flag next to it?

                if(this.grid[x+i][y+j].isCovered) this.openTile(x+i, y+j);

            }
        }


        this.updateMethod(this.grid);
    }

    flag(x, y){

        if(!this.grid[x][y].isCovered) return;


        if(this.grid[x][y].flaged) this.grid[x][y].flaged = false;
        else this.grid[x][y].flaged = true;

        this.updateMethod(this.grid);

    }


    isSatisfied(x, y){

        // counts how many flags are adjacent
        let flagCount = 0;


        for (let i = -1; i <= 1; i++) {
            if(x + i < 0) continue
            if(x + i >= this.width) break
            for (let j = -1; j <= 1; j++) {
                if(y + j < 0) continue
                if(y + j >= this.height) break

                if(this.grid[x+i][y+j].flaged) flagCount++;


            }
        }




        return this.grid[x][y].type === flagCount;

    }




}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



