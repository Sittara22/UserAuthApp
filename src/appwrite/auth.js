import { Client, Account,ID} from "appwrite";
import conf from '../conf/conf.js'
export class AuthService{
 client=new Client();
 account;

 constructor(){
    this.client.setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("665a3d0800189ffe15a5");
    this.account=new Account(this.client);
   
 }
   
 async login(email,password){
   try{
      console.log("Appwrite login ");
        await this.account.createEmailPasswordSession(email,password);
        const response= await this.account.get();
        return response;

   }
   catch(error){
      throw new Error(error.message);
   }
  }
 async signUpUser(email,password,name){
   try{
         console.log("Email in auth",email);   
      const createAccount= await this.account.create(ID.unique(),email,password,name);
   
        if(createAccount){
         console.log("error");
         return this.login(email,password);
        }
        else{
         console.log(createAccount)
         return createAccount;
        }
      }
   catch(error){
          throw new Error(error.message);
   }

 }
  async getCurrentSession(sessionId){
   try{
      const result = await this.account.getSession(sessionId);
      return result;

   }
   catch(error){
      throw new Error(error.message);
   }
  } 
 async getCurrentAccount(){
   try{
         return await this.account.get();
   }
   catch(error){
      throw new Error(error.message);
   }
   return null
 } 

 async logout(){
   try{
      return await this.account.deleteSessions('current');
   }
   catch(error){
      throw new Error(error.message);
   }
 }
 
}
const authService= new AuthService();

export default authService;
