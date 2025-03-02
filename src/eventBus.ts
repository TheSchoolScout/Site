import mitt from "mitt";

type Events = {
    reloadInit: any;
};

const eventBus = mitt<Events>();

export default eventBus;
