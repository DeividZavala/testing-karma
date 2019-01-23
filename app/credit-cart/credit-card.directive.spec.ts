import { DebugElement, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { CreditCardDirective } from './credit-card.directive';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

@Component({
    template: `
    <input type="text" [value]="value" credit-card>
  `
})
class TestComponent {

}

describe('CreditCardDirective', () => {

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let el: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                CreditCardDirective,
                TestComponent
            ]
        });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
    });

    it("Debe formatear el valor del input con espacios", () => {
        const directive = el.query(By.directive(CreditCardDirective)).nativeElement;
        directive.value = "123456";
        directive.dispatchEvent(new Event("input"));
        expect(directive.value).toBe("1234 56");
        directive.value = "1234567890234567";
        directive.dispatchEvent(new Event("input"));
        expect(directive.value).toBe("1234 5678 9023 4567");
    })

    it("Debe tener una longitud maxima de 16 caracteres", () => {
        const directive = el.query(By.directive(CreditCardDirective)).nativeElement;
        directive.value = "123456789023456723423424534455765675345";
        directive.dispatchEvent(new Event("input"));
        expect(directive.value).toBe("1234 5678 9023 4567");
    })

});