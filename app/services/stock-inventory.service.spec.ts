/*import { TestBed } from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from "@angular/platform-browser-dynamic/testing";
import {Http, ResponseOptions} from "@angular/http";
import {StockInventoryService} from './stock-inventory.service';
import {Observable} from "rxjs";
import {get} from "http";

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

function createResponse(body){
    return Observable.of(
        new Response(new ResponseOptions({body: JSON.stringify(body)}))
    )
}

class MockHttp{
    get(){
        return createResponse([]);
    }
}

const cartItems = [{ product_id: 1, quantity: 3,}, {product_id:2, quantity: 10}];
const productItems = [{ id: 1, price: 10, name: 'Test' }, { id: 2, price: 100, name: 'Another Test' }];

describe("StockInventoryService", () => {

    let service: StockInventoryService, http: Http;

    beforeEach(() => {
        const bed = TestBed.configureTestingModule({
            providers:[
                StockInventoryService,
                {provide: Http, useClass: MockHttp}
            ]
        });
        http = bed.get(Http);
        service = bed.get(StockInventoryService);
    });

    it("devolver los items del carrito", () => {
        spyOn(http, "get").and.returnValue(createResponse([...cartItems]));

        service.getCartItems()
            .subscribe(result => {
                expect(result.length).toBe(2);
                expect(result).toEqual(cartItems);
            })
    });

    it("devolver los productos", () => {
        spyOn(http, "get").and.returnValue(createResponse([...productItems]));

        service.getProducts()
            .subscribe(result => {
                expect(result.length).toBe(2);
                expect(result).toEqual(productItems);
            })
    })

});*/