import React from 'react';

export default class Profile extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            showModal: false,
            typeUsername: '',
            modalErrorMessage: ''
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
        let key = 'c349ab1fcb6b132ffb8d842e982458db';
        let url = `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${this.state.typeUsername}&api_key=${key}&format=json`;
        fetch(url)
            .then(res => res.json())
            .then(
                res => {
                    if (res.user && res.user.playcount > 0)
                    {
                        let tempUsername = this.state.typeUsername;
                        this.setState(
                            {
                                showModal: false,
                                typeUsername: '',
                                modalErrorMessage: ''
                            });
                        this.props.changeUsername(tempUsername);
                    }
                    else
                        this.setState({modalErrorMessage: `username of ${this.state.typeUsername} does not exist`});
                },
                err => {
                    console.log('Problem loading data')
                }
            )
    }

    toggleUsernameModal()
    {
        if (this.state.showModal)
            this.setState(
                {
                    showModal: false,
                    typeUsername: '',
                    modalErrorMessage: ''
                });
        else
            this.setState(
                {
                    showModal: true,
                    typeUsername: '',
                    modalErrorMessage: ''
                });
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
                    <br/>
                    <span><b><i>{this.state.modalErrorMessage}</i></b></span>
                </div>
            </div>
            <button onClick={this.toggleUsernameModal} className={"modal-close is-large"} aria-label={"close"}></button>
        </div>

        return(
            <div className={"box relativeK"}>
                <div className={"columns"}>
                    <div className={"column is-two-fifths is-centered"}>
                        <figure className={"image is-square"}>
                            <img alt={""} className={"image is-rounded"} src={this.props.userAvatar}/>
                        </figure>
                    </div>
                    <div className={"card-stacked column is-three-fifths is-narrow"}>
                        <h3 className={"title"} style={{marginBottom: "0"}}>
                            {this.props.userName}
                        </h3>
                        <br/>
                        <b>Registered:</b> {timeRegistered.toLocaleString()}
                        <br/>
                        <b>Play Count:</b> {playCount}
                        <i className="fas fa-user-edit userIcon" onClick={this.toggleUsernameModal}></i>
                    </div>
                </div>
                {modal}
            </div>
        )
    }

}