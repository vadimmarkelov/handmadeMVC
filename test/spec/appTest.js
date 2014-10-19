'use strict';

describe('App', function() {

    describe('Items list', function() {

        var items=new ItemsList({
            data: [{name: 'Some item #1'}, {name: 'Some item #2'}]
        });

        it('should be created', function() {
            expect(typeof items).toBe('object');
        });

        it('should have initial data', function() {
            expect(items.getItems().length).toEqual(2);
        });

        it('should insert new item', function() {
            expect(items.insert({name:'New item'}).getItems().length).toEqual(3);
        });

        it('should insert new item and order list', function() {
            expect(items.insert({name:'aaa'}).getItems()[0]['name']).toEqual('aaa');
        });

        it('should remove item by name', function() {
            expect(items.remove({name:'aaa'}).getItems().length).toEqual(3);
        });

        it('should support chaining', function() {
            expect(items.insert({name:'1'}) instanceof ItemsList).toBeTruthy();
        });

        it('should ignore data duplication', function() {
            expect(items.insert({name:'1'}).getItems().length).toBeTruthy(3);
        });

        it('should trim spaces', function() {
            expect(typeof items.insert({name:' 2 '}).getItem('2')).toBe('object');
        });
    });
});