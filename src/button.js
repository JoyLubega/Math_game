import React from 'react';

const Buttons = (props) => {
    let button;
    switch (props.answerIsCorrect) {
        case true:
            button=
            <button className="btn btn-success btn-lg" onClick={props.acceptAnswer}>
            <i className="fa fa-check"></i>
            </button>
            break;
        case false:
        button =
            <button className="btn btn-danger btn-lg">
            <i className="fa fa-times"></i>
            </button>
            break;
    
        default:
            button = 
            <button className="btn btn-lg btn-secondary" onClick={props.checkAnswer} disabled={props.selectedNumbers.length === 0}>
            <i className="fa fa-thumbs-up"></i>
            <p>Check</p>
            </button>
            break;
    }
    return(
        <div className="col-2">
            {button}
            <br/><br/>
            <button className="btn btn-warning btn-lg" onClick={props.redraw} disabled={props.redraws=== 0}>
                <i className="fa fa-refresh fa-spin"></i>
                <p>Refresh</p>
                <p>{props.redraws}</p>
            </button>
        </div>
    );
}
export default Buttons;