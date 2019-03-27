import React from 'react';
import MainMenu from "./MainMenu";

export default class Body extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            strategy: "",
            timeFrom: ""
        }
    };

    changeItems(strategy, timeFrame)
    {
        console.log(strategy, timeFrame)
    }


    render()
    {
        return(
            <MainMenu changeItems={this.changeItems}/>
        )
    }


}