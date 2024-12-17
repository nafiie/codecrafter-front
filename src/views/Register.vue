<template>
    <nav class="bg-gray-800 text-white ">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div class="flex justify-between h-16 items-center ">
                <div class="flex items-center">
                    <h1 class="text-2xl font-bold">Code Crafters</h1>
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
    <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-4">
      <h2 class="text-xl font-bold mb-4">Register new user</h2>
      <form @submit.prevent="registerUser">
        <div class="mb-4"> 
          <label for="name" class="text-gray-700 font-medium">Name</label>
          <input id="name" v-model="name" type="text" class="mt-1 p-2 w-full border rounded-md" placeholder="Enter your name" required>
        </div>
  
        <div class="mb-4"> 
          <label for="email" class="text-gray-700 font-medium">Email</label>
          <input id="email" v-model="email" type="email" class="mt-1 p-2 w-full border rounded-md" placeholder="Enter your email" required>
        </div>
  
        <div class="mb-4"> 
          <label for="password" class="text-gray-700 font-medium">Password</label>
          <input id="password" v-model="password" type="password" class="mt-1 p-2 w-full border rounded-md" placeholder="Enter your password" required>
        </div>      
        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full">
          <span v-if="loading">
            <svg class="animate-spin text-center h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Loading...
          </span>
          <span v-else>
          Register</span>
        </button>
      </form>
  
      <div class="mt-4 p-2 text-center">
        <p :class="{'text-green-500': success, 'text-red-500': !success}">{{ message }}</p>
      </div>
    </div>

  </template>
  
  <script>
    import axios from 'axios';
    
  
    export default {
      data(){
        return{
          name: '',
          email: '',  
          password:'',
          message: '',
          success: false,
          loading: false
      }
      },
      computed:{
        isAuthenticated(){
            return !! localStorage.getItem('token');
        }
    },
  
      methods:{
          async registerUser(){
            this.loading = true;
            try {
              const response = await axios.post('http://localhost:8000/api/users', {
              name: this.name,
              email: this.email,
              password: this.password,
              });
              this.message = 'Registration successful!';
              this.success = true;
              this.$toast.success('User created successfully!!!');
              this.$router.push('/users');
              
              this.name = '';
              this.email = '';
              this.password = '';
            } catch (error) {
              console.error('Error during registration:', error);
            this.message = 'Registration failed. Please try again.';
            this.success = false;
            }finally{
              this.loading = false;
            }
          },
          logout(){
            localStorage.removeItem('token')
            this.$router.push('/login')
        },
        register(){
            this.$router.push('/login')
        }
      }
    }
  </script>