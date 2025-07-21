const Users = require("../models/UserSchema");
const bcrypt = require("bcrypt");
async function createSampleUsers() {
  try {
    const usersData = [
      {
        name: "Alice Johnson",
        email: "a@a.com",
        password: "a",
        avatarUrl: "https://example.com/avatars/alice.jpg",
      },
      {
        name: "Bob Smith",
        email: "bob.smith@example.com",
        password: "a",
        avatarUrl: "https://example.com/avatars/bob.png",
      },
      {
        name: "Carlos Martinez",
        email: "carlos.martinez@example.com",
        password: "a",
        avatarUrl: "https://example.com/avatars/carlos.webp",
      },
      {
        name: "Dana White",
        email: "dana.white@example.com",
        password: "a",
        avatarUrl: "https://example.com/avatars/dana.jpg",
      },
      {
        name: "Eva Green",
        email: "eva.green@example.com",
        password: "a",
        avatarUrl: "https://example.com/avatars/eva.png",
      },
    ];

    for (let User of usersData) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(User.password, salt);
      User.password = hashedPassword;
    }
    await Users.insertMany(usersData);
    console.log("Sample Users added successfully!");
  } catch (error) {
    console.error("Error adding sample Users:", error);
  }
}
module.exports = createSampleUsers;
