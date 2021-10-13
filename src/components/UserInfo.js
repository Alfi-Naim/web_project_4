export default class UserInfo {

    constructor({ name, job }) {
        this._name = document.querySelector(name);
        this._job = document.querySelector(job);
    }

    getUserInfo(){
        let name = this._name.textContent;
        let job = this._job.textContent;
        return { name: name, job: job};
    }

    setUserInfo({ name, job }){
        this._name.textContent = name;
        this._job.textContent = job;
    }
}