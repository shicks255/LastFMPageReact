import React from 'react';

export default class MainMenu extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            strategies: {
                "getTopArtists": "Top Artists",
                "getTopAlbums": "Top Albums",
                "getTopTracks": "Top Songs"
            },
            timeFrames: {
                "7days": "7 Days",
                "1month": "1 Month",
                "3month": "3 Months",
                "6month": "6 Months",
                "12month": "1 Year",
                "overall": "All Time",
            },
            strategy: "Top Artists",
            timeFrame: "7 Days"
        }
    }

    render()
    {
        let stateStrategies = this.state.strategies;
        let strategies = Object.keys(stateStrategies).map((value, index) => {
            if (stateStrategies[value] === this.state.strategy)
                return <option key={index} selected={true}>{stateStrategies[value]}</option>
            else
                return <option key={index}>{stateStrategies[value]}</option>
        });
        let stateTimeFrames = this.state.timeFrames;
        let timeFrames = Object.keys(stateTimeFrames).map((value, index) => {
            if (stateTimeFrames[value] === this.state.timeFrame)
                return <option key={index} selected={true}>{stateTimeFrames[value]}</option>
            else
                return <option key={index}>{stateTimeFrames[value]}</option>
        });

        return (
            <div className="box">
                <label>Select</label>
                <select onChange={(event) => this.changeStrategy(event)}>
                    {strategies}
                </select>
                <br/>
                <label>Time Frame:</label>
                <select onChange={(event) => this.changeTimeFrame(event)}>
                    {timeFrames}
                </select>
            </div>
        )
    }

    changeStrategy(optionEvent)
    {
        this.setState({
            strategy: optionEvent.target.value
        });
    }

    changeTimeFrame(optionEvent)
    {
        this.setState({
            timeFrame: optionEvent.target.value
        })
    }

}