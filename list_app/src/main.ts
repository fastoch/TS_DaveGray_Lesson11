import './css/style.css'
import ListItem from './model/ListItem'
import FullList from './model/FullList'
import ListTemplate from './templates/ListTemplate'

const initApp = ():void => {
  const fullList = FullList.instance
  const template = ListTemplate.instance

  // load the form that allows user to add items to the list
  const itemEntryForm = document.getElementById('itemEntryForm') as HTMLFormElement
  itemEntryForm.addEventListener('submit', () => {
    
  })
}

// We're not going to run our javascript until the page is loaded
document.addEventListener('DOMContentLoaded', initApp);
