//get this thing done.
//with mongo and bootstrap.

import React from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import Dash from './Dash';
// import Krishna from './Krishna'
import SideNav from '../../layout/SideNav'
import Spinner from 'react-spinner-material';
import data from './data.json'




const Home = () =>  <Spinner spinnerColor={"#333333"}  visible={true} />

  class New_Sheet extends React.Component {


    constructor(props){
      super(props);
      this.state={response:true,insta_results:data};
      this.responseFacebook = this.responseFacebook.bind(this);

    }


    componentDidMount(){
      //query the mongo for the whole database.
      //assuming all the new data is flagged up.
      var self=this;
      const mongo = require('mongodb').MongoClient;
    // axios.get("/api/influencers/get_influencers").then(function(response){
          
    //           var value=response.data;
    //           // console.log(value);
    //           self.setState({insta_results:value, response:true});
              
    //           })
    //         .catch(function (error) {
    //           console.log(error);
    //           });

      // get_influencers(function(obj){
      //   //obj is the array 
      //   //put that array in the state
      //   //but dash has to be changed
      //   for(var i=0;i<obj.length;i++){
      //     obj[i]['checked']=false;
      //   }
      //   // console.log(obj)
      //   self.setState({insta_results:obj, response:true});
      // })
      

    }
   responseFacebook(response) {
      
      //pass the list to a function and in it's callback call the node server api to get youtube results and then set state for both insta and youtube.
      //In the function- given below.
      //loop through the list by calling axios and update the same map on every call.
      //check if the map's length is influencers.length and if it is return map in callback.
      //the above condition would be present in the axios ka callback.
      var insta_influencers=["viscafcb","realmadrid"];
      const mongo = require('mongodb').MongoClient;


      var token=response.accessToken;
      var map = new Map();
      var final_map = new Map();
    
      //var media=new Map();
      var youtube={};

      //call the api with the access token 
      var self=this;
      var arr1=[];

      //call the node api and give it the token 


      //get the mongo thing
      getmongo(function(obj){
        var mongo_influencers=[];
        var mongo_influencersname=[];
        //need to get the usernames as well.
        //invalid assumption that insta name == name
        for(var i=0;i<obj.length;i++){
          mongo_influencers[i]=obj[i];


        }
        console.log(mongo_influencers);
        for(var i=0;i<mongo_influencers.length;i++){
        var insta_url= "https://graph.facebook.com/v3.2/17841402013267439?fields=business_discovery.username("+mongo_influencers[i]+"){followers_count,media_count,media{comments_count,like_count}}&access_token="+token+"";
        //console.log(insta_url);
        getinstauser_media(i,insta_url, map,mongo_influencers,function(map,i){
            final_map= map;

            //console.log(final_map); 

            if(final_map.size==(mongo_influencers.length)){
              //console.log(final_map);
              //call the youtube api
              getyoutube(function(obj){

                youtube=obj;
                //console.log(youtube);

                for (const [k, v] of final_map.entries()) {
                //console.log(k, v);
                //get the value out 
                //console.log(v);
                //get the value out from youtube object

                var value=youtube[k];
                console.log(value);
                
                var new_val=value.concat(v);
               // console.log(new_val);
               //set the new value to map object 


                final_map.set(k,new_val);

                




                






              }

              //update the state
              //console.log(final_map);
              var array=Array.from(final_map);
              var sub_arr=[];
              for(var i=0;i<array.length;i++){
                 sub_arr=array[i];
                 array[i]=sub_arr.concat(false);
              }
              //var array1=[];
              //array1=array.concat(check);
              console.log(array);

              self.setState({insta_results:array,response:true});
              //console.log(self.state.insta_results);
              //get the csv logic in here 
              //make a post call with the map as body.
              /*axios.post('http://localhost:5000/api/users/csv',{
    	        results:array
              })
              .then(function (response) {
              console.log(response);
              })
              .catch(function (error) {
              console.log(error);
              });*/
      




              });
              


            }
          })
        //for ending
      }




      })


      
                


      //console.log(self.state.response);
      

        



      //update the state(done)




      //this is the response tag

    } 

    render() {
      return (
        <div className='dash'>
          <SideNav />
          {this.state.response ?
          <Dash dash={this.state.insta_results} />:
        // <Krishna dash={this.state.insta_results} />:
          <Home />
          }
        </div>
        
      )
    }

  //this is same as the test environment
   /* { this.state.response ? <Dash dash={this.state.insta_results}/> :
    <FacebookLogin
    appId="510564926482169"
    autoLoad={true}
    fields="name,email,picture"
    scope="instagram_basic,instagram_manage_insights,manage_pages"
    callback={this.responseFacebook}
    />

    //dashboard rendering instead of userscreen rendering.For that pass the response as the props.(this.state.user).
    
  }*/
  
    

}
function getinstauser_media(i, url,map,influencers,callback){
  var j=i;
  var arr=influencers;

      axios.get(url).then(function (response){

        var items = response.data.business_discovery;
        console.log(items);
        var user_id=items.id;
        //var insights_url="https://graph.facebook.com/v3.2/"+user_id+"?insights?metric=impressions,reach,profile_views&period=day";


        //console.log(items);

        //get the other data out as well.
        var media=items.media.data;
        var id=new Map();
        var average_rate=0;
        var engagement;
        var followers;
        var rate;
        for(var i=0;i<5;i++){
          //id.set(media[i].id,[media[i].like_count,media[i].comments_count]);
          //do the logic of finding the engagement here.
          //get the like+comments for the particular id.
          //get the impressions for the particular id.
          //do the division for the particular id.
          //add it to the engagement rate variable.
         engagement=(media[i].like_count+media[i].comments_count);
         console.log(media[i].like_count);
        // console.log(engagement);
         followers=(items.followers_count);
         rate=engagement/followers;
         rate=rate*100;
         

         average_rate=average_rate+rate;
         












        }
        average_rate=average_rate/5;
        
        

        map.set(arr[j],[items.followers_count,items.media_count,average_rate]);

        
       console.log(map);




        
       callback(map,j);
        

        //call the instame

          


        })
        .catch(function (error){
          //handle error
          console.log(error);
          console.log("hey");
          map.set(arr[j],[0,0,0]);
          callback(map,j);
          


        })
    }


function getyoutube(callback){
  axios.get("/api/deprecated/influencers").then(function(response){
    //console.log(response);
    //get the json
    var obj=response.data;
    //console.log(obj);
    //convert to map 
    callback(obj);

  }).catch(function (error){
          //handle error
          console.log(error);

  })

}



function getmongo(callback){
  axios.get("/api/deprecated/insta").then(function(response){
    //console.log(response);
    //get the json
    var obj=response.data;
    //convert to array
    callback(obj);

  }).catch(function (error){
          //handle error
          console.log(error);

  })

}

function get_influencers(callback){
  axios.get("/api/influencers/get_influencers").then(function(response){
    //console.log(response);
    //get the json
    var obj=response.data;
    //convert to array
    callback(obj);

  }).catch(function (error){
          //handle error
          console.log(error);

  })

}





  


export default New_Sheet;           















