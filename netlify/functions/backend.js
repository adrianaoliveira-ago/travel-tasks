import pkg from "mongodb";
const { MongoClient, ObjectId } = pkg;

// connect to mongodb
const pass = "9oVn5yDi4c94tiNj";
const uri = `mongodb+srv://thiagoribeiro015:${pass}@t015.t4isr8o.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

export const handler = async (event, context) => {
  console.log("@@@ notification function started");

  try {
    const database = client.db("travel_tasks");
    const tasksCollection = database.collection("tasks");

    const {
      queryStringParameters: { taskid },
    } = event;

    console.log("@queryparam", taskid);

    // if taskid is not provided return 400
    if (!taskid) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "taskid is required", status: 400 }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    // fetch task by id
    const query = { _id: new ObjectId(taskid) }; // const query = { name: "Mercedes Tyler" };
    const resp = await tasksCollection.findOne(query);
    console.log("resp", resp);

    // if resp is null return 404
    if (!resp) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "task not found", status: 404 }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ resp, status: 200 }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.log("error", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message, status: 500 }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

/** insert a new task */
// const task = {
//   name: "My Task 2",
//   description: "My Task Description 2",
//   completed: true,
// };
// const result = await tasksCollection.insertOne(task);
// console.log(`New task created with the following id: ${result.insertedId}`);
