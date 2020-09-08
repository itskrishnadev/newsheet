import React from 'react';
import SideNav from '../../layout/SideNav'
import Campaign_Form from './campaign_form'
import millify from 'millify'
import {Link} from 'react-router-dom'
import NumericLabel from 'react-pretty-numbers';
import axios from "axios";
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import '@progress/kendo-react-intl'
import { filterBy } from '@progress/kendo-data-query'
// import MyModal from './MyModal'
import {Button} from 'reactstrap'
import { FormProvider } from 'antd/lib/form/context';
import { Slider } from '@material-ui/core';

const marks = [
  {
    value: 0,
    label: "0"
  },
  {
    value: 100000,
    label: "100k"
  },
  {
    value: 500000,
    label: "500k"
  },
  {
    value: 1000000,
    label: "1M"
  }
];

function valuetext(value) {
  return `${value}`;
}
function valuetexts(value) {
  return `${value}`;
}

const category = ["Beauty", "Vlogger","Fitness","Grooming","Fashion","Music","Food","Travel","Lifestyle","Tech", "Entertainment","Motivation","Educational","DIY","Gamer","Comedy Sketches","Moto Vlogger","Tech","Parenting/ Mom"]

class Dash extends React.Component{
	constructor(props){
    super(props);
    console.log(this.props.dash);
    this.state={
      value:this.props.dash,
       onSubmit:false,
       fields:[],
       values: [],
       Selectedcategory: [],
       youtube: false,
       instagram: false,
       followers: null,
       subscribers: null,
 
   
    };
    this.handleChecked = this.handleChecked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.OnChangeFilter = this.OnChangeFilter.bind(this);
    // this.handleChangefollowers = this.handleChangefollowers.bind(this);
    // this.handleChangeSubscribers = this.handleChangeSubscribers.bind(this);   
    this.handleFilter = this.handleFilter.bind(this);  
    // this.filterChange = this.filterChange.bind(this);  

   }
   
  //  handleChangeYoutube(event){
  //     this.setState({
  //        youtube: true
  //        });
  //        console.log(this.state.youtube)
  //   }
  //   handleChangeInstagram(event){
  //     this.setState({
  //        instagram: true
  //        });
  //        console.log(this.state.instagram)
  //   }

  //   handleChangefollowers(e) {
  //     var val = e.target.value;
  //     this.setState({ followers: val });
  //     console.log(this.state.followers)
  //   }

  // handleChangeSubscribers(e) {
  //   var val = e.target.value;
  //   this.setState({ subscribers: val });
  //   console.log(this.state.subscribers)
  // }

    OnChangeFilter(event){

      // if(event.target.checked) {
      //   this.setState({
      //     fields: [
      //        ...this.state.fields
      //       ],
      //       values :
      //        [
      //          ...event.target.value
      //       ]
      //   }, () => {
      //     console.log(this.state.fields);
      //     console.log(this.state.value);
      //   });
      // }

      var self = this;
      
      
      const id=event.target.id;
    
    
    

    

    if(id=='youtube'){
      
      var youtube ="youtube";
      var val = event.target.value;
      var k = 0;
      //check if it is in the fields,
      //check if it' value is up,
      //if it is then pop from both the fields and values.
      //likewise if it isn't in the fields already push on it.
      //you actually don't have to check for value being up
      for(var i=0;i<this.state.fields.length;i++){
        if(this.state.fields[i]=="youtube"){
         k=1;
          //pop both 
         this.state.fields.splice(i,1);
         this.state.values.splice(i,1);
         console.log(this.state.fields);
      console.log(this.state.values);
        }
      }
      if(k==0){
        this.setState({fields:this.state.fields.concat(youtube),values:this.state.values.concat(val)});

        console.log(this.state.fields);
      console.log(this.state.values);
      }

    }

    if(id=='instagram'){

      var instagram ="instagram";
      var val = event.target.value;
      var k = 0;
      //check if it is in the fields,
      //check if it' value is up,
      //if it is then pop from both the fields and values.
      //likewise if it isn't in the fields already push on it.
      //you actually don't have to check for value being up
      for(var i=0;i<this.state.fields.length;i++){
        if(this.state.fields[i]=="instagram"){
         k=1;
          //pop both 
         this.state.fields.splice(i,1);
         this.state.values.splice(i,1);
         console.log(this.state.fields);
      console.log(this.state.values);
        }
      }
      if(k==0){
        this.setState({fields:this.state.fields.concat(instagram),values:this.state.values.concat(val)});

        console.log(this.state.fields);
      console.log(this.state.values);
      }

    }

  }

  onChangeMultiselect = (event) => {
    this.setState({
      Selectedcategory: [ ...event.target.value ]
    }, console.log(this.state.Selectedcategory));
}

//for instagram followers
handleOnChangeIn = (event, value) => {
  this.setState({insta_followers: value });
  console.log(value);
  var insta_followers= "insta_followers";
      //var val = event.target.value;
      
      var k = 0;
      var f=0;
      //check if it is in the fields,
      //check if it' value is up,
      //if it is then pop from both the fields and values.
      //likewise if it isn't in the fields already push on it.
      //you actually don't have to check for value being up
      for(var i=0;i<this.state.fields.length;i++){
        if(this.state.fields[i]=="insta_followers"){
         k=1;
         //pop both 
         //this.state.fields.splice(i,1);
         //set the new value
         if(value==0){
          this.state.fields.splice(i,1);
        this.state.values.splice(i,1);
        f=1;
        }
          if(f==0){
         var new_values= this.state.values;
         new_values[i]=value;

         this.setState({values:new_values});
         //this.state.values.splice(i,1);
         console.log(this.state.fields);
      console.log(this.state.values);
          }
        }
      }
      if(k==0){
      this.setState({fields:this.state.fields.concat(insta_followers),values:this.state.values.concat(parseInt(value))});
      console.log(this.state.fields);
      console.log(this.state.values);
      }
};

// for youtube subs
handleOnChangeYt = (event, value) => {
  var youtube_subscribers= "youtube_subscribers";
      //var val = event.target.value;
      console.log(value);

      console.log("inside");
      var k = 0;
      var f=0;
      //check if it is in the fields,
      //check if it' value is up,
      //if it is then pop from both the fields and values.
      //likewise if it isn't in the fields already push on it.
      //you actually don't have to check for value being up
      for(var i=0;i<this.state.fields.length;i++){
        if(this.state.fields[i]=="youtube_subscribers"){
         k=1;
         
         //if value ==0 
         //then pop both 
          //pop both 
        // this.state.fields.splice(i,1);
        // this.state.values.splice(i,1);
        if(value==0){
          this.state.fields.splice(i,1);
        this.state.values.splice(i,1);
        f=1;
        }
        if(f==0){
        var new_values= this.state.values;
         new_values[i]=value;

         this.setState({values:new_values});
         console.log(this.state.fields);
      console.log(this.state.values);
        }
        }
      }
      if(k==0){
        console.log("inside concat");
      this.setState({fields:this.state.fields.concat(youtube_subscribers),values:this.state.values.concat(parseInt(value))});
      console.log(this.state.fields);
      console.log(this.state.values);
      }
  
};


  handleFilter(event){
     var self = this;
    const {fields, values,Selectedcategory} = this.state;
    //add the fields from selectedcategory array and set all the values to Up in the values array.
    for(var i=0;i<Selectedcategory.length;i++){
       fields.push(Selectedcategory[i]);
       values.push("Up");
    }
 console.log(fields);
 console.log(values);
 axios({
  method: 'post',
  url: '/api/users/get_influencers_filtered',
  data: {
    fields: fields,
    values: values
  }
})
.then(function (response) {
   console.log(response);
   self.setState({value:response.data});
 })
 .catch(function (error) {
   console.log(error);
 });
    
  }



   handleChecked(event){
      //get the check event in here
      var self=this;
      const target=event.target;
      const name=target.name;
      console.log(name);
      //the default check status is false every other time we change it.
      console.log(self.state.value);
      var arr=self.state.value;
      console.log(arr);
      for(var i=0;i<arr.length;i++){
         if(arr[i]['name']==name){
            var bool=arr[i]['checked'];
            arr[i]['checked']=(!bool);
            
         }
      }
      self.setState({value:arr});

   }

   handleSubmit(event) {
    console.log("hi, it has been clicked");
    var self=this;
    //identifying checkboxes with influencer name
    //get all the ticked checkboxes and the respective influencer data
    //store this in a map and then redirect to the compaign_form component.
    //get the ticked checkboxes data in an array and redirect to compaign_form.
    //
          

        
         /* for(const[k,v] of this.props.dash.entries()){



            return(
            <tr key={k}>
               <td>{v[0]}</td>
               <td>{v[1]}</td>
               <td>{v[2]}</td>
               <td>{v[3]}</td>
               <td>{v[4]}</td>
               <td>{v[5]}</td>
               <td>{v[6]}</td>
            </tr>

          )
          
          
      
         //const { id, name, age, email } = student //destructuring
        // console.log(value);
         
         
      }*/

      //set onsubmit=true
      //get the filtered values only
      var filtered_arr=[];
      var j=0;
      var arr=self.state.value;

      /*for(var i=0;i<arr.length;i++){
         if(arr[i]['checked']==true){
            filtered_arr[j]=arr[i]['name'];
            j=j+1;
         }
      }*/
     // console.log(filtered_arr);
      self.setState({onSubmit:true,value:arr});
      
   }

    //loop through all the keys and show it from insta and youtube results.
	render(){
      var option = {
         'justification':'C',
         'locales':'en-AU',
         'currency':false,
         //'currencyIndicator':'AUD',
         'percentage':false,
         'precision':1,
         'wholenumber':null,
         'commafy':true,
         'shortFormat':true,
         'shortFormatMinValue': 1000,
         'shortFormatPrecision': 1,
         'title':true
       };
		return(
         <div className="list">
         {this.state.onSubmit ? <Campaign_Form checked ={this.state.value}/> : 
         <div >



      <div className="filter-action row">
                    <div className="col-md-12" >
                       <div className="row">
                       <div className="col-md-1">
                       <p>Platform :</p>
                     <p> Youtube : 
                        <input type="checkbox" id="youtube" value="Up" onChange={this.OnChangeFilter} className="mycheckbox"  /> </p> 
                     <p> Instagram : <input type="checkbox" value="Up" id="instagram" onChange={this.OnChangeFilter} className="mycheckbox" /> </p> 
       
                       </div>
       
                       <div className="col-md-2">
                       <p>Instagram followers :</p>
                       <Slider
                        id="instaslider"
                      defaultValue={0}
                      getAriaValueText={valuetexts}
                      aria-labelledby="discrete-slider-restrict"
                      step={null}
                      onChange={this.handleOnChangeIn}
                      // valueLabelDisplay="auto"
                      marks={marks}
                      min={0}
                      max={1000000}
                    />
            
                          </div>
       
                          <div className="col-md-2">
                          <p>Youtube Subscribers :</p>
                          <Slider
                          id="ytslider"
                          defaultValue={0}
                          getAriaValueText={valuetext}
                          aria-labelledby="discrete-slider-restrict"
                          step={null}
                          onChange={this.handleOnChangeYt}
                          //valueLabelDisplay="auto"
                          marks={marks}
                          min={0}
                          max={1000000}
                        />
                     
                          </div>
       
                    
                       <div className="col-md-3">
                       <MultiSelect
                        data={category}
                        autoClose={false}
                        onChange={this.onChangeMultiselect}
                        value={this.state.Selectedcategory}
                    />
                  
       </div>
       
                
       
                          <div className="col-md-2">
                        <Button onClick={this.handleFilter}>Apply</Button>
                          </div>
                          {/* <div className="col-md-2">
                        <p>{this.state.data}</p>
                          </div> */}
                    </div>
                       </div>
                 
            
       
                       </div>
        

         <table  className="highlight">

         <thead  key="thead">
                <tr>
           <th className="tabcol12">Select</th>
           <th>Name</th>
           <th colspan="3" style={{textAlign:"center"}} className="ytclr" >Youtube</th>
           
           <th colspan="4" style={{textAlign:"center"}} className="instaclr">Instagram</th>
           <th colspan="5" style={{textAlign:"center"}} className="comerclr">commercials of influencer</th>
           <th colspan="5" style={{textAlign:"center"}} className="delclr"> No of deliverables </th>
           <th colspan="5" style={{textAlign:"center"}} className="branclr"> Brand commercials </th>
           <th  style={{textAlign:"center"}}> Location </th>
           <th  style={{textAlign:"center"}}> Company / Agency  </th>
           <th  style={{textAlign:"center"}}> Manager Name </th>
           <th  style={{textAlign:"center"}}> Email id </th>
           <th  style={{textAlign:"center"}}> Contact </th>

          </tr>
         </thead>
            
         <thead  key="thead">
                    <tr>
           <th className="" ></th>
           <th className=""></th>
           {/* for Youtube */}
           <th className="ytclr" >youtube_views</th>
           <th className="ytclr">URL</th>
           <th className="ytclr">youtube_subscribers</th>
           {/* for instagram */}
           <th className="instaclr" >insta_followers</th>
           <th className="instaclr">insta_media</th>
           <th className="instaclr">URL</th>
           <th className="instaclr" >insta_avgrate</th>

           <th className="comerclr" >Youtube video</th>
           <th className="comerclr">instagram story</th>
           <th className="comerclr">instagram static post </th>
           <th className="comerclr" >instagram video post</th>
           <th className="comerclr" >tiktok video</th>

             {/* No of deliverables */}  
             <th className="delclr" >Youtube video</th>
           <th className="delclr">instagram story</th>
           <th className="delclr">instagram static post </th>
           <th className="delclr" >instagram video post</th>
           <th className="delclr" >tiktok video</th>

           {/* No of Brand commercials */}  
           <th className="branclr" >Youtube video</th>
           <th className="branclr">instagram story</th>
           <th className="branclr">instagram static post </th>
           <th className="branclr" >instagram video post</th>
           <th className="branclr" >tiktok video</th>

           <th className="" ></th>
           <th className="" ></th>
           <th className="" ></th>
           <th className="" ></th>
           <th className="" ></th>
          </tr>
         </thead>
         <tbody>
          {this.state.value.map(v=>
    
     <tr key={v}>
          <td className=""><label><input type="checkbox" name={v['name']} class="filled-in" onChange={this.handleChecked} /><span>?</span> </label></td>                 
          <td>{v['name']}</td>
          {/* for Youtube */}
          <td className=""><NumericLabel params={option}>{v['youtube_views']}</NumericLabel></td>
          <td>
        
          <a href={`${v['youtube_url']}`} target="_blank">visit</a> 
          </td>
          <td><NumericLabel params={option}>{v['youtube_subscribers']}</NumericLabel></td>
          {/* for instagram */}
          <td className=""><NumericLabel params={option}>{v['insta_followers']}</NumericLabel></td>
          <td><NumericLabel params={option}>{v['insta_media']}</NumericLabel></td>
          <td>
          
              <a href={`${v['insta_url']}`} target="_blank">visit</a> 
             </td>
          <td className=""><NumericLabel params={option}>{v['insta_avgrate']}</NumericLabel></td>
         {/* for commercials of influencer */}
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          {/* No of deliverables */}  
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          {/* Brand commercials */}
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>

          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
       </tr>


 //})S
         )}
        </tbody>
        </table>
        <button class="btn waves-effect waves-light lightcarminepink" type="submit" name="action" onClick={this.handleSubmit}>Submit
        <i class="material-icons right">send</i>
         </button>
         </div>
        }  
           

             
        </div>


             


			)
	}
}

export default Dash;






//update form contains 
//the following columns
//insta id,and the columns with the details to be changed.
//therefore the details i.e the columns added would be changed everytime
//therefore the script has to be changed everytime.
//aah that is weird
