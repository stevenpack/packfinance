"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SingleCurrency_1 = require("./layouts/SingleCurrency");
const Container_1 = require("./Container");
const UnhandledExceptionHandler_1 = require("./UnhandledExceptionHandler");
class App {
    constructor(argv) {
        this.argv = argv;
    }
    loadUI() {
        const container = new Container_1.default(this.argv);
        const exHandler = new UnhandledExceptionHandler_1.UnhandledExceptionHandler(container.eventHub);
        exHandler.init();
        this.screen = new SingleCurrency_1.SingleCurrency(container.eventHub, container);
        this.screen.init();
        this.screen.load()
            .then(() => { })
            .catch((err) => console.error(err));
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map