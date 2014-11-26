'use strict';

describe('Rooms model', function() {
    var roomModel;

    beforeEach(function(){
        roomModel = new RoomList(roomData);
    });

    it('Model to be initialised', function() {
        expect(roomModel.items.length).not.toBe(0);
    });
    
    it('Model to autocalculate order summary at start', function() {
        expect(roomModel.get('totalRooms')).toBe(0);
        expect(roomModel.get('totalPeople')).toBe(0);
        expect(roomModel.get('totalPrice')).toBe(0);
    });
    
    it('Model to autocalculate order summary after change', function() {
        roomModel.getByIndex(0).set('count',1);
        expect(roomModel.get('totalRooms')).toBe(1);
        expect(roomModel.get('totalPeople')).toBe(2);
        expect(roomModel.get('totalPrice')).toBe(88.99);
    });
    

});

describe('Rooms table', function() {
    var roomModel, roomElement, roomView, roomsController;

    beforeEach(function(){
        roomModel = new RoomList(roomData);
        roomElement = $('<section class="rooms"></section>');
        roomView = new RoomView(roomElement, 
                                                '<form>'+
                                                '    <table>'+
                                                '        <thead>'+
                                                '            <tr>'+
                                                '                <th class="sortable" data-sortable-by="occupancy"></th>'+
                                                '                <th class="sortable" data-sortable-by="price"></th>'+
                                                '                <th></th>'+
                                                '            </tr>'+
                                                '        </thead>'+
                                                '        <tbody>'+
                                                '            {{#each rooms}}'+
                                                '                <tr class="one_room">'+
                                                '                    <td class="room_name">{{this.name}}</td>'+
                                                '                    <td class="room_occupancy">{{this.occupancy}}</td>'+
                                                '                    <td class="room_price">{{this.price}}</td>'+
                                                '                    <td class="room_quantity">'+
                                                '                        <select name="room[]" data-index="{{@index}}">'+
                                                '                            {{#times this.maxCount}}'+
                                                '                                <option value="{{this}}" {{#IfEqual this ../count}}selected="selected"{{/IfEqual}}>{{this}}</option>'+
                                                '                            {{/times}}'+
                                                '                        </select>'+
                                                '                    </td>'+
                                                '                </tr>'+
                                                '            {{/each}}'+                                                                                 
                                                '        </tbody>'+
                                                '        <tfoot>'+
                                                '            <tr>'+
                                                '                <td>'+
                                                '                    {{#if totalRooms}}'+
                                                '                    Total: {{totalRooms}} room(s) with occupancy of {{totalPeople}} place(s) for &euro;{{totalPrice}}'+
                                                '                    {{/if}}'+
                                                '                    <button class="button" type="submit" {{#unless totalRooms}}disabled="disabled"{{/unless}}>Book Now</button>'+
                                                '                </td>'+
                                                '            </tr>'+
                                                '        </tfoot>'+
                                                '    </table>'+
                                                '</form>');
        roomsController = new RoomController(roomModel, roomView);

    });

    it('Table to show room names', function() {
        expect(roomElement.find('.room_name:first').html()).toBe('Basic 2 Bed');
    });
    
    it('Table to sort by price', function() {
        roomElement.find('.sortable[data-sortable-by=price]').trigger('click');
        expect(roomElement.find('.room_name:first').html()).toBe('Basement 1 Bed');
    });

    it('Table to sort by price in reverse order', function() {
        roomElement.find('.sortable[data-sortable-by=price]').trigger('click');
        roomElement.find('.sortable[data-sortable-by=price]').trigger('click');
        expect(roomElement.find('.room_name:first').html()).toBe('Mega XL Suite');
    });

    it('Table to sort by occupancy', function() {
        roomElement.find('.sortable[data-sortable-by=occupancy]').trigger('click');
        expect(roomElement.find('.room_name:first').html()).toBe('Single Room');
    });


});
