<template>
     <nav class="bg-gray-800 text-white ">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div class="flex justify-between h-16 items-center">
                <div class="flex items-center">
                    <h1 class="text-2xl font-bold">Code Crafters Users</h1>
                </div>
                <div class="flex items-center space-x-4">
                <router-link to="/" class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm  font-md">Home</router-link>
                <div v-if="isAuthenticated">
                <router-link to="/users" class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm  font-md">Users</router-link>
               </div>
              <div v-if="!isAuthenticated">
                <router-link to="/login" class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm  font-md">Login</router-link>
                <router-link to="/register" class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm  font-md">Register</router-link>
            </div>
            <div v-else>
             <button @click="logout" class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm  font-md">Logout</button>
            </div>
              
                
                </div>
            </div>
        </div>
    </nav>

    <div class="p-8">
    <h1 class="text-2xl font-bold mb-6 ">Users</h1>
    <table class="min-w-full bg-white border table-auto">
      <thead>
        <tr>
            <th class="px-4 py-2 border">Name</th>
            <th class="px-4 py-2 border">Email</th>
            <th class="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <span v-if="loading">
            <svg class="animate-spin text-center h-5 w-5 text-black inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Loading...
          </span>
        <tr v-else v-for =" user in users" :key="user._id">
            <td class="px-4 py-2 font-semibold border">{{ user.name }}</td>
            <td class="px-4 py-2 border">{{user.email}}</td>
            <td class="px-4 py-2 border flex space-x-2">
            <router-link :to="`/users/edit/${user._id}`" class="bg-blue-500 text-white px-4 py-1 rounded">Edit</router-link>
            <button class="bg-red-500  text-white px-4 py-1 rounded" @click="deleteUsers(user._id)">Delete</button>

        </td>
        </tr>
      </tbody>
    </table>
    </div>

</template>

<script>
import axios from "axios"
export default {
    data(){
        return{
            users:[],
            loading:false

        }
    },
    computed:{
        isAuthenticated(){
            return !! localStorage.getItem('token');
        }
    },
    methods:{
        async fetchUsers(){
            this.loading = true;
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('https://codecrafter-back.onrender.com/api/users', {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                this.users = response.data;
            } catch (error) {
                console.log("Error fetching users:", error);
                
            }
            finally{
                this.loading = false;
            }
            
        },
        async deleteUsers(id){
            if (confirm('Are you sure you want to delete this user?')){
                try{
                    const token = localStorage.getItem('token')
                    await axios.delete(`https://codecrafter-back.onrender.com/api/users/${id}`, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                    this.users = this.users.filter(user => user._id !== id)
                    this.$toast.success('User deleted Successfully!!!');
                }catch (error) {
                    console.log("Error deleting user:", error);
                    
                }

            
           } 
        },
        logout(){
            localStorage.removeItem('token')
            this.$toast.success('logged out Successfully!!!');
            this.$router.push('/login')
        },
        register(){
            this.$router.push('/login')
        }
    },
    created(){
        this.fetchUsers();
    }
}

</script>