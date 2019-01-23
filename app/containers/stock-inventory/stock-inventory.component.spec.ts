import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { DebugElement } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { StockInventoryComponent } from './stock-inventory.component';
import { StockBranchComponent } from '../../components/stock-branch/stock-branch.component';
import { StockCounterComponent } from '../../components/stock-counter/stock-counter.component';
import { StockProductsComponent } from '../../components/stock-products/stock-products.component';
import { StockSelectorComponent } from '../../components/stock-selector/stock-selector.component';
import { StockInventoryService } from '../../services/stock-inventory.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

class MockStockInventoryService {
    getProducts() {
        return Observable.of([{ id: 1, price: 10, name: 'Test' }, { id: 2, price: 100, name: 'Another test'}]);
    }
    getCartItems() {
        return Observable.of([{ product_id: 1, quantity: 10 }, { product_id: 2, quantity: 5 }]);
    }
}

describe('StockInventoryComponent', () => {

    let component: StockInventoryComponent;
    let fixture: ComponentFixture<StockInventoryComponent>;
    let el: DebugElement;
    let service: StockInventoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule
            ],
            declarations: [
                StockInventoryComponent,
                StockBranchComponent,
                StockCounterComponent,
                StockSelectorComponent,
                StockProductsComponent
            ],
            providers: [
                {provide: StockInventoryService, useClass: MockStockInventoryService}
            ]
        });

        fixture = TestBed.createComponent(StockInventoryComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        service = el.injector.get(StockInventoryService)

    });


    it("Debe de traer los productos y los items del carrito al iniciar el componente", () =>{
        spyOn(service,"getProducts").and.callThrough();
        spyOn(service,"getCartItems").and.callThrough();

        component.ngOnInit();
        expect(service.getCartItems).toHaveBeenCalled();
        expect(service.getProducts).toHaveBeenCalled();
    });

    it("Debe crear un mapeo de la respuesta del servicio", () => {
        component.ngOnInit();
        expect(component.productsMap.get(1)).toEqual({ id: 1, price: 10, name: 'Test' });
        expect(component.productsMap.get(2)).toEqual({ id: 2, price: 100, name: 'Another test' });
    });

    it("Debe almacenar la respuesta de productos", () => {
        component.ngOnInit();
        expect(component.products).toEqual([{ id: 1, price: 10, name: 'Test' }, { id: 2, price: 100, name: 'Another test'}]);
    });

    it("Debe crear un item de stock por cada producto de la carrito", () => {
        spyOn(component, "addStock");
        component.ngOnInit();
        expect(component.addStock).toHaveBeenCalledWith({ product_id: 1, quantity: 10 });
        expect(component.addStock).toHaveBeenCalledWith({ product_id: 2, quantity: 5 });
    })


});