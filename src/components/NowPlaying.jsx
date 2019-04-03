import React from 'react';

export default class NowPlaying extends React.Component {
    constructor(props)
    {
        super(props);

    }

    render()
    {
        let nowPlaying
        if (this.props.nowPlaying)
            nowPlaying =
                <div>
                    <div className={"level"} style={{marginBottom: "0"}}>
                        <div className={"level-item"}>
                            Now Playing...
                            <img className={"gif"} src={process.env.PUBLIC_URL + "/YdBO.gif"}/>
                        </div>
                    </div>
                    <div className={"level"}>
                        <div className={"level-item"} >
                            <img className={"image"} src={this.props.nowPlaying.image[0]['#text']}/> {this.props.nowPlaying.artist['#text']} - {this.props.nowPlaying.name}
                        </div>
                    </div>
                </div>
        return(
            <span>
            {nowPlaying}
            </span>
        )


    }

}