import React from "react";
// import ReactDataGrid from "react-data-grid";
// Import React Table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Campaign_Form from './campaign_form'
import InputRange from 'react-input-range';
import { Slider } from '@material-ui/core';
import {Button , Form, Col} from 'reactstrap'
import axios from "axios";
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import '@progress/kendo-react-intl'
import $ from 'jquery';
import 'react-input-range/lib/css/index.css';
import { Modal} from 'rsuite';
import '../../../assets/style/rsuite-default.css';
import  YtVideoCommEditor ,{InstaStoryCommEditor, InstaStaticPstCommEditor, InstaVideoPostCommEditor,TiktokVideoCommEditor } from './CommEditor'
import moment from "moment";
import { Radio } from 'antd';
import { logoutUser } from "../../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import resetFilterImg from '../../../assets/reset-filter.png'
import { Drawer, ButtonToolbar } from 'rsuite';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';
// const { Column, HeaderCell, Cell, ColumnGroup } = Table;
// import Demo1 from './de';
// import { slide as Menu } from 'react-burger-menu'



function onAfterSaveCell(row,cellName,cellValue){
  //clearly this is a hook
  //so it's a function component which can have two fields rendered called total cost and monk-e fee with initial values set using useState.
  //once the parameters come in you can change the state variables , which will rerender the thing containing the fields.

    console.log(cellName);
    console.log(row.name);
    alert(`Save cell ${cellName} with value ${cellValue}`);

}

function valuetext(value) {
  return `${value}`;
}
function valuetexts(value) {
  return `${value}`;
}
var numeral =require('numeral');


const category = ["Beauty", "Vlogger","Fitness","Grooming","Fashion","Music","Food","Travel","Lifestyle","Tech", "Entertainment","Motivation","Educational","DIY","Gamer","Comedy Sketches","Moto Vlogger","Tech","Parenting/ Mom"]

const date = moment().format("DD-MM-YYYY hh:mm:ss");

class Krishna extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.dash);
    var my=numeral(1000.0);
    var n=my.value();
    var allname=[];

    // console.log(n);
    var value_arr=this.props.dash;
    for(var i=0;i<value_arr.length;i++){
      var name=value_arr[i]["name"]
      // console.log(name);
      allname.push(name);
      if(value_arr[i]['insta_followers'] >= 1000){
        var val=numeral(value_arr[i]['insta_followers']).format('0.0a');
        var u_val=val.toUpperCase();
        //console.log(u_val);
        value_arr[i]['insta_followers']=u_val;
       // console.log(value_arr[i]['insta_followers']);
      }
      if(value_arr[i]['youtube_subscribers'] >= 1000){
      var val_yousub=numeral(value_arr[i]['youtube_subscribers']).format('0.0a');
      var u_val_yousub=val_yousub.toUpperCase();
      value_arr[i]['youtube_subscribers']=u_val_yousub;
      }
      if(value_arr[i]['youtube_views'] >= 1000){
        var val_youview=numeral(value_arr[i]['youtube_views']).format('0.0a');
        var u_val_youview=val_youview.toUpperCase();
        value_arr[i]['youtube_views']=u_val_youview;
        }
      value_arr[i]['insta_avgrate']=numeral(value_arr[i]['insta_avgrate']).format('0.0');
      //console.log(value_arr[i]['insta_avgrate']);
      if(value_arr[i]['insta_st']!=''|| value_arr[i]['insta_st']!='0.0'){
        if(value_arr[i]['insta_st']==undefined){
          value_arr[i]['insta_st']=null;
        }
        else{
          value_arr[i]['insta_st']=numeral(value_arr[i]['insta_st']).value();


        }
      //console.log(value_arr[i]['insta_st']);
      }
      if(value_arr[i]['insta_static']!=''|| value_arr[i]['insta_static']!='0.0'){

        if(value_arr[i]['insta_static']==undefined){
          value_arr[i]['insta_static']=null;
        }
        else{
          value_arr[i]['insta_static']=numeral(value_arr[i]['insta_static']).value();


        }
        //console.log(value_arr[i]['insta_static']);
        }
      if(value_arr[i]['insta_video']!=''|| value_arr[i]['insta_video']!='0.0'){

        if(value_arr[i]['insta_video']==undefined){
          value_arr[i]['insta_video']=null;
        }
        else{
          value_arr[i]['insta_video']=numeral(value_arr[i]['insta_video']).value();


        }        
          //console.log(value_arr[i]['insta_video']);
          }  
      if(value_arr[i]['yt_video']!=''|| value_arr[i]['yt_video']!='0.0'){

        

        if(value_arr[i]['yt_video']==undefined){
          value_arr[i]['yt_video']=null;
        }
        else{
          value_arr[i]['yt_video']=numeral(value_arr[i]['yt_video']).value();


        }
        
        //console.log(value_arr[i]['yt_video']);
        }
        if(value_arr[i]['tiktok_video']!=''|| value_arr[i]['tiktok_video']!='0.0'){

          if(value_arr[i]['tiktok_video']==undefined){
            value_arr[i]['tiktok_video']=null;
          }
          else{
            value_arr[i]['tiktok_video']=numeral(value_arr[i]['tiktok_video']).value();
  
  
          }
        //  console.log(value_arr[i]['tiktok_video']);
          }
    }
    this.state={
      value:this.props.dash,
      test:this.props.dash,
      value:value_arr,
      onSubmit:false,
      allname:allname,
      fields:[],
      values: [],
      example:false,
      commfield:'select',
      Selectedcategory: [],
      youtube: false,
      instagram: false,
      followers: null,
      subscribers: null,
      filterVisible:false,
      sum:0,
      count:0,
      hideYt:false,
      hideInsta:false,
      krishnaInflu:['Aashika Bhatia'],
      krishna:[],
      brand_name:'',
      newBrand:'',
      new_brand:'',
      campaign_name:'',
      campaign_desc:'',
      campaign_date:'',
      cost_monk:'',
      total_cost:null,
      monk_fee:null,
      selected_col:'',
      commercial_range: {
        min: 0,
        max: 80000,
      },
      Instagram_follow: {
        min: 0,
        max: 500000,
      },
      youtube_subs: {
        min: 0,
        max: 500000,
      },
      show: false,
      instagramFolBool:false,
      youtubeSubsBool:false,
      infCOomBool:false,
      male:false,
      female:false,
      showcol:'4',
      toggle:"1",
      total_cost:0,
      monk_fee:0,
      instaonly:true,
      youtubeonly:true,
      selected_row:[],
      show_d1:false,
      show_d2:false,
      sh_on_yt:true,
      dnt_sh_btn:true,
      new_inlfuecer_modal:false,
      NewSelectedcategory:[],
          youtube_subscribers:null,
          yt_video:null,
          youtube:null,
          insta_followers:null,
          insta_st:null,
          insta_static:null,
          insta_video:null,
          insta_url:'',
          com_agency:'',
          manager:'',
          contact:null,
          location:'',
          insta_avgrate:null,
          inta_avg_post:null,
          inta_avg_video:null,
          inta_avg_reel:null,
          insta_static_reach:null,
          yt_avg_views:null,
          name:'',
          email_id:'',
          gender:'',
          valuepresent:false,
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.OnChangeFilter = this.OnChangeFilter.bind(this);
    this.handleFilter = this.handleFilter.bind(this);  
    this.resetFilter = this.resetFilter.bind(this);  
    this.handleOnChangeCommk=this.handleOnChangeCommk.bind(this);
    this.handleOnChangefield=this.handleOnChangefield.bind(this);
    this.onChangeDisable=this.onChangeDisable.bind(this);
    
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.closekar = this.closekar.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.toggleDrawer_2 = this.toggleDrawer_2.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNewInflueSubmit = this.handleNewInflueSubmit.bind(this);
// console.log(this.state.test.youtube_url)


}

close() {
  this.setState({
    show: false
  });

  var instagramFolBool= this.state.instagramFolBool;
console.log(instagramFolBool)
if(this.state.instagramFolBool==true){
  this.setState({hideInsta:true,hideYt:false,showcol:"1"})
}
if(this.state.instagramFolBool==false){
  this.setState({hideInsta:false,hideYt:false,showcol:"4"})
}
}
open(size) {
  this.setState({
    size,
    show: true
  });
}
handleRowSelect(row, isSelected, e,rowIdx){
  //get the check event in here
  var self=this;
  console.log(row);
  // console.log(isSelected);
  const name=row.name;
  console.log(name);

  
  //to add the selected influencer in checked list
  var joined = this.state.krishna

  //the default check status is false every other time we change it.
  // console.log(self.state.value);
  var arr=self.state.value;
  // console.log(arr);
  for(var i=0;i<arr.length;i++){
     if(arr[i]['name']==name){
        //var bool=arr[i]['checked'];
        //arr[i]['checked']=(!bool);
        arr[i]['checked']=isSelected;
        // console.log(arr[i]);
     }
  }
  self.setState({value:arr});

  

  //listen the the onchange checked event
  const { checked, type } = e.target;
  let count= this.state.count
  //check the checked checkbox
    if (type === "checkbox" && checked === true) {
      var joined = this.state.krishna

      joined.push(name)
      this.setState({ krishna: joined })

      this.setState(state => state.count++, this.logCount)

      var selectRow=this.state.selected_row

      selectRow.push(row);
      this.setState({selected_row:selectRow} )
      // console.log(selectRow)
      
    } else {
      this.setState(state => state.count--, this.logCount)
      console.log("Yo delete the array")
      for(var i=0;i<this.state.krishna.length;i++){
        if(this.state.krishna[i]==name){

          //pop both 
         this.state.krishna.splice(i,1);
        //  console.log(this.state.krishna);

        }
      }

      var selectRow=this.state.selected_row;
      // console.log(selectRow);
      for(var j=0;j<selectRow.length;j++){
        console.log("in")
        if(selectRow[j]['name']==name){
          // console.log(selectRow[j]);

          //pop object 
          // delete selectRow[i];
          selectRow.splice(j,1);
        //  console.log(selectRow);
        }
       }
       this.setState({selected_row:selectRow} )
    }
  // }
  return { color: rowIdx % 1 === 0 ? 'red' : 'blue' }
}
logCount() {
  // console.log(this.state.count);
}



componentDidMount() {

console.log(this.state.allname)
}
scrollToBottom = () => {
  console.log("go down")
  const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
};


handleSubmit(event) {
  console.log("hi, it has been clicked");
  //identifying checkboxes with influencer name
  //get all the ticked checkboxes and the respective influencer data
  //store this in a map and then redirect to the compaign_form component.
  //get the ticked checkboxes data in an array and redirect to compaign_form.
  //  
        
    //set onsubmit=true
    //get the filtered values only
    var filtered_arr=[];
    var j=0;
    var arr=this.state.value;
    var sum=0;
    //get the addition done here.
    for (var i=0;i<arr.length;i++){
      if(arr[i]['checked']==true){
        //add here
        //first check if they give the following keys are present.
        var brand_insta_story=arr[i].hasOwnProperty('brand_insta_story');
        if(brand_insta_story){
          sum=sum+(parseInt(arr[i]['brand_insta_story']))
        }
        var brand_insta_static=arr[i].hasOwnProperty('brand_insta_static');
        if(brand_insta_static){
          sum=sum+(parseInt(arr[i]['brand_insta_static']))
        }
        var brand_insta_video=arr[i].hasOwnProperty('brand_insta_video');
        if(brand_insta_video){
          sum=sum+(parseInt(arr[i]['brand_insta_video']))
        }
        var brand_youtube_video=arr[i].hasOwnProperty('brand_youtube_video');
        if(brand_youtube_video){
          sum=sum+(parseInt(arr[i]['brand_youtube_video']))
        }

        //var total= (parseInt(arr[i]['brand_insta_story']) + parseInt(arr[i]['brand_insta_static']) + parseInt(arr[i]['brand_youtube_video']) + parseInt(arr[i]['brand_insta_video']));
        //console.log(total);
        //sum=sum+total;  
      }
    }
    if(this.state.count==0){alert("Please Select Influencers")}
    if(this.state.count!==0){this.setState({onSubmit:true,value:arr,sum:sum });}
    
    
 }


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
  
  
  console.log("yo male and female")

  

  // if(id=='youtuber'){
    
  //   var youtube ="youtuber";
  //   var val = event.target.value;
  //   var k = 0;
  //   //check if it is in the fields,
  //   //check if it' value is up,
  //   //if it is then pop from both the fields and values.
  //   //likewise if it isn't in the fields already push on it.
  //   //you actually don't have to check for value being up
  //   for(var i=0;i<this.state.fields.length;i++){
  //     if(this.state.fields[i]=="youtuber"){
  //      k=1;
  //       //pop both 
  //      this.state.fields.splice(i,1);
  //      this.state.values.splice(i,1);
  //      console.log(this.state.fields);
  //   console.log(this.state.values);
  //     }
  //   }
  //   if(k==0){
  //     this.setState({fields:this.state.fields.concat(youtube),values:this.state.values.concat(val)});

  //     console.log(this.state.fields);
  //   console.log(this.state.values);
  //   }

  // }


  // if(id=='instagram'){

  //   var instagram ="instagram";
  //   var val = event.target.value;
  //   var k = 0;
  //   //check if it is in the fields,
  //   //check if it' value is up,
  //   //if it is then pop from both the fields and values.
  //   //likewise if it isn't in the fields already push on it.
  //   //you actually don't have to check for value being up
  //   for(var i=0;i<this.state.fields.length;i++){
  //     if(this.state.fields[i]=="instagram"){
  //      k=1;
  //       //pop both 
  //      this.state.fields.splice(i,1);
  //      this.state.values.splice(i,1);
  //      console.log(this.state.fields);
  //   console.log(this.state.values);
  //     }
  //   }
  //   if(k==0){
  //     this.setState({fields:this.state.fields.concat(instagram),values:this.state.values.concat(val)});

  //     console.log(this.state.fields);
  //   console.log(this.state.values);
  //   }

  // }

  //for male filter
  if(id=='Male'){
    this.setState({male:!this.state.male})
    var Male ="Male";
    var val = event.target.value;
    var k = 0;
    //check if it is in the fields,
    //check if it' value is up,
    //if it is then pop from both the fields and values.
    //likewise if it isn't in the fields already push on it.
    //you actually don't have to check for value being up
    for(var i=0;i<this.state.fields.length;i++){
      if(this.state.fields[i]=="Male"){
       k=1;
        //pop both 
       this.state.fields.splice(i,1);
       this.state.values.splice(i,1);
       console.log(this.state.fields);
    console.log(this.state.values);
      }
    }
    if(k==0){
      this.setState({fields:this.state.fields.concat(Male),values:this.state.values.concat(val)});

      console.log(this.state.fields);
    console.log(this.state.values);
    }

  }
  //for female filter
  if(id=='Female'){
    this.setState({female:!this.state.female})
    var Female ="Female";
    var val = event.target.value;
    var k = 0;
    //check if it is in the fields,
    //check if it' value is up,
    //if it is then pop from both the fields and values.
    //likewise if it isn't in the fields already push on it.
    //you actually don't have to check for value being up
    for(var i=0;i<this.state.fields.length;i++){
      if(this.state.fields[i]=="Female"){
       k=1;
        //pop both 
       this.state.fields.splice(i,1);
       this.state.values.splice(i,1);
       console.log(this.state.fields);
    console.log(this.state.values);
      }
    }
    if(k==0){
      this.setState({fields:this.state.fields.concat(Female),values:this.state.values.concat(val)});

      console.log(this.state.fields);
    console.log(this.state.values);
    }

  }

}

handleNewInflueSubmit=(event)=>{
  var allname= this.state.allname;
  var name=this.state.name;
  const isInArray = allname.includes(name);
  console.log(isInArray); 

    console.log(allname.indexOf(name) )

    if(isInArray==true){
      alert("name already present")
    }else{
      this.setState({valuepresent:false})
      const value=this.state.value;
      var valuepresent = this.state.valuepresent;
      console.log(this.state.valuepresent)
      const row = {
        name:this.state.name,
        email_id:this.state.email_id,
        youtube_subscribers:this.state.youtube_subscribers,
        yt_video:this.stateyt_video,
        youtube:this.state.youtube,
        insta_followers:this.state.insta_followers,
        insta_st:this.state.insta_st,
        insta_static:this.state.insta_static,
        insta_video:this.state.insta_video,
        insta_url:this.state.insta_url,
        com_agency:this.state.com_agency,
        manager:this.state.manager,
        contact:this.state.contact,
        location:this.state.location,
        insta_avgrate:this.state.insta_avgrate,
        inta_avg_post:this.state.inta_avg_post,
        inta_avg_video:this.state.inta_avg_video,
        inta_avg_reel:this.state.inta_avg_reel,
        insta_static_reach:this.state.insta_static_reach,
        yt_avg_views:this.state.yt_avg_views,
        name:this.state.name,
        email_id:this.state.email_id,
        gender:this.state.gender,
      }
      console.log(row)
      this.scrollToBottom();
      this.setState({new_inlfuecer_modal:false})
      value.push(row)

      axios({
        method: 'post',
        url: "/api/users/insert_influencer",
        data: {
       obj:row
              }
              })
        .then(function (response) {
        console.log(response);
       
       
        })
       
        .catch(function (error) {
        console.log(error);
        })
    }
  event.preventDefault();


}

onChangeMultiselect = (event) => {
  // var id=event.target.id

 
  this.setState({
    Selectedcategory: [ ...event.target.value ]
  }, console.log(this.state.Selectedcategory));

 
}
onChangeNewMultiselect =  (event) => {
    this.setState({
      NewSelectedcategory: [ ...event.target.value ]
    }, console.log(this.state.NewSelectedcategory));
}
handleOnChangeIn = (object) => {


var insta_followers= "insta_followers";
    //var val = event.target.value;
    var self= this
    var arr=[]
      arr[0]=object['min'];
  arr[1]=object['max'];
    var k = 0;
    var f=0;
    //check if it is in the fields,
    //check if it' value is up,
    //if it is then pop from both the fields and values.
    //likewise if it isn't in the fields already push on it.
    //you actually don't have to check for value being up.
    for(var i=0;i<this.state.fields.length;i++){
      if(this.state.fields[i]==insta_followers){
       k=1;
       //pop both 
       //this.state.fields.splice(i,1);
       //set the new value
       if(arr[0]==0 && arr[1]==0){
        this.state.fields.splice(i,1);
      this.state.values.splice(i,1);
      f=1;
      }
        if(f==0){
       console.log(self.state.values);
      var new_values=[]; 
     new_values= this.state.values;
     var new_fields=this.state.fields;
    //  new_fields[i]=field;
    console.log(new_values);
     new_values[i]=arr;

     this.setState({values:new_values,fields:new_fields});
     console.log(this.state.fields);
  console.log(this.state.values);
        }
      }
    }
    if(k==0){
    console.log("inside concat");
    var values =[];
    values.push(arr);
    console.log(values);
  this.setState({fields:this.state.fields.concat(insta_followers),values:values});
  console.log(this.state.fields);
  console.log(this.state.values.length);
    }
};

// for youtube subs
handleOnChangeYt = (object) =>{
 

var youtube_subscribers= "youtube_subscribers";
//var val = event.target.value;
var self= this
var arr=[]
  arr[0]=object['min'];
arr[1]=object['max'];
var k = 0;
var f=0;
//check if it is in the fields,
//check if it' value is up,
//if it is then pop from both the fields and values.
//likewise if it isn't in the fields already push on it.
//you actually don't have to check for value being up.
for(var i=0;i<this.state.fields.length;i++){
  if(this.state.fields[i]==youtube_subscribers){
   k=1;
   //pop both 
   //this.state.fields.splice(i,1);
   //set the new value
   if(arr[0]==0 && arr[1]==0){
    this.state.fields.splice(i,1);
  this.state.values.splice(i,1);
  f=1;
  }
    if(f==0){
   console.log(self.state.values);
  var new_values=[]; 
 new_values= this.state.values;
 var new_fields=this.state.fields;
//  new_fields[i]=field;
console.log(new_values);
 new_values[i]=arr;

 this.setState({values:new_values,fields:new_fields});
 console.log(this.state.fields);
console.log(this.state.values);
    }
  }
}
if(k==0){
console.log("inside concat");
var values =[];
values.push(arr);
console.log(values);
this.setState({fields:this.state.fields.concat(youtube_subscribers),values:values});
console.log(this.state.fields);
console.log(this.state.values.length);
}
  };

// handleOnChangeYt = (event, value) => {
// var youtube_subscribers= "youtube_subscribers";
//     //var val = event.target.value;
//     console.log(value);

//     console.log("inside");
//     var k = 0;
//     var f=0;
//     //check if it is in the fields,
//     //check if it' value is up,
//     //likewise if it isn't in the fields already push on it.
//     //you actually don't have to check for value being up
//     for(var i=0;i<this.state.fields.length;i++){
//       if(this.state.fields[i]=="youtube_subscribers"){
//        k=1;
       
//        //if value ==0 
//        //then pop both 
//         //pop both 
//       // this.state.fields.splice(i,1);
//       // this.state.values.splice(i,1);
//       if(value==0){
//         this.state.fields.splice(i,1);
//       this.state.values.splice(i,1);
//       f=1;
//       }
//       if(f==0){
//       var new_values= this.state.values;
//        new_values[i]=value;

//        this.setState({values:new_values});
//        console.log(this.state.fields);
//     console.log(this.state.values);
//       }
//       }
//     }
//     if(k==0){
//       console.log("inside concat");
//     this.setState({fields:this.state.fields.concat(youtube_subscribers),values:this.state.values.concat(parseInt(value))});
//     console.log(this.state.fields);
//     console.log(this.state.values);
//     }

// };

handleInputChange(event){
  console.log('hi');
  const target=event.target;
  console.log(target);
  //check if the target is date and if it is change the format  
  const id=target.id;
  console.log(id);
  const value=target.value;
  console.log(value);

  this.setState({[id]:value})

 

}

  handleOnChangeCommk= (object) =>{
  //const target=event.target;
  //console.log(target);
  //check if the target is date and if it is change the format  
  //const id=target.id;
  //console.log(id);
  //const value=target.value;
  var field=this.state.commfield;
  console.log(field);
  var self =this;
    console.log(object['max']);

  var arr=[]
  arr[0]=object['min'];
  arr[1]=object['max'];
  var k = 0;
  var f=0;
  for(var i=0;i<this.state.fields.length;i++){
    if(this.state.fields[i]=='insta_static'||this.state.fields[i]=='yt_video'||this.state.fields[i]=='insta_story'||this.state.fields[i]=='insta_video'){
     k=1;
     
     //if value ==0 
     //then pop both 
      //pop both 
    // this.state.fields.splice(i,1);
    // this.state.values.splice(i,1);
    if(arr[0]==0 && arr[1]==0){
      this.state.fields.splice(i,1);
    this.state.values.splice(i,1);
    f=1;
    }
    if(f==0){
      console.log(self.state.values);
      var new_values=[]; 
     new_values= this.state.values;
     var new_fields=this.state.fields;
     new_fields[i]=field;
    console.log(new_values);
     new_values[i]=arr;

     this.setState({values:new_values,fields:new_fields});
     console.log(this.state.fields);
  console.log(this.state.values);
    }
    }
  }
  if(k==0){
    console.log("inside concat");
    var values =[];
    values.push(arr);
    console.log(values);
  this.setState({fields:this.state.fields.concat(field),values:values});
  console.log(this.state.fields);
  console.log(this.state.values.length);
  }
  //check if it is in the fields,
  //check if it' value is up,
  //likewise if it isn't in the fields already push on it.
  //you actually don't have to check for value being up
   
  };





handleFilter(event){

  this.setState({
    show: false
  });



  var instagramFolBool= this.state.instagramFolBool;
  console.log(instagramFolBool)
  if(this.state.instagramFolBool==true){
    this.setState({hideInsta:true,hideYt:false,showcol:"1"})
  }
  if(this.state.instagramFolBool==false){
    this.setState({hideInsta:false,hideYt:false,showcol:"4"})
  }

  var youtubeSubsBool= this.state.youtubeSubsBool;
  console.log(youtubeSubsBool)
  if(this.state.youtubeSubsBool==true){
    this.setState({ hideYt:true,hideInsta:false, showcol:"3"})
  }
  if(this.state.youtubeSubsBool==false){
    this.setState({hideInsta:false,hideYt:false,showcol:"4"})
  }


   var self = this;
  const {fields, values,Selectedcategory} = this.state;
  console.log(fields.length)

if(fields.length==0){
  console.log("do nothing")
}else{
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
var value_arr = response.data;
for(var i=0;i<value_arr.length;i++){
if(value_arr[i]['insta_followers'] >= 1000){
 var val=numeral(value_arr[i]['insta_followers']).format('0.0a');
 var u_val=val.toUpperCase();
 // console.log(u_val);
 value_arr[i]['insta_followers']=u_val;
 // console.log(value_arr[i]['insta_followers']);
}
if(value_arr[i]['youtube_subscribers'] >= 1000){
var val_yousub=numeral(value_arr[i]['youtube_subscribers']).format('0.0a');
var u_val_yousub=val_yousub.toUpperCase();
value_arr[i]['youtube_subscribers']=u_val_yousub;
}
if(value_arr[i]['youtube_views'] >= 1000){
 var val_youview=numeral(value_arr[i]['youtube_views']).format('0.0a');
 var u_val_youview=val_youview.toUpperCase();
 value_arr[i]['youtube_views']=u_val_youview;
 }
value_arr[i]['insta_avgrate']=numeral(value_arr[i]['insta_avgrate']).format('0.0');
// console.log(value_arr[i]['insta_avgrate']);
if(value_arr[i]['insta_st']!=''){
 value_arr[i]['insta_st']=numeral(value_arr[i]['insta_st']).value();
 // console.log(value_arr[i]['insta_st']);
 }
 if(value_arr[i]['insta_static']!=''){
   value_arr[i]['insta_static']=numeral(value_arr[i]['insta_static']).value();
   // console.log(value_arr[i]['insta_static']);
   }
 if(value_arr[i]['insta_video']!=''){
     value_arr[i]['insta_video']=numeral(value_arr[i]['insta_video']).value();
     // console.log(value_arr[i]['insta_video']);
     }  
 if(value_arr[i]['yt_video']!=''){
   value_arr[i]['yt_video']=numeral(value_arr[i]['yt_video']).value();
   // console.log(value_arr[i]['yt_video']);
   }
   if(value_arr[i]['tiktok_video']!=''){
     value_arr[i]['tiktok_video']=numeral(value_arr[i]['tiktok_video']).value();
     // console.log(value_arr[i]['tiktok_video']);
     }

}
self.setState({value:value_arr});
})
.catch(function (error) {
console.log(error);
});
}

  
}

resetFilter = (event) =>{
console.log("reset button clicked")
var test = this.state.test
 this.setState(
   { value: test,
     fields:[],
     values:[],
     male:false,
     female:false,
     instagramFolBool:false,
     Instagram_follow:{
             min: 0,
             max: 500000,
           },
     youtubeSubsBool:false,
     youtube_subs:{
             min: 0,
             max: 500000,
           },
     infCOomBool:false,
     commercial_range:{
             min: 0,
             max: 80000,
           },
           Selectedcategory: [],
           commfield:"select"
     });
//  console.log(this.state.values)
//  console.log(this.state.fields)
//  console.log(this.state.value)
}

// delete disable range from array
onChangeDisable(object){
//first get the id as a state and that way we can have same function for all onchange 
// i have tried to slice the value from array


// const zeroValue= {
//   min: 0,
//   max: 0,
// }
// this.setState({Instagram_follow:zeroValue}, console.log(this.state.Instagram_follow));

this.setState({instagramFolBool:!this.state.instagramFolBool})

console.log(this.state.fields);
console.log(this.state.values);



var insta_followers= "insta_followers";
    //var val = event.target.value;
    var self= this
    var arr=[]
      arr[0]=object['min'];
  arr[1]=object['max'];
    var k = 0;
    var f=0;
    //check if it is in the fields,
    //check if it' value is up,
    //if it is then pop from both the fields and values.
    //likewise if it isn't in the fields already push on it.
    //you actually don't have to check for value being up.
    for(var i=0;i<this.state.fields.length;i++){
      if(this.state.fields[i]==insta_followers){
       k=1;
       //pop both 
       //this.state.fields.splice(i,1);
       //set the new value
     
        this.state.fields.splice(i,1);
      this.state.values.splice(i,1);
  
      }
    }


}
//ADD NEW INFLUNCER FUNTION
addNewInfluencer(){

}

// delete disable range from array
onChangeYtDisable = (object) =>{
  //first get the id as a state and that way we can have same function for all onchange 
  // i have tried to slice the value from array
  
 
  
  
  
  var youtube_subscribers= "youtube_subscribers";
  //var val = event.target.value;

  var arr=[]
    arr[0]=object['min'];
  arr[1]=object['max'];
  var k = 0;
  var f=0;
  //check if it is in the fields,
  //check if it' value is up,
  //if it is then pop from both the fields and values.
  //likewise if it isn't in the fields already push on it.
  //you actually don't have to check for value being up.
  for(var i=0;i<this.state.fields.length;i++){
    if(this.state.fields[i]==youtube_subscribers){
         //pop both 
         //this.state.fields.splice(i,1);
         //set the new value
       
          this.state.fields.splice(i,1);
        this.state.values.splice(i,1);
    
        }
      }
      this.setState({youtubeSubsBool:!this.state.youtubeSubsBool })
  
  }

  // delete disable range from array
onChangeCommDisable = (object) =>{
  //first get the id as a state and that way we can have same function for all onchange 
  // i have tried to slice the value from array

  
  //var val = event.target.value;
  var self= this
  var arr=[]
  var field=this.state.commfield;
  console.log(field);
  var self =this;
    console.log(object['max']);

  var arr=[]
  arr[0]=object['min'];
  arr[1]=object['max'];
  var k = 0;
  var f=0;
  for(var i=0;i<this.state.fields.length;i++){
    if(this.state.fields[i]=='insta_static'||this.state.fields[i]=='yt_video'||this.state.fields[i]=='insta_story'||this.state.fields[i]=='insta_video'){

     //pop both 
     //this.state.fields.splice(i,1);
     //set the new value
   
      this.state.fields.splice(i,1);
    this.state.values.splice(i,1);

    }
  }
      this.setState({infCOomBool:!this.state.infCOomBool})
  
  }


Showfilter() {
  this.setState({filterVisible:!this.state.filterVisible});
  // const hideFilter = "Hide Filter"
  // this.setState({filtertext: hideFilter});
  
}

//Bootstrap Table class for cells and header
customHeaderClass() {
  return 'influecer-name';
}
instaClass(){
  return 'instaClass';
}
columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
  // fieldValue is column value
  // row is whole row object
  // rowIdx is index of row
  // colIdx is index of column
  return rowIdx % 1 === 0 ? 'influecer-cell' : 'td-column-function-odd-example';
}


Yotube_subs(fieldValue, row, rowIdx, colIdx) {
  return rowIdx % 1 === 0 ? 'yt-subs' : 'td-column-function-odd-example';
}
Yotube_influ(fieldValue, row, rowIdx, colIdx) {
  return rowIdx % 1 === 0 ? 'yt-influ' : 'td-column-function-odd-example';
}
Yotube_brand(fieldValue, row, rowIdx, colIdx) {
  return rowIdx % 1 === 0 ? 'yt-brand' : 'td-column-function-odd-example';
}

insta_whole(fieldValue, row, rowIdx, colIdx) {
  return rowIdx % 1 === 0 ? 'insta_whole' : 'td-column-function-odd-example';
}
insta_follo(fieldValue, row, rowIdx, colIdx) {
  return rowIdx % 1 === 0 ? 'insta_follo' : 'td-column-function-odd-example';
}
// columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
//   return rowIdx % 1 === 0 ? 'influecer-cell' : 'td-column-function-odd-example';
// }
// columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
//   return rowIdx % 1 === 0 ? 'influecer-cell' : 'td-column-function-odd-example';
// }
// columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
//   return rowIdx % 1 === 0 ? 'influecer-cell' : 'td-column-function-odd-example';
// }

// toggleYt(){
//   this.setState({hideYt:!this.state.hideYt});
// }

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  handleOnChangefield(event){
    this.setState({commfield:event.target.value});
    console.log(this.state.commfield);
  }

  Ytvideo(cell, row, rowIndex, colIndex) {
    if(row.yt_video_date==null){
      return `Initial Value`
    }else{
    return `updated on ${row.yt_video_date} by ${row.yt_updated_by} `;
  }
  }

  InstaStory(cell, row, rowIndex, colIndex) {
    if(row.insta_st_date==null){
      return `Initial Value`
    }else{
      return `updated on ${row.insta_st_date}  by ${row.insta_st_updated_by} `;
  }
  }

  InstaStaticPst(cell, row, rowIndex, colIndex) {
    if(row.insta_static_date==null){
      return `Initial Value`
    }else{
      return `updated on ${row.insta_static_date}  by ${row.insta_static_updated_by} `;
  }
  }
  InstaVideoPost(cell, row, rowIndex, colIndex) {
    if(row.insta_video_date==null){
      return `Initial Value`
    }else{
      return `updated on ${row.insta_video_date}  by ${row.insta_video_updated_by} `;
  }  
  }
  // TiktokVideo(cell, row, rowIndex, colIndex) {
  //   if(row.tiktok_video_date==null){
  //     return `Initial Value`
  //   }else{
  //     return `updated on ${row.tiktok_video_date}  by ${row.user} `;
  // }
  // }

  onChangetoggle = e => {
    console.log('radio checked', e.target.value);
  };
// to check the total cost and monke fee

  afterSaveCell= (row, cellName, cellValue) => {
// console.log(row)

console.log("after edit" + " "+ cellName)
console.log("after edit" + " "+ cellValue)
// console.log(row.yt_video)

// i have taken the cell value and cellname 
//according to cell name i have selected the commercial and subtracted with brand value
var correspondingCell;
if(cellName=="brand_tiktok_video"){
var correspondingCell = row.tiktok_video
}if(cellName=="brand_insta_video"){
  var correspondingCell = row.insta_video
}if(cellName=="brand_insta_static"){
  var correspondingCell = row.insta_static
}if(cellName=="brand_insta_story"){
  var correspondingCell = row.insta_st
}if(cellName=="brand_youtube_video"){
  var correspondingCell = row.yt_video;
  
}

//problem when updating these cell name
if(cellName=="yt_video"){
  var CellNM = "yt_video";
}
if(cellName=="insta_st"){
  var CellNM = "insta_st";
}
if(cellName=="insta_static"){
  var CellNM = "insta_static";
}
if(cellName=="insta_st"){
  var CellNM = "insta_st";
}
if(cellName=="insta_video"){
  var CellNM = "insta_video";
}

if(cellValue!==""){

  if(cellName !== CellNM){
  var totalCost = this.state.total_cost + (parseInt(cellValue))
  console.log(totalCost)
  this.setState({total_cost:totalCost})

  //now the corresponding value is given by the if condition 
  var monkFee = (parseInt(cellValue)) - correspondingCell
  console.log(monkFee)
  //each time new value is reduce from the correspondingCell so i have to take care of existing total of monk cost
  var mymonkfee = this.state.monk_fee + (parseInt(monkFee))
   this.setState({monk_fee:mymonkfee})
  }
}

  }


  beforeSaveCell = (row, cellName, cellValue) => {


    if(cellValue==""){
      console.log(cellName)
    console.log("mera condition");
    console.log(row.cellName)
    

    
    var Cell;
    if(cellName=="brand_tiktok_video"){
    var Cell = row.brand_tiktok_video
    }if(cellName=="brand_insta_video"){
      var Cell = row.brand_insta_video
    }if(cellName=="brand_insta_static"){
      var Cell = row.brand_insta_static
    }if(cellName=="brand_insta_story"){
      var Cell = row.brand_insta_story
    }if(cellName=="brand_youtube_video"){
      var Cell = row.brand_youtube_video
    }

     console.log(this.state.total_cost)
     console.log(Cell)
         if(Cell!==undefined){  var Calculate = this.state.total_cost - (parseInt(Cell))
    console.log(Calculate)
    this.setState({total_cost:Calculate})
    
}
    var correspondingCell;
if(cellName=="brand_tiktok_video"){
var correspondingCell = row.tiktok_video
}if(cellName=="brand_insta_video"){
  var correspondingCell = row.insta_video
}if(cellName=="brand_insta_static"){
  var correspondingCell = row.insta_static
}if(cellName=="brand_insta_story"){
  var correspondingCell = row.insta_st
}if(cellName=="brand_youtube_video"){
  var correspondingCell = row.yt_video
}


          if(Cell!==undefined){  //now the corresponding value is given by the if condition 
  var monkFee = (parseInt(Cell)) - (parseInt(correspondingCell))
  console.log(monkFee)
  //each time new value is reduce from the correspondingCell so i have to take care of existing total of monk cost
  var mymonkfee = this.state.monk_fee - (parseInt(monkFee))
   this.setState({monk_fee:mymonkfee})}

    }




  }

  closekar() {
    this.setState({
      show_d1: false,
      show_d2: false
    });
  }
  toggleDrawer() {
    this.setState({ show_d1: true,show_d2: false});
    

  }
  toggleDrawer_2(){
    this.setState({ show_d2: true,show_d1: false });
  }


  customMultiSelect(props) {
    const { type, checked, disabled, onChange, rowIndex } = props;
    /*
    * If rowIndex is 'Header', means this rendering is for header selection column.
    */
    if (rowIndex === 'Header') {
      return (
        <div className='checkbox-personalized'>
          <Checkbox {...props}/>
          <label htmlFor={ 'checkbox' + rowIndex }>
            <div className='check'></div>
          </label>
        </div>);
    } else {
      return (
        <div className='checkbox-personalized'>
          <input
            type={ type }
            name={ 'checkbox' + rowIndex }
            id={ 'checkbox' + rowIndex }
            checked={ checked }
            disabled={ disabled }
            onChange={ e=> onChange(e, rowIndex) }
            ref={ input => {
              if (input) {
                input.indeterminate = props.indeterminate;
              }
            } }/>
          <label htmlFor={ 'checkbox' + rowIndex }>
            <div className='check'></div>
          </label>
        </div>);
    }
  }

  createCustomInsertButton = (onClick) => {
    return (
      <button style={{background:"white !important"}} className="add_influencer" onClick={ onClick }><i class="fa fa-trash white_mine1"></i></button>
    );
  }

  onAfterInsertRow(row) {
    let newRowStr = '';
    const obj = {}


  console.log(row)
    for (const prop in row) {
      newRowStr += prop + ': ' + row[prop] + ' \n';

    }
    alert('The new row is:\n ' + newRowStr);
    // console.log(newRowStr)

    axios({
      method: 'post',
      url: "/api/users/insert_influencer",
      data: {
     obj:row
            }
            })
      .then(function (response) {
      console.log(response);
     
     
      })
     
      .catch(function (error) {
      console.log(error);
      })
  }
  priceFormatter(cell, row) {
    return (<div><NumberFormat displayType={'text'} thousandSeparator={true} value={cell}   /></div>);
  }
  onAfterDeleteRow(rowKeys) {
    alert('The rowkey you drop: ' + rowKeys);
  }
  render() {
    const { user } = this.props.auth;
    const krishna = user.name
    // console.log(krishna)

    const { value } = this.state;
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

    const options = {
      afterInsertRow: this.onAfterInsertRow ,  // A hook for after insert rows
      // insertBtn: this.createCustomInsertButton,
      deleteBtn: this.createCustomInsertButton,
      afterDeleteRow: this.onAfterDeleteRow
    };
  

    const cellEditProp = {
      mode: 'click',
      blurToSave: true,
      afterSaveCell: this.afterSaveCell,
      beforeSaveCell: this.beforeSaveCell,
    };

    const selectRow = {
      mode: 'checkbox',  // multi select
      onSelect: this.handleRowSelect,
      selected: this.state.krishna,
      customComponent: this.customMultiSelect,
      //  bgColor:"#FA3C5A",
       className: 'my-selection-custom'
    };

    // function rowStyleFormat(row, rowIdx) {
    //   return { color: rowIdx % 1 === 0 ? 'red' : 'blue' };
    // }
    // const options = {
    //   defaultSortName: 'name',
    //   defaultSortOrder: 'asc'
    // }; 

    const YtVideo = (onUpdate, props, ) => (<YtVideoCommEditor user={krishna} onUpdate={ onUpdate } {...props}/>);
    const InstaStory = (onUpdate, props, ) => (<InstaStoryCommEditor user={krishna} onUpdate={ onUpdate } {...props}/>);
    const InstaStaticPst = (onUpdate, props, ) => (<InstaStaticPstCommEditor user={krishna} onUpdate={ onUpdate } {...props}/>);
    const InstaVideoPost = (onUpdate, props, ) => (<InstaVideoPostCommEditor user={krishna} onUpdate={ onUpdate } {...props}/>);
    const TiktokVideo = (onUpdate, props, ) => (<TiktokVideoCommEditor onUpdate={ onUpdate } {...props}/>);


    const simplecelledit = (onUpdate, props, ) => (<SimpleCellEdit onUpdate={ onUpdate } {...props}/>);
    
  
  
  
    return (

      <div className='control-pane1212'>




 {this.state.onSubmit ? <div>
{/* to go back to list */}
 <Button  className="back-button1"  onClick={() => this.setState({onSubmit:!this.state.onSubmit})}><i class="fa fa-angle-left size-2"></i></Button>
 <Campaign_Form  handleChange={this.handleChange} checked ={this.state.value} total_cost={this.state.total_cost}  monk_fee={this.state.monk_fee} backFromform={this.state.onSubmit} 
 youtubeonly={this.state.youtubeonly} instaonly={this.state.instaonly} dash={this.state.value} selected_row={this.state.selected_row} Selectedcategory={this.state.Selectedcategory} />
 </div> : 
 <div>
   {/* <div className="row">
     <div className="col-md-1">
     <Button className="" onClick={() => this.open('lg')}><i class="fa fa-filter" aria-hidden="true"></i></Button>
     </div>

     <div className="col-md-2">
     <Button className="" type="submit" name="action"  onClick={this.handleSubmit}>Submit</Button>
     </div>

     <div className="col-md-2">
     <h5 className=""> Instagram : 
  <input type="checkbox" value="Up" id="instagram" checked={this.state.hideYt} onChange={this.OnChangeFilter} onClick={() => this.setState({hideYt:!this.state.hideYt, showcol:"4"})} className="mycheckbox" /> 
  </h5> 
     </div>

     <div className="col-md-2">
     <h5 className=""> Youtube : 
   <input type="checkbox" id="youtuber" value="Up" checked={this.state.hideInsta} onChange={this.OnChangeFilter} onClick={() => this.setState({hideInsta:!this.state.hideInsta,showcol:"2"})} className="mycheckbox"  /> 
   </h5>
     </div>

     <div className="col-md-2">
     <input id="total_cost" type="number" class="inputshow-total" placeholder="Tolal Cost"   />
     </div>

     <div className="col-md-2">
     <input id="cost_monk" type="number" class="inputshow-total" placeholder="Monk-e Cost"   />
     </div>

  </div> */}
      <div >
<div className="filter-icos" style={{    padding: "1em 4.5em"}}>
<span className="selected-infNO filter-colr" >Total : {this.state.count} </span>
    <span className="total-costh5 filter-colr" >Total Cost: <NumberFormat displayType={'text'} thousandSeparator={true} value={this.state.total_cost}  /> INR
       {/* <input id="total_cost" type="number" value= class="inputshow-total" placeholder="Tolal Cost"   /> */}
         </span>      

         <span className="monk-costh5 filter-colr" >Agency Fee: <NumberFormat displayType={'text'} thousandSeparator={true} value={this.state.monk_fee}   /> INR
         {/* <input id="cost_monk" type="number" class="inputshow-monk-e" placeholder="Monk-e Fee" value=  /> */}
         </span> <span className="simpletext filter-colr" onClick={() => this.open('lg')}> <i class="fa fa-filter" style={{fontSize: "23px"}} aria-hidden="true"></i>Filter</span> 
         <span className="sort-by filter-colr">Sort By:</span> 
<Radio.Group  defaultValue={this.state.toggle} buttonStyle="solid" onChange={this.onChangetoggle}>
      <Radio.Button onClick={() => this.setState({hideInsta:false,hideYt:false,  youtubeonly:true, instaonly:true,sh_on_yt:true,dnt_sh_btn:true})} value="1">All</Radio.Button>
      <Radio.Button onClick={() => this.setState({hideInsta:true,hideYt:false, youtubeonly:true, instaonly:false, sh_on_yt:false,dnt_sh_btn:false })} value="2">Youtube</Radio.Button>
      <Radio.Button onClick={() => this.setState({hideYt:true,hideInsta:false,  youtubeonly:false, instaonly:true, sh_on_yt:true,dnt_sh_btn:true })} value="3">Instagram</Radio.Button>
    </Radio.Group>
{/* <span>
    <div style={{textAlign:"right"}} className=" ">
<div class="inner12" style={{padding: "0 1em 0 0"}}><button className="add_influencer1" onClick={() => this.setState({new_inlfuecer_modal:true}) }><i class="fa fa-plus white_mine" aria-hidden="true"></i> Influencer</button> </div>
  <div class="inner12"><Button className="my-buttoninform" style={{textTransform:"capitalize"}} type="submit" name="action"  onClick={this.handleSubmit}>Submit</Button></div>
</div>
</span> */}
    {/* <span style={{padding: "0 3em"}}><button className="add_influencer1" onClick={() => this.setState({new_inlfuecer_modal:true}) }><i class="fa fa-plus white_mine" aria-hidden="true"></i> Influencer</button></span> */}
</div>

<div className="filter-ico outer12">
<div class="inner12" style={{padding: "0 1em 0 0"}}><button className="add_influencer1" onClick={() => this.setState({new_inlfuecer_modal:true}) }><i class="fa fa-plus white_mine" aria-hidden="true"></i> Influencer</button> </div>
  <div class="inner12"><Button className="my-buttoninform" style={{textTransform:"capitalize"}} type="submit" name="action"  onClick={this.handleSubmit}>Submit</Button></div>
</div>
        
   </div>

    <ButtonToolbar>
  <button className="op1" onClick={this.toggleDrawer}><i class="fa fa-angle-left size-1 custom_ico"></i></button>	   
</ButtonToolbar>


{this.state.dnt_sh_btn && <ButtonToolbar>
            <button style={{margin: "7.2em 0px"}} className="op1" onClick={this.toggleDrawer_2}><i class="fa fa-angle-left size-1 custom_ico"></i></button>	   
          </ButtonToolbar>}
        
          <ScrollSync>
<div style={{ display: 'flex', position: 'relative', height: "inherit" , padding: "0 4em" }}>
  <ScrollSyncPane>
    <div className="ksadk" style={{overflowY: 'auto'}} ref={(el) => { this.messagesContainer = el; }}>
      <section className="Main-Tableclass" >
      <BootstrapTable data={ value }
        selectRow={ selectRow }
        tableHeaderClass='my-custom-class1'
        cellEdit={ cellEditProp } 
        deleteRow={ true } options={ options }
        // insertRow={ true } options={ options }
        // trStyle={rowStyleFormat}
        // options={ options }
        // height='68vh'

        >
        <TableHeaderColumn row='0'   rowSpan='3' dataField='name'  isKey={ true } className={ this.customHeaderClass } columnClassName={ this.columnClassNameFormat } width='14em' dataAlign='center'  filter={ { type: 'TextFilter', delay: 500 } } headerAlign='justify' thStyle={ {'background': '#fff', "textShadow": "0px 1px, 1px 0px, 1px 1px","fontWeight": "bolder"} }    >Name</TableHeaderColumn>

        {/* <TableHeaderColumn row='2' width='14em' dataAlign='center'   headerAlign='justify' thStyle={ {'background': '#fff', "textShadow": "0px 1px, 1px 0px, 1px 1px","fontWeight": "bolder"} }    ></TableHeaderColumn> */}

        <TableHeaderColumn row='0' colSpan='4'      hidden={this.state.hideYt} thStyle={ { 'background': '#FFF8F9', "color":"#821F3A","fontSize": "20px", "borderBottomColor": "#FFF8F9",  "textShadow": "0px 1px, 1px 0px, 1px 1px","fontWeight": "bolder",  borderRight: "13px solid #F6F3F8"} }  headerAlign='justify'>Youtube</TableHeaderColumn>

        <TableHeaderColumn row='1' colSpan='2' hidden={this.state.hideYt}    width='7.4em' thStyle={ { 'background': '#FFF8F9', "color":"#821F3A","fontSize": "0.9em" , "borderRightColor": "#FFF8F9",  "borderLeftColor": "#FFF8F9" , borderBottom: "0px"} }    headerAlign='center' ></TableHeaderColumn>

       

        {/* <TableHeaderColumn row='1' dataField='youtube_views'  dataAlign='center'  thStyle={ { 'background': '#f4cccc' } } headerAlign='center' >Youtube Views</TableHeaderColumn> */}
        <TableHeaderColumn row='2'  hidden={this.state.hideYt} dataField='youtube_subscribers' dataAlign='center' columnClassName={ this.Yotube_subs }  width='7.4em' thStyle={ { 'background': '#FFF8F9', "color":"#821F3A","fontSize": "0.9em" , "borderRightColor": "#FFF8F9",  "borderTopColor": "#FFF8F9", "borderLeftColor": "#FFF8F9"} }    headerAlign='center' >Subscriber</TableHeaderColumn>
        <TableHeaderColumn row='2'  hidden={this.state.hideYt} dataField='youtube'  dataAlign='center' columnClassName={ this.Yotube_subs } thStyle={ { 'background': '#FFF8F9', "color":"#821F3A","fontSize": "0.9em" , "borderRightColor": "#FFF8F9",  "borderTopColor": "#FFF8F9", "borderLeftColor": "#FFF8F9"} } width='6em' dataFormat={ activeFormatter } headerAlign='center !important'>URL</TableHeaderColumn>

        <TableHeaderColumn row='1' colSpan='2' hidden={this.state.hideYt}   thStyle={ { 'background': '#FFF8F9' , "color":"#821F3A","fontSize": "0.9em", "borderRightColor": "#FFF8F9",  "borderLeftColor": "#FFF8F9" , borderBottomWidth: "0px" ,  borderRight: "13px solid #F6F3F8"} } width='7.4em'  headerAlign='center' dataAlign='center'  >Video</TableHeaderColumn>

        <TableHeaderColumn row='2' dataField='yt_video' hidden={this.state.hideYt} columnTitle={ this.Ytvideo } columnClassName={ this.Yotube_influ } thStyle={ { 'background': '#FFF8F9' , "color":"#821F3A","fontSize": "0.9em", "borderRightColor": "#FFF8F9",  "borderLeftColor": "#FFF8F9" ,borderTopColor: "rgb(255, 248, 249)"} } width='7.4em'  headerAlign='center' dataAlign='center'  customEditor={ { getElement: YtVideo } } dataFormat={this.priceFormatter} >Influencer ₹</TableHeaderColumn>

        <TableHeaderColumn row='2' dataField='brand_youtube_video' hidden={this.state.hideYt} editable={ true } columnClassName={ this.Yotube_brand } thStyle={ { 'background': '#FFF8F9' , "color":"#821F3A","fontSize": "0.9em", "borderRightColor": "#FFF8F9",  "borderLeftColor": "#FFF8F9",     borderRight: "13px solid #F6F3F8"} } width='5.8em' headerAlign='center' dataAlign='center' dataFormat={this.priceFormatter} customEditor={ { getElement: simplecelledit } }>Brand ₹</TableHeaderColumn>

         {/* the hidden details for the youtube hide column */}
         <TableHeaderColumn row='0'  colSpan='6'   dataAlign='center' hidden={this.state.sh_on_yt}  thStyle={ { 'background': "rgb(242 235 247)", "color" : "#540D6E","fontSize": "20px", "borderBottomColor": "#F6F3F8",  "textShadow": "0px 1px, 1px 0px, 1px 1px","fontWeight": "bolder", "borderRightWidth": "0px",    borderColor: "rgb(242, 235, 247)" } } headerAlign='justify' >Average</TableHeaderColumn>

         <TableHeaderColumn row='1' colSpan='6'   dataAlign='center' hidden={this.state.sh_on_yt}  thStyle={ { 'background': "rgb(242 235 247)", "color" : "#540D6E","fontSize": "20px", "borderBottomColor": "#F6F3F8",  "textShadow": "0px 1px, 1px 0px, 1px 1px","fontWeight": "bolder", "borderRightWidth": "0px",    borderColor: "rgb(242, 235, 247)" } } headerAlign='justify' ></TableHeaderColumn>

        <TableHeaderColumn row='2'  hidden={this.state.sh_on_yt} dataField=''  thStyle={ { 'background': 'rgb(242 235 247)', "color": "#540D6E","fontSize": "0.9em" , "borderRightColor": "#F6F3F8",  "borderLeftColor": "#F6F3F8" } } width='8em' headerAlign='center' 
        dataAlign='center' columnClassName={ this.insta_follo }>Story</TableHeaderColumn>
         <TableHeaderColumn row='2'  hidden={this.state.sh_on_yt} dataField=''  thStyle={ { 'background': 'rgb(242 235 247)', "color": "#540D6E","fontSize": "0.9em" , "borderRightColor": "#F6F3F8",  "borderLeftColor": "#F6F3F8" } } width='8em' headerAlign='center' 
        dataAlign='center' columnClassName={ this.insta_follo }>Post</TableHeaderColumn>
         <TableHeaderColumn row='2'  hidden={this.state.sh_on_yt} dataField=''  thStyle={ { 'background': 'rgb(242 235 247)', "color": "#540D6E","fontSize": "0.9em" , "borderRightColor": "#F6F3F8",  "borderLeftColor": "#F6F3F8" } } width='8em' headerAlign='center' 
        dataAlign='center' columnClassName={ this.insta_follo }>Video</TableHeaderColumn>
         <TableHeaderColumn row='2'  hidden={this.state.sh_on_yt} dataField=''  thStyle={ { 'background': 'rgb(242 235 247)', "color": "#540D6E","fontSize": "0.9em" , "borderRightColor": "#F6F3F8",  "borderLeftColor": "#F6F3F8" } } width='8em' headerAlign='center' 
        dataAlign='center' columnClassName={ this.insta_follo }>Reel</TableHeaderColumn>
         <TableHeaderColumn row='2'  hidden={this.state.sh_on_yt} dataField='insta_avgrate'  thStyle={ { 'background': 'rgb(242 235 247)', "color": "#540D6E","fontSize": "0.9em" , "borderRightColor": "#F6F3F8",  "borderLeftColor": "#F6F3F8" } } width='8em' headerAlign='center' 
        dataAlign='center' columnClassName={ this.insta_follo }>Static Reach</TableHeaderColumn>
            <TableHeaderColumn row='2'  hidden={this.state.sh_on_yt} dataField=''  thStyle={ { 'background': 'rgb(242 235 247)', "color": "#540D6E","fontSize": "0.9em" , "borderRightColor": "#F6F3F8",  "borderLeftColor": "#F6F3F8" } } width='8em' headerAlign='center' 
        dataAlign='center' columnClassName={ this.insta_follo }>Youtube Views</TableHeaderColumn>
        {/* the hidden details for the youtube hide column ends*/}	

        <TableHeaderColumn row='0' colSpan='8'   dataAlign='center' hidden={this.state.hideInsta}  thStyle={ { 'background': "rgb(242 235 247)", "color" : "#540D6E","fontSize": "20px", "borderBottomColor": "#F6F3F8",  "textShadow": "0px 1px, 1px 0px, 1px 1px","fontWeight": "bolder", "borderRightWidth": "0px",    borderColor: "rgb(242, 235, 247)" } } headerAlign='justify' >Instagram</TableHeaderColumn>
        <TableHeaderColumn row='1' colSpan='2'   dataAlign='center' hidden={this.state.hideInsta}  thStyle={ { 'background': "rgb(242 235 247)", "color" : "#540D6E","fontSize": "1em", "borderBottomColor": "#F6F3F8","fontWeight": "900", "borderRightWidth": "0px",    borderColor: "rgb(242, 235, 247)" } } headerAlign='center' ></TableHeaderColumn>

        <TableHeaderColumn row='1' colSpan='3'   dataAlign='center' hidden={this.state.hideInsta}  thStyle={ { 'background': "rgb(242 235 247)", "color" : "#540D6E","fontSize": "1em", "borderBottomColor": "#F6F3F8","fontWeight": "900", "borderRightWidth": "0px",    borderColor: "rgb(242, 235, 247)" } } headerAlign='center' >Influencers ₹</TableHeaderColumn>
        <TableHeaderColumn row='1' colSpan='3'   dataAlign='center' hidden={this.state.hideInsta}  thStyle={ { 'background': "rgb(242 235 247)", "color" : "#540D6E","fontSize": "1em", "borderBottomColor": "#F6F3F8",  "fontWeight": "900", "borderRightWidth": "0px",    borderColor: "rgb(242, 235, 247)" } } headerAlign='center' >Brand ₹</TableHeaderColumn>

        <TableHeaderColumn row='2'  hidden={this.state.hideInsta} dataField='insta_followers'  thStyle={ { 'background': 'rgb(242 235 247)', "color": "#540D6E","fontSize": "0.9em" , "borderRightColor": "#F6F3F8",  "borderLeftColor": "#F6F3F8" } } width='6em' headerAlign='center' 
        dataAlign='center' columnClassName={ this.insta_follo }>Follower</TableHeaderColumn>
        {/* <TableHeaderColumn row='1' dataField='insta_media' dataAlign='center'  editable={ false } thStyle={ { 'background': '#fff2cd' } } headerAlign='center'>Instagram Media</TableHeaderColumn> */}
        <TableHeaderColumn row='2'  hidden={this.state.hideInsta} dataField='insta_url' id="autlink" dataAlign='center' editable={ false } thStyle={ { 'background': 'rgb(242 235 247)', "color": "#540D6E","fontSize": "0.9em" , "borderRightColor": "#F6F3F8",  "borderLeftColor": "#F6F3F8" } } columnClassName={ this.insta_whole } width='6em' dataFormat={ activeFormatter2 } headerAlign='center'>URL</TableHeaderColumn>

        {/* previous border radius  */}
        {/* <TableHeaderColumn row='1' dataField='insta_st' dataAlign='center' hidden={this.state.hideInsta} columnTitle={ this.InstaStory }  thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" , "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", "borderTopLeftRadius": "21px" , "borderBottomLeftRadius": "21px"   } } className={ this.instaClass } width='5em'  headerAlign='center' customEditor={ { getElement: InstaStory } }>Story</TableHeaderColumn> */}
        <TableHeaderColumn row='2' dataField='insta_st' dataAlign='center' hidden={this.state.hideInsta} columnTitle={ this.InstaStory }  thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)",      } } className={ this.instaClass } columnClassName={ this.insta_whole } width='5em'  dataFormat={this.priceFormatter} headerAlign='center' customEditor={ { getElement: InstaStory } } >Story</TableHeaderColumn>
        <TableHeaderColumn row='2' dataField='insta_static' hidden={this.state.hideInsta} columnTitle={ this.InstaStaticPst } dataAlign='center' columnClassName={ this.insta_whole } width='5em' thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)",     } } dataFormat={this.priceFormatter} headerAlign='center' customEditor={ { getElement: InstaStaticPst } }>Post </TableHeaderColumn>
        <TableHeaderColumn row='2' dataField='insta_video' hidden={this.state.hideInsta} dataAlign='center'columnTitle={ this.InstaVideoPost } columnClassName={ this.insta_whole } width='5em' thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)",     } } dataFormat={this.priceFormatter} headerAlign='center' customEditor={ { getElement: InstaVideoPost } }>Video</TableHeaderColumn>
        {/* <TableHeaderColumn row='2' dataField='insta_reel' hidden={this.state.hideInsta} dataAlign='center'columnTitle={ this.InstaVideoPost } columnClassName={ this.insta_whole } width='5em' thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)",    } } dataFormat={this.priceFormatter} headerAlign='center' customEditor={ { getElement: InstaVideoPost } }>Reel</TableHeaderColumn> */}

        <TableHeaderColumn row='2' dataField='brand_insta_story' hidden={this.state.hideInsta} dataAlign='center'   editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } } columnClassName={ this.insta_whole } width='5em' dataFormat={this.priceFormatter} headerAlign='center'>Story</TableHeaderColumn>
        <TableHeaderColumn row='2' dataField='brand_insta_static' hidden={this.state.hideInsta} dataAlign='center' columnClassName={ this.insta_whole } width='5em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } } dataFormat={this.priceFormatter} headerAlign='center'>Post</TableHeaderColumn>
        <TableHeaderColumn row='2' dataField='brand_insta_video' hidden={this.state.hideInsta} dataAlign='center' columnClassName={ this.insta_whole } width='5em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } } dataFormat={this.priceFormatter} headerAlign='center'>Video</TableHeaderColumn>
        {/* <TableHeaderColumn row='2' dataField='brand_insta_reel' hidden={this.state.hideInsta} dataAlign='center'columnTitle={ this.InstaVideoPost } columnClassName={ this.insta_whole } width='5em' thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em","borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } } dataFormat={this.priceFormatter} headerAlign='center' customEditor={ { getElement: InstaVideoPost } }>Reel</TableHeaderColumn> */}

        {/* <TableHeaderColumn row='1' dataField='brand_insta_reel' hidden={this.state.hideInsta} dataAlign='center'columnTitle={ this.InstaVideoPost } width='5em' thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" , "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", "borderTopRightRadius": "21px" , "borderBottomRightRadius": "21px"   } } headerAlign='center' customEditor={ { getElement: InstaVideoPost } }>Reel</TableHeaderColumn> */}
        </BootstrapTable>

        </section>
    </div>

  </ScrollSyncPane>
  <div className="first-drawer">
        <Drawer backdrop={true} show={this.state.show_d1} onHide={this.closekar}>
            {/* <Drawer.Header>
              <Drawer.Title>Drawer Title</Drawer.Title>
              <span onClick={this.closekar}>close</span>
            </Drawer.Header> */}
            <Drawer.Body>
      
              <div className="wrapp">
<div className="inn1">

  <ButtonToolbar>
            <button className="op1_" onClick={this.closekar}><i class="fa fa-angle-right size-1 custom_ico"></i></button>	   
          </ButtonToolbar>
          {this.state.dnt_sh_btn &&
<ButtonToolbar>
<button className="op1_1" onClick={this.toggleDrawer_2}><i class="fa fa-angle-left size-1 custom_ico"></i></button>	   
</ButtonToolbar>}

          

          {/* <ButtonToolbar>
            <button className="op1_1" onClick={this.closekar}><i class="fa fa-angle-right size-1 custom_ico"></i></button>	   
          </ButtonToolbar> */}
</div>
<div className="inn2">
<div className="table-hei">
<ScrollSyncPane>
    <div style={{overflowY: 'auto'}}>
      <div className="nd-taable">
          <table className="krishna-table header-fixed">
             <thead className="header" >
        
			 <th className="details" colspan="5" >Details</th>	
	
             <tr>
			 <th  className="detail-subCol">Company</th>
			 <th  className="detail-subCol">Manager</th>
			 <th  className="detail-subCol">Email</th>
			 <th  className="detail-subCol">Contact</th>
			 <th  className="detail-subCol">Location</th>
		
			 </tr>
      
			 </thead>

			 <tbody>
			 {this.state.value.map(v=>

			 	<tr key={v['name']}>
				<td className={v['checked'] ? "my-selection-custom" :''} >{v['com_agency']}</td>
        <td className={v['checked'] ? "my-selection-custom" :''} >{v['manager']}</td>
        <td className={v['checked'] ? "my-selection-custom" :''} >{v['email_id']}</td>
        <td className={v['checked'] ? "my-selection-custom" :''} >{v['contact']}</td>
     
        <td className={v['checked'] ? "my-selection-custom" :''}  >{v['location']}</td>
    
			 	</tr>
			)}


			</tbody>
		</table>
    </div>
    </div>
  </ScrollSyncPane>
          </div>
</div>
              </div>
       
     

            </Drawer.Body>
          </Drawer>
          </div>
          <Drawer backdrop={true} show={this.state.show_d2} onHide={this.closekar}>
            {/* <Drawer.Header>
              <Drawer.Title>Drawer Title</Drawer.Title>
              <span onClick={this.closekar}>close</span>
            </Drawer.Header> */}
            <Drawer.Body>
    
              <div className="wrapp">
<div className="inn1">

  <ButtonToolbar>
            <button className="op1_" onClick={this.toggleDrawer}><i class="fa fa-angle-left size-1 custom_ico"></i></button>	   
          </ButtonToolbar>

<ButtonToolbar>
<button className="op1_1" onClick={this.closekar}><i class="fa fa-angle-right size-1 custom_ico"></i></button>	   
</ButtonToolbar>

 
          

          {/* <ButtonToolbar>
            <button className="op1_1" onClick={this.closekar}><i class="fa fa-angle-right size-1 custom_ico"></i></button>	   
          </ButtonToolbar> */}
</div>
<div className="inn2">
<div className="table-hei">
<ScrollSyncPane>
    <div style={{overflowY: 'auto'}}>
    <section className="nd-taable">
          <table className="krishna-table header-fixed">
          <thead className="header" >
        
			 <th className="details" colspan="6" >Average</th>	
	
             <tr>
			 <th  className="detail-subCol">Story</th>
			 <th  className="detail-subCol">Post</th>
			 <th  className="detail-subCol">Video</th>
			 <th  className="detail-subCol">Reel</th>
			 <th  className="detail-subCol">Static Reach</th>
			 <th  className="detail-subCol">Youtube Views</th>
		
			 </tr>
      
			 </thead>

			 <tbody>
			 {this.state.value.map(v=>

			 	<tr key={v['name']}>
				<td className={v['checked'] ? "my-selection-custom" :''}  >{v['']}</td>
        <td className={v['checked'] ? "my-selection-custom" :''} >{v['']}</td>
        <td className={v['checked'] ? "my-selection-custom" :''} >{v['']}</td>
        <td className={v['checked'] ? "my-selection-custom" :''}  >{v['']}</td>
     
        <td className={v['checked'] ? "my-selection-custom" :''}  >{v['insta_avgrate']}</td>
        <td className={v['checked'] ? "my-selection-custom" :''}  >{v['']}</td>
    
			 	</tr>
			)}


			</tbody>
		</table>
    </section>
    </div>
  </ScrollSyncPane>
          </div>
</div>
              </div>
       

      
            </Drawer.Body>
          </Drawer>
     

     
</div>
</ScrollSync>
        {/* <TableHeaderColumn row='1' dataField='insta_avgrate' dataAlign='center' editable={ false } thStyle={ { 'background': '#fff2cd' } } headerAlign='center'>Instagram Avgrate</TableHeaderColumn> */}


        {/*
         <TableHeaderColumn row='0' colSpan={this.state.showcol}   dataAlign='center'  thStyle={ { 'background': '#CFE2F3' } } editable={ false } headerAlign='center'>Commercials of Influencer</TableHeaderColumn>
        <TableHeaderColumn row='1' dataField='yt_video' hidden={this.state.hideYt} columnTitle={ this.Ytvideo } thStyle={ { 'background': '#CFE2F3' } } width='15em'  headerAlign='center' dataAlign='center'  customEditor={ { getElement: YtVideo } } >Youtube Video</TableHeaderColumn>
        <TableHeaderColumn row='1' dataField='insta_st' dataAlign='center' hidden={this.state.hideInsta} columnTitle={ this.InstaStory }  thStyle={ { 'background': '#CFE2F3' } } className={ this.instaClass } width='15em'  headerAlign='center' customEditor={ { getElement: InstaStory } }>Instagram Story</TableHeaderColumn>
        <TableHeaderColumn row='1' dataField='insta_static' hidden={this.state.hideInsta} columnTitle={ this.InstaStaticPst } dataAlign='center' width='15em' thStyle={ { 'background': '#CFE2F3' } } headerAlign='center' customEditor={ { getElement: InstaStaticPst } }>Instagram Static Post </TableHeaderColumn>
        <TableHeaderColumn row='1' dataField='insta_video' hidden={this.state.hideInsta} dataAlign='center'columnTitle={ this.InstaVideoPost } width='15em' thStyle={ { 'background': '#CFE2F3' } } headerAlign='center' customEditor={ { getElement: InstaVideoPost } }>Instagram Video Post</TableHeaderColumn>

        <TableHeaderColumn row='0' colSpan={this.state.showcol}   dataAlign='center'  thStyle={ { 'background': '#dad2e9' } } headerAlign='center'>Brand Commercials</TableHeaderColumn>
        <TableHeaderColumn row='1' dataField='brand_youtube_video' hidden={this.state.hideYt} editable={ true } thStyle={ { 'background': '#dad2e9' } } width='15em' headerAlign='center' dataAlign='center'>Youtube Video</TableHeaderColumn>
        <TableHeaderColumn row='1' dataField='brand_insta_story' hidden={this.state.hideInsta} dataAlign='center'   editable={ true } thStyle={ { 'background': '#dad2e9' } } width='15em' headerAlign='center'>Instagram Story</TableHeaderColumn>
        <TableHeaderColumn row='1' dataField='brand_insta_static' hidden={this.state.hideInsta} dataAlign='center' width='15em' editable={ true } thStyle={ { 'background': '#dad2e9' } } headerAlign='center'>Instagram Static Post </TableHeaderColumn>
        <TableHeaderColumn row='1' dataField='brand_insta_video' hidden={this.state.hideInsta} dataAlign='center' width='15em' editable={ true } thStyle={ { 'background': '#dad2e9' } } headerAlign='center'>Instagram Video Post</TableHeaderColumn>
        <TableHeaderColumn row='0'  rowSpan='2' dataField='com_agency' filter={ { type: 'TextFilter' } } editable={ false } width='11em' dataAlign='center'   headerAlign='center'>Company</TableHeaderColumn>
        <TableHeaderColumn row='0'  rowSpan='2' dataField='manager' filter={ { type: 'TextFilter' } } editable={ false } width='12em' dataAlign='center'  headerAlign='center'>Manager</TableHeaderColumn>
        <TableHeaderColumn row='0'  rowSpan='2' dataField='contact' filter={ { type: 'TextFilter' } }  editable={ false } width='10em' dataAlign='center'  headerAlign='center'>Contact</TableHeaderColumn>
        <TableHeaderColumn row='0'  rowSpan='2' dataField='email_id'  editable={ false } width='18em' dataAlign='center'   headerAlign='center'>Mail ID</TableHeaderColumn>
   
        <TableHeaderColumn row='0'  rowSpan='2' dataField='location'  headerAlign='center' filter={ { type: 'TextFilter' } } editable={ false } width='10em' dataAlign='center'>Location</TableHeaderColumn> 
        */}


 

      {/* <Menu right >
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>
        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
      </Menu> */}

      <Modal size={this.state.size} show={this.state.show} onHide={this.close}>
          <Modal.Header>
            <Modal.Title style={{  
              textShadow: "0px 1px, 1px 0px, 1px 1px",
              fontFamily: "Montserrat",
              fontSize: "27px",
              color: "#2C3352",
              fontWeight: "900"
              }}>Filter Options</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className=" ">
            <div className="" >
            {/* <div className="col-md-12" > */}
               <div className="">
            
              {/* <div className="col-md-6">
               <h5 className="yofilter">Platform :</h5>
               <h5 className="yofilter1"> Instagram : 
               <input type="checkbox" value="Up" id="instagram" checked={this.state.hideYt} onChange={this.OnChangeFilter} onClick={() => this.setState({hideYt:!this.state.hideYt})} className="mycheckbox" /> </h5> 
             <h5 className="yofilter1"> Youtube : 
             <input type="checkbox" id="youtuber" value="Up" checked={this.state.hideInsta} onChange={this.OnChangeFilter} onClick={() => this.setState({hideInsta:!this.state.hideInsta})} className="mycheckbox"  /> </h5>
               </div> */}

               <h5 style={{padding: "0px 0 0.6em"}} className="yofilter">Gender:
               <span style={{padding: "0px 1.5em 0 1em"}}>
               <input type="checkbox" checked={this.state.male} value="Up" id="Male" onChange={this.OnChangeFilter}  className="mycheckbox" /> Male
               </span>

               <span>
               <input type="checkbox" checked={this.state.female} id="Female" value="Up" onChange={this.OnChangeFilter}  className="mycheckbox"  /> Female
               </span>
               </h5>
               {/* <h5 className="yofilter1"> Male : <input type="checkbox" checked={this.state.male} value="Up" id="Male" onChange={this.OnChangeFilter}  className="mycheckbox" /> </h5> 
             <h5 className="yofilter1"> Female : <input type="checkbox" checked={this.state.female} id="Female" value="Up" onChange={this.OnChangeFilter}  className="mycheckbox"  /> </h5> */}
        
             

       {   this.state.instaonly &&   <div >
           {/* <span style={{fontSize:"14px"}}>Disable <input type="checkbox" value="Up" checked={this.state.instagramFolBool} id="Instagram_follow" onChange={ this.onChangeDisable} className="mycheckbox" /></span> */}
               <h5 className="yofilter">Instagram Followers :</h5>
               <div>
               <InputRange
         id="instaslider"
          step={10000}
          maxValue={1000000}
          minValue={0}
          disabled={this.state.instagramFolBool}
          formatLabel={value => value/1000 + 'k'}
          value={this.state.Instagram_follow}
           //onChange={this.handleOnChangeIn}
           onChange={ value => this.setState({ Instagram_follow: value })}
           onChangeComplete={this.handleOnChangeIn}
           />
           </div>
                  </div>
                  }

                 {this.state.youtubeonly && <div >
                  {/* <span style={{fontSize:"14px"}}>Disable <input type="checkbox" checked={this.state.youtubeSubsBool} value="Up" id="youtube_subs" onClick={this.onChangeYtDisable} className="mycheckbox" /></span> */}
                  <h5 className="yofilter">Youtube Subscribers :</h5>
                  <div >
                  <InputRange
         id="ytslider"
          step={10000}
          maxValue={1000000}
          minValue={0}
          disabled={this.state.youtubeSubsBool}
          formatLabel={value => value/1000 + 'k'}
          value={this.state.youtube_subs}
            // onChange={this.handle}
           onChange={ value => this.setState({ youtube_subs: value })}
           onChangeComplete={this.handleOnChangeYt}
           />
           </div>
                  </div>}
                  <div>
                  <h5 className="yofilter"> </h5>
        <div className="row">
          <div className="col-6">
          <select  className="browser-default" id="selected_col"  value={this.state.commfield}  onChange={this.handleOnChangefield}   >
                  <option value="select" disabled selected>Select Commercials </option>
                    <option value="yt_video">Youtube Video</option>
                    <option value="insta_st">Instagram Story</option>
                    <option value="insta_static">Instagram Static Post</option>
                    <option value="insta_video">Instagram Video Post</option>
                    {/* <option value="tiktok_video">Tiktok Video</option> */}

                </select>
          </div>
          <div className="col-3" style={{padding: "1% 0 0;"}}>
          {/* <span>   <h5 style={{fontSize: "14px",margin: "6% 0"}} className="">: Disable <input type="checkbox" value="Up" id="commercial_range" checked={this.state.infCOomBool} onClick={this.onChangeCommDisable} className="mycheckbox" /></h5></span> */}
          </div>
          <div className="col-3">
        
          </div>
        </div>
                          
                 
<div >
        <InputRange
         id="insta_static"
          step={10000}
          maxValue={200000}
          minValue={0}
          disabled={this.state.infCOomBool}
          formatLabel={value => value/1000 + 'k'}
          value={this.state.commercial_range}
            // onChange={this.handle}
           onChange={value => this.setState({ commercial_range: value })}
          //  onChange={this.handleOnChangeCommk, value => this.setState({ valueA3: value })}
           onChangeComplete={this.handleOnChangeCommk}
           />

           </div>
             
                  </div>

            
               <div >
               <h5 style={{marginBottom:"0.25rem"}} className="yofilter">Select Category:</h5>
               <MultiSelect
               id="select_category"
                data={category}
                autoClose={false}
                onChange={this.onChangeMultiselect}
                value={this.state.Selectedcategory}
            />
          
</div>

        

                    {/* <div>
                  <Button onClick={this.handleFilter}>Apply</Button>
                  <Button  onClick={() => window.location.reload(false)} >Reset</Button>
                    </div> */}
          
            </div>
               </div>
         
    

               </div>
          </Modal.Body>
          <Modal.Footer>



            {/* <Button onClick={this.close} className="dash-button ">
            Cancel
            </Button> */}

            <Button className="filter-button2" onClick={this.resetFilter}>
              Reset
     {/* <img src={resetFilterImg} style={{height: "19.5px"}} /> */}
    </Button>


            <Button onClick={this.handleFilter} className="dash-button">
              Apply
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ADD NEW INFLUENCER FORM MODAL */}
        
        <Modal size={this.state.size} show={this.state.new_inlfuecer_modal} onHide={() => this.setState({new_inlfuecer_modal:false})}>
          <Modal.Header>
            <Modal.Title style={{  
              textShadow: "0px 1px, 1px 0px, 1px 1px",
              fontFamily: "Montserrat",
              fontSize: "27px",
              color: "#2C3352",
              }}>Add New Influencer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
<div className="addNewwrapper">
<form onSubmit={this.handleNewInflueSubmit}>
  <div class="form-row">
  <div class="form-group col-md-1">
  <span className="new-influModal">Name</span>
  </div>
    <div class="form-group col-md-5">
      {/* <label for="name">Name</label> */}
      <input type="text" class="form-control"   onChange={this.handleInputChange}  id="name" placeholder="" />
    </div>
    <div class="form-group col-md-1">
  <span className="new-influModal">Email</span>
  </div>
    <div class="form-group col-md-5">
      {/* <label for="email_id">Email</label> */}
      <input type="email" class="form-control"   onChange={this.handleInputChange}  id="email_id" placeholder="" />
    </div>
  </div>
  <div class="form-row">
  <div class="form-group col-md-1">
  <span className="new-influModal">Gender</span>
  </div>
    <div class="form-group col-md-3">

      <select  className="browser-default" id="gender"   onChange={this.handleInputChange}   >  
            <option value="" disabled selected>Select Gender</option>
            <option value="male" >Male</option>
            <option value="female" >Female</option>
            </select>
     
    </div>
    <div class="form-group col-md-2">
    <span className="new-influModal">Select Category</span>
  </div>
    <div class="form-group col-md-6">
  
      {/* <label for="yt_video">Youtube influencer ₹</label> */}
      <MultiSelect
      required
                data={category}
                autoClose={false}
                onChange={this.onChangeNewMultiselect}
                value={this.state.NewSelectedcategory}
            />
    </div>

  </div>

<h5>Youtube </h5>

  <div class="form-row">
    <div class="form-group col-md-2">
      {/* <label for="youtube_subscribers">Youtube Subscribers</label> */}
      <input type="number" class="form-control" required   onChange={this.handleInputChange}  id="youtube_subscribers" placeholder="Subscribers" />
    </div>
    <div class="form-group col-md-2">
      {/* <label for="yt_video">Youtube influencer ₹</label> */}
      <input type="number" class="form-control" required   onChange={this.handleInputChange}  id="yt_video" placeholder="influencer" />
    </div>
    <div class="form-group col-md-8">
      {/* <label for="youtube">Youtube Url</label> */}
      <input type="text" class="form-control" required   onChange={this.handleInputChange}  id="youtube" placeholder="Url" />
    </div>
  </div>
  <h5>Instagram </h5>
  <div class="form-row">
    <div class="form-group col-md-2">
      {/* <label for="insta_followers">Followers</label> */}
      <input type="number" class="form-control" required   onChange={this.handleInputChange}  id="insta_followers" placeholder="Followers" />
    </div>
    <div class="form-group col-md-2">
      {/* <label for="yt_video">Story ₹</label> */}
      <input type="number" class="form-control" required   onChange={this.handleInputChange}  id="insta_st" placeholder="Story" />
    </div>
    <div class="form-group col-md-2">
      {/* <label for="insta_st">Post</label> */}
      <input type="number" class="form-control" required   onChange={this.handleInputChange}  id="insta_static" placeholder="Post" />
    </div>
    <div class="form-group col-md-2">
      {/* <label for="insta_st">Post</label> */}
      <input type="number" class="form-control" required   onChange={this.handleInputChange}  id="insta_video" placeholder="Vodeo" />
    </div>
    <div class="form-group col-md-6">
      {/* <label for="insta">Instagram Url</label> */}
      <input type="text" class="form-control" required   onChange={this.handleInputChange}  id="insta_url" placeholder="Instagram Url" />
    </div>
  </div>

  <h5>Details</h5>
  <div class="form-row">
    <div class="form-group col-md-3">
      {/* <label for="insta_followers">Followers</label> */}
      <input type="text" class="form-control" required   onChange={this.handleInputChange}  id="com_agency" placeholder="Company" />
    </div>
    <div class="form-group col-md-3">
      {/* <label for="yt_video">Story ₹</label> */}
      <input type="text" class="form-control" required   onChange={this.handleInputChange}  id="manager" placeholder="Manager" />
    </div>
    <div class="form-group col-md-3">
      {/* <label for="insta_st">Post</label> */}
      <input type="number" class="form-control" required   onChange={this.handleInputChange}  id="contact" placeholder="Contact" />
    </div>
    <div class="form-group col-md-3">
      {/* <label for="insta">Instagram Url</label> */}
      <input type="text" class="form-control" required   onChange={this.handleInputChange}  id="location" placeholder="Location" />
    </div>
  </div>

  <h5>Average</h5>
  <div class="form-row">
    <div class="form-group col-md-2">
      {/* <label for="insta_followers">Followers</label> */}
      <input type="text" class="form-control" required   onChange={this.handleInputChange}  id="insta_avgrate" placeholder="Story" />
    </div>
    <div class="form-group col-md-2">
      {/* <label for="yt_video">Story ₹</label> */}
      <input type="text" class="form-control" required   onChange={this.handleInputChange}  id="inta_avg_post" placeholder="Post" />
    </div>
    <div class="form-group col-md-2">
      {/* <label for="insta_st">Post</label> */}
      <input type="text" class="form-control" required   onChange={this.handleInputChange}  id="inta_avg_video" placeholder="Video" />
    </div>
    <div class="form-group col-md-2">
      {/* <label for="insta">Instagram Url</label> */}
      <input type="text" class="form-control" required   onChange={this.handleInputChange}  id="inta_avg_reel" placeholder="Reel" />
    </div>
    <div class="form-group col-md-2">
      {/* <label for="insta">Instagram Url</label> */}
      <input type="text" class="form-control" required   onChange={this.handleInputChange}  id="insta_static_reach" placeholder="Static Reach" />
    </div>
    <div class="form-group col-md-2">
      {/* <label for="insta">Instagram Url</label> */}
      <input type="text" class="form-control" required   onChange={this.handleInputChange}  id="yt_avg_views" placeholder="Youtube Views" />
    </div>
  </div>
  <Button type="submit" className="dash-button">Submit</Button>
    {/* <div class="form-row">

    <div class="form-group col-md-6">
    
      <input type="text" class="form-control" required id="insta" placeholder="Instagram Url" />
    </div>
  </div> */}

</form>
</div>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button onClick={this.addNewInfluencer} className="dash-button">
              Add
            </Button>
          </Modal.Footer> */}
        </Modal>

         </div>
  }
    </div>

    );
  }
}

Krishna.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Krishna);



class ActiveFormatter extends React.Component {
  render() {
    return (
      <a  href={ this.props.youtube } target="_blank"> Visit </a>
    );
  }
}

function activeFormatter(cell, row, enumObject, index) {
  return (
    <ActiveFormatter youtube={ cell } />
  );
}


class ActiveFormatter1 extends React.Component {
  render() {
    return (
      <a  href={ this.props.insta_url } target="_blank"> Visit </a>
    );
  }
}

function activeFormatter2(cell, row, enumObject, index) {
  return (
    <ActiveFormatter1 insta_url={ cell } />
  );
}

class Checkbox extends React.Component {
  componentDidMount() { this.update(this.props.checked); }
  componentWillReceiveProps(props) { this.update(props.checked); }
  update(checked) {
    ReactDOM.findDOMNode(this).indeterminate = checked === 'indeterminate';
  }
  render() {
    return (
      <>
      <input className='react-bs-select-all'
        type='checkbox'
        name={ 'checkbox' + this.props.rowIndex }
        id={ 'checkbox' + this.props.rowIndex }
        checked={ this.props.checked }
        onChange={ this.props.onChange } />
        </>
    );
  }
}

class SimpleCellEdit extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.row['name'])
    this.updateData = this.updateData.bind(this);
    this.state = {
      name: props.defaultValue,
     
    };
  }
  focus() {
    this.refs.inputRef.focus();
  }
  updateData() {
    this.props.onUpdate(this.state.name);
    // var date= moment().format("DD-MM-YYYY hh:mm:ss")
  }
  handleKeyDown
  render() {
  
    return (
    <span>
   {/* <NumberFormat  
    ref='inputRef'
    className={ ( this.props.editorClass || '') + ' form-control editor edit-text' }
   style={ { display: 'inline', width: '50%' } }
   value={ this.state.name }
   thousandSeparator={true} 
   prefix={'₹'} 
   onChange={ e => { this.setState({ name: e.currentTarget.value }); } } 
   /> */}
              <input
                ref='inputRef'
                className={ ( this.props.editorClass || '') + ' form-control editor edit-text' }
                // style={ { display: 'inline', width: '50%' } }
                type='number'
                value={ this.state.name }
                onChange={ e => { this.setState({ name: e.currentTarget.value }); } } 
                onBlur={this.updateData}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    this.updateData()
                  }
                }}/>
            
     </span>
    );
  }
}



//i think woh array mein hi change kar dena hai using numeral
//so directly array mehi changes hoge
//so filtering won't be an issue as the databse copy has the pure numbers 
//and the excel will also be downloaded as k and m so even that isn't a problem 
//point is there are no calculations regarding followers and subscribers in this two pages so changing format wouldn't matter much 
//does the numeral have a way of deconstructing it?
