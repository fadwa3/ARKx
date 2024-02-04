//! task 1 Fetch User Data 
async function fetchUserData(){
    try {
        const response = await fetch('https://dummyjson.com/users');
        if(!response.ok){
            throw new Error(`an error in the http`);
        }
    
    const data = await response.json();

    //! Display Results
    console.log('Proccessed users :');
    console.log( processUserData(data));
    console.log('Total Age of Active Users: ',summarizeAge(data));
    
    

    } catch (error) {
        console.log('error in the fetching ');
        throw error;
    }
}
//! task 2 Process Data
function processUserData(data){
    try {
        const females= data.users.filter(({gender})=>gender!='male');
        
        const remain =females.map(({firstName,age})=>'Name: '+firstName+' , Age: '+age);
         return remain;
    } catch (error) {
        console.log('ooops there is a bug in the processUserData function');
    }
}
//! task 3 Summarize Data
function summarizeAge(data){
    try {
        const sum = data.users.filter(({gender})=>gender=='male').reduce((accumulator,{age}) => accumulator + age, 0);
        return sum;
    } catch (error) {
        throw new Error('an error in teh summarize data function ');
    }
}

fetchUserData()
  .then((Data) => {
    console.log('the fetchuserdata function was successful');
  })
  .catch((error) => {
    console.error('Error in fetchUserData:', error.message);
  });
//! the Main calling 
  fetchUserData();



