class noteTemplate {
  constructor(title) {
    this.title = title;
    this.id = Math.random();
    this.bpm = "";
    this.categories = [];
    this.hasAudio = false;
    this.imgUrl =
      "https://images.unsplash.com/photo-1515405295579-ba7b45403062?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";
    this.length = "180";
    this.notes = [];
    this.timeStamp = new Date();
    this.userRef = "HfbP11F2osO0vCZHIvpJROQWetL2";
  }
}

export default noteTemplate;