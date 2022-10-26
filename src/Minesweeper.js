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

        for (let i = 0; i < this.height; i++) {
            (this.grid)[i] = new Array(this.width);
        }

        //fill field initially with all 0
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                this.grid[i][j] = new Tile(true, 0);
            }
        }

    }



    flag(x, y){

        if(this.grid[x][y].flaged) this.grid[x][y].flaged = false;
        else this.grid[x][y].flaged = true;

        this.updateMethod(this.grid);

    }



    generateField(){

        let newField = new Array()

        for (let i = 0; i < this.height; i++) {
            (this.grid)[i] = new Array(this.width);
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

        //calculate ajacent bombs for each tile //TODO


    }




}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



