import './DLApp.css';

function DLApp({ dl_data }) {
    return (
        <div className="dl_app">
            <h1 className="heading">Draggable App</h1>
            <div className="dl-container">
                <ul>
                    {dl_data.map((list, index) => {
                        return <li key={"dl_li_" + index} id={"dl_li_" + index}>{list}</li>
                    })}
                </ul>
                {document.addEventListener('DOMContentLoaded', () => {
                    const draggable_container = document.querySelector('.dl_app .dl-container ul');
                    draggable_container.ondragover = e => {
                        e.preventDefault();
                        const dragging_e = document.querySelector('.dragging');
                        const next_e = get_drag_nextElement(draggable_container, e.clientY);
                        if (next_e == null) draggable_container.appendChild(dragging_e);
                        else draggable_container.insertBefore(dragging_e, next_e);
                    };
                    dl_data.forEach((list, index) => {
                        const list_item = document.getElementById(`dl_li_${index}`);
                        list_item.draggable = true;
                        list_item.ondragstart = e => list_item.classList.add('dragging');
                        list_item.ondragend = e => list_item.classList.remove('dragging');
                    })
                })}
            </div>
        </div>
    );
}

function get_drag_nextElement(draggable_container, y) {
    const draggable_es = [...draggable_container.querySelectorAll('li:not(.dragging)')];
    return draggable_es.reduce((nearest_e, draggable_e) => {
        const element = draggable_e.getBoundingClientRect();
        const offset = y - element.top - element.height / 2;
        if (offset < 0 && offset > nearest_e.offset) {
            return { offset, draggable_e }
        } else { return nearest_e }
    }, { offset: Number.NEGATIVE_INFINITY }).draggable_e;
}

export default DLApp;
