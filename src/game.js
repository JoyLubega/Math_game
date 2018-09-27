import React, {
    Component
} from 'react';
import './App.css';
import Stars from './stars';
import Buttons from './button';
import Answer from './answer';
import Numbers from './numbers';

class Game extends Component {
    render() {
        return ( 
            <div className = "Container" >
                <h3>Play Nine</h3>
                <hr/>
                <div className="row">
                    <Stars/>
                    <Buttons/>
                    <Answer/>
                </div>
                <br/>
                <Numbers/>
            </div>
        );
    }
}

export default Game;