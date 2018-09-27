import React, {
    Component
} from 'react';
import './App.css';
import Stars from './stars';
import Buttons from './button';
import Answer from './answer';
import Numbers from './numbers';

class Game extends Component {
    state = {
        selectedNumbers :[],
        randomNumberofStars: 1 + Math.floor(Math.random()*9)
    };
    selectNumber = (clickedNumber)=> {
        if(this.state.selectedNumbers.indexOf(clickedNumber)>=0){
            return;
        }
        this.setState(prevState=>({
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)

        })
            
        );
    }

    unselectNumber =(clickedNumber)=>{
        this.setState(prevState=>({
            selectedNumbers: prevState.selectedNumbers.filter(number=>number!==clickedNumber)

        })
            
        );
        

    }
    render() {
        return ( 
            <div className = "Container" >
                <h3>Play Nine</h3>
                <hr/>
                <div className="row">
                    <Stars numberOfStars={this.state.randomNumberofStars}/>
                    <Buttons/>
                    <Answer selectedNumbers={this.state.selectedNumbers}
                            unselectNumber={this.unselectNumber}/>
                </div>
                <br/>
                <Numbers selectedNumbers={this.state.selectedNumbers} 
                         selectNumber={this.selectNumber}               />
            </div>
        );
    }
}

export default Game;