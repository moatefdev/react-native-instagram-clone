import { USERS } from "./user";

export const POSTS = [
  {
    user: USERS[0].user,
    likes: 7870,
    caption: "Train Ride to Hogwarts 🚂",
    profileImage: USERS[0].image,
    iconName: "heart-o",
    postImageUrl:
      "https://images.unsplash.com/photo-1585416294584-b849d9e571ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
    likes_by_users: [],
    comments: [
      {
        user: "thequeen",
        comment: "Wow! This build looks fire. Super excited about it!",
      },
      {
        user: "amaanath.dev",
        comment: "Once I wake up, I'll finally be ready to cod this up!",
      },
    ],
  },
  {
    user: USERS[1].user,
    likes: 7870,
    caption: "Train Ride to Hogwarts 🚂😊",
    profileImage: USERS[1].image,
    iconName: "comment",
    postImageUrl:
      "https://images.unsplash.com/photo-1593956381646-3a9b3291ea60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    likes_by_users: [],
    comments: [
      {
        user: "theboss",
        comment: "Wow! This build looks fire. Super excited about it!",
      },
      {
        user: "amaanath.dev",
        comment: "Once I wake up, I'll finally be ready to cod this up!",
      },
    ],
  },
  {
    user: USERS[2].user,
    likes: 7870,
    caption: "Train Ride to Hogwarts 🚂😊",
    profileImage: USERS[2].image,
    iconName: "send-o",
    postImageUrl:
      "https://images.unsplash.com/photo-1630253158595-736bc9961e5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=745&q=80",
    comments: [
      {
        user: "theking",
        comment: "Wow! This build looks fire. Super excited about it!",
      },
      {
        user: "amaanath.dev",
        comment: "Once I wake up, I'll finally be ready to cod this up!",
      },
    ],
  },
];
