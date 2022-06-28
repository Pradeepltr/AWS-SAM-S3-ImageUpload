const AWS=require('aws-sdk');
const S3_bucket=new AWS.S3();
const fs=require('fs')
const fetch=require('fetch')

let response;


exports.lambdaHandler = async (event, context) => {
    
    

    
     const file=fs.readFileSync('a.jpg');
    const params={
        Body:file,
        Bucket:'samimage',
        Key:"a.jpg",
        ContentType: 'image/jpg'
    }
    await S3_bucket.upload(params).promise()
    .then((data)=>{
        response={
            "headers":{
                "Content-Type":"application/json"
            },
            'statusCode':200,
            'body':JSON.stringify(`Image Url ${data.Location}`)
        }
    }).catch((err)=>{
        response={
            "headers":{
                "Content-Type":"application/json"
            },
            'statusCode':400,
            'body': JSON.stringify(`Not Upolad with error ${err}`)
        }
    })


    return response
};
