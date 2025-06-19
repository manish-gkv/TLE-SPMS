import { CODEFORCES_API_URL } from "../../utility/constant.js";

export default async function getProblemSet(){
    /*
    This function fetches the problem set from the Codeforces API.
    It returns a list of problems available in the problem set.
    */
   try{
        const response = await fetch(CODEFORCES_API_URL+"problemset.problems");
        
        const data = await response.json();
        console.log("Problem Set Fetched Successfully");
        return data.result.problems;
   }
   catch(error){
    console.log("Error in getting Problem Set", error);
   }
}