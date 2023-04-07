export default class ModelTask {
    /**
     *
     * @param title {string}
     * @param detail {string}
     * @param group {string}
     * @param index {number}
     * @param order {number}
     */
    constructor(title, detail, group, index, order= 0) {
        this.#title = title;
        this.#detail = detail;
        this.#group = group;
        this.#index = index;
        this.#order = order;
    }

    #title;
    #detail;
    #group;
    #order;
    #index;
    #element;

    /**
     * @return {string}
     */
    get title() {
        return this.#title;
    }

    /**
     * @return {string}
     */
    get detail() {
        return this.#detail;
    }

    /**
     * @return {number}
     */
    get order() {
        return this.#order;
    }

    /**
     * @param order {number}
     */
    set order(order) {
        this.#order = order;
    }

    /**
     * @return {string}
     */
    get group() {
        return this.#group;
    }

    /**
     * @param group {string}
     */
    set group(group) {
        this.#group = group;
    }

    /**
     * @return {number}
     */
    get index() {
        return this.#index;
    }

    /**
     * @param index {number}
     */
    set index(index) {
        this.#index = index;
    }

    /**
     * @return {HTMLDivElement}
     */
    get element() {
        return this.#element;
    }

    /**
     * Get JavaScript object of Task
     * @return {{title}}
     */
    get object() {
        return {
            title: this.title,
            detail: this.detail,
            order: this.order,
            group: this.group,
            index: this.index
        }
    }

    /**
     * Convert JavaScript object of Task to JSON sting
     * @return {string}
     */
    deserialize() {
        return JSON.stringify(this.object);
    }

    /**
     * Convert JSON object to Task class
     * @param taskJSON {string}
     * @return {ModelTask}
     */
    static serialize(taskJSON) {
        const taskDataStructure = JSON.parse(taskJSON);
        return new ModelTask(
            taskDataStructure.title,
            taskDataStructure.detail,
            taskDataStructure.group,
            taskDataStructure.index,
            taskDataStructure.order,
        );
    }
}
