export default class ProjectMaker {
    constructor(title, priority) {
        Object.assign(this, {title, priority});
        this.list = [];
    }
}