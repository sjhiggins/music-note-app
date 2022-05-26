import { v4 as uuidv4 } from "uuid";
class noteTemplate {
  constructor(title) {
    this.title = title;
    // this.id = uuidv4();
    this.bpm = "";
    this.categories = [];
    this.hasAudio = false;
    this.imgUrl =
      "https://images.unsplash.com/photo-1515405295579-ba7b45403062?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";
    this.length = "180";
    this.comments = [];
    this.timeStamp = new Date();
  }
}

export default noteTemplate;
