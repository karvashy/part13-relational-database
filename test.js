const axios = require('axios')
const baseUrl = 'http://localhost:3001'
const defaultUser = {'username':'testing@gmail.com','name':'testing'}
const defaultLogin = {username:'testing@gmail.com',password: 'secret'}

const createUser = async () => {
    const userResponse = await axios.post(baseUrl+'/api/users', defaultUser)
    return userResponse.data 
}
const getUser = async () => {
    const response = await axios.get(baseUrl+'/api/users')
    return response.data 
}
const loginUser = async () => {
    const loginResponse = await axios.post(baseUrl+'/api/login', defaultLogin)
    return loginResponse
}

const createBlog = async (token,data) => {
    const blogReponse = await axios.post(baseUrl+'/api/blogs',data,{
        headers:{
        'Authorization': 'Bearer '+token
    }, 
        })
    return blogReponse.data
}

const createReadingList = async (token, blogId, userId) => {
    const response = await axios.post(baseUrl+'/api/readingLists',{blogId,userId},{
        headers: {'Authorization':'Bearer '+token},
    })
    return response.data
}
const changeReadStatus = async (token, blogId) => {
    const response = await axios.put(baseUrl+'/api/readingLists/'+blogId,{"read":true},{
        headers: {'Authorization':'Bearer '+token},
    })
    console.log('response for changeReadStatus', response.data)
    return response.data
}

const logout = async (token) => {
    const response = await axios.delete(baseUrl+'/api/logout',{
        headers: {'Authorization':'Bearer '+token},
    })
    console.log('response for logout', response.data)
}
const deleteBlog = async (token, blogId) => {
    const response = await axios.delete(baseUrl+'/api/blogs/'+blogId,{
        headers: {'Authorization':'Bearer '+token},
    })
    return response.data
}

const main = async () => {
    let token
    let blog1
    try{
        /*
        const userResponse = await getUser();
        if(userResponse.length === 0){
            await createUser();
        }
        */
        const loginResponse = await loginUser();
        token = loginResponse.data.token
        //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RpbmdAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTcwMDIzOTcyNn0.ZKJ0blmrPjwHNdIHnACKfL0wNil6hLYwt3MSH408UJk"
        console.log('login token',token)
        blog1 = await createBlog(token,{title: 'testing title 2',author:'testing author',url:'testing url',year:1993});
        const blog2 = await createBlog(token,{title: 'testing title 1',author:'testing author',url:'testing url',year:1994});
        await createReadingList(token,blog1.id,1)
        await createReadingList(token,blog2.id,1)
        await changeReadStatus(token, blog1.id)
        await logout(token)

    }
    catch(error){
        console.log('error',error.response)
        console.log('error in url',error.response.config.url)
        console.log('error message',error.message)
    }
        // Creating blog after logging out. This should fail
        //const blog3 = await createBlog(token,{title: 'testing title 69',author:'testing author',url:'testing url',year:1993});
        //console.log('creating blog after logging out',blog3)
        // deleting blog after logging out. This should fail
    try{
        const response = await deleteBlog(token,blog1.id)
        console.log('deleteBlog after loggin out',response)
    }
    catch(error){
        console.log('error in deleting blogs after loggin out',error.response.data)
    }
}

main()
