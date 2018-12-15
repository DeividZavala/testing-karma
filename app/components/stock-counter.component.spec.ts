import {StockCounterComponent} from "./stock-counter.component";
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from "@angular/platform-browser-dynamic/testing";

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

describe("StockCounterComponent", () => {
    let component: StockCounterComponent;
    let fixture: ComponentFixture<StockCounterComponent>;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [
                StockCounterComponent
            ]
        });

        fixture = TestBed.createComponent(StockCounterComponent);
        component = fixture.componentInstance;
        component.value = 0;

    });

    it("Debe aumentar el valor", () => {
        component.increment();
        expect(component.value).toBe(1);
    });

    it("Debe disminuir el valor", () => {
        component.increment();
        expect(component.value).toBe(1);
        component.decrement();
        expect(component.value).toBe(0);
    });

    it("No debe pasar el valor máximo", () => {
        for(let i = 0; i < 150; i++){
            component.increment();
        }
        expect(component.value).toBe(100);
    });

    it("No debe pasar el valor minimo", () => {
        component.increment();
        expect(component.value).toBe(1);
        component.decrement();
        expect(component.value).toBe(0);
        component.decrement();
        expect(component.value).toBe(0);
    });

    it("No debe incrementar más del valor máximo", () => {
        component.step = 20;
        component.max = 20;
        component.increment();
        component.increment();
        expect(component.value).toBe(20);
    });

    it("Debe de regresar el resultado al cambiar el valor", () => {
        spyOn(component.changed, "emit").and.callThrough();
        component.step = 100;
        component.increment();
        expect(component.changed.emit).toHaveBeenCalledWith(100);
    })

});