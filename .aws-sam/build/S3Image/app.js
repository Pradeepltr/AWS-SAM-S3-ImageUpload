const AWS=require('aws-sdk');
const S3_bucket=new AWS.S3();
const fs=require('fs')
const fetch=require('fetch')

let response;


exports.lambdaHandler = async (event, context) => {
    //  const fileName=event.pathParameters.file
    //   const base64= await(event.body)
    //  console.log(event)
    //  console.log(base64)
    
    
      
    //    const newVal=await base64.toString('base64');
    //    const base64decode=await Buffer.from(base64,'base64')
    //    const modifyfile=fs.openSync(newVal)
    //  const imageStats = fs.statSync(newVal)
    //  console.log(newVal)
    //  console.log(typeof(event.body))
    //  let base64String=base64.base64String;
    // const file= Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""),"base64");
    // const path="C:\Users\pk636\OneDrive\Desktop\S3_SAM\S3SAM\src\hd-wallpaper-3625405.jpg"
    //  const file=fs.readFileSync(modifyfile)
    // console.log(base64);
    

    
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
