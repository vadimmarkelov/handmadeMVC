'use strict';

describe('OOP', function() {

    it('should be present', function() {
        expect(typeof OOP).toBe('object');
    });

    it('should have Observable proto', function() {
        expect(typeof OOP.Observable).toBe('function');
    });

    it('should have basic Model proto', function() {
        expect(typeof OOP.Model).toBe('function');
    });

    it('should have extendObj helper', function() {
        expect(typeof OOP.extendObj).toBe('function');
    });

    describe('Observable', function() {

        var observableObject;

        beforeEach(function(){
            observableObject = new OOP.Observable();
        });

        it('should accept subscribers', function() {
            
            var handler = {
                'update': function () {}
            };

            observableObject.subscribe(handler);

            expect(observableObject._handlers).toBeDefined();
            expect(observableObject._handlers[0]).toBe(handler);
        });

        it('should remove subscribers', function() {
            
            var handler = {
                'update': function () {}
            };

            observableObject.subscribe(handler);
            observableObject.unsubscribe(handler);
            expect(observableObject._handlers.length).toBe(0);
        });

        it('should notify subscribers', function() {
            
            var handler = {
                'update': function () {}
            };

            spyOn(handler, 'update');

            observableObject.subscribe(handler);
            observableObject.notify('update');

            expect(handler.update).toHaveBeenCalled();
        });


    });
    
    describe('Model', function() {

        var theModel;

        beforeEach(function(){
            theModel = new OOP.Model({someModelData: 123});
        });

        it('should have properties from init obj', function() {
            expect(theModel.someModelData).toBeDefined();
            expect(theModel.someModelData).toBe(123);
        });

        it('should inherit Observable methods', function() {
            expect(theModel.subscribe).toBeDefined();
            expect(theModel.unsubscribe).toBeDefined();
            expect(theModel.notify).toBeDefined();
        });

        it('should set properties', function() {
            theModel.set('someModelData',5);
            expect(theModel.someModelData).toBe(5);
        });

        it('should get properties', function() {
            expect(theModel.get('someModelData')).toBe(123);
        });

        it('should set properties', function() {
            theModel.set('someModelData',5);
            expect(theModel.someModelData).toBe(5);
        });

        it('should notify subscribers for changes', function() {
            var handler = {
                'update': function () {}
            };

            spyOn(handler, 'update');

            theModel.subscribe(handler);
            theModel.set('someModelData',5);
            expect(handler.update).toHaveBeenCalled();
        });


    });

});
