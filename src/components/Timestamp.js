export function format(inputDate) {
    let date, month, year;
  
    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();
  
      date = date
          .toString()
          .padStart(2, '0');
  
      month = month
          .toString()
          .padStart(2, '0');
  
    return `${date}/${month}/${year}`;
  }











const Timestamp = (value) => {


    try {
      const chattime = value ? value.seconds*1000 : 0 ;
      
      var d1 = new Date(chattime);
      var d2 = new Date();
      
     
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      
      
      if(d1.getMonth() === d2.getMonth()) {
        if(d2.getDate() === d1.getDate()){
    
    
         return d1.toLocaleTimeString(
            navigator.language,
            {
              hour: "2-digit",
              minute: "2-digit",
            }
            )
    
        }
    
        
        else if((d2.getDate() - d1.getDate() === 1 )){
          return  "Yesterday" 
        }
    
        else if((d2.getDate() - d1.getDate() < 7 )){
          return days[d1.getDay()]
        }
        else {
          
          return d1.toLocaleDateString();
        }
      }
    }
        
      catch(err){
        console.log(err);
      }
        
       
      }
  
     export const Timestamp2 = (value) => {


        try {
          const chattime = value ? value.seconds*1000 : 0 ;
          
          var d1 = new Date(chattime);
          var d2 = new Date();
          
         
          var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          
          
          if(d1.getMonth() === d2.getMonth()) {
            if(d2.getDate() === d1.getDate()){
        
        
             return "Today"
        
            }
        
            
            else if((d2.getDate() - d1.getDate() === 1 )){
              return  "Yesterday" 
            }
        
            else if((d2.getDate() - d1.getDate() < 7 )){
              return days[d1.getDay()]
            }
            else {
              
              return d1.toLocaleDateString();
            }
          }
        }
            
          catch(err){
            console.log(err);
          }
            
           
          }
      
  
export default Timestamp;
