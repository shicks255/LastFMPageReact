import React from 'react';

export default class MainMenu extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let stateStrategies = this.props.strategies;
        let strategies = Object.keys(stateStrategies).map((value, index) => {
            return <option key={index}>{stateStrategies[value]}</option>
        });
        let stateTimeFrames = this.props.timeFrames;
        let timeFrames = Object.keys(stateTimeFrames).map((value, index) => {
            return <option key={index}>{stateTimeFrames[value]}</option>
        });

        return (
            <div className="box">
                <label>Select</label>
                <select defaultValue={this.props.strategy} onChange={(event) => this.props.onChange(event.target.value, 'strategy')}>
                    {strategies}
                </select>
                <br/>
                <label>Time Frame:</label>
                <select defaultValue={this.props.timeFrame} onChange={(event) => this.props.onChange(event.target.value, 'timeFrame')}>
                    {timeFrames}
                </select>
            </div>
        )
    }
}