import './css/style.css'
import ListItem from './model/ListItem'
import FullList from './model/FullList'
import ListTemplate from './templates/ListTemplate'

const initApp = ():void => {
  const fullList = FullList.instance
  const template = ListTemplate.instance

  // The form that allows users to add items to the list
  const itemEntryForm = document.getElementById('itemEntryForm') as HTMLFormElement
  
  itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
    event.preventDefault() // prevents the page refresh on the form submission
    
    const input = document.getElementById('newItem') as HTMLInputElement
    const newEntryText: string = input.value.trim() // remove whitespace
    if (!newEntryText) return // if no text was entered, quit the program

    // if list is not empty, assign the ID corresponding to the last entry + 1
    // if list is empty, assign ID n°1
    const itemID: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1

    const newItem = new ListItem(itemID.toString(), newEntryText)
    // a value for the parameter 'checked' is not required 
    // because the constructor has a default value - see ListItem.ts

    // add new item to the list and display the updated list
    fullList.addItem(newItem)
    template.render(fullList)
  })

  // The clear items button
  const clearItems = document.getElementById('clearItemsButton') as HTMLButtonElement
  
  clearItems.addEventListener('click', (): void => {
    fullList.clearList()
    template.clear() // clear the display
  })

  fullList.load()
  template.render(fullList)

}

// We're not going to run our javascript until the page is loaded
document.addEventListener('DOMContentLoaded', initApp)
