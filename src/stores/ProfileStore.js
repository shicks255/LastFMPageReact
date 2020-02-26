import {observable, decorate, action} from "mobx";

class ProfileStore {
    showModal: boolean = false;
    typeUsername: string = '';
    modalErrorMessage: string = '';
    userName: string = localStorage.getItem('userName') || 'shicks255';
    userAvatar: string = "";
    playCount: number = 0;
    registered: 0;
    apiKey = process.env.REACT_APP_LAST_FM_KEY;

    getUserInfo() {
        let url = `https://ws.audioscrobbler.com/2.0/?method=user.getinfo
        &user=${this.userName}
        &api_key=${this.apiKey}
        &format=json`;
        return fetch(url)
            .then(res => res.json())
            .then(
                res => {this.updateInfo(res);},
                err => {console.log(err);}
            )
    }

    toggleUsernameModal = () => {
        this.showModal = !this.showModal;
    }

    changeUsername = (userName: string) => {
        this.typeUsername = userName;
    }

    updateInfo = (res) => {
        this.userAvatar = res.user.image[3]['#text'];
        this.playCount = res.user.playcount;
        this.registered = res.user.registered['#text'];
    }

    submitUsername = () => {
        let url = `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${this.typeUsername}&api_key=${this.apiKey}&format=json`;
        return fetch(url)
            .then(res => res.json())
            .then(
                res => {
                    if (res.user && res.user.playcount > 0)
                    {
                        let tempUsername = this.typeUsername;
                        this.showModal = false;
                        this.userName = tempUsername;
                        localStorage.setItem('userName', tempUsername);
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
    userName: observable,
    userAvatar: observable,
    playCount: observable,
    registered: observable,
    updateInfo: action,
    getUserInfo: action,
});

export const profileStore =  new ProfileStore();