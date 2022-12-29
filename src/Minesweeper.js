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

export const WinState = Object.freeze({
    ongoing: "ongoing",
    won: "won",
    lost: "lost",
})


export class Minesweeper{

    width
    height
    bombs
    updateMethod
    grid
    flagCount
    winstate

    constructor(height, width, bombs, updateMethode) {
        this.bombs = bombs;
        this.height = height;
        this.width = width;
        this.updateMethod = updateMethode;

        this.flagCount = 0;
        this.grid = new Array(this.height);
        this.winstate = WinState.ongoing;

        console.log("new minesweeper")
        this.generateField();


    }


    sendUpdate(){
        this.updateMethod(this.grid, this.flagCount, this.winstate)
    }




    /**
     * Generates a Minesweeper field with the specified number of bombs.
     */
    generateField() {
        // Initialize the grid with empty tiles.
        for (let i = 0; i < this.height; i++) {
            this.grid[i] = new Array(this.width);
            for (let j = 0; j < this.width; j++) {
                this.grid[i][j] = new Tile(0);
            }
        }

        // Set the bombs randomly on the grid.
        let setBombs = 0;
        while (setBombs < this.bombs) {
            let x = getRandomInt(this.width);
            let y = getRandomInt(this.height);

            if (this.grid[x][y].type !== 10) {
                this.grid[x][y].type = 10;
                setBombs++;
            }
        }

        // Calculate the number of adjacent bombs for each tile.
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.grid[i][j].type === 10) continue;

                let count = 0;
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        if (i + dx < 0 || i + dx >= this.width) continue;
                        if (j + dy < 0 || j + dy >= this.height) continue;
                        if (this.grid[i + dx][j + dy].type === 10) count++;
                    }
                }
                this.grid[i][j].type = count;
            }
        }
    }

    /**
     * Uncovers the specified tile and all adjacent tiles with zero adjacent mines.
     *
     * @param x The x-coordinate of the tile.
     * @param y The y-coordinate of the tile.
     */
    openTile(x, y){

        //don't uncover flaged tiles
        if(this.grid[x][y].flaged) return;

        //already uncovered and unsatisfied
        if(!this.grid[x][y].isCovered && !this.isSatisfied(x, y)) return;


        //uncover tile
        this.grid[x][y].isCovered = false;
        if(this.grid[x][y].type === 10) this.winstate = WinState.lost;
        this.sendUpdate();
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

        //set winstate to won if game is won
        if(this.getNumberOfClosedTiles() === this.bombs) this.winstate = WinState.won;


        this.sendUpdate();
    }

    flag(x, y){

        if(!this.grid[x][y].isCovered) return;
        {
            if(this.grid[x][y].flaged){
                this.grid[x][y].flaged = false;
                this.flagCount--;
            }
            else{
                this.grid[x][y].flaged = true;
                this.flagCount++;
            }

            this.sendUpdate();

        }

    }

    getNumberOfClosedTiles() {

        let count = 0;
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if(this.grid[x][y].isCovered) count++;
            }
        }
        return count


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



