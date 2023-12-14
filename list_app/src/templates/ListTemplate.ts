import FullList from "../model/FullList"

interface DOMList {
  ul: HTMLUListElement,
  clear(): void,
  render(fullList: FullList): void
}

export default class ListTemplate implements DOMList {

  ul: HTMLUListElement

  static instance: ListTemplate = new ListTemplate() // creates a singleton
  // when we refer to this singleton, it will be with ListTemplate.instance

  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement
    // The ul id is available at line 38 of index.html
  }

  clear(): void {
    this.ul.innerHTML = ""
  }

  render(fullList: FullList): void {
    this.clear() // clear what we already have so we don't duplicate the list
    
    fullList.list.forEach(item => {
      // add a list item
      const li = document.createElement("li") as HTMLLIElement
      li.className = "item"

      // add a checkbox to the list item
      const check = document.createElement("input") as HTMLInputElement
      check.type = "checkbox"
      check.id = item.id 
      // check.tabIndex = 0 // this is optional
      check.checked = item.checked
      li.append(check)

      // update the checkbox state and save the list state
      check.addEventListener('change', () => {
        item.checked = !item.checked
        fullList.save()
      })

      // add a label to the list item
      const label = document.createElement("label") as HTMLLabelElement
      label.htmlFor = item.id
      label.textContent = item.item
      li.append(label)

      // add a button to the list item
      const button = document.createElement("button") as HTMLButtonElement
      button.className = "button"
      button.textContent = "X"
      li.append(button)
      
      // delete the list item when the button is clicked
      button.addEventListener('click', () => {
        fullList.removeItem(item.id)
        // no need to save since removeItem() does it
        this.render(fullList) // item removed from the list remains visible
      })

      this.ul.append(li) // finally, add each list item to the list

    })
  }
}