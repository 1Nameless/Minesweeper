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

import { Minesweeper } from "./Minesweeper"




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
        flas: flag,
    }

    constructor() {
        super();

        this.state={
            field: new Array(10)
        }

    }

    setField(newField){
        this.setState({field:newField});
    }

    height = 10;
    width = 10;
    bombCount = 20;


    game = new Minesweeper(this.height, this.width, this.bombCount, this.setField.bind(this))


    render(){
        return (
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

        )
    }




    getTile(val, x, y) {




        if(val.flaged){
            return <img className={"tile"} src={flag} height={30} width={30} alt={""} onClick={() => {
                //this.game.switch(x, y)
            }


            }
            onContextMenu={
                ()=>{
                    this.game.flag(x, y)
                }

            }

            />
        }

        return <img className={"tile"} src={this.ImgMap[val.type]} height={30} width={30} alt={""} onClick={() => {
            this.game.openTile(x, y);
        }}
                    onContextMenu={
                        ()=>{
                            this.game.flag(x, y)
                        }
                    }
        />
    }



}
