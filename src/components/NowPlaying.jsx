import React from 'react';


export default class NowPlaying extends React.Component {

    constructor(props)
    {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        // if (prevProps.nowPlaying !== this.props.nowPlaying)
        // {
        //     console.log('update from now playing');
        //     this.render();
        // }
    }

    render(){
        let nowPlaying;
        if (this.props.nowPlaying)
            nowPlaying =
                <div className={"nowPlaying"}>
                    <br/>
                    <div className={"level"}>
                        <div className={"level-item"} >
                            <table>
                                <tbody>
                                <tr>
                                    <td rowSpan={2}>
                                        <img alt={""} className={"image"} src={this.props.nowPlaying.image[1]['#text']}/>
                                    </td>
                                    <td>&nbsp;</td>
                                    <td style={{textAlign: "center"}}>
                                    <span className={"nowPlaying"}>
                                        {this.props.nowPlaying.artist['#text']} - {this.props.nowPlaying.name}
                                    </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td>
                                        <img alt={""} className={"gif"} src={process.env.PUBLIC_URL + "/YdBO.gif"}/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        return(
            <span>
            {nowPlaying}
            </span>
        );
    }
}
