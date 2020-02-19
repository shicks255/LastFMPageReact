import {decorate, observable} from "mobx";


class UIStore {
    modalImageSrc: string = '';
    modalImageCaption: string = '';
    loading: boolean = true;


}

decorate(UIStore, {
    modalImageSrc: observable,
    modalImageCaption: observable,
    loading: observable,
});
