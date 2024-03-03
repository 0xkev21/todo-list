// sanitizer to use innerHTML without security concern
export default function sanitize(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}