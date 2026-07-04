import { useEffect,useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { getAdminDashboard } from "../services/adminService";
import toast from "react-hot-toast";

function AdminDashboard(){

const {token}=useAuth();

const [data,setData]=useState(null);

useEffect(()=>{

load();

},[]);

const load=async()=>{

try{

const res=
await getAdminDashboard(token);

setData(res);

}catch{

toast.error(
"Unable to load Admin Dashboard"
);

}

};

if(!data){

return(
<DashboardLayout>

Loading...

</DashboardLayout>
);

}

return(

<DashboardLayout>

<h1
className="mb-10 text-4xl font-bold text-white"
>

Admin Dashboard

</h1>

<div
className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
>

<div
className="rounded-2xl bg-slate-900 p-6"
>

<h3>Total Users</h3>

<h1>
{data.analytics.totalUsers}
</h1>

</div>

<div
className="rounded-2xl bg-slate-900 p-6"
>

<h3>Total Reports</h3>

<h1>
{data.analytics.totalReports}
</h1>

</div>

<div
className="rounded-2xl bg-slate-900 p-6"
>

<h3>Pending</h3>

<h1>
{data.analytics.pendingReports}
</h1>

</div>

<div
className="rounded-2xl bg-slate-900 p-6"
>

<h3>Resolved</h3>

<h1>
{data.analytics.resolvedReports}
</h1>

</div>

</div>

</DashboardLayout>

);

}

export default AdminDashboard;