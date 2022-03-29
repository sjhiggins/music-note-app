import { v4 as uuidv4 } from "uuid";
const dummyData = [
  {
    id: 1,
    bpm: 122,
    categories: ["Dance", "Deep House", "Experimental"],
    hasAudio: false,
    imgUrl:
      "https://images.unsplash.com/photo-1515405295579-ba7b45403062?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    length: 177,
    comments: [
      {
        comment: "Intro with horns and violins",
        timeStamp: 0.5,
        id: uuidv4(),
      },
      {
        comment: "Rolling bassline comes in",
        timeStamp: 31,
        id: uuidv4(),
      },
      {
        comment: "Big Drop",
        timeStamp: 115,
        id: uuidv4(),
      },
    ],
    timeStamp: new Date("March 2, 2022 at 12:30:26 PM UTC"),
    title: "Nu Aspect - Something Real v2.3",
    userRef: "HfbP11F2osO0vCZHIvpJROQWetL2",
  },
  {
    id: 2,
    bpm: 124,
    categories: ["Donk", "Dubstep", "Dark"],
    hasAudio: false,
    imgUrl:
      "https://images.unsplash.com/photo-1515405295579-ba7b45403062?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    length: 155,
    comments: [
      {
        comment: "Big Horn and subtle clicks",
        timeStamp: 5,
        id: uuidv4(),
      },
      {
        comment: "Big man shouting here",
        timeStamp: 30,
        id: uuidv4(),
      },
      {
        comment: "Beautiful Singing",
        timeStamp: 90,
        id: uuidv4(),
      },
    ],
    timeStamp: new Date("March 3, 2022 at 14:33:26 PM UTC"),
    title: "Dubstep Track Idea v1.5",
    userRef: "KutK66P6osN0gULBIsgTXUJEutJ7",
  },
];

export default dummyData;
