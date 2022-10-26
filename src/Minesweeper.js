import React, {useState} from "react";
import {GameField} from "./GameField";



class Tile{
    isCovered
    type
    flaged
    constructor(isCovered, type) {
        this.isCovered = isCovered;
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




}