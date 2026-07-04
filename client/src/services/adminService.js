import API from "../api/axios";

export const getAdminDashboard =
async(token)=>{

const response=
await API.get(
"/admin/dashboard",
{
headers:{
Authorization:
`Bearer ${token}`,
},
}
);

return response.data;

};