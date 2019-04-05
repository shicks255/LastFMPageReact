import React from 'react';

export default class Profile extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            showModal: false,
            typeUsername: ''
        }

        this.toggleUsernameModal = this.toggleUsernameModal.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.submitUsername = this.submitUsername.bind(this);
    }

    changeUsername(event)
    {
        let userName = event.target.value;
        this.setState({typeUsername: userName});
    }

    submitUsername()
    {
        console.log(this.state.typeUsername);
        this.props.changeUsername(this.state.typeUsername);
    }

    toggleUsernameModal()
    {
        if (this.state.showModal)
            this.setState({showModal: false});
        else
            this.setState({showModal: true});
    }

    render()
    {
        let timeRegistered = new Date(this.props.registered*1000);
        let playCount = this.props.playCount
        playCount = playCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

        let modalClass = this.state.showModal ? 'modal is-active' : 'modal';

        let modal = <div className={modalClass}>
            <div className={"modal-background extraModal"}>
            </div>
            <div className={"modal-content"}>
                <div className={"box"}>
                    <label htmlFor={"newUsername"}>Enter a new Username:</label>
                    <input onChange={(e) => this.changeUsername(e)} type={"text"} id={"newUsername"} aria-placeholder={"Username"}></input>
                    <button onClick={this.submitUsername}>Submit</button>
                </div>
            </div>
            <button onClick={this.toggleUsernameModal} className={"modal-close is-large"} aria-label={"close"}></button>
        </div>

        return(
            <div>
                <div className={"card columns"}>
                    <i className="fas fa-user-edit userIcon" onClick={this.toggleUsernameModal}></i>
                    <div className={"card-image column is-two-fifths is-centered"}>
                        <figure className={"image is-square"}>
                            <img className={"image is-rounded"} src={this.props.userAvatar}/>
                        </figure>
                    </div>
                    <div className={"card-stacked column is-three-fifths is-narrow"}>
                        <div className={"card-content"}>
                            <h3 className={"title"} style={{marginBottom: "0"}}>
                                {this.props.userName}
                            </h3>
                            <br/>
                            <b>Registered:</b> {timeRegistered.toLocaleString()}
                            <br/>
                            <b>Play Count:</b> {playCount}
                        </div>
                    </div>
                </div>
                {modal}
            </div>
        )
    }

}