import React, {Component} from "react";

import flag from "./Resources/bombflagged.gif";
import blank from "./Resources/blank.gif";
import openBlank from "./Resources/openblank.gif"
import open1 from "./Resources/open1.gif";
import open2 from "./Resources/open2.gif"
import open3 from "./Resources/open3.gif"
import open4 from "./Resources/open4.gif"
import open5 from "./Resources/open5.gif"
import open6 from "./Resources/open6.gif"
import open7 from "./Resources/open7.gif"
import open8 from "./Resources/open8.gif"

import { Minesweeper, WinState } from "./Minesweeper"




export class GameField extends Component{


    ImgMap = {
        0: openBlank,
        1: open1,
        2: open2,
        3: open3,
        4: open4,
        5: open5,
        6: open6,
        7: open7,
        8: open8,
        blank: blank,
        flag: flag,
    }

    constructor() {
        super();

        this.state={
            field: new Array(10),
            flagCount: 0,
            winState: WinState.ongoing,
        }

    }

    setField(newField, flagcount, winstate){
        this.setState({
            field:newField,
            flagCount: flagcount,
            winState: winstate,

        });
    }

    height = 10;
    width = 10;
    bombCount = 20;



    game = new Minesweeper(this.height, this.width, this.bombCount, this.setField.bind(this))


    render(){
        return (
            <div>
                <div>Mines left: {this.bombCount - this.state.flagCount}</div>
                <div>{this.state.winState}</div>
            <table className={"grid"}>
                <tbody>
                {
                    this.game.grid.map((row, cr) => <tr>{
                        row.map(
                            (col, cc) => <td>{
                                this.getTile(col, cr, cc)
                            }</td>
                        )
                    }</tr>)
                }
                </tbody>
            </table>
            </div>

        )
    }


    getTile(val, x, y) {

        let tileHeight;
        let tileWidth = tileHeight = 30;


        let img = null;


        if(val.flaged) img = this.ImgMap.flag;
        else if(val.isCovered) img = this.ImgMap.blank;
        else img = this.ImgMap[val.type];


        return <img className={"tile"} src={img} height={tileHeight} width={tileWidth} alt={""} onClick={() => {
            this.game.openTile(x, y);
        }}
                    onContextMenu={
                        ()=>{
                            this.game.flag(x, y);
                        }
                    }
        />
    }





}
