'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

class CRUDController {

    constructor(table, createFields, listFields, updateFields) {
        this.table = table
        this.createFields = createFields
        this.listFields = listFields
        this.updateFields = updateFields
        AWS.config.setPromisesDependency(require('bluebird'))
        this.dynamoDb = new AWS.DynamoDB.DocumentClient()
    }

    response = (statusCode, message) => {
        return {
            statusCode: statusCode,
            body: JSON.stringify(message)
        }
    }

    prepareCreateItem = (data) => {
        const timestamp = new Date().toISOString()
        let item = {
            id: uuid.v1(),
            creado: timestamp,
            actualizado: null,
        }
        this.createFields.forEach(field => item[field] = data[field] || null)
        return item
    }

    prepareUpdateParams = (id, data) => {
        const timestamp = new Date().toISOString()
        let values = {
            ':actualizado': timestamp,
        }
        let updateFields = []
        Object.entries(data).forEach(key_field => {
            const key = key_field[0]
            const field = key_field[1]
            if (this.updateFields.includes(key)) {
                values[`:${key}`] = field
                updateFields.push(key)
            }
        })
        const updateFieldsStr = updateFields
            .map(field => {return `${field} = :${field}`})
            .join(', ')
        const updateExpression = 'SET actualizado = :actualizado, '.concat(updateFieldsStr)
        return {
            Key: {
                id: id
            },
            TableName: this.table,
            ConditionExpression: 'attribute_exists(id)',
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: values,
            ReturnValues: 'ALL_NEW'
        }
    }

    create = async (event, context, callback) => {
        let bodyObj = {}
        // Parse request body.
        try {
            bodyObj = JSON.parse(event.body)
        } catch (jsonError) {
            console.error('JSON Error', jsonError)
            return this.response(400, null)
        }
        const item = this.prepareCreateItem(bodyObj)
        const params = {
            TableName: this.table,
            Item: item,
        }
        try {
            await this.dynamoDb.put(params).promise()
            callback(null, this.response(200, item))
        } catch (error) {
            console.error('CREATE Error', error)
            callback(null, this.response(error.statusCode, error))
        }
    }

    list = (event, context, callback) => {
        const params = {
            TableName: this.table,
            ProjectionExpression: this.listFields.join(', ')
        }
        const onScan = (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, this.response(200, data.Items))
            }
        }
        this.dynamoDb.scan(params, onScan)
    }

    retrieve = async (event, context, callback) => {
        const params = {
            TableName: this.table,
            Key: {
                id: event.pathParameters.id,
            },
        }
        try {
            const result = await this.dynamoDb.get(params).promise()
            console.log('RESULT', result)
            if (result.Item === undefined) {
                console.log('RETRIEVE NOT FOUND')
                callback(null, this.response(404, {
                    message: `No se encontró el item.`
                }))
            } else {
                console.log('Item', result.Item)
                callback(null, this.response(200, result.Item))
            }
        } catch (error) {
            console.error('RETRIEVE error', error)
            callback(new Error(`Hubo un error al buscar el item.`))
        }
    }

    update = async (event, context, callback) => {
        const id = event.pathParameters.id;
        const getParams = {
            TableName: this.table,
            Key: {
                id: id,
            },
        }
        try {
            const result = await this.dynamoDb.get(getParams).promise()
            console.log('RESULT', result)
            if (result.Item === undefined) {
                console.log('RETRIEVE NOT FOUND')
                callback(null, this.response(404, {
                    message: `No se encontró el item.`
                }))
            }
        } catch (error) {
            console.error('RETRIEVE error', error)
        }
        let bodyObj = {}
        // Parse request body.
        try {
            bodyObj = JSON.parse(event.body)
        } catch (jsonError) {
            console.error('JSON Error', jsonError)
            return this.response(400, null)
        }
        const params = this.prepareUpdateParams(id, bodyObj)
        try {
            const result = await this.dynamoDb.update(params).promise()
            callback(null, this.response(200, result.Attributes));
        } catch (error) {
            console.error('UPDATE Error', error)
            callback(null, this.response(error.statusCode, error))
        }
    }

    destroy = async (event, context, callback) => {
        const params = {
            TableName: this.table,
            Key: {
                id: event.pathParameters.id,
            },
        }
        try {
            const result = await this.dynamoDb.get(params).promise()
            if (result.Item === undefined) {
                callback(null, this.response(404, {
                    message: `No se encontró el item.`
                }))
            }
            await this.dynamoDb.delete(params).promise()
            callback(null, this.response(200, {
                message: `Se eliminó el registro con éxito.`,
            }))
        } catch (error) {
            console.error('DELETE error', error)
            callback(null, this.response(error.statusCode, error))
        }
    }

}

module.exports.CRUDController = CRUDController
