function createTodo (todo, index) {
    const item = document.createElement('div');
    item.classList.add('todo-card-container');
    item.setAttribute('data-index', index);
    const HTMLSnippet = `
        <h4 class="todo-title">
        ${todo.title}
        </h4>
        <p class="todo-description">
            ${todo.description}
        </p>
        <div class="done"></div>
    `;
    item.innerHTML = HTMLSnippet;
    
    return item;
};

export default {createTodo};
