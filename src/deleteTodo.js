const AWS = require("aws-sdk");

const deleteTodo = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const {id } = event.pathParameters
  let todo;

  try {
    const results = await dynamoDB
      .delete({
        TableName: "TodoTable",
        Key: { id },
      })
      .promise();

    todo = results.Item;
    if(todo != null)
    return {
      statusCode: 200,
      body: JSON.stringify(todo),
    };
    else{
        return{
            Message: "Evenmgdlmgld"
        }
    }
  } catch (error) {
    console.log(error);
  }
 
};
module.exports = {
  handler: deleteTodo,
};
