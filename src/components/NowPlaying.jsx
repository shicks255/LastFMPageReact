import React from 'react';

export default class NowPlaying extends React.Component {
    constructor(props)
    {
        super(props);

    }

    render()
    {
        let content
        if (this.props.nowPlaying)
            content = <div className={"level-item"} >
                <img className={"image"} src={this.props.nowPlaying.image[0]['#text']}/> {this.props.nowPlaying.artist['#text']} - {this.props.nowPlaying.name}
            </div>
        return(
            <div className={"level"}>
                <div className={"level-item"}>
                    {content}
                </div>
            </div>
        )


    }

}