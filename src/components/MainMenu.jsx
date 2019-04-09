import React from 'react';

export default function MainMenu(props)
{
    let stateStrategies = props.strategies;
    let strategies = Object.keys(stateStrategies).map((value, index) => {
        return <option key={index}>{stateStrategies[value]}</option>
    });
    let stateTimeFrames = props.timeFrames;
    let timeFrames = Object.keys(stateTimeFrames).map((value, index) => {
        return <option key={index}>{stateTimeFrames[value]}</option>
    });

    return (
        <div className={"columns is-mobile"}>
            <div className="box column is-half is-offset-one-quarter">
                <label>Select</label>
                <select defaultValue={props.strategy} onChange={(event) => props.onChange(event.target.value, 'strategy')}>
                    {strategies}
                </select>
                <br/>
                <label>Time Frame:</label>
                <select defaultValue={props.timeFrame} onChange={(event) => props.onChange(event.target.value, 'timeFrame')}>
                    {timeFrames}
                </select>
            </div>
        </div>
    )
}