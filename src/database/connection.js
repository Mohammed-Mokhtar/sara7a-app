import mongoose from "mongoose";

export const databaseConnection = () => {
  mongoose
    .connect(
      "mongodb+srv://mohamedmokhtarfai_db_user:2Vr66AK3pdHvBovQ@cluster0.pswakpe.mongodb.net/sara7a-app?appName=Cluster0",
    )
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
