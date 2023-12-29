const Email = require("../Models/mail");

//importing cloudinary
const cloudinary = require("cloudinary").v2;


//creating funtion to check type of the file
function isFileTypeSupport (type,supportType)
{
     return supportType.includes(type);
}

//creaing funstion to upload file into cloudinary
async function uploadFileAtCloud(file,folder,quality)
                       //file fetched //folder in cloud //compressing quality
{
    //creating options
    const option = {folder};
                                //local uploaded file //cloud folder
    //code for compressing file
    if(quality)
    {
        option.quality = quality;
    }
    
    console.log(file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath,option)
}

exports.emailSender = async (req,res) => {
    try
    {
    
    const {name,email,subject,body} = req.body;

    const file=req.files.file;
    console.log(file);

    //validation             
    const supportType = ["jpg","jpeg","png","pdf"];

    const fileType = file.name.split('.')[1].toLowerCase();
    console.log("filename " , fileType)

    //checking is file formate is suported or not
    if(!isFileTypeSupport(fileType,supportType))
    {
        return res.status(401).json({
            success : false,
            message:"file formate not matched"
        })
    }

    //if file formate supports
    const response = await uploadFileAtCloud(file,"Server")
    //file name we fetched ,//cloud folder name 

    const mail = await Email.create({
        name,
        email,
        subject,
        body,
        file:response.secure_url
    })
    
    res.json({
        sucess:true,
        message:"Sucessfully Send data"
    })
    }
    catch(error)
    {
        console.log(error);
        res.status(400).json({
            status : false,
            message:`"Something went wrong" ${error}`
        })
    }
}