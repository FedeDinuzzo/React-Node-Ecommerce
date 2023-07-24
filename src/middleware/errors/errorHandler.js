import {EErrors, ETransform} from '../../utils/erroresHandler/enums.js';

export default (error,req,res,next)=> {
  console.log(error.cause);

  //if (typeof(error.code) != Number) {
  if (isNaN(error.code)){
  
    const errorNumber = ETransform.filter((data)=>{
      if (data.MESSAGE_ERROR === error.code){
        return true
      } 
    })
    error.code = errorNumber[0].CODE

  }


  switch (error.code){
    case EErrors.INVALID_TYPES_ERROR:
      res.send({status:"error", error:error.name, message:error.message})
      break;
    case EErrors.DATABASE_ERROR:
      res.send({status:"error", error:error.name, message:error.message})
      break;
    case EErrors.ROUTING_ERROR:
      res.send({status:"error", error:error.name, message:error.message})
      break;
    case EErrors.GITHUB_ERROR:
      res.send({status:"error", error:error.name, message:error.message})
      break;
    default:
      res.status(500)
      .send({status:"error", error:"Unhandled error"})

  }
}