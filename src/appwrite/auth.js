import { Client, Account, ID } from "appwrite"; 
import conf from "../conf/conf";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }

    async createAccount({email,password,name}){
        try{
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            console.log(userAccount)
            if(userAccount){
                // call login() function once user creates account
                await this.login({ email, password })
                return true
            }else{
                console.log("Failed to create account please try again")
                // return userAccount;
            }
        }catch(error){
            console.log("Appwrite Service :: createAccount :: error", error);
            throw error
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }catch(error){
            console.log("Appwrite :: login Service Error : ",error)
            throw error
        }
    }

    async getCurrentUser(){
        try{
            const user = await this.account.get()
            return user
        }catch(error){
            console.log("Appwrite Service :: getCurrentUser :: error : ",error)
        }    
        return null
    }

    async logout(){
        try{
            await this.account.deleteSessions('current');
        }catch(error){
            console.log("Appwrite Service :: logout :: error : ",error)
        }
    }
}

const authService=new AuthService()

export default authService