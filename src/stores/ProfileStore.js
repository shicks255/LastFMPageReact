import {observable, decorate, action, computed} from "mobx";

class ProfileStore {
    showModal: boolean = false;
    typeUsername: string = '';
    modalErrorMessage: string = '';

    toggleUsernameModal = () => {
        console.log(this);
        this.showModal = !this.showModal;
        console.log(this.showModal);
    }

    changeUsername = (userName: string) => {
        this.typeUsername = userName;
    }

    submitUsername = () => {
        let key = 'c349ab1fcb6b132ffb8d842e982458db';
        let url = `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${this.typeUsername}&api_key=${key}&format=json`;
        fetch(url)
            .then(res => res.json())
            .then(
                res => {
                    if (res.user && res.user.playcount > 0)
                    {
                        let tempUsername = this.typeUsername;
                        this.showModal = false;
                        // this.props.changeUsername(tempUsername);
                    }
                    else
                        this.modalErrorMessage = `username of ${this.state.typeUsername} does not exist`;
                },
                err => {
                    console.log(`Problem loading data ${err}`);
                }
            )
    }
}

decorate(ProfileStore,{
    showModal: observable,
    typeUsername: observable,
    modalErrorMessage: observable,
});

export const profileStore =  new ProfileStore();