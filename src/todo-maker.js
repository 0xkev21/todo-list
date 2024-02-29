export default class TodoMaker {
    constructor(title, description, dueDate, priority, notes, done) {
        Object.assign(this, {title, description, dueDate, priority, notes, done});
    };
};