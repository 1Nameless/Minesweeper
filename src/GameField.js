import React, {Component} from "react";
import open1 from "./Resources/open1.gif";
import blank from "./Resources/blank.gif";
import flag from "./Resources/bombflagged.gif";
import { Minesweeper } from "./Minesweeper"




export class GameField extends Component{

    constructor() {
        super();

        this.state={
            field: new Array(10)
        }

    }

    setField(newField){
        this.setState({field:newField});
    }

    game = new Minesweeper(10, 10, 5, this.setField.bind(this))


    width = 20;
    height = 20;
    bombCount = 10;


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
                this.game.switch(x, y)
            }


            }
            onContextMenu={
                ()=>{
                    this.game.flag(x, y)
                }

            }

            />
        }

        if (val.type === 0) {
            return <img className={"tile"} src={blank} height={30} width={30} alt={""} onClick={() => {
                this.game.switch(x, y)
            }}
                        onContextMenu={
                            ()=>{
                                this.game.flag(x, y)
                            }
                        }
            />
        } else return <img className={"tile"} src={open1} height={30} width={30} alt={""} onClick={() => {
            this.game.switch(x, y)
        }}
            onContextMenu={
                ()=>{
                    this.game.flag(x, y)
                }

        }
        />
    }



}
