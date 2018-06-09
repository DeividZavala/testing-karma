import {FileSizePipe} from "./file-size.pipe";

describe('FileSize', () => {

    const pipe = new FileSizePipe();

    describe('Isolate FileSize pipe test', () => {

        it('Debe de convertir a megabytes', () => {
            expect(pipe.transform(123456789)).toBe('117.74MB');
            expect(pipe.transform(987654321)).toBe('941.90MB');
        });

        it('Debe de usar la extension por defecto si no se manda', () => {
            expect(pipe.transform(123456789)).toBe('117.74MB');
            expect(pipe.transform(987654321)).toBe('941.90MB');
        });

        it('Debe de usar la extensio que se le mande', () => {
            expect(pipe.transform(123456789, "frepo")).toBe('117.74frepo');
            expect(pipe.transform(987654321, "TB")).toBe('941.90TB');
        });

    })
});