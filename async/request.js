const request = async (data) => {
  return await new Promise(resolve => setTimeout(resolve(`real request: ${data}`), 2000))
}

export default request
