const AWS = require("aws-sdk");

const fetchTodo = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const {id } = event.pathParameters
  let todo;

  try {
    const results = await dynamoDB
      .get({
        TableName: "TodoTable",
        Key: { id },
      })
      .promise();

    todo = results.Item;
    return {
      statusCode: 200,
      body: JSON.stringify(todo),
    };
  } catch (error) {
    console.log(error);
  }
 
};
module.exports = {
  handler: fetchTodo,
};
