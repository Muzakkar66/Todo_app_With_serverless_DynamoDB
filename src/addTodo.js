const AWS = require("aws-sdk");
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const { v4 } = require("uuid");

const addTodo = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  const { todo } = event.body;
  const createdAt = new Date().toISOString();
  const id = v4();

  console.log("This is an id", id);
  const newTodo = {
    id,
    todo,
    createdAt,
    completed: false,
  };

  // put into the dynamoDB
  await dynamoDB.put({
    TableName: "TodoTable",
    Item: newTodo,
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
};
module.exports = {
  handler: middy(addTodo).use(httpJsonBodyParser())
};
