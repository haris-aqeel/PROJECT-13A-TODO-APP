import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as apigw from '@aws-cdk/aws-apigateway'
import * as dynamodb from '@aws-cdk/aws-dynamodb'


export class CdkToddoAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new apigw.RestApi(this,'streamAPIGateway');


    // Creating DynamoDB Table
    const table = new dynamodb.Table(this, 'Table', {
      partitionKey: {name: "id", type: dynamodb.AttributeType.STRING},
      tableName: "TodosTable"
    })


    // Create Todos Lambda Function
    const createTodos = new lambda.Function(this, 'cTodos', {
      runtime: lambda.Runtime.NODEJS_10_X,  
      code: lambda.Code.fromAsset('lambda'),
      handler: 'createTodos.handler'               
    });
    const api2 = new apigw.LambdaIntegration(createTodos);
    const todosCreate = api.root.addResource('createTodos');
    todosCreate.addMethod('POST', api2)
    
    //Grant Permission to the Table

    table.grantReadWriteData(createTodos)

    // Get Todos Lambda Function
    const getTodos = new lambda.Function(this, 'gTodos', {
      runtime: lambda.Runtime.NODEJS_10_X,  
      code: lambda.Code.fromAsset('lambda'),
      handler: 'getTodos.handler'               
    });
    const api3 = new apigw.LambdaIntegration(getTodos);
    const todosGet = api.root.addResource('getTodos');
    todosGet.addMethod('GET', api3)
    
    //Grant Permission to the Table

    table.grantReadWriteData(getTodos)


    // Update Todos Lambda Function
    const updateTodo = new lambda.Function(this, 'uTodos', {
      runtime: lambda.Runtime.NODEJS_10_X,  
      code: lambda.Code.fromAsset('lambda'),
      handler: 'updateTodos.handler'               
    });
    const api4 = new apigw.LambdaIntegration(updateTodo);
    const todosUpdate = api.root.addResource('updateTodo');
    todosUpdate.addMethod('PUT', api4)
    
    //Grant Permission to the Table

    table.grantReadWriteData(updateTodo)
    
    // Delete Todos Lambda Function
    const deleteTodo = new lambda.Function(this, 'dTodos', {
      runtime: lambda.Runtime.NODEJS_10_X,  
      code: lambda.Code.fromAsset('lambda'),
      handler: 'deleteTodos.handler'               
    });
    const api5 = new apigw.LambdaIntegration(deleteTodo);
    const todosDelete = api.root.addResource('deleteTodo');
    todosDelete.addMethod('DELETE', api5)
    
    //Grant Permission to the Table

    table.grantReadWriteData(deleteTodo)


  }
}
