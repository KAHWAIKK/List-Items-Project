/* We will create another model for our full list */

import ListItem from "./ListItem";


/* We will create another interface that will refer to our getter for the list ,it will also have several methods for the list */

interface List{
     list : ListItem[],/* this is one of the getters */
     load(): void,/* void meaning it will nit return anything */
     save(): void,
     clearList(): void,
     addItem( itemObj : ListItem ): void,
     removeItem(id : string): void,
}

export default class FullList implements List{



    /* we will have a constructor that will receive a List that will also be private, it  will also have the methods  */
    /* we will add the private keyword infront of the constructor function since we will only have one list in our application */

    static instance : FullList = new FullList()
    private constructor (


        
        private _list: ListItem[] = []
    ){}

    /* creating getter for the list */

    get list() : ListItem[] {
        return this._list
    }

    load(): void {
        /*  */
        const storedList : string | null = localStorage.getItem("myList")
        /* add a typeguard */
        if (typeof storedList !== "string") return

        const parsedList : {
            _id : string  ,
             _item : string  ,
             _checked : boolean,
        }[] = JSON.parse(storedList)

        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
            FullList.instance.addItem(newListItem)
        })
    }

    save(): void {
        /* we will save our list in  the local storage */
        localStorage.setItem("myList", JSON.stringify(this._list))
    }

    clearList(): void {
        this._list = []//this will clear the list
        this.save()
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj)
        this.save()
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }
}
