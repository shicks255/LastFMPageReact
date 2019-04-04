import React from 'react';

export default class Profile extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let time = new Date(this.props.registered*1000);
        let count = this.props.playCount
        count = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

        return(
            <div className={"card is-horizontal columns"}>
                <div className={"card-image column is-two-fifths is-centered"}>
                    <figure className={"image is-square"}>
                        <img className={"image"} src={this.props.userAvatar}/>
                    </figure>
                </div>
                <div className={"card-stacked column is-three-fifths is-narrow"}>
                    <div className={"card-content"}>
                        <h3 className={"title"} style={{marginBottom: "0"}}>
                            {this.props.userName}
                        </h3>
                        <br/>
                        <b>Registered:</b> {time.toLocaleString()}
                        <br/>
                        <b>Play Count:</b> {count}
                    </div>
                </div>
            </div>
        )
    }

}