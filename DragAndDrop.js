/**
 * Drag and drop mechanism
 * @param {string} selectorDraggableElements - The elements that can be dragged
 * @param {string} selectorDropLocations - The places where the elements can be dropped
 */
export default class DragAndDrop {
    constructor(
        selectorDraggableElements,
        selectorDropLocations
    ) {
        document.querySelectorAll(selectorDraggableElements).forEach(element => {
            element.addEventListener('mousedown', this.grab);
            element.addEventListener('mouseup', this.drop);
        });
        this.#selectorDropLocations = selectorDropLocations;
    }

    #selectorDropLocations = '';
    #draggableElement = null;
    #grabCoordinationX = 0;
    #grabCoordinationY = 0;
    #currentDropLocation = null;
    #locationBelowCursor = null;

    /**
     * @param event {MouseEvent}
     */
    grab = (event) => {
        if (event.button || event.ctrlKey) {
            return;
        }

        this.#draggableElement = event.currentTarget;
        this.#grabCoordinationX = event.clientX - this.#draggableElement.getBoundingClientRect().left;
        this.#grabCoordinationY = event.clientY - this.#draggableElement.getBoundingClientRect().top;
        this.#currentDropLocation = this.#draggableElement.closest(this.#selectorDropLocations);
        this.#locationBelowCursor = null;

        this.#fixAppearanceElement(this.#draggableElement);
        document.addEventListener('mousemove', this.move);
    }

    move = (event) => {
        this.#draggableElement.style.left = (event.pageX - this.#grabCoordinationX).toString().concat('px');
        this.#draggableElement.style.top = (event.pageY - this.#grabCoordinationY).toString().concat('px');

        this.#draggableElement.hidden = true;
        this.#locationBelowCursor = document.elementFromPoint(event.clientX, event.clientY).closest(this.#selectorDropLocations);
        this.#draggableElement.hidden = false;

        if (this.#locationBelowCursor !== this.#currentDropLocation && this.#locationBelowCursor && this.#currentDropLocation.classList.contains('kanban-table__move-task')) {
            this.#currentDropLocation.classList.remove('kanban-table__move-task');
        }

        if (this.#locationBelowCursor !== this.#currentDropLocation && this.#locationBelowCursor) {
            this.#locationBelowCursor.classList.add('kanban-table__move-task');
            this.#currentDropLocation =this.#locationBelowCursor;
        }
    }

    drop = () => {
        if (this.#currentDropLocation) {
            this.#currentDropLocation.append(this.#draggableElement);
        }

        this.#setInitialStyles(this.#draggableElement);
        this.#currentDropLocation.classList.remove('kanban-table__move-task');
        document.removeEventListener('mousemove', this.move);
    }

    /**
     * Fix the appearance of the element before moving it
     * @param node {HTMLElement}
     */
    #fixAppearanceElement(node) {
        node.style.width = node.offsetWidth.toString().concat('px');
        node.style.position = 'absolute';
        node.style.zIndex = '100';
    }

    /**
     * Set initial styles to the element
     * @param node {HTMLElement}
     */
    #setInitialStyles(node) {
        node.style.position = 'initial';
        node.style.width = 'initial';
        node.style.top = 'initial';
        node.style.left = 'initial';
    }
}
