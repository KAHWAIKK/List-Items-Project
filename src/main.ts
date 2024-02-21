import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'



//create an init function

const initApp = () : void => {
  //start by getting the instances for the fulllist and ListTemplate
  const fulllist = FullList.instance
  const template = ListTemplate.instance

  //we then get our form because we need to listen for the submit event

  const itemEntryForm = document.getElementById("itemEntryForm") as 
  HTMLFormElement
  itemEntryForm.addEventListener("submit", (event: SubmitEvent) : void => {
    event.preventDefault()//so that the form doesnt reload  the page when submitted

    //creating a handler that will submit the form 
    const input = document.getElementById("newItem") as HTMLInputElement
    const newEntryText : string = input.value.trim()
    if(!newEntryText.length) return


    //calculating the itemId - we need to grab the last item in the list and calcULATE what  is one more than that.

    const itemId : number = fulllist.list.length
      ? parseInt(fulllist.list[fulllist.list.length - 1].id) + 1
      : 1

    const newItem = new ListItem(itemId.toString(), newEntryText)

    fulllist.addItem(newItem)

    template.render(fulllist)
  })

  //adding an event listener to the clear items button

  const clearItems = document.getElementById("claerItemsButton") as   HTMLButtonElement

  clearItems.addEventListener('click', () : void => {
    fulllist.clearList()
    template.clear()
  })

  fulllist.load()
  template.render(fulllist)

}


//adding an eventlistener to the document object

document.addEventListener('DOMContentLoaded', initApp)