# backend/ticket_api/app.py

import json
import boto3
import uuid
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Tickets')

def lambda_handler(event, context):

    body = json.loads(event['body'])

    ticket_id = str(uuid.uuid4())

    item = {
        "ticketId": ticket_id,
        "customerEmail": body["customerEmail"],
        "subject": body["subject"],
        "description": body["description"],
        "status": "OPEN",
        "createdAt": datetime.utcnow().isoformat()
    }

    table.put_item(Item=item)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "message":"Ticket Created",
            "ticketId": ticket_id
        })
    }