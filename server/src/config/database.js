import mongoose from 'mongoose'

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ynov.vjph36o.mongodb.net/test`
  )
  .then(() => console.log("✅ Successfully connected to the database"))
  .catch((e) => console.log(`⛔️ Error during database connection ${e}`));