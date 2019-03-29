import React from 'react';
import MainMenu from "./MainMenu";


export default class Body extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            strategy: "getTopArtists",
            timeFrame: "7day",
            artists: [],
            albums: [],
            tracks: []
        }

        this.changeItems = this.changeItems.bind(this);
    };

    getFullUrl()
    {
        let key = 'c349ab1fcb6b132ffb8d842e982458db';
        let url = `https://ws.audioscrobbler.com/2.0/?method=user.${this.state.strategy}&user=shicks255&api_key=${key}&format=json&period=${this.state.timeFrame}`;
        return url;
    }

    changeItems(strategy, timeFrame)
    {
        console.log('made it back to body');
        console.log(this);
        this.setState({
            strategy: strategy[0],
            timeFrame: timeFrame[0]
        });
    }

    callApi()
    {
        let url = this.getFullUrl()
        fetch(url)
            .then(res => res.json())
            .then(
                res => {
                    let topartists = res.topartists.artist;
                    this.setState({artists: topartists})
                },
                err => {console.log(err)}
            )
    }

    componentDidMount()
    {
        this.callApi();
    }

    render()
    {
        return(
            <MainMenu changeItems={this.changeItems}/>
        )
    }
}