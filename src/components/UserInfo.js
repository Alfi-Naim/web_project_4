export default class UserInfo {

    constructor({ name, job, avatar }) {
        this._name = document.querySelector(name);
        this._job = document.querySelector(job);
        this._avatar = document.querySelector(avatar);
    }

    getUserInfo(){
        const name = this._name.textContent;
        const job = this._job.textContent;
        const avatar = this._avatar.src;
        return { name: name, job: job, avatar: avatar};
    }

    setUserInfo(name, job){
        this._name.textContent = name;
        this._job.textContent = job;
    }

    getUserAvatar(){
        return {link: this._avatar.src};
    }

    setUserAvatar(link){
        this._avatar.src = link;
    }
}