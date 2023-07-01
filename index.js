
const express = require('express');
const axios = require('axios');
const { log } = require('console');

const app = express();
let prev ;
let next;
let Fb_endpoint = "https://graph.facebook.com/v17.0/675271066939148/leads?access_token=EAANXkYCk4ssBAIlyE9nCO95YSodV9Q9LIZCuu7CAaOWDjTVOubksSMPRAtCR0c3EgZBM3yY9zOP8zrRKd8D7sDJiVandVuZBSQZBXiQnhKAQate9AtZA4FXQqe96DTPHDjFkLKfgZAfNH0EupSrpHsvj8uRgf9pRsomT8fhPUfGbAvR1nRvTr41euEKOGOK6gsuPwRy6sQn4AWq9fM9voh&pretty=1&limit=5";
let restart_api = "http://localhost:3000/leads"
app.get('/', async (req, res) => {
 

    res.status(200).json({Message:"SuccesFully Server Running"});
 
 
  
});

app.get('/leads', async (req, res) => {
 
  const response = await axios.get(Fb_endpoint);

  const data = response.data;
  next= data.paging.next
 

  res.status(200).json(data);



});

app.get('/leads/next', async (req, res) => {
 
  try {
    const response = await axios.get(next);

  const data = response.data;
  next= data.paging.next;
  prev = data.paging.previous;
  console.log(data.paging.previous);
 

  res.status(200).json(data);
  

  } catch (error) {
    if(!prev){
      res.status(401).json({message:"There is no next page",Torestart:restart_api})
     }else{
      res.status(401).json({message:"Something Wrong",Torestart:restart_api})
     }
  }


});

app.get('/leads/previous', async (req, res) => {
 
try {
  const response = await axios.get(prev);

  const data = response.data;
  next= data.paging.next;
  prev = data.paging.previous;
 

  res.status(200).json(data);
} catch (error) {
  if(!prev){
    res.status(401).json({message:"There is no previous page",Torestart:restart_api})
   }else{
    res.status(401).json({message:"Something Wrong",Torestart:restart_api})
   }
}



});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

