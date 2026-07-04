import API from "../api/axios";

export const getMessages =
async(id,token)=>{

const res=
await API.get(
`/chat/${id}`,
{
headers:{
Authorization:
`Bearer ${token}`,
},
}
);

return res.data;

};

export const sendMessage =
async(data,token)=>{

const res=
await API.post(
"/chat",
data,
{
headers:{
Authorization:
`Bearer ${token}`,
},
}
);

return res.data;

};