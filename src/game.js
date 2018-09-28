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
        randomNumberofStars: 1 + Math.floor(Math.random()*9),
        answerIsCorrect:null,
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
            answerIsCorrect:null,
            selectedNumbers: prevState.selectedNumbers.filter(number=>number!==clickedNumber)

        })
            
        );
        

    }

    checkAnswer = ()=>{
        this.setState(prevState=>({
            answerIsCorrect: prevState.randomNumberofStars === prevState.selectedNumbers.reduce((acc,n)=>acc+n,0)

        })
            
        );

    }
    render() {
       const {selectedNumbers, randomNumberofStars, answerIsCorrect} = this.state;
        return ( 
            <div className = " game Container" >
                <h3>Play Nine</h3>
                <hr/>
                <div className="row">
                    <Stars numberOfStars={randomNumberofStars}/>
                    <Buttons selectedNumbers={selectedNumbers}
                             checkAnswer={this.checkAnswer}
                             answerIsCorrect={answerIsCorrect}/>
                    <Answer selectedNumbers={selectedNumbers}
                            unselectNumber={this.unselectNumber}/>
                </div>
                <br/>
                <Numbers selectedNumbers={selectedNumbers} 
                         selectNumber={this.selectNumber}/>
            </div>
        );
    }
}

export default Game;