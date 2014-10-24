'use strict';

describe('App', function() {

    describe('Items list', function() {

        var items = new List('Carrots', 'Pears', 'Fish', 'Milk', 'Bread');

        it('should be created', function() {
            expect(typeof items).toBe('object');
        });

        it('should have initial data', function() {
            expect(items.get('count')).toEqual(5);
        });

        it('should insert new item', function() {
            items.add('New item');
            expect(items.get('count')).toEqual(6);
        });

        it('should remove item by index', function() {
            items.remove(1);
            expect(items.get('count')).toEqual(5);
        });

    });
});