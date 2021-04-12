import { projectFirestore } from "../firebase/config";

export async function getUserImages(userId) {
  let userImages = [];

  await projectFirestore
    .collection("users")
    .doc(userId)
    .collection("images")
    .orderBy("createdAt", "desc")
    .get()
    .then((snap) => {
      return snap.forEach((doc) => {
        if (doc.exists) {
          userImages.push({ ...doc.data(), id: doc.id });
        } else {
          return userImages;
        }
      });
    })
    .catch(function(error) {
      console.log(error);
    });

  return userImages;
}

export async function getAllUserImages() {
  let allUserImages = [];

  await projectFirestore
    .collectionGroup("images")
    .orderBy("createdAt", "desc")
    .get()
    .then((snap) => {
      return snap.forEach((doc) => {
        if (doc.exists) {
          allUserImages.push({ ...doc.data(), id: doc.id });
        }
      });
    })
    .catch(function(error) {
      console.log(error);
    });

    console.log(allUserImages)
  return allUserImages;
}
