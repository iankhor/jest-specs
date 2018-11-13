const request = async (data) => {
  return await new Promise(resolve => resolve(`mocked request: ${data}`))
}

export default request
