import React, {
    Component
} from 'react';
import './App.css';
import Stars from './stars';
import Buttons from './button';
import Answer from './answer';
import Numbers from './numbers';
import Done from './done';
import _ from 'lodash';

class Game extends Component {
    static randomNumber = ()=> 1 + Math.floor(Math.random()*9);
    static initialState = () =>({
        selectedNumbers :[],
        usedNumbers:[],
        randomNumberofStars: Game.randomNumber(),
        answerIsCorrect:null,
        redraws:5,
        doneStatus:null
    });
    state = Game.initialState();

    resetGame = ()=> this.setState(Game.initialState());

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
    acceptAnswer = ()=>{
        this.setState(prevState=>({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers:[],
            randomNumberofStars: Game.randomNumber(),
            answerIsCorrect:null

        }), this.updateDoneStatus
            
        );
    }
    redraw = ()=>{
        if(this.state.redraws === 0){return;}
        this.setState(prevState =>({
            selectedNumbers:[],
            randomNumberofStars: Game.randomNumber(),
            answerIsCorrect:null,
            redraws: prevState.redraws - 1

        }), this.updateDoneStatus);
    }
    possibleCombinationSum = (arr, n)=> {
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }
        if (arr[arr.length - 1] > n) {
          arr.pop();
          return this.possibleCombinationSum(arr, n);
        }
        var listSize = arr.length, combinationsCount = (1 << listSize)
        for (var i = 1; i < combinationsCount ; i++ ) {
          var combinationSum = 0;
          for (var j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
          }
          if (n === combinationSum) { return true; }
        }
        return false;
      };

    possibleSolutions= ({randomNumberofStars, usedNumbers}) => {
        const possibleNumbers = _.range(1,10).filter(number=>
            usedNumbers.indexOf(number) === -1
            );
            return this.possibleCombinationSum(possibleNumbers,randomNumberofStars);

    }
    updateDoneStatus = ()=>{
        this.setState(prevState =>{
            if(prevState.usedNumbers.length === 9){
                return {doneStatus:'Done. Nice'}
            }
            if(prevState.redraws === 0 && !this.possibleSolutions(prevState)){
                return {doneStatus:'Game over!'}
            }
            

        });
    }

    render() {
       const {
           selectedNumbers, 
           randomNumberofStars, 
           answerIsCorrect,
           usedNumbers,
           redraws,
           doneStatus
        } = this.state;
        return ( 
            <div className = " game Container" >
                <h2>Play Nine</h2>
                <hr/>
                <div className="row">
                    <Stars numberOfStars={randomNumberofStars}/>
                    <Buttons selectedNumbers={selectedNumbers}
                             checkAnswer={this.checkAnswer}
                             answerIsCorrect={answerIsCorrect}
                             acceptAnswer={this.acceptAnswer}
                             redraw={this.redraw}
                             redraws={redraws}
                             />

                    <Answer selectedNumbers={selectedNumbers}
                            unselectNumber={this.unselectNumber}/>
                </div>
                <br/>
                {
                    doneStatus ? 
                    <Done doneStatus={doneStatus} resetGame= {this.resetGame}/>:
                    <Numbers selectedNumbers={selectedNumbers} 
                         selectNumber={this.selectNumber}
                         usedNumbers={usedNumbers}/>
                }
                
            </div>
        );
    }
}

export default Game;