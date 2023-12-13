import FullList from "../model/FullList"

interface DOMList {
  ul: HTMLUListElement,
  clear(): void,
  render(fullList: FullList): void
}

export default class ListTemplate implements DOMList {

  static instance: ListTemplate = new ListTemplate() // creates a singleton

  ul: HTMLUListElement

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
      const li = document.createElement("li") as HTMLLIElement
      li.className = "item"

      const check = document.createElement("input") as HTMLInputElement
      check.type = "checkbox"

      
    })
  }
}