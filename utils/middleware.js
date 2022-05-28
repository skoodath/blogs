const tokenExtractor = (request, response, next) => {
  
  const authorization = request.get("authorization")
  if(authorization && authorization.toLowerCase().startsWith("bearer ")){
    request.token = authorization.split(" ")[1]
    next();
  }
  request.token = null;
  next();
}

module.exports = {
  tokenExtractor
}