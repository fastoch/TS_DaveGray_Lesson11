import ListItem from "./ListItem";

interface List {
  list: ListItem[],
  save(): void,
  load(): void,
  clearList(): void,
  addItem(itemObj: ListItem): void,
  removeItem(id: string): void
}

export default class FullList implements List {
  
  static instance: FullList = new FullList(); // singleton
  
  private constructor(private _list: ListItem[] = []){}

  get list(): ListItem[] { return this._list }

  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list))
  }

  load(): void {
    const storedList: string | null = localStorage.getItem("myList")
    if (typeof storedList !== "string") { return } // quit the program if nothing is stored
    
    // if something is stored, create an array of ListItem objects 
    // by parsing the stringified list that we retrieved above
    const parsedList: { _id: string, _item: string, _checked: boolean}[] 
    = JSON.parse(storedList)

    parsedList.forEach(itemObj => {
      const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
      FullList.instance.addItem(newListItem)
    })
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.filter(item => item.id !== id);
    this.save()
  }
}