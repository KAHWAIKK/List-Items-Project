
//create an interface
export interface Item {
    id : string;
    item: string;
    checked : boolean;
}

//create a class
export default class ListItem implements Item {




    /* we would need to create this class with an id,an item and checked. This three items will be the getters and the setters, when you have the state of the class they would have an underscore  */
    constructor(
        private _id : string = '',
        private _item : string = '',
        private _checked : boolean = false,
    ){}

    /* Implementing our interface with getters and setters */
    get id() : string { 
        return this._id; 
    }

    set id(id : string)  {
         this._id = id;
    }
    /* Implement both getter and setter for item and checked */
    get item() : string { 
        return this._item; 
    }

    set item(item : string)  {
         this._item = item;
    }

    get checked() : boolean { 
        return this._checked; 
    }

    set checked(checked : boolean)  {
         this._checked = checked;
    }
}