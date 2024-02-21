


import FullList from "../model/FullList"

/* an interface  */
interface DOMList {
    ul : HTMLUListElement
    clear(): void,//this method will clear the list
    render(fullList : FullList): void,//this method will render the list
}


/* we will now create a default export class named ListTemplate that will implement the interface,it will also be a singleton(we only need that one template)the clear method will clear the items in the UnOrderd list, and the render method should reneder the fulllist */

export default class ListTemplate implements DOMList{

    ul : HTMLUListElement


    /* There should only be one instance of this */
    static instance : ListTemplate = new ListTemplate();
    
    
    private constructor() {
        this.ul = document.getElementById("listItems") as HTMLUListElement
    }

    clear(): void {
        this.ul.innerHTML = ""
    }

    render(fullList : FullList): void {
        this.clear() //we would first of all clear the list so that we don't duplicate the list

        fullList.list.forEach(item => {
            const li = document.createElement("li") as HTMLElement
            li.className = "item"

            const check = document.createElement("input") as HTMLInputElement
            check.type = "checkbox"
            check.id = item.id
            check.tabIndex = 0
            check.checked = item.checked
            li.append(check)

            //adding event listeners
            check.addEventListener("change" , () => {
                item.checked = !item.checked
                fullList.save()
            })

            //creating label which holds the description for each item

            const label = document.createElement("label") as HTMLLabelElement
            label.htmlFor = item.id
            label.textContent = item.item
            li.append(label)


            //creating a delete button

            const button = document.createElement("button") as HTMLButtonElement
            button.className = 'button'
            button.textContent = "X"
            li.append(button)

            //creating an eventlistener to the button
            button.addEventListener('click' , () => {
                fullList.removeItem(item.id)
                this.render(fullList)
            })

            //after we have created the fulllist we would also need to add it to the unorderd list in  the parent of the entire list

            this.ul.appendChild(li)

        })
    }
}