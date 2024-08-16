export function formatDate(dateString:string) {
    const date = new Date(dateString);
  
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    
    const formattedHours = hours % 12 || 12; // convert 24h to 12h format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${dayOfWeek}, ${month} ${day}, ${formattedHours}:${formattedMinutes} ${period}`;
  }
  
  const formattedDate = formatDate("2024-07-09T01:27:00.000Z");
  console.log(formattedDate); 
  