// TODO: The typedefs are wrong and cause compile errors. Either fix or don't use
import {ProductInfo, PublicClient, WebsocketClient} from "gdax";
import {Events} from "../../events/Events";

export class GdaxApi {
    public websocketClient: WebsocketClient;
    public httpClient: PublicClient;

    constructor(private eventHub) {
       this.httpClient = new PublicClient();
    }

    public async getPriceHistory(productIds: string[]): Promise<any> {
       return this.httpClient.getProductHistoricRates(productIds);
    }

    public async getProducts(): Promise<ProductInfo[]> {
        return this.httpClient.getProducts();
    }

    public subscribe(productIds: string[], callback: (data) => void) {

        this.unsubscribe();
        this.websocketClient = new WebsocketClient(productIds);
        this.websocketClient.on("open", () => this.publishEvent("GDAX Websocket: Open"));
        this.websocketClient.on("message", callback);
        this.websocketClient.on("error", (err) => this.publishEvent(`GDAX Websocket: Error (${err})`));
        this.websocketClient.on("close", () => this.publishEvent("GDAX Websocket: Close"));
    }

    public unsubscribe() {
        this.websocketClient.disconnect();
    }

    private publishEvent(data: string) {
        this.eventHub.publish(Events.LogEvent, data);
    }
}