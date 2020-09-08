import React from "react";
// import ReactDataGrid from "react-data-grid";
// Import React Table
import { BootstrapTable, TableHeaderColumn,DeleteButton  } from 'react-bootstrap-table';
// import Campaign_Form from './campaign_form'
import InputRange from 'react-input-range';
import {Button ,Row, Col} from 'reactstrap'
import axios from "axios";
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import '@progress/kendo-react-intl'
import 'react-input-range/lib/css/index.css';
import { Modal} from 'rsuite';
import '../../../assets/style/rsuite-default.css';
import  YtVideoCommEditor ,{InstaStoryCommEditor, InstaStaticPstCommEditor, InstaVideoPostCommEditor } from './CommEditor'
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
import M from "materialize-css/dist/js/materialize.min";
import DeleteIcon from '../../../assets/delete.svg'
import {Home} from './Home'
import 'react-dates/initialize';
import {ExportPdf, ExportForNewSheet} from "./exportExcel";
import {Exportxlsx} from './Exportxlsx'
import { DateRangePicker} from 'react-dates';
import { Dialog, DialogActionsBar, Window } from '@progress/kendo-react-dialogs';

// import { isObject } from "csv-writer/src/lib/lang/object";

var numeral =require('numeral');
const category = ["Beauty", "Vlogger","Fitness","Grooming","Fashion","Music","Food","Travel","Lifestyle","Tech", "Entertainment","Motivation","Educational","DIY","Gamer","Comedy Sketches","Moto Vlogger","Tech","Parenting/ Mom"]

const date = moment().format("DD-MM-YYYY hh:mm:ss");
const formatCash = n => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};
class Dash extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props.dash);
    var my=numeral(1000.0);
    var n=my.value();
    var allname=[];
    var deleverables=[]


    // console.log(n);
    var value_arr=this.props.dash;
    for(var i=0;i<value_arr.length;i++){
      value_arr[i]['checked']=false;
      var name=value_arr[i]["name"];
      value_arr[i].deleverables =[]
      if(value_arr[i]['Male']=="Up"){
      value_arr[i]['gender']="Male"
      }
      if(value_arr[i]['Female']=="Up"){
        value_arr[i]['gender']="Female"
        }
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
      }
      if(value_arr[i]['insta_static']!=''|| value_arr[i]['insta_static']!='0.0'){

        if(value_arr[i]['insta_static']==undefined){
          value_arr[i]['insta_static']=null;
        }
        else{
          value_arr[i]['insta_static']=numeral(value_arr[i]['insta_static']).value();


        }
        }
      if(value_arr[i]['insta_video']!=''|| value_arr[i]['insta_video']!='0.0'){

        if(value_arr[i]['insta_video']==undefined){
          value_arr[i]['insta_video']=null;
        }
        else{
          value_arr[i]['insta_video']=numeral(value_arr[i]['insta_video']).value();


        }        
          }  
      if(value_arr[i]['yt_video']!=''|| value_arr[i]['yt_video']!='0.0'){

        

        if(value_arr[i]['yt_video']==undefined){
          value_arr[i]['yt_video']=null;
        }
        else{
          value_arr[i]['yt_video']=numeral(value_arr[i]['yt_video']).value();


        }

        }
       var khn= value_arr[i]['avg_yt_views']
        var asdf =formatCash(khn)
        value_arr[i]['avg_yt_views'] = asdf
    
    }
    this.state={
      value:this.props.dash,
      test:this.props.dash,
      ytsize:false,
      value:value_arr,
      onSubmit:false,
      allname:allname,
      obj_array:[],
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
      mila:false,
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
      infCOomBool:true,
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
          showsub:'',
          showfoll:null,
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
          youtube_channel:'',
          insta:"",
          name:'',
          email_id:'',
          gender:'',
          manager_email:'',
          valuepresent:false,
          total_num:null,
          responsefromCom:true,
          options: [
            {
              id: "Pending",
              name: "Pending"
            },
            {
            id: "Lock",
            name: "Locked"
          },
         ],
          campaign_status: "Pending",
          gen_options: [{
            id: "Male",
            name: "Male"
          },
          {
            id: "Female",
            name: "Female"
          }],
          gender_value: "",
          brands:[],
          bran:'',
          brand_name:'',
          new_brand_name : false,
          newBrand:'',
          new_brand:'',
          campaign_name:'',
          campaign_desc:'',
          campaign_date:'',
          focusedInput:null,
          campaign_Date:'',
          startDate: null,
          endDate:null,
          cost_influencer:null,
          cost_monk:null,
          person_in:'',
          contact_no:'',
          email:'',
          campaign_owner:this.props.auth.user.name,
          users:[],
          executor:'',
          n:null,
          list:[],
          show_add:false,
          show_cancel:true,
          brand_nameNull:true,
          showModal3:false,
          submite_is_done:false,
          loader:false,
          editInf:false,
          infarray:[],
          enteredValue:false,
          newSheetTable:true,
          Modal:false,
          add_influencer:false,
          top:false,
          ins:false,
          yt:false,
          show_ins_st:false,
          show_ins_stat:false,
          show_ins_vide:false,
          show_ytVid:false,
          searchfield:'',
          onlyonePresent:false,
          AllBrandArray:[],

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
    this.deleteInfluencer = this.deleteInfluencer.bind(this);
    this.openNewInf = this.openNewInf.bind(this);
    this.updateOnCommercial = this.updateOnCommercial.bind(this);
    this.handleinstafollowerChange = this.handleinstafollowerChange.bind(this);


    //campaing form 
    // this.handleInputChange=this.handleInputChange.bind(this);
    this.onDatesChange = this.onDatesChange.bind(this);
    this.handleCampainChange=this.handleCampainChange.bind(this);
    this.handleCampaignSubmit=this.handleCampaignSubmit.bind(this);
    this.handleCampainChange2=this.handleCampainChange2.bind(this);

    
  this.closeedit = this.closeedit.bind(this);
  this.openedit = this.openedit.bind(this);
  this.passedFunction = this.passedFunction.bind(this);
  this.handleinstaChange = this.handleinstaChange.bind(this);
  this.handleyoutubeChange = this.handleyoutubeChange.bind(this);
  this.closeNewInf = this.closeNewInf.bind(this);
  this.toggleDialog = this.toggleDialog.bind(this);
  this.enterNameFilter = this.enterNameFilter.bind(this);


}

open(size) {
  this.setState({
    size,
    show: true,
    Modal:true,
    newSheetTable:false
  });
}

close() {
  this.setState({
    show: false,
    Modal:false,
    newSheetTable:true
  });
}

openNewInf(size){
  this.setState({
    size,
    new_inlfuecer_modal: true,
    add_influencer:true,
    newSheetTable:false
  });
}
handleRowSelect(row, isSelected, e,rowIdx){
  //get the check event in here
  var self=this;
  console.log(row);
  // console.log(isSelected);
  const name=row.name;
  console.log(name);

  // var details = this.state.details
  // details.push(row)
  // console.log(details)
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

      this.setState(state => state.count++)

      var selectRow=this.state.selected_row

      selectRow.push(row);
      this.setState({selected_row:selectRow} )
      // console.log(selectRow)
      // console.log(joined)
      
    } else {
      this.setState(state => state.count--)
      console.log("Yo delete the array")
      for(var i=0;i<this.state.krishna.length;i++){
        if(this.state.krishna[i]==name){

          //pop both 
         this.state.krishna.splice(i,1);
         console.log(this.state.krishna);

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
          // console.log(selectRow);
    }
  // }
  return { color: rowIdx % 1 === 0 ? 'red' : 'blue' }

  //updating the total cost and brand cost

  


}
closeNewInf(){
  this.setState({
    new_inlfuecer_modal:false ,
    newSheetTable:true,
    name:"",
    email_id:"",
    youtube_subscribers:null,
    yt_video:null,
    youtube:"",
    insta_followers:null,
    insta_st:null,
    insta_static:null,
    insta_video:null,
    insta_url:"",
    com_agency:"",
    manager:"",
    contact:null,
    location:"",
    email_id:"",
    gender:"",
    NewSelectedcategory:[],
    youtube_channel:"",
    insta:"",
    showsub:null
  })
}



// componentDidUpdate(prevProps, prevState){
//   console.log("yo i am running")
//   var arr = this.state.value
//   console.log(arr)
//   let top = false /*true or false*/



// this.refs.titleCol.handleFilter('krishna')
 

//   if (top !== this.state.top){


//     var brand_total;

//     var self =this
//     for(var i =0;i<arr.length;i++){
//       if(arr[i]['checked']==true){
//         var br_yt = parseInt(arr[i]['brand_youtube_video'])
//         var br_instor = parseInt(arr[i]['brand_insta_story'])
//         var br_inssta = parseInt(arr[i]['brand_insta_static'])
//         var br_insvide = parseInt(arr[i]['brand_insta_video'])
//         console.log(br_yt +"  "+ typeof br_yt)
//         console.log(br_instor +"  "+ typeof br_instor)
//         console.log(br_inssta +"  "+ typeof br_inssta)
//         console.log(br_insvide+"  "+ typeof br_insvide)
       
//         if( isNaN(br_yt)==true){
//             br_yt=0;  
          
//         } if( isNaN(br_instor)==true){
//             br_instor=0;  
           
//         } if( isNaN(br_inssta)==true){
//             br_inssta=0;  
           
//         } if( isNaN(br_insvide)==true){
//             br_insvide=0;  
           
//         }
  
//         brand_total = br_yt + br_instor + br_insvide + br_inssta
  
//       }
//     }
//     console.log(brand_total)
//     self.setState({
//       total_cost:brand_total,
//       top:top
//     })
// }
 
  
  
// }


componentDidMount() {
  var arr2;
 

// console.log(this.state.allname)
var elems = document.querySelectorAll('.datepicker');
var instances = M.Datepicker.init(elems);
var self=this;
console.log("inside mount")
//call the brand names api and list them in brand names input.
axios.get("/api/brands/get_brands").then( function(response){
  const array=response.data;
  arr2= array
  console.log(arr2)
  console.log(array)

  var arr = array
  var kri = []
console.log(arr)
    for(var i =0; i<arr.length;i++){
    var single = arr[i]
    var brand_na =  single['brand']
    kri.push(brand_na)
  }
  // console.log(arr)
  // console.log(kri)

  //filter brand if available already
  var  uniqueArray = kri.filter(function(item, pos) {
    return kri.indexOf(item) == pos;
})
console.log(uniqueArray)

self.setState({brands:array,bran:uniqueArray})
  // axios.get("/api/users/get_users").then(function (response) {
  //   console.log("inside axios")
  //   var names=response.data;
  //   console.log(names);

  //   // self.setState({brands:array,users:names, responsefromCom:true})
  //   self.setState({brands:array,bran:uniqueArray,users:names})

  

  //   })
  //  .catch(function (error) {
  //   console.log(error);
  //   });
})
.catch(function (error) {
  console.log(error);
  });



}
toggleCheckbox(e) {
  // var mod_details = this.state.details;
  // var length=mod_details.length;
  // mod_details[length-1]["campaign_status"]=e.target.id;
  this.setState({
    campaign_status : e.target.id
  })
 }
 onDatesChange({ startDate, endDate }) {

  this.setState({ startDate, endDate ,campaign_Date:moment().format("DD-MM-YYYY")});
  console.log(startDate)
  console.log(endDate)
}
handleCampainChange2= (event) =>{
  const target=event.target;
  console.log(target);
  // console.log(this.state.list);

  
  var self=this;
  const id = target.id

  console.log(id);
  console.log(this.state.new_brand);
  // this.setState({
  //  campaign_name: value + '_' + 1
  // });
     //for id = new_brand
 
      var xyz;
      var v = event.target.value;
      this.setState({new_brand:v})
      console.log(this.state.new_brand);
  
    
    var k = 0;
        for(var i=0; i<self.state.brands.length; i++){
     
          if(v===self.state.brands[i]['brand']){
            // xyz =this.state.brands.brand[i].brand[n];
            console.log("heyhey")
            var number=parseInt(self.state.brands[i]["n"]) + 1;
            xyz = self.state.brands[i]["n"] + 1;
            // xyz += self.state.brand[i]["n"]
            var campaignName= v +'_'+xyz;
            this.setState({campaign_name : campaignName,n:number, brand_name:v, n:xyz,new_brand_name:false,  })
            console.log(this.state.campaign_name) 
            console.log("second time");
           k=1
          }
   
        }
  
        if(k==0){

          this.setState({
            brand_name:v, 
            new_brand_name:true,
            campaign_name: v + '_' + 1
          });
        }

        console.log(v)
      //get the details, modify it here.
      //get the length as well.
        
      //eh campaign name when typed gets teh state updated.
      //the name ka id is there 
  
        
  
      //th
  
  
    
      //pushing means adding an entire row by itself.
      //instead just initiate the values to null in details
  
    
    


}

handleinstafollowerChange(event){
var value =event.target.value
console.log(value)


 var foll = formatCash(value)
console.log(foll)
this.setState({
insta_followers:value,
showfoll:foll
})
}

handleCampainChange(event){


    //adding in details state to push in exel export
    // var obj={"cost_influencer":this.state.total_cost,"cost_monk":this.state.monk_fee}
    // this.state.details.push(obj)

  const target=event.target;
  console.log(target);
  // console.log(this.state.list);
  
  var self=this;


  const id=target.id;

  if (id=='brand_name'){
   
    var xyz;
    const v = target.value;
    console.log("hey")
    // console.log(v)
    this.setState({brand_name:v, brand_nameNull:false})
    console.log(this.state.brand_name);
  console.log("third time");

      for(var i=0; i<self.state.brands.length; i++){
   
        if(v==self.state.brands[i]['brand']){
          // xyz =this.state.brands.brand[i].brand[n];
          console.log("heyhey")
          var number=self.state.brands[i]["n"];
          xyz = self.state.brands[i]["n"] + 1;
          // xyz += self.state.brand[i]["n"]
          var campaignName= v+'_'+xyz;
          this.setState({campaign_name : campaignName,n:xyz})
          console.log(this.state.campaign_name) 
          console.log("second time");
        }
      }
  
    } 
 
}
scrollToBottom = () => {
  console.log("go down")
  const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
};

handleCampaignSubmit(event){

 
  //  console.log(this.state.valuepresent)
  //  event.preventDefault();
  //  return false

  
    // if(this.state.valuepresent==true){
    //   alert("Campaign Name Already Present")
    //   event.preventDefault();
    // }

   
    //get the data to mongo.
    //make it available to the history button.

    //to check if sumit is done
    var sumit = this.state.submite_is_done;
    console.log(sumit)

    if(sumit==true){
        //  event.preventDefault();
      alert("You have already Submited Form")
    }
    if(sumit==false){
        //  event.preventDefault();
      console.log(this.state);
      console.log("YO I have ben cki");
      axios({
        method: 'post',
        url: "/api/campaigns/set_campaign",
        data: {
          new_brand_name:this.state.new_brand_name,
          new_brand:this.state.new_brand,
          n:this.state.n,
          influencers:this.state.krishna,
          adv:this.state.brand_name,
          campaign_name:this.state.campaign_name,
          executor:this.state.executor,
          campaign_desc:this.state.campaign_desc,
          campaign_date:this.state.campaign_date,
          campaign_Date:this.state.campaign_Date,
          cost_influencer:this.state.total_cost,
          cost_monk:this.state.monk_fee,
          campaign_status:this.state.campaign_status,
          campaign_owner:this.state.campaign_owner,
          selected_full:this.state.selected_row,
          Selectedcategory:this.state.Selectedcategory,
          person_in:this.state.person_in,
          contact_no:this.state.contact_no,
          email:this.state.email,
          startDate:this.state.startDate,
          endDate:this.state.endDate
  
              }
              })
        .then(function (response) {
        console.log(response);
    
    
        })
      
        .catch(function (error) {
        console.log(error);
        });
        
    }
   
    
   

    

  }
  handleCheckChieldElement(index, e){
    let newItems = this.state.fruites.slice();
    newItems[index].checked = !newItems[index].checked
    this.setState({
      fruites: newItems
    })
    let fruites = this.state.fruites
    // fruites.forEach(fruite => {
    //    if (fruite.value === e.target.value)
    //       fruite.isChecked =  e.target.checked
    // })
    // this.setState({fruites:fruites})
  
    
      console.log(e.target);
      const id=parseInt(e.target.id);
      console.log(id);
  for(let i=0; i<fruites.length; i++){
    if(id==i){
      var bool=fruites[i]['isChecked']
      fruites[i]['isChecked']=(!bool);
      console.log(fruites[i]);
      
      }
    
  }
  }
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
    var arr=this.state.selected_row;
    var sum=0;
    var selected_row = []
    //get the addition done here.
        
    function onlyUnique(value, index, self) { 
      return self.indexOf(value) === index;
  }

    var kr = []
    for (var i=0;i<arr.length;i++){
      if(arr[i]['checked']==true){
  


      console.log(arr[i])
      var brand_toal ;
      var total_commrcial = 0 ;
      var toatl_agency = 0;
      var br_yt = parseInt(arr[i]['brand_youtube_video'])
      var br_instor = parseInt(arr[i]['brand_insta_story'])
      var br_inssta = parseInt(arr[i]['brand_insta_static'])
      var br_insvide = parseInt(arr[i]['brand_insta_video'])
      // console.log(br_yt +"  "+ typeof br_yt)
      // console.log(br_instor +"  "+ typeof br_instor)
      // console.log(br_inssta +"  "+ typeof br_inssta)
      // console.log(br_insvide+"  "+ typeof br_insvide)
     
      if( isNaN(br_yt)==true){
          br_yt=0;  
        
      } if( isNaN(br_instor)==true){
          br_instor=0;  
         
      } if( isNaN(br_inssta)==true){
          br_inssta=0;  
         
      } if( isNaN(br_insvide)==true){
          br_insvide=0;  
         
      }

      if( br_yt>0){
        var yt = "Youtube Video"
        kr.push(yt)
        arr[i]['brand_youtube_video']=br_yt
        total_commrcial = total_commrcial + arr[i]['yt_video']
        var abc= br_yt - arr[i]['yt_video']
        toatl_agency = toatl_agency + abc
     } 
     if( br_instor>0){
       var st = "Instagram Story"
       kr.push(st)
     
       arr[i]['brand_insta_story']=br_instor
        total_commrcial = total_commrcial + arr[i]['insta_st']
        var abc1= br_instor - arr[i]['insta_st']
        toatl_agency = toatl_agency + abc1

     }
   
     if( br_inssta>0){
       var sta = "Instagram Static"
       kr.push(sta)
      //  kr.push(sta)
       arr[i]['brand_insta_static']=br_inssta
        total_commrcial = total_commrcial + arr[i]['insta_static']
        var abc2= br_inssta - arr[i]['insta_static']
        toatl_agency = toatl_agency + abc2

     }
     if( br_insvide>0){
       var vd = "Instagram Video"
       kr.push(vd)
       arr[i]['brand_insta_video']=br_insvide
        total_commrcial = total_commrcial + arr[i]['insta_video']
        var abc3= br_insvide - arr[i]['insta_video']
        toatl_agency = toatl_agency + abc3

     }

     var ytsubs = arr[i].youtube_subscribers
     if(ytsubs!==undefined &&  ytsubs > 0){
      var n = ytsubs.toString()
      arr[i].youtube_subscribers = n
     }

    var x = kr.toString();

      console.log(x)

      brand_toal = br_yt + br_instor + br_inssta +br_insvide

      arr[i].brand_total_cost=brand_toal
      arr[i].deleverables=x
      arr[i].commercial_cost=total_commrcial 
      arr[i].agency_total_fee=toatl_agency 
      selected_row.push(arr[i])

    }
   }

    if(this.state.enteredValue==false || this.state.count==0){
      alert("Please Select Influencers Enter Brand Costing ")
      console.log("don't submit")
    }
    // if(){
    //   alert("Please Select Influencers")
    //   console.log("don't submit")
    // }

 

    if(this.state.count>0 || this.state.enteredValue!==false){
      this.setState({
        onSubmit:true,
        sum:sum ,
        selected_row:selected_row ,
         newSheetTable:false
         });
    }

    var unique = kr.filter( onlyUnique );
 console.log(kr)   
 console.log(unique) 


 this.setState({
   AllBrandArray:unique
 })

 if(unique.length>1){
   console.log("Yo total dikhega")
   this.setState({
     onlyonePresent:true,
   })
 }else{
   this.setState({
     onlyonePresent:false
   })
 } 
    
 }
 handleinstaChange(e){
   console.log("yo insta url working")
var value = e.target.value
this.setState({
  // loader:true,
  insta_url:value
})
var self = this
var obj = {
  insta_link : value,
  name:this.state.insta
}
obj = JSON.stringify(obj)

axios
.get("https://warm-castle-75769.herokuapp.com/https://floating-wave-32826.herokuapp.com/api/users/insta_data", { params: { name : '9gag'}  })
.then(function (response) {
  var result = response.data;

  console.log(response);
  console.log(result);
  var follower = result.followers

  function getVal (val) {
   var multiplier = val.substr(-1).toLowerCase();
    if (multiplier == "k")
      return parseFloat(val) * 1000;
    else if (multiplier == "m")
      return parseFloat(val) * 1000000;
  }
  var foll = getVal(follower)
  console.log(foll + " " + typeof foll)
  self.setState({ 
    loader: false,
    //  Instagram_follow:foll, 
    //  showfoll:follower
    });
})
.catch(function (error) {
  console.log(error);
});

 }

 toggleDialog = () => {
  if(this.state.count==0 ){
    console.log("Please Select an Influencer")
    alert("Please Select an Influencer")
  }else{  
    this.setState({
    visibleDialog: true
});
  }
}

 handleyoutubeChange(e){
  var value = e.target.value
  this.setState({
    youtube:value,
    loader:true
  })
  var self = this
  var obj = {
    youtube_link : value,
    name:this.state.youtube_channel
  }

  obj = JSON.stringify(obj)
console.log(obj)
  axios
  .get("/api/analysis/get_yt_subs", { params: { obj : obj}  })
  .then(function (response) {
    var result = response.data;
  
    console.log(response);
    console.log(result);
    console.log(result.subscriberCount)
    var subscriberCount = parseInt(result.subscriberCount)

    const formatCash = n => {
      if (n < 1e3) return n;
      if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
      if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
      if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
      if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
    };

    var subs =formatCash(subscriberCount)
  console.log(subs)
    self.setState({ loader: false, youtube_subscribers:subscriberCount, showsub:subs});
  })
  .catch(function (error) {
    console.log(error);
  });
  
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
  var obj_array =this.state.obj_array;
  if(id=='Male'){
 
    this.setState({male:!this.state.male,  gender_value : event.target.id})
    var k = 0;
    // check if it is in the fields,
    // check if it' value is up,
    // if it is then pop from both the fields and values.
    // likewise if it isn't in the fields already push on it.
    // you actually don't have to check for value being up
    // console.log(obj_array)
    // for(var i=0;i<obj_array.length;i++){
    //   if(obj_array[i]['Male']=="Up"){
    //    k=1;
    //     //pop obj 
    //    obj_array.splice(i,1);
    //    console.log(obj_array);
    //   }
    // }
    // if(k==0){

    //   var arr = {
    //     "Male" : "Up"
    //   }
    //   obj_array.push(arr)
    //   // var stateObj = this.state.obj_array
    //   // this.setState({obj_array:obj_array});
    //   console.log(this.state.obj_array);
    // }

  }
  //for female filter
  if(id=='Female'){
   
    this.setState({female:!this.state.female ,gender_value : event.target.id})
    var val = event.target.value;
    var k = 0;
    // console.log(obj_array)
    // for(var i=0;i<obj_array.length;i++){
    //   if(obj_array[i]['Female']=="Up"){
    //    k=1;
    //     //pop obj 
    //    obj_array.splice(i,1);
    //   //  console.log(obj_array);
    //   }
    // }
    // if(k==0){

    //   var arr = {
    //     "Female" : "Up"
    //   }
    //   obj_array.push(arr)
    //   // var stateObj = this.state.obj_array
    //   // this.setState({obj_array:obj_array});
    //   console.log(this.state.obj_array);
    // }

  }

  this.setState({
    obj_array :obj_array
  })

  console.log(obj_array)

  // if(this.state.gender_value=='Female'){
  //   delete obj_array['Male'];
  //   obj_array.Female  = "Up"
  // }
  // if(this.state.gender_value=='Male'){
  //   delete obj_array['Female'];
  //   obj_array.Male  = "Up"
  // }

}

passedFunction = () => {
  console.log("yo ho i amm working")
  this.setState({submite_is_done:true})
}
handleNewInflueSubmit=(event)=>{
  event.preventDefault()
  // this.setState({
  //   new_inlfuecer_modal:false , 
  //   newSheetTable:true
  // })
  var allname= this.state.allname;
  console.log(allname)
  var name=this.state.name;
  const isInArray = allname.includes(name);
  console.log(isInArray); 
  var self= this
    console.log(allname.indexOf(name) )

//     if( isInArray==true &&  this.state.name==''&&
//     this.state.email_id==''&&
//     this.state.NewSelectedcategory==[] &&
//     this.state.gender==''
//     ){
// alert("required field is not filled")
//       }

  
    if( isInArray==true){
      alert(this.state.name+" already present")
    }
    else{
      this.setState({
        valuepresent:false,
         new_inlfuecer_modal:false , 
          newSheetTable:true
      })
      const value=this.state.value;
      var valuepresent = this.state.valuepresent;
      console.log(this.state.valuepresent)
      const row = {
        name:this.state.name,
        email_id:this.state.email_id,
        youtube_subscribers:this.state.showsub,
        yt_video:parseInt(this.state.yt_video),
        youtube:this.state.youtube,
        insta_followers:this.state.showfoll,
        insta_st:parseInt(this.state.insta_st),
        insta_static:parseInt(this.state.insta_static),
        insta_video:parseInt(this.state.insta_video),
        insta_url:this.state.insta_url,
        com_agency:this.state.com_agency,
        manager:this.state.manager,
        contact:this.state.contact,
        location:this.state.location,
        gender:this.state.gender,
        checked:false,
        category:this.state.NewSelectedcategory,
        youtube_channel:this.state.youtube_channel,
        insta:this.state.insta,
        manual:true,
        manager_email:this.state.manager_email
      }
      console.log(row)
      // this.scrollToBottom();
      this.setState({new_inlfuecer_modal:false , newSheetTable:true})
      value.push(row)


      //adding category
      var NewSelectedcategory = this.state.NewSelectedcategory;
      for(var i=0;i<NewSelectedcategory.length;i++){
        var k = NewSelectedcategory[i]
        var key = k
        row[key] = "Up"; 
      }

console.log(row)
      axios({
        method: 'post',
        url: "/api/influencers/insert_influencer",
        data: {
          obj:{
            name:this.state.name,
            email_id:this.state.email_id,
            youtube_subscribers:this.state.youtube_subscribers,
            yt_video:parseInt(this.state.yt_video),
            youtube:this.state.youtube,
            insta_followers:this.state.insta_followers,
            insta_st:parseInt(this.state.insta_st),
            insta_static:parseInt(this.state.insta_static),
            insta_video:parseInt(this.state.insta_video),
            insta_url:this.state.insta_url,
            com_agency:this.state.com_agency,
            manager:this.state.manager,
            contact:this.state.contact,
            location:this.state.location,
            gender:this.state.gender,
            checked:false,
            category:this.state.NewSelectedcategory,
            youtube_channel:this.state.youtube_channel,
            insta:this.state.insta,
            manual:true,
            manager_email:this.state.manager_email
          }
              }
        })
        // new brand api call
          .then(function (response) {
            
            // axios.get("/api/influencers/get_influencers").then(function(response){
          
            //   var value=response.data;
            //   console.log(value);
            //   self.setState({value:value,loader:false});
              
            //   })
            // .catch(function (error) {
            //   console.log(error);
            //   });


              self.setState({
                name:"",
                email_id:"",
                youtube_subscribers:null,
                yt_video:null,
                youtube:"",
                insta_followers:null,
                insta_st:null,
                insta_static:null,
                insta_video:null,
                insta_url:"",
                com_agency:"",
                manager:"",
                contact:null,
                location:"",
                email_id:"",
                gender:"",
                NewSelectedcategory:[],
                youtube_channel:"",
                insta:"",
                showsub:null
            })

    
        console.log(response);
        })
        .catch(function (error) {
        console.log(error);
        });



      // axios({
      //   method: 'post',
      //   url: "/api/influencers/insert_influencer",
      //   data: {
      //  obj:row
      //         }
      //         })
      //   .then(function (response) {


      //     var self= this
      //     .then(function (response) {
      //       axios.get("/api/influencers/get_influencers").then(function(response){
          
      //         var value=response.data;
      //         console.log(value);
      //         self.setState({value:value});
              
      //         })
      //       .catch(function (error) {
      //         console.log(error);
      //         });
        
      //     console.log(response);
      //     })
      //     .catch(function (error) {
      //     console.log(error);
      //     });
       


       
      //   console.log(response);

       
      //   })
       
      //   .catch(function (error) {
      //   console.log(error);
      //   })
    }
  event.preventDefault();


}


deleteInfluencer=() => {
  console.log("delete influencer")
  var row =this.state.selected_row
  var name= this.state.krishna
  var value = this.state.value
  var obj=[]
  var bool = true
  var naam =[]
  this.setState({
    visibleDialog: false
  })


    for(var i = 0 ; i<row.length; i++){
      if(row[i]["manual"]!==undefined){
        var inf = row[i]
        console.log(inf)
        var na = row[i]['name']
        naam.push(na)
        obj.push(inf)
        // this.setState({
        //   mila : true
        // })
      }
  
      // if(row[i]["manual"]==undefined){
      
      //   this.setState({
      //     mila : false
      //   })
      // }
  
  
    }
  var self = this


  
  if(obj.length==0){
    alert("You can't delete these influencers")
    console.log("You can't delete these influencers")
    console.log(name)
    // this.setState()
  } else{
    this.setState({
      // loader:true,
      // value:this.state.test,
      krishna:[],
      selected_row:[]
    })
    console.log(obj)
    axios({
      method: 'post',
      url: "/api/influencers/delete_influencer",
      data: obj
      })
      // new brand api call
  
      .then(function (response) {
      console.log(response);
      })
      .catch(function (error) {
      console.log(error);
      });
  
  
     this.setState({ count:0} )
  
    console.log(row)
  
    // const selected_row= this.state.krishna;
    // var index = this.state.values.indexOf(selected_row);
    //       this.state.values.splice(index, 1);
    //       this.setState({values: this.state.values});
  }
  
  for(var j=0;j<value.length;j++){
    console.log("in")
    for(var i = 0 ; i < naam.length;i++){
      var jk=naam[i];
      console.log(jk)
      if(value[j]['name']==naam[i]){
        console.log(value[j]);
        value.splice(j,1);
       console.log(value);
      }
    }
   
   }


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
//var val = event.target.value;
    var self= this
    var arr=[]
      arr[0]=object['min'];
      arr[1]=object['max'];
    

    var obj_array =this.state.obj_array;

    var arr = {
      "$gt":arr[0],
      "$lt":arr[1]
    } 
    
    var insobj = {
      'insta_followers' : arr
    }

    for(var i=0;i<obj_array.length;i++){
      if(typeof obj_array[i]['insta_followers'] !== "undefined"){
        //pop obj 
       obj_array.splice(i,1);
       console.log(obj_array);
      }
    }
    
      obj_array.push(insobj)

  // obj_array['insta_followers']= arr

this.setState({
  obj_array:obj_array
})
console.log(obj_array)

};

// for youtube subs
handleOnChangeYt = (object) =>{
 

// var youtube_subscribers= "youtube_subscribers";
var self= this
var arr=[]
  arr[0]=object['min'];
  arr[1]=object['max'];


var obj_array =this.state.obj_array;

var arr = {
  "$gt":arr[0],
  "$lt":arr[1]
}
var ytobj = {
  'youtube_subscribers':arr
}


for(var i=0;i<obj_array.length;i++){
  if(typeof obj_array[i]['youtube_subscribers'] !== "undefined"){
    //pop obj 
   obj_array.splice(i,1);
   console.log(obj_array);
  }
}

  obj_array.push(ytobj)
  // var stateObj = this.state.obj_array
  // this.setState({obj_array:obj_array});
  console.log(this.state.obj_array);

this.setState({
obj_array:obj_array
})
console.log(obj_array)


};



handleInputChange(event){
  const target=event.target;
  const id=target.id;
  const value=target.value;
  console.log(value);
console.log(this.state.gender)

  this.setState({[id]:value}); 
  // if(id=="executor"){
  //   this.setState({[id]:value});
  // }

  if(id=='name'){
    var allname = []
    var valu = this.state.value
    for(var i = 0;i<valu.length;i++ ){
      allname.push(valu[i]['name'])
    }
    console.log(allname)
    this.setState({
      allname:allname
    })
  }

  
}

  handleOnChangeCommk= (object) =>{
    console.log(this.state.infCOomBool)

if(this.state.commfield=='select'){
      alert("Please select commercials from select commercials")
  }else{ 
  var self= this
  var arr=[]
  arr[0]=object['min'];
  arr[1]=object['max'];


var obj_array =this.state.obj_array;

var arr = {
  "$gt":arr[0],
  "$lt":arr[1]
}


for(var i=0;i<obj_array.length;i++){
  if(this.state.commfield=='yt_video'){
  if(typeof obj_array[i]['yt_video'] !== undefined){
    //pop obj 
   obj_array.splice(i,1);
   console.log(obj_array);
  }
}
if(this.state.commfield=='insta_video'){
  if(typeof obj_array[i]['insta_video'] !== undefined){
    //pop obj 
   obj_array.splice(i,1);
   console.log(obj_array);
  }
}
if(this.state.commfield=='insta_st'){
  if(typeof obj_array[i]['insta_st'] !== undefined){
    //pop obj 
   obj_array.splice(i,1);
   console.log(obj_array);
  }
}
if(this.state.commfield=='insta_static'){
  if(typeof obj_array[i]['insta_static'] !== undefined){
    //pop obj 
   obj_array.splice(i,1);
   console.log(obj_array);
  }
}
  // if(typeof obj_array[i]['insta_video'] !== undefined){
  //   //pop obj 
  //  obj_array.splice(i,1);
  //  console.log(obj_array);
  // }
  // if(typeof obj_array[i]['insta_st'] !== undefined){
  //   //pop obj 
  //  obj_array.splice(i,1);
  //  console.log(obj_array);
  // }
  // if(typeof obj_array[i]['insta_static'] !== undefined){
  //   //pop obj 
  //  obj_array.splice(i,1);
  //  console.log(obj_array);
  // }
}

var key = this.state.commfield;
var comm_obj = {};
comm_obj[key] = arr;
obj_array.push(comm_obj );
this.setState({
obj_array:obj_array
})
console.log(obj_array)
}
   
  };





  handleFilter(event){

 



    // var instagramFolBool= this.state.instagramFolBool;
    // console.log(instagramFolBool)
    // if(this.state.instagramFolBool==true){
    //   this.setState({hideInsta:true,hideYt:false,showcol:"1"})
    // }
    // if(this.state.instagramFolBool==false){
    //   this.setState({hideInsta:false,hideYt:false,showcol:"4"})
    // }
  
    // var youtubeSubsBool= this.state.youtubeSubsBool;
    // console.log(youtubeSubsBool)
    // if(this.state.youtubeSubsBool==true){
    //   this.setState({ hideYt:true,hideInsta:false, showcol:"3"})
    // }
    // if(this.state.youtubeSubsBool==false){
    //   this.setState({hideInsta:false,hideYt:false,showcol:"4"})
    // }
  
  
     var self = this;
    const {Selectedcategory ,obj_array, female, male, Instagram_follow,youtube_subs ,commercial_range, commfield } = this.state;
    // console.log(fields.length)
  
  if(obj_array.length==0){
    console.log("do nothing")
  }
  
    this.setState({
      show: false, 
      loader:true,
      Modal:false,
      newSheetTable:true,
    });
    var aarre = []
  //add the fields from selectedcategory array and set all the values to Up in the values array.
  for(var i=0;i<Selectedcategory.length;i++){
    var k = Selectedcategory[i]
    var key = k
    var obj = {}; 
    obj[key] = "Up"; 
    // var emptyobj = {
    //   "Selectedcategory[i]"   : "Up"
    // }
    aarre.push(obj)
    // fields.push(Selectedcategory[i]);
    // values.push("Up");
  }
  
  //now adding the male femel field
  if(male==true){
    var mal = {
      "Male" : "Up"
    }
    aarre.push(mal)
    
  }
  
  if(female==true){
    var femal = {
      "Female" : "Up"
    }
    aarre.push(femal)
    
  }
  
  //for instagram slider
  var instnYtDefalut = {
    max: 500000,
    min: 0
  
  }
  console.log(Instagram_follow)
  if(Instagram_follow['min']!==instnYtDefalut['min'] || Instagram_follow['max']!==instnYtDefalut['max'] ){
    var inst = {
      "insta_followers":{"$gt":Instagram_follow['min'],"$lt":Instagram_follow['max']}
    }
    aarre.push(inst)
  }
  
  if(youtube_subs['min']!==instnYtDefalut['min'] || youtube_subs['max']!==instnYtDefalut['max'] ){
    var inst = {
      "youtube_subscribers":{"$gt":youtube_subs['min'],"$lt":youtube_subs['max']}
    }
    
    aarre.push(inst)
  }
  
  // for commercial
  var coomvale= {
    min: 0,
    max: 80000,
  }
  if(commercial_range['min']!==coomvale['min'] || commercial_range['max']!==coomvale['max'] ){
    // var k = commfield
    // var obj = {}; 
    // obj[k] =  {"$gt":commercial_range['min'],"$lt":commercial_range['max']}
    // aarre.push(obj)
  
    if(commfield=="yt_video"){
    var inst = {
      "yt_video":{"$gt":commercial_range['min'],"$lt":commercial_range['max']}
    }
    aarre.push(inst)
  }
  
  if(commfield=="insta_st"){
    var inst = {
      "insta_st":{"$gt":commercial_range['min'],"$lt":commercial_range['max']}
    }
    aarre.push(inst)
  }
  
  
  if(commfield=="insta_static"){
    var inst = {
      "insta_static":{"$gt":commercial_range['min'],"$lt":commercial_range['max']}
    }
    aarre.push(inst)
  }
  
  if(commfield=="insta_video"){
    var inst = {
      "insta_video":{"$gt":commercial_range['min'],"$lt":commercial_range['max']}
    }
    aarre.push(inst)
  }
  
  // aarre.push(commercial_range)
    
  }
  
  
  this.setState({obj_array:aarre})
  console.log("Yo Here")
  console.log(aarre)
  
  var self =this
  var data = JSON.stringify(aarre);
  
  //filter api call 
  axios
  .get("/api/influencers/get_influencers_filtered", { params: { obj_array: data } })
  .then(function (response) {
    var value_arr = response.data;
    console.log(response);
    console.log(value_arr);
    aarre = []
  
    var finalObj = []
  
    var rowPresent = self.state.selected_row
    console.log(rowPresent)
    for(var k = 0 ; k<rowPresent.length;k++){
      var g = rowPresent[k]
      finalObj.push(g)
    }
   
    for(var i=0;i<value_arr.length;i++){
  
      value_arr[i]['checked']=false;
  
      // var name=value_arr[i]["name"];
      value_arr[i].deleverables =[]
      if(value_arr[i]['Male']=="Up"){
      value_arr[i]['gender']="Male"
      }
      if(value_arr[i]['Female']=="Up"){
        value_arr[i]['gender']="Female"
        }
      
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
      }
      if(value_arr[i]['insta_static']!=''|| value_arr[i]['insta_static']!='0.0'){
      
        if(value_arr[i]['insta_static']==undefined){
          value_arr[i]['insta_static']=null;
        }
        else{
          value_arr[i]['insta_static']=numeral(value_arr[i]['insta_static']).value();
      
      
        }
        }
      if(value_arr[i]['insta_video']!=''|| value_arr[i]['insta_video']!='0.0'){
      
        if(value_arr[i]['insta_video']==undefined){
          value_arr[i]['insta_video']=null;
        }
        else{
          value_arr[i]['insta_video']=numeral(value_arr[i]['insta_video']).value();
      
      
        }        
          }  
      if(value_arr[i]['yt_video']!=''|| value_arr[i]['yt_video']!='0.0'){
      
        
      
        if(value_arr[i]['yt_video']==undefined){
          value_arr[i]['yt_video']=null;
        }
        else{
          value_arr[i]['yt_video']=numeral(value_arr[i]['yt_video']).value();
      
      
        }
      
        }
        var khn= value_arr[i]['avg_yt_views']
        var asdf =formatCash(khn)
        value_arr[i]['avg_yt_views'] = asdf
  
        finalObj.push(value_arr[i])
      } 
  // console.log(finalObj)
  
  function removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};
  
    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }
  
    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
  }
  
  var uniqueArray = removeDuplicates(finalObj, "name");
  
  console.log("uniqueArray is: " + JSON.stringify(uniqueArray));
  
  
    self.setState({ loader: false, value: uniqueArray , obj_array: [] });
  })
  .catch(function (error) {
    console.log(error);
  });
   
  }

resetFilter = (event) =>{
console.log("reset button clicked")
var test = this.state.test
 this.setState(
   { value: test,
    obj_array:[],
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
     infCOomBool:true,
     commercial_range:{
             min: 0,
             max: 80000,
           },
           Selectedcategory: [],
           commfield:"select",
           show:false,
           Modal:false,
           newSheetTable:true
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
// onChangeCommDisable = (object) =>{
//   //first get the id as a state and that way we can have same function for all onchange 
//   // i have tried to slice the value from array

  
//   //var val = event.target.value;
//   var self= this
//   var arr=[]
//   var field=this.state.commfield;
//   console.log(field);
//   var self =this;
//     console.log(object['max']);

//   var arr=[]
//   arr[0]=object['min'];
//   arr[1]=object['max'];
//   var k = 0;
//   var f=0;
//   for(var i=0;i<this.state.fields.length;i++){
//     if(this.state.fields[i]=='insta_static'||this.state.fields[i]=='yt_video'||this.state.fields[i]=='insta_story'||this.state.fields[i]=='insta_video'){

//      //pop both 
//      //this.state.fields.splice(i,1);
//      //set the new value
   
//       this.state.fields.splice(i,1);
//     this.state.values.splice(i,1);

//     }
//   }
//       this.setState({infCOomBool:!this.state.infCOomBool})
  
//   }


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


deatisltableclick(fieldValue, row, rowIdx, colIdx) {

  if(row.checked==true){
    console.log(row)
    console.log(row.checked)
    return 'my-selection-custom';
  }

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
    this.setState({commfield:event.target.value , infCOomBool:false});
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

//this call is initiated when commercials are updated to update values
updateOnCommercial = () => {
  console.log("Yo function is runnig")
  var self = this
  this.setState({
    loader:true
  })
  axios.get("/api/influencers/get_influencers").then(function(response){
      
    var value_arr=response.data;
    console.log(value_arr);

     for(var i=0;i<value_arr.length;i++){
      value_arr[i]['checked']=false;
// var name=value_arr[i]["name"];
value_arr[i].deleverables =[]
if(value_arr[i]['Male']=="Up"){
value_arr[i]['gender']="Male"
}
if(value_arr[i]['Female']=="Up"){
  value_arr[i]['gender']="Female"
  }

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
}
if(value_arr[i]['insta_static']!=''|| value_arr[i]['insta_static']!='0.0'){

  if(value_arr[i]['insta_static']==undefined){
    value_arr[i]['insta_static']=null;
  }
  else{
    value_arr[i]['insta_static']=numeral(value_arr[i]['insta_static']).value();


  }
  }
if(value_arr[i]['insta_video']!=''|| value_arr[i]['insta_video']!='0.0'){

  if(value_arr[i]['insta_video']==undefined){
    value_arr[i]['insta_video']=null;
  }
  else{
    value_arr[i]['insta_video']=numeral(value_arr[i]['insta_video']).value();


  }        
    }  
if(value_arr[i]['yt_video']!=''|| value_arr[i]['yt_video']!='0.0'){

  

  if(value_arr[i]['yt_video']==undefined){
    value_arr[i]['yt_video']=null;
  }
  else{
    value_arr[i]['yt_video']=numeral(value_arr[i]['yt_video']).value();


  }

  }

  if(value_arr[i]['avg_yt_views']!=''|| value_arr[i]['avg_yt_views']!='0.0'){

    if(value_arr[i]['avg_yt_views']==undefined){
      value_arr[i]['avg_yt_views']=null;
    }
    else{
      value_arr[i]['avg_yt_views']=numeral(value_arr[i]['avg_yt_views']).value();


    }

    }
} 
    self.setState({value:value_arr, loader:false});
    
    })
  .catch(function (error) {
    console.log(error);
    });


}


  afterSaveCell= (row, cellName, cellValue) => {
// console.log(row)
var n = parseInt(cellValue)
console.log("yo  "+typeof n+ n)
if(n==NaN){
  var cell_value = 0
}else{
  var cell_value = n
}
console.log(cell_value)
if(cell_value>0){
  var cell_value = parseInt(cellValue)
  console.log(cellValue + "type is "+ typeof cellValue)
  console.log(cell_value + "type is "+ typeof cell_value)
  
  console.log("after edit" + " "+ cellName)
  console.log("after edit" + " "+ cellValue)
  // console.log(row.yt_video)
  
  this.setState({enteredValue:true})
  // i have taken the cell value and cellname 
  //according to cell name i have selected the commercial and subtracted with brand value
  var correspondingCell;
  
  // if(cellName=="brand_tiktok_video"){
  // var correspondingCell = row.tiktok_video
  // }
  // var insta_video = row.brand_insta_video;
  // var insta_story = row.brand_insta_story;
  // var insta_static = row.brand_insta_static;
  // var youtube_video = row.brand_youtube_video;
  // console.log("See Here!!!!!!")
  // console.log(row.brand_insta_video)
  // console.log(insta_video)
  // console.log(typeof insta_video)
  
  //for showing deleverables with cost
  // var deleverables = row.deleverables_brand
  
  // var arr = row.deleverables
  
  // if(row.brand_insta_video==undefined){
  //   insta_video = 0
  // }
  // if(row.brand_insta_story==undefined){
  //   insta_story = 0
  // }
  // if(row.brand_insta_static==undefined){
  //   insta_static = 0
  // }
  // if(row.brand_youtube_video==undefined){
  //   youtube_video = 0
  // }
  
  // if( cellName=="brand_insta_video"){
  //   if(cell_value!==NaN){
  // var complete_brand = (parseInt(insta_story)) + (parseInt(insta_static)) + (parseInt(youtube_video))
  
  //   }
  //   }
  // if( cellName=="brand_insta_story"){
  //   if(cell_value!==NaN){
  // var complete_brand = (parseInt(insta_video)) +  (parseInt(insta_static)) + (parseInt(youtube_video))
  
  //   }
  //   }
  // if( cellName=="brand_insta_static"){
  //   if(cell_value!==NaN){
  // var complete_brand = (parseInt(insta_video)) + (parseInt(insta_story))  (parseInt(youtube_video))
  
  //   }
  //   }
  // if( cellName=="brand_youtube_video"){
  //   if(cell_value!==NaN){
  // var complete_brand = (parseInt(insta_video)) + (parseInt(insta_story)) + (parseInt(insta_static))
  
  //   }
  //   }
  
  
  // console.log(complete_brand)
  // console.log(typeof complete_brand)
  
  if(cellName=="brand_insta_video"){
    var correspondingCell = row.insta_video
    // row.deleverables= "Instagram Video";
      // arr.push("Instagram Video")
      // row.deleverables = arr
    
  
  
  
    //for instaonly
    // this.setState({
    //   ins:true
    // })
  
    // row.brand_total_cost = null + (parseInt(cellValue));
  
    //for brand cost of influecer
    // console.log(complete_brand)
    // if(cell_value!==NaN){
    //   row.brand_total_cost = complete_brand + (parseInt(cellValue));
    // }
  
    //for commercial cost of influencer
   
    //for Agency of influencer
    row.agency_total_fee= row.brand_total_cost - (parseInt(row.commercial_cost))
  }if(cellName=="brand_insta_static"){
    var correspondingCell = row.insta_static
    // row.deleverables= "Instagram Static";
  
      // arr.push("Instagram Static")
      // row.deleverables = arr
    
  
    // row.deleverables_brand = "Instagram Static";
  
      //for instaonly
    // this.setState({
    //   ins:true
    // })
     //for brand cost of influecer
    // row.brand_total_cost = null + (parseInt(cellValue));
    //for commercial cost of influence
    // row.commercial_cost =this.state.total_num + (parseInt(row.insta_static)) ;
     //for Agency of influencer
    // row.agency_total_fee= row.brand_total_cost - (parseInt(row.commercial_cost))
  
  }if(cellName=="brand_insta_story"){
    var correspondingCell = row.insta_st
  
    // row.deleverables= "Instagram Story"
     
      // arr.push("Instagram Story")
      // row.deleverables = arr
    
    // row.deleverables_brand = "Instagram Story";
  
      //for instaonly
    // this.setState({
    //   ins:true
    // })
  
    // console.log(complete_brand)
    // if(cell_value!==NaN){
    //   row.brand_total_cost = complete_brand + (parseInt(cellValue));
    // }
     //for brand cost of influecer
    //  row.brand_total_cost = null + (parseInt(cellValue));
    //for commercial cost of influencer
    // row.commercial_cost =this.state.total_num + (parseInt(row.insta_st)) ;
     //for Agency of influencer
    // row.agency_total_fee= row.brand_total_cost - (parseInt(row.commercial_cost))
  
  
  }if(cellName=="brand_youtube_video"){
    var correspondingCell = row.yt_video;
    // row.deleverables="Youtube Video"
  
      // var val= "Youtube Video";
      // arr.push("Youtube Video")
      // row.deleverables = arr
    
    // row.deleverables_brand = "Youtube Video";
  
  
     //for instaonly
    // this.setState({
    //   yt:true
    // })
     //for brand cost of influecer
    //  row.brand_total_cost = null + (parseInt(cellValue));
    //for commercial cost of influencer
    // row.commercial_cost =this.state.total_num + (parseInt(row.yt_video)) ;
     //for Agency of influencer
    // row.agency_total_fee= row.brand_total_cost - (parseInt(row.commercial_cost))
    // console.log(complete_brand)
    // if(cell_value!==NaN){
    //   row.brand_total_cost = complete_brand + (parseInt(cellValue));
    // }
  
    // console.log(row.brand_total_cost)
    
  }
  
  // console.log(row.deleverables_brand)
  console.log(row.deleverables)
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
  
  // var value= this.state.value
  // var to_cost
  // for(var i=0 ; i<value.length;i++){
  //   if(value[i]['checked']==true){
  //     console.log(value[i])
  //     var br_yt = parseInt(value[i]['brand_youtube_video'])
  //     var br_instor = parseInt(value[i]['brand_insta_story'])
  //     var br_inssta = parseInt(value[i]['brand_insta_static'])
  //     var br_insvide = parseInt(value[i]['brand_insta_video'])
  
  //     if( isNaN(br_yt)==true){
  //       br_yt=0;  
      
  //   } if( isNaN(br_instor)==true){
  //       br_instor=0;  
       
  //   } if( isNaN(br_inssta)==true){
  //       br_inssta=0;  
       
  //   } if( isNaN(br_insvide)==true){
  //       br_insvide=0;  
       
  //   }
  
  //   to_cost = br_yt + br_instor + br_inssta +br_insvide
  
  //   }
  // }
  
  // console.log(to_cost)
  if(cellValue!==""){
  
    if(cellName !== CellNM){
    var totalCost = this.state.total_cost + (parseInt(cellValue))
    // console.log(totalCost)
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
}


  beforeSaveCell = (row, cellName, cellValue) => {
console.log(row.isChecked)


var n = parseInt(cellValue)
console.log("yo  "+typeof n+ n)


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
       if(Cell!==undefined && Cell!==''){  
         var Calculate = this.state.total_cost - (parseInt(Cell))
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


        if(Cell!==undefined && Cell!==''){  //now the corresponding value is given by the if condition 
var monkFee = (parseInt(Cell)) - (parseInt(correspondingCell))
console.log(monkFee)
//each time new value is reduce from the correspondingCell so i have to take care of existing total of monk cost
var mymonkfee = this.state.monk_fee - (parseInt(monkFee))
 this.setState({monk_fee:mymonkfee})}

  }




  } 
  
  openedit(size) {
    this.setState({
      size,
      showModal3: true
    });
  }
  
  closeedit() {
    this.setState({
      showModal3: false
    });
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

  // function(onRowClick){
  //   console.log(e)
  //   console.log(row)
  //   if(row==0){
  //     this.setState({
  //       open:true
  //     })

  //   }
  //   console.log(rowIndex)
  // }

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
      <button style={{background:"white !important"}} className="add_influencer " onClick={ onClick }><i class="fa fa-trash white_mine1"></i></button>
    );
  }
  handleDeleteRow(row) {
    this.props.deleteAction(row);
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
      url: "/api/influencers/insert_influencer",
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

  enterNameFilter(e){
    console.log("yo filter is working")
    this.setState({ searchfield: e.target.value})
  }

  createCustomInsertButton = (onClick) => {
    return (
      <input placeholder="Enter name" onChange={this.enterNameFilter} />
    );
  }

  render() {
    const { user } = this.props.auth;
    const krishna = user.name
    // console.log(krishna)

    const { value } = this.state;
    // var option = {
    //   'justification':'C',
    //   'locales':'en-AU',
    //   'currency':false,
    //   //'currencyIndicator':'AUD',
    //   'percentage':false,
    //   'precision':1,
    //   'wholenumber':null,
    //   'commafy':true,
    //   'shortFormat':true, 
    //   'shortFormatMinValue': 1000,
    //   'shortFormatPrecision': 1,
    //   'title':true
    // };


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
       className: 'my-selection-custom'
    };
    //this if for the Details table
    // const selectRowIndetails = {
    //   mode: 'checkbox',  // multi select
    //   onSelect: this.handleRowSelect,
    //   selected: this.state.krishna,
    //    className: 'my-selection-custom'
    // };
    const YtVideo = (onUpdate, props, ) => (<YtVideoCommEditor user={krishna} updateOnCommercial={this.updateOnCommercial} onUpdate={ onUpdate } {...props}/>);
    const InstaStory = (onUpdate, props, ) => (<InstaStoryCommEditor user={krishna} onUpdate={ onUpdate } {...props}/>);
    const InstaStaticPst = (onUpdate, props, ) => (<InstaStaticPstCommEditor user={krishna} onUpdate={ onUpdate } {...props}/>);
    const InstaVideoPost = (onUpdate, props, ) => (<InstaVideoPostCommEditor user={krishna} onUpdate={ onUpdate } {...props}/>);

    const simplecelledit = (onUpdate, props, ) => (<SimpleCellEdit onUpdate={ onUpdate } {...props}/>);
    
    // csvData={this.state.selected_row} file_name={this.state.campaign_name}
    const {selected_row,ins,yt, show_ins_st,show_ins_stat,show_ins_vide,show_ytVid, youtubeonly ,AllBrandArray, instaonly,onlyonePresent ,new_brand_name,new_brand,n,brand_name,campaign_name,executor,campaign_desc,campaign_date,campaign_Date,total_cost,monk_fee,campaign_status,campaign_owner,Selectedcategory,person_in,contact_no,email} = this.state;
    const csvData = {selected_row ,ins,yt, show_ins_st,show_ins_stat,show_ins_vide,show_ytVid,  youtubeonly ,AllBrandArray, instaonly,onlyonePresent ,new_brand_name,new_brand,n,brand_name,campaign_name,executor,campaign_desc,campaign_date,campaign_Date,total_cost,monk_fee,campaign_status,campaign_owner,selected_row,Selectedcategory,person_in,contact_no,email}
  
    const options = {
      insertBtn: this.nameSearchfield
    };

const filteredArr = this.state.value.filter(value=>{
  return value.name.toLowerCase().includes(this.state.searchfield.toLowerCase());

})
    return (

      <div className='control-pane1212'>




 {   this.state.onSubmit && 
  <div>
 <Button  className="back-button1"  onClick={() => this.setState({onSubmit:!this.state.onSubmit ,newSheetTable:true})}><i class="fa fa-angle-left size-2"></i></Button>

<div>
<div >
         <div style={{padding: "0px 22% 0 3%"}}>
        <div className="hoho">





<h3 className="hey2rem">Campaign Form</h3>

</div>


</div>

 

    <div className="some-bib" > 
    <form class="col s12" style={{marginTop:"2%"}} onSubmit={this.handleCampaignSubmit}>
    <div className="form-sizeh" > 

    <Row className="form1 yo-hmt">
      <Col lg={2} md={3} sm={12} xs={12}>
          <h4 className="font2">Brand Name:</h4>
        </Col>
        <Col lg={3} md={3} sm={8} xs={8}>
        
         {this.state.show_add && <input id="new_brand" className="enter_brand" required={true} value={this.state.new_brand} onChange={this.handleCampainChange2}/> }
         { this.state.show_cancel && <select className="browser-default" id="brand_name" required={true} onChange={this.handleCampainChange}  >  
         {
           this.state.brand_nameNull ?  <option value="" disabled selected>Brand Name</option> : <option value={this.state.brand_name} disabled selected>{this.state.brand_name}</option>
         }
          
        
          {this.state.bran.map(brand=>
           <option value={brand} key={brand}>{brand}</option>
          )}
           <option value="enter" key="enter">

          </option> 
          </select>
          }
          
            </Col>
        <Col lg={1} md={1} sm={4} xs={4}>

          {this.state.show_cancel && <i  onClick={() =>this.setState({show_add:true, show_cancel:false,campaign_name:''})} class="fa fa-plus icon-kj" aria-hidden="true"></i>}
        {this.state.show_add &&   <i onClick={() =>this.setState({show_add:false, show_cancel:true})} class="fa fa-remove  icon-kj" aria-hidden="true"></i>}
     
        </Col>

        <Col lg={2} md={3} sm={12} xs={12} >
          <h4 className="font2 asdf">Date:</h4>
        </Col>
        <Col lg={4} md={3} sm={12} xs={12} style={{margin: "-0.8em 0 0"}}>
  
  <DateRangePicker
  startDate={this.state.startDate} // momentPropTypes.momentObj or null,
  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
  endDate={this.state.endDate} // momentPropTypes.momentObj or null,
  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
  onDatesChange={this.onDatesChange}
  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
  onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
  displayFormat={() => "DD/MM/YYYY" }
/>
          </Col>

      </Row>
      <Row className="yo-hmt">
      <Col lg={2} md={2} sm={12} xs={12}>
          <h4 className="font2 asdf">Campaign Name:</h4>
        </Col>
        <Col lg={4} md={4} sm={12} xs={12}>
        
        <input id="campaign_name" type="text" class="validate-kris" required={true}  value={this.state.campaign_name} onChange={this.handleCampainChange}  />
     
        </Col>

        <Col lg={2} md={2} sm={12} xs={12}>
          <h4 className="font2 asdf">Campaign Details:</h4>
        </Col>
        <Col lg={4} md={4} sm={12} xs={12}>
        <input id="campaign_desc" type="text" class="validate-kris" required value={this.state.campaign_desc}  onChange={this.handleInputChange} />
      
          </Col>

      </Row>

      <Row className="yo-hmt">
      <Col lg={2} md={2} sm={12} xs={12}>
          <h4 className="font2 asdf">Total Cost:</h4>
        </Col>
        <Col lg={4} md={4} sm={12} xs={12}>
        <NumberFormat id="total_cost" class="validate-kris" thousandSeparator={true} readOnly required value={this.state.total_cost} onChange={this.handleInputChange} prefix={'₹'} />
        {/* <input id="total_cost" readOnly type="number" class="validate-kris" required value={this.state.total_cost} onChange={this.handleInputChange} /> */}
     
        </Col>

        <Col lg={2} md={2} sm={12} xs={12}>
          <h4 className="font2 asdf">Agency Fee:</h4>
        </Col>
        <Col lg={4} md={4} sm={12} xs={12}>
        <NumberFormat thousandSeparator={true} id="monk_fee" readOnly  class="validate-kris" value={this.state.monk_fee}  onChange={this.handleInputChange}   prefix={'₹'} />
        
  
          </Col>

      </Row>

      <Row className="yo-hmt" >
        <Col lg={2} md={2} sm={12} xs={12}>
          <h4 className="font2 asdf">Total Influencers:</h4>
        </Col>

 
   
          <Col lg={4} md={4} sm={6} xs={6}>

         <input id="count" readOnly  type="number" value={this.state.count} onChange={this.handleInputChange} className="validate-kris"   />
          
      
      
        </Col>
        <Col lg={2} md={2} sm={12} xs={12}>
      <h4 className="font2 asdf">Person in charge:</h4>
         </Col>
         <Col lg={4} md={4} sm={12} xs={12}>
         <input id="person_in" type="text" value={this.state.person_in} onChange={this.handleInputChange} className="validate-kris"   />
            </Col>
 
          </Row>
 
      <Row className="yo-hmt" style={{    paddingBottom: "0.5em"}}>
        <Col lg={2} md={2} sm={12} xs={12}>
          <h4 className="font2 asdf">Status:</h4>
        </Col>

        <Col lg={4} md={4} sm={12} xs={12}>
        <ItemList
            options={this.state.options}
            campaign_status={this.state.campaign_status}
            toggleCheckbox={(e) => this.toggleCheckbox(e)} />
            </Col>
        <Col lg={2} md={2} sm={12} xs={12}>
          <h4 className="font2 asdf">Contact:</h4>
        </Col>

        <Col lg={4} md={4} sm={12} xs={12}>
        <input id="contact_no" type="number" value={this.state.contact_no} onChange={this.handleInputChange} className="validate-kris"   />
            </Col>
            </Row>

            <Row>
            <Col lg={6} md={6} sm={12} xs={12}>
     
         </Col>
      <Col lg={2} md={2} sm={12} xs={12}>
      <h4 className="font2 asdf">Email:</h4>
         </Col>
         <Col lg={4} md={4} sm={12} xs={12}>
         <input id="email" type="email" value={this.state.email} onChange={this.handleInputChange} className="validate-kris"   />
            </Col>
            </Row>

</div>
<div id="outer12" style={{    padding: "3em 2em 4em"}}>
  <div class="inner12 cp0"><Button type="submit" value="Save" className="my-buttoninform1 " >Save</Button></div>

  {/* <div class="inner12 cp0"><Exportxlsx passedFunction={this.passedFunction} csvData={csvData}  submit={this.state.submite_is_done} /></div> */}
  <div class="inner12 cp0"><Exportxlsx csvData={csvData}  fileName={this.state.campaign_name}/></div>

  <div class="inner12 cp0"><ExportPdf csvData={csvData} passedFunction={this.passedFunction} submit={this.state.submite_is_done}  /></div>
</div>

      </form>
      </div>

    </div>
</div>

 </div> 
 
  }

  { this.state.newSheetTable &&
 <div>

<div >

      

<div className="filter-icos jst-size" >
<span className=" ktl filter-colr" >Total : {this.state.count} </span>

    <span className=" ktl filter-colr" >Total Cost: <NumberFormat displayType={'text'} thousandSeparator={true} value={this.state.total_cost}  /> INR</span>      

    <span className=" ktl filter-colr" >Agency Fee: <NumberFormat displayType={'text'} thousandSeparator={true} value={this.state.monk_fee}   /> INR</span> 
    <span className=" ktl filter-colr" onClick={() => this.open('lg')} style={{cursor:"pointer"}}> <i class="fa fa-filter" style={{fontSize: "23px"}} aria-hidden="true"></i>Filter</span> 
    <span style={{paddingRight:"0.4em"}} className="ktl filter-colr">Sort By:</span> 
<Radio.Group  defaultValue={this.state.toggle} buttonStyle="solid" onChange={this.onChangetoggle}>
      <Radio.Button onClick={() => this.setState({hideInsta:false,hideYt:false,  youtubeonly:true, instaonly:true,sh_on_yt:true,dnt_sh_btn:true,ytsize:false})} value="1">All</Radio.Button>
      <Radio.Button onClick={() => this.setState({hideInsta:true,hideYt:false, youtubeonly:true, instaonly:false, sh_on_yt:false,dnt_sh_btn:false, ytsize:true })} value="2">Youtube</Radio.Button>
      <Radio.Button onClick={() => this.setState({hideYt:true,hideInsta:false,  youtubeonly:false, instaonly:true, sh_on_yt:true,dnt_sh_btn:true, ytsize:false })} value="3">Instagram</Radio.Button>
</Radio.Group>

<span className="display-butt">
  <span class="inner12"><Button className="waves-effect waves-light  add_influencer1" style={{ boxShadow:"none"}} onClick={() => this.openNewInf('sm')}><i class="fa fa-plus white_mine" aria-hidden="true"></i> Influencer</Button></span>
  <span class="inner12"> <Button className="waves-effect waves-light  my-buttoninform" style={{textTransform:"capitalize", boxShadow:"none"}} type="submit" name="action"  onClick={this.handleSubmit}>Submit</Button></span>
  <span class="inner12"> <img onClick={this.toggleDialog} src={DeleteIcon} style={{height: "2.5em", cursor:"pointer",marginLeft: "-0.4em"}}  className='home__icon '/></span>
</span> 
</div>
   
   </div>

    <ButtonToolbar>
      <button className="op1  " onClick={this.toggleDrawer}><i class="fa fa-angle-left size-1 custom_ico"></i></button>	   
    </ButtonToolbar>
    <ButtonToolbar>
      <button style={{margin: "7.2em 0px"}} className="op1 " onClick={this.toggleDrawer_2}><i class="fa fa-angle-left size-1 custom_ico"></i></button>	   
    </ButtonToolbar>

          <ScrollSync>
<div className="Dashpa" style={{ display: 'flex', position: 'relative', height: "inherit" }}>
  <ScrollSyncPane>
    <div className={this.state.loader ? "ksadk opacit" :"ksadk" } style={{overflowY: 'auto'}} ref={(el) => { this.messagesContainer = el; }}>
      <section className={this.state.ytsize ? "Main-Tableclass  youtubeonly" : "Main-Tableclass"}>
        <span><input placeholder="Enter name" className="name-searchfield" onChange={this.enterNameFilter} /></span>
      <BootstrapTable data={ filteredArr }
        selectRow={ selectRow }
        tableHeaderClass='my-custom-class1'
        cellEdit={ cellEditProp } 
        // insertRow
        // options={options}
        // deleteRow={ true } options={ options }
        // insertRow={ true } options={ options }

        >
        <TableHeaderColumn row='0'   rowSpan='1'   width='14em' dataAlign='center'  className={ this.customHeaderClass }   headerAlign='justify' thStyle={ {"fontSize": "20px", "borderBottomColor": "#fff", "fontWeight": "700",'background': '#fff',  borderRight: "13px solid #F6F3F8"} }    >Name</TableHeaderColumn>

        <TableHeaderColumn row='1'  rowSpan='2'    width='14em' dataAlign='center' isKey={ true } onClick={()=>this.setState({opne:true})} 
        ref='titleCol'  
        // filter={ { type: 'CustomFilter', getElement: getCustomFilter } }
        // filter={ { type: 'TextFilter', delay: 200, placeholder: 'Enter name' } } 
        className={ this.customHeaderClass } columnClassName={ this.columnClassNameFormat } dataField='name'   headerAlign='justify' thStyle={ {'background': '#fff',"fontWeight": "00",  borderRight: "13px solid #F6F3F8 !important", color:"#fff"} }    >name</TableHeaderColumn>

        <TableHeaderColumn row='0' colSpan='4'  hidden={this.state.hideYt} thStyle={ { 'background': '#FFF8F9', "color":"#821F3A","fontSize": "20px", "borderBottomColor": "#FFF8F9", "fontWeight": "700",  borderRight: "13px solid #F6F3F8"} }  headerAlign='justify'>Youtube</TableHeaderColumn>

        <TableHeaderColumn row='1' colSpan='2' hidden={this.state.hideYt}    width='7.4em' thStyle={ { 'background': '#FFF8F9', "color":"#821F3A","fontSize": "0.9em" , "borderRightColor": "#FFF8F9",  "borderLeftColor": "#FFF8F9" , borderBottom: "0px"} }    headerAlign='center' ></TableHeaderColumn>

       

        {/* <TableHeaderColumn row='1' dataField='youtube_views'  dataAlign='center'  thStyle={ { 'background': '#f4cccc' } } headerAlign='center' >Youtube Views</TableHeaderColumn> */}
        <TableHeaderColumn row='2'  hidden={this.state.hideYt} dataField='youtube_subscribers' editable={ false } dataAlign='center' columnClassName={ this.Yotube_subs }  width='7.4em' thStyle={ { 'background': '#FFF8F9', "color":"#821F3A","fontSize": "0.9em" , "borderRightColor": "#FFF8F9","fontWeight": "600",  "borderTopColor": "#FFF8F9", "borderLeftColor": "#FFF8F9"} }    headerAlign='center' >Subscriber</TableHeaderColumn>
        <TableHeaderColumn row='2'  hidden={this.state.hideYt} dataField='youtube' editable={ true }  dataAlign='center' columnClassName={ this.Yotube_subs } thStyle={ { 'background': '#FFF8F9', "color":"#821F3A","fontSize": "0.9em" , "borderRightColor": "#FFF8F9","fontWeight": "600",   "borderTopColor": "#FFF8F9", "borderLeftColor": "#FFF8F9"} } width='6em' dataFormat={ activeFormatter } headerAlign='center !important'>URL</TableHeaderColumn>

        <TableHeaderColumn row='1' colSpan='2' hidden={this.state.hideYt}   thStyle={ { 'background': '#FFF8F9' , "color":"#821F3A","fontSize": "1.04em", "borderRightColor": "#FFF8F9",  "borderLeftColor": "#FFF8F9" , borderBottomWidth: "0px" ,  borderRight: "13px solid #F6F3F8","fontWeight": "700"} } width='7.4em'  headerAlign='center' dataAlign='center'  >Video</TableHeaderColumn>

        <TableHeaderColumn row='2' dataField='yt_video' hidden={this.state.hideYt} columnTitle={ this.Ytvideo } columnClassName={ this.Yotube_influ } thStyle={ { 'background': '#FFF8F9' , "color":"#821F3A","fontSize": "0.9em", "borderRightColor": "#FFF8F9","fontWeight": "600",   "borderLeftColor": "#FFF8F9" ,borderTopColor: "rgb(255, 248, 249)"} } width='7.4em'  headerAlign='center' dataAlign='center'  customEditor={ { getElement: YtVideo } } dataFormat={this.priceFormatter} >Influencer ₹</TableHeaderColumn>

        <TableHeaderColumn row='2' dataField='brand_youtube_video' hidden={this.state.hideYt} editable={ true } columnClassName={ this.Yotube_brand } thStyle={ { 'background': '#FFF8F9' , "color":"#821F3A","fontSize": "0.9em", "borderRightColor": "#FFF8F9","fontWeight": "600",   "borderLeftColor": "#FFF8F9",     borderRight: "13px solid #F6F3F8"} } width='5.8em' headerAlign='center' dataAlign='center' dataFormat={this.priceFormatter} customEditor={ { getElement: simplecelledit } }>Brand ₹</TableHeaderColumn>


        <TableHeaderColumn row='2'  hidden={true} dataField='com_agency' editable={ false } thStyle={ { 'background': 'rgb(242 235 247)', "color": "#540D6E","fontSize": "0.9em" , "borderRightColor": "#F6F3F8",  "borderLeftColor": "#F6F3F8" } } width='6em' headerAlign='center' 
        dataAlign='center' columnClassName={ this.insta_follo }>Company</TableHeaderColumn>
         <TableHeaderColumn row='2'  hidden={true} dataField='manager' editable={ false } thStyle={ { 'background': 'rgb(242 235 247)', "color": "#540D6E","fontSize": "0.9em" , "borderRightColor": "#F6F3F8",  "borderLeftColor": "#F6F3F8" } } width='6em' headerAlign='center' 
        dataAlign='center' columnClassName={ this.insta_follo }>Manager</TableHeaderColumn>
         <TableHeaderColumn row='2'  hidden={true} dataField='email_id' editable={ false } thStyle={ { 'background': 'rgb(242 235 247)', "color": "#540D6E","fontSize": "0.9em" , "borderRightColor": "#F6F3F8",  "borderLeftColor": "#F6F3F8" } } width='12em' headerAlign='center' 
        dataAlign='center' columnClassName={ this.insta_follo }>Email</TableHeaderColumn>
         <TableHeaderColumn row='2'  hidden={true} dataField='contact' editable={ false } thStyle={ { 'background': 'rgb(242 235 247)', "color": "#540D6E","fontSize": "0.9em" , "borderRightColor": "#F6F3F8",  "borderLeftColor": "#F6F3F8" } } width='10em' headerAlign='center' 
        dataAlign='center' columnClassName={ this.insta_follo }>Contact</TableHeaderColumn>
         <TableHeaderColumn row='2'  hidden={true} dataField='location' editable={ false } thStyle={ { 'background': 'rgb(242 235 247)', "color": "#540D6E","fontSize": "0.9em" , "borderRightColor": "#F6F3F8",  "borderLeftColor": "#F6F3F8" } } width='6em' headerAlign='center' 
        dataAlign='center' columnClassName={ this.insta_follo }>Location</TableHeaderColumn>

        {/* the hidden details for the youtube hide column */}
        <TableHeaderColumn row='0' colSpan='8'   dataAlign='center' hidden={this.state.hideInsta}  thStyle={ { 'background': "rgb(242 235 247)", "color" : "#540D6E","fontSize": "20px", "borderBottomColor": "#F6F3F8", "fontWeight": "700", "borderRightWidth": "0px",    borderColor: "rgb(242, 235, 247)" } } headerAlign='justify' >Instagram</TableHeaderColumn>
        <TableHeaderColumn row='1' colSpan='2'   dataAlign='center' hidden={this.state.hideInsta}  thStyle={ { 'background': "rgb(242 235 247)", "color" : "#540D6E","fontSize": "1em", "borderBottomColor": "#F6F3F8", "borderRightWidth": "0px",    borderColor: "rgb(242, 235, 247)" } } headerAlign='center' ></TableHeaderColumn>

        <TableHeaderColumn row='1' colSpan='3'   dataAlign='center' hidden={this.state.hideInsta}  thStyle={ { 'background': "rgb(242 235 247)", "color" : "#540D6E","fontSize": "1.04em", "borderBottomColor": "rgb(242 235 247)", "borderLeftWidth": "0px","fontWeight": "700" }} headerAlign='center' >Influencers ₹</TableHeaderColumn>
        <TableHeaderColumn row='1' colSpan='3'   dataAlign='center' hidden={this.state.hideInsta}  thStyle={ { 'background': "rgb(242 235 247)", "color" : "#540D6E","fontSize": "1.04em", "borderBottomColor": "rgb(242 235 247)",  "borderRightWidth": "0px","fontWeight": "700" } } headerAlign='center' >Brand ₹</TableHeaderColumn>

        <TableHeaderColumn row='2'  hidden={this.state.hideInsta} editable={ false } dataField='insta_followers'  thStyle={ { 'background': 'rgb(242 235 247)', "color": "#540D6E","fontSize": "0.9em" , "borderRightColor": "rgb(242 235 247)","fontWeight": "600",   "borderLeftColor": "#F6F3F8" } } width='6em' headerAlign='center' 
        dataAlign='center' columnClassName={ this.insta_follo }>Follower</TableHeaderColumn>
        {/* <TableHeaderColumn row='1' dataField='insta_media' dataAlign='center'  editable={ false } thStyle={ { 'background': '#fff2cd' } } headerAlign='center'>Instagram Media</TableHeaderColumn> */}
        <TableHeaderColumn row='2'  hidden={this.state.hideInsta} editable={ true } dataField='insta_url' id="autlink" dataAlign='center' editable={ false } thStyle={ { 'background': 'rgb(242 235 247)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600",  "borderRightColor": "rgb(242 235 247)",  "borderLeftColor": "#F6F3F8" } } columnClassName={ this.insta_whole } width='6em' dataFormat={ activeFormatter2 } headerAlign='center'>URL</TableHeaderColumn>

        {/* previous border radius  */}
      
        <TableHeaderColumn row='2' dataField='insta_st' dataAlign='center' hidden={this.state.hideInsta} columnTitle={ this.InstaStory }  thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em", "fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)",      } } className={ this.instaClass } columnClassName={ this.insta_whole } width='5em'  dataFormat={this.priceFormatter} headerAlign='center' customEditor={ { getElement: InstaStory } } >Story</TableHeaderColumn>
        <TableHeaderColumn row='2' dataField='insta_static' hidden={this.state.hideInsta} columnTitle={ this.InstaStaticPst } dataAlign='center' columnClassName={ this.insta_whole } width='5em' thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em", "fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)",     } } dataFormat={this.priceFormatter} headerAlign='center' customEditor={ { getElement: InstaStaticPst } }>Static</TableHeaderColumn>
        <TableHeaderColumn row='2' dataField='insta_video' hidden={this.state.hideInsta} dataAlign='center'columnTitle={ this.InstaVideoPost } columnClassName={ this.insta_whole } width='5em' thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em", "fontWeight": "600",  "borderLeftColor": "rgb(227 216 236)",     } } dataFormat={this.priceFormatter} headerAlign='center' customEditor={ { getElement: InstaVideoPost } }>Video</TableHeaderColumn>
        {/* <TableHeaderColumn row='2' dataField='insta_reel' hidden={this.state.hideInsta} dataAlign='center'columnTitle={ this.InstaVideoPost } columnClassName={ this.insta_whole } width='5em' thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em", "fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)",    } } dataFormat={this.priceFormatter} headerAlign='center' customEditor={ { getElement: InstaVideoPost } }>Reel</TableHeaderColumn> */}
        
        {/* hidden but neccessary */}
        <TableHeaderColumn row='2' dataField='brand_insta_story' hidden={this.state.hideInsta} dataAlign='center'   editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } } columnClassName={ this.insta_whole } width='5em' dataFormat={this.priceFormatter} customEditor={ { getElement: simplecelledit } } headerAlign='center'>Story</TableHeaderColumn>
        <TableHeaderColumn row='2' dataField='brand_insta_static' hidden={this.state.hideInsta} dataAlign='center' columnClassName={ this.insta_whole } width='5em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } } dataFormat={this.priceFormatter} customEditor={ { getElement: simplecelledit } } headerAlign='center'>Static</TableHeaderColumn>
        <TableHeaderColumn row='2' dataField='brand_insta_video' hidden={this.state.hideInsta} dataAlign='center' columnClassName={ this.insta_whole } width='5em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } } dataFormat={this.priceFormatter} customEditor={ { getElement: simplecelledit } } headerAlign='center'>Video</TableHeaderColumn>


        <TableHeaderColumn row='2' dataField='brand_total_cost' hidden={true} dataAlign='center' columnClassName={ this.insta_whole } width='5em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } } dataFormat={this.priceFormatter} headerAlign='center'>Total Brand Cost</TableHeaderColumn>

        <TableHeaderColumn row='2' dataField='commercial_cost' hidden={true} dataAlign='center' columnClassName={ this.insta_whole } width='5em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } } dataFormat={this.priceFormatter} headerAlign='center'>Corresponding Commercial</TableHeaderColumn>

        <TableHeaderColumn row='2' dataField='agency_total_fee' hidden={true} dataAlign='center' columnClassName={ this.insta_whole } width='5em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } } dataFormat={this.priceFormatter} headerAlign='center'>Agency Fee</TableHeaderColumn>

        <TableHeaderColumn row='2' dataField='deleverables_brand' hidden={true} dataAlign='center' columnClassName={ this.insta_whole } width='5em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } } dataFormat={this.priceFormatter} headerAlign='center'>Deleverables</TableHeaderColumn>

        {/* for showing instaonly and youtube */}
        <TableHeaderColumn row='2' dataField='only_insta' hidden={true} dataAlign='center' columnClassName={ this.insta_whole } width='5em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } } dataFormat={this.priceFormatter} headerAlign='center'>onlyInstqa</TableHeaderColumn>
        <TableHeaderColumn row='2' dataField='only_yt' hidden={true} dataAlign='center' columnClassName={ this.insta_whole } width='5em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } } dataFormat={this.priceFormatter} headerAlign='center'>Deleverables</TableHeaderColumn>

          {/* for showing instaURL and YtURl details */}
          <TableHeaderColumn row='2' dataField='ytlinks' hidden={true} dataAlign='center' columnClassName={ this.insta_whole } width='5em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } } dataFormat={this.priceFormatter} headerAlign='center'>ytlinks</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='yt_likes' hidden={true} dataAlign='center' columnClassName={ this.insta_whole } width='5em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } } dataFormat={this.priceFormatter} headerAlign='center'>Youtube Likes</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='yt_views' hidden={true} dataAlign='center' columnClassName={ this.insta_whole } width='5em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } } dataFormat={this.priceFormatter} headerAlign='center'>Youtube views</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='yt_comments' hidden={true} dataAlign='center' columnClassName={ this.insta_whole } width='5em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } } dataFormat={this.priceFormatter} headerAlign='center'>Youtube comments</TableHeaderColumn>


          <TableHeaderColumn row='2' dataField='intalinks' hidden={true} dataAlign='center' columnClassName={ this.insta_whole } width='5em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } } dataFormat={this.priceFormatter} headerAlign='center'>intalinks</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='insta_like' hidden={true} dataAlign='center' columnClassName={ this.insta_whole } width='5em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } } dataFormat={this.priceFormatter} headerAlign='center'>instagram Post Like</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='insta_comment' hidden={true} dataAlign='center' columnClassName={ this.insta_whole } width='5em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } } dataFormat={this.priceFormatter} headerAlign='center'>instagram Post comment</TableHeaderColumn>
          <TableHeaderColumn row='2' dataField='insta_view' hidden={true} dataAlign='center' columnClassName={ this.insta_whole } width='5em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } } dataFormat={this.priceFormatter} headerAlign='center'>instagram Post views</TableHeaderColumn>


     
        </BootstrapTable>
        

        </section>
    </div>

  </ScrollSyncPane>
  <div className="first-drawer">
        <Drawer size=" details-tble" backdrop={true} show={this.state.show_d1} onHide={this.closekar}>
            {/* <Drawer.Header>
              <Drawer.Title>Drawer Title</Drawer.Title>
              <span onClick={this.closekar}>close</span>
            </Drawer.Header> */}
            <Drawer.Body>
      
              <div className="wrapp">
<div className="inn1">

 
            <button className="op1_ " onClick={this.closekar}><i class="fa fa-angle-right size-1 custom_ico"></i></button>	   
   
        
<button className="op1_1 " onClick={this.toggleDrawer_2}><i class="fa fa-angle-left size-1 custom_ico"></i></button>	   

</div>
<div className="inn2">
<div className="table-hei" style={{borderTop: "1.2em solid #F4F4F6"}}>
<ScrollSyncPane>
    <div style={{overflowY: 'auto'}}>
      <div className="nd-taable fpstuf">


      <BootstrapTable 
        data={ filteredArr }
        // selectRow={ selectRowIndetails }
        tableHeaderClass='my-details-table'
        tableBodyClass='my-details-table-body'
        cellEdit={ cellEditProp } 
        // deleteRow={ true } options={ options }
        // insertRow={ true } options={ options }
        // trStyle={rowStyleFormat}
        // options={ options }
        // height='68vh'

        >
        <TableHeaderColumn row='0'   rowSpan='1'  colSpan='7' dataAlign='center'    headerAlign='justify' thStyle={ {"fontSize": "20px", "fontWeight": "700",    color: "#2C3352" ,    background: "#F4F5F6"} }    >Details</TableHeaderColumn>
        <TableHeaderColumn row='0' dataField='name'  isKey={ true } dataAlign='center' hidden={true}    headerAlign='justify' thStyle={ {"fontSize": "20px", "fontWeight": "700",'background': '#fff'} }    >name</TableHeaderColumn>

      
          <TableHeaderColumn row='1' dataField='com_agency'   dataAlign='center' columnClassName={ this.deatisltableclick } width='8em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } }headerAlign='center'>Company</TableHeaderColumn>
          <TableHeaderColumn row='1' dataField='manager' dataAlign='center' columnClassName={ this.deatisltableclick } width='8em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } }headerAlign='center'>Manager</TableHeaderColumn>
          <TableHeaderColumn row='1' dataField='email_id' dataAlign='center' columnClassName={ this.deatisltableclick } width='14em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } }headerAlign='center'>Email</TableHeaderColumn>
          <TableHeaderColumn row='1' dataField='contact' dataAlign='center' columnClassName={ this.deatisltableclick } width='8em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } }headerAlign='center'>Contact</TableHeaderColumn>
          <TableHeaderColumn row='1' dataField='location' dataAlign='center' columnClassName={ this.deatisltableclick } width='8em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } }headerAlign='center'>Location</TableHeaderColumn>
          <TableHeaderColumn row='1' dataField='gender' dataAlign='center' columnClassName={ this.deatisltableclick } width='8em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } }headerAlign='center'>Gender</TableHeaderColumn>
          <TableHeaderColumn row='1' dataField='category' dataAlign='center' columnClassName={ this.deatisltableclick } width='8em' editable={ true } thStyle={ {'background': 'rgb(227 216 236)', "color": "#540D6E","fontSize": "0.9em" ,"fontWeight": "600", "borderRightColor": "rgb(227 216 236)",  "borderLeftColor": "rgb(227 216 236)", } }headerAlign='center'>Category</TableHeaderColumn>


     
        </BootstrapTable>

          {/* <table className="krishna-table header-fixed">
             <thead className="header" >
        
			 <th className="details" colspan="7" >Details</th>	
   
	
             <tr>
			 <th  className="detail-subCol">Company</th>
			 <th  className="detail-subCol">Manager</th>
			 <th  className="detail-subCol">Email</th>
			 <th  className="detail-subCol">Contact</th>
			 <th  className="detail-subCol">Location</th>
			 <th  className="detail-subCol">Gender</th>
			 <th  className="detail-subCol">Category</th>
		
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
        <td className={v['checked'] ? "my-selection-custom" :''}  >{v['gender']}</td>
        <td className={v['checked'] ? "my-selection-custom" :''}  >{v['category']}</td> 
    
			 	</tr>
			)}


			</tbody>
		</table> */}
    </div>
    </div>
  </ScrollSyncPane>
          </div>
</div>
              </div>
       
     

            </Drawer.Body>
          </Drawer>
          </div>
          <Drawer size=" avg" backdrop={true} show={this.state.show_d2} onHide={this.closekar}>
            <Drawer.Body>
    
              <div className="wrapp">
<div className="inn1">


            <button className="op1_ " onClick={this.toggleDrawer}><i class="fa fa-angle-left size-1 custom_ico"></i></button>	   



<button className="op1_1 " onClick={this.closekar}><i class="fa fa-angle-right size-1 custom_ico"></i></button>	   


</div>
<div className="inn2">
<div className="table-hei">
<ScrollSyncPane>
    <div style={{overflowY: 'auto'}}>
    <section className="nd-taable">
          <table className="krishna-table header-fixed">
          <thead className="header" >
        <tr className="avg-header1" style={{borderBottom:"none"}}>
        <th className="details" colspan="5" >Average views</th>	
        </tr>
		

	   {/* <tr>  <th className="details2" colspan="6" ></th>	</tr> */}
             <tr>
			 <th  className="detail-subCol23 kl">Story</th>
			 <th  className="detail-subCol23 kl">Post</th>
			 <th  className="detail-subCol23 kl">Video</th>
			 {/* <th  className="detail-subCol23 kl">Reel</th> */}
       <th  className="detail-subCol23">Youtube Views</th>
			 <th  className="detail-subCol23">Static Reach</th>
			 
		
			 </tr>
      
			 </thead>

			 <tbody>
			 {filteredArr.map(v=>

			 	<tr key={v['name']}>
				<td className={v['checked'] ? "my-selection-custom" :''}  >{v['']}</td>
        <td className={v['checked'] ? "my-selection-custom" :''} >{v['']}</td>
        <td className={v['checked'] ? "my-selection-custom" :''} >{v['']}</td>
        {/* <td className={v['checked'] ? "my-selection-custom" :''}  >{v['']}</td> */}
        <td className={v['checked'] ? "my-selection-custom" :''}  >{v['avg_yt_views']}</td>
        <td className={v['checked'] ? "my-selection-custom" :''}  >{v['insta_avgrate']}</td>
    
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
</div>
  }

{
  this.state.loader && <Home visible={true} />

}

{/* Filter Modal */}

{ this.state.Modal &&
  <Modal size={this.state.size} show={this.state.show} onHide={this.close}>
          <Modal.Header>
            <Modal.Title style={{  
              fontFamily: "Montserrat",
              fontSize: "27px",
              color: "#2C3352",
              fontWeight: "700"
              }}>Filter Options</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className=" ">
            <div className="" >
            {/* <div className="col-md-12" > */}
               <div className="">
            
         

               <h5 style={{padding: "0.5em 0 0.6em"}} className="yofilter">Gender:
       
            
             <span><label htmlFor="Male">
          <input 
            className="filled-in"
            type="checkbox"
            checked={this.state.male}
            value="Up" id="Male" onChange={this.OnChangeFilter}/>
          <span style={{fontSize:"18px"}} className="yofilter">Male</span>
          </label>
          </span>

          <span><label htmlFor="Female">
          <input 
            className="filled-in"
            type="checkbox"
            checked={this.state.female}
            value="Up" id="Female" onChange={this.OnChangeFilter}/>
          <span style={{fontSize:"18px"}} className="yofilter">Female</span>
          </label>
          </span>
          </h5>
       {   this.state.instaonly &&   <div >
    
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
          //  onChangeComplete={this.handleOnChangeIn}
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
          //  onChangeComplete={this.handleOnChangeYt}
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
          // disabled={this.state.infCOomBool}
          formatLabel={value => value/1000 + 'k'}
          value={this.state.commercial_range}
            // onChange={this.handle}
           onChange={value => this.setState({ commercial_range: value })}
          //  onChange={this.handleOnChangeCommk, value => this.setState({ valueA3: value })}
          //  onChangeComplete={this.handleOnChangeCommk}
           />

           </div>
             
                  </div>

            
               <div >
               <h5 style={{marginBottom:"0.25rem"}} className="yofilter">Select Category:
               <span>
               <MultiSelect
               id="select_category"
                data={category}
                autoClose={false}
                onChange={this.onChangeMultiselect}
                value={this.state.Selectedcategory}
            />
            </span>
          </h5>
</div>

          
            </div>
               </div>
         
    

               </div>
          </Modal.Body>
          <Modal.Footer>



            {/* <Button onClick={this.close} className="dash-button ">
            Cancel
            </Button> */}
              <span className="yo-padding">
            <Button className="filter-button2 fohe" onClick={this.resetFilter}>
              Reset
            </Button>
            </span>
            <span className="yo-padding ">
            <Button onClick={this.handleFilter} className="dash-button fohe">
              Apply
            </Button>
            </span>

          </Modal.Footer>
        </Modal>}

 {/* ADD NEW INFLUENCER FORM MODAL */}
        
 { this.state.add_influencer &&
   <Modal size={this.state.size} show={this.state.new_inlfuecer_modal} onHide={this.closeNewInf}>
          <Modal.Header>
            <Modal.Title style={{  
              fontFamily: "Montserrat",
              fontSize: "27px",
              color: "#2C3352",
              padding: "0 0.5em",
              fontWeight:"700"
              }}>Add New Influencer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
<div className="addNewwrapper">
<form 
onSubmit={this.handleNewInflueSubmit}
>
  <div class="form-row">
  <div class="form-group col-md-1">
  <span className="new-influModal">Name</span>
  </div>
    <div class="form-group col-md-5">
      {/* <label for="name">Name</label> */}
      <input type="text" class="form-control" required  onChange={this.handleInputChange}  id="name" placeholder="" />
    </div>
    <div class="form-group col-md-1">
  <span className="new-influModal">Email</span>
  </div>
    <div class="form-group col-md-5">
      {/* <label for="email_id">Email</label> */}
      <input type="email" class="form-control"  required onChange={this.handleInputChange}  id="email_id" placeholder="" />
    </div>
  </div>
  <div class="form-row">
  <div class="form-group col-md-1">
  <span className="new-influModal">Gender</span>
  </div>
    <div class="form-group col-md-3">

      <select  className="browser-default" id="gender" required  onChange={this.handleInputChange}   >  
            <option value="" disabled selected>Select Gender</option>
            <option value="Male" >Male</option>
            <option value="Female" >Female</option>
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

<h5 className="new_inf_head">Youtube </h5>

  <div class="form-row">
  <div class="form-group col-md-2">
      {/* <label for="youtube_subscribers">Youtube Subscribers</label> */}
      <input type="text" class="form-control"    onChange={this.handleInputChange}  id="youtube_channel" placeholder="Channel Name" />
    </div>
    <div class="form-group col-md-6">
      {/* <label for="youtube">Youtube Url</label> */}
      <input type="text" class="form-control"  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}  onChange={this.handleyoutubeChange}  id="youtube" placeholder="Youtube URL" />
    </div>
    <div class="form-group col-md-2">
      {/* <label for="youtube_subscribers">Youtube Subscribers</label> */}
      <input type="text" class="form-control"    onChange={this.handleInputChange} value={this.state.showsub} id="showsub" placeholder="Subscribers" />
    </div>
    <div class="form-group col-md-2">
      {/* <label for="yt_video">Youtube influencer ₹</label> */}
      {/* <input type="number" class="form-control"    onChange={this.handleInputChange}  id="yt_video" placeholder="Commercial" /> */}
      <NumberFormat id="yt_video" class="form-control" thousandSeparator={false}  value={this.state.yt_video} onChange={this.handleInputChange} placeholder="₹ Commercial" />
    </div>
   
  </div>
  <h5 className="new_inf_head">Instagram </h5>
  <div class="form-row">
  <div class="form-group col-md-2">
      {/* <label for="insta_followers">Followers</label> */}
      <input type="text" class="form-control"    onChange={this.handleInputChange}  id="insta" placeholder="Username" />
    </div>
    <div class="form-group col-md-6">
      {/* <label for="insta">Instagram Url</label> */}
      <input type="text" class="form-control"  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}  onChange={this.handleinstaChange}  id="insta_url" placeholder="Instagram URL" />
    </div>
    <div class="form-group col-md-3">
      {/* <label for="insta_followers">Followers</label> */}
      <input type="number" class="form-control"  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}  onChange={this.handleinstafollowerChange} value={this.state.insta_followers}  id="insta_followers" placeholder="Followers" />
    </div>
    </div>
    <div class="form-row">
    <div class="form-group col-md-3">
      {/* <label for="yt_video">Story ₹</label> */}
      <NumberFormat id="insta_st" class="form-control"  thousandSeparator={false}   value={this.state.insta_st} onChange={this.handleInputChange} placeholder="₹ Story" />

      {/* <input type="number" class="form-control"    onChange={this.handleInputChange}  id="insta_st" placeholder="Story" /> */}
    </div>
    <div class="form-group col-md-3">
      {/* <label for="insta_st">Post</label> */}
      <NumberFormat id="insta_static" class="form-control" thousandSeparator={false} value={this.state.insta_static} onChange={this.handleInputChange} placeholder="₹ Static" />

      {/* <input type="number" class="form-control"    onChange={this.handleInputChange}  id="insta_static" placeholder="Static" /> */}
    </div>
    <div class="form-group col-md-3">
      {/* <label for="insta_st">Post</label> */}
      <NumberFormat id="insta_video" class="form-control" thousandSeparator={false} value={this.state.insta_video} onChange={this.handleInputChange} placeholder="₹ Video" />

      {/* <input type="number" class="form-control"    onChange={this.handleInputChange}  id="insta_video" placeholder="Video" /> */}
    </div>
    </div>
   
 

  <h5 className="new_inf_head">Details</h5>
  <div class="form-row">
    <div class="form-group col-md-2">
      {/* <label for="insta_followers">Followers</label> */}
      <input type="text" class="form-control"    onChange={this.handleInputChange}  id="com_agency" placeholder="Company" />
    </div>
    <div class="form-group col-md-2">
      {/* <label for="yt_video">Story ₹</label> */}
      <input type="text" class="form-control"    onChange={this.handleInputChange}  id="manager" placeholder="Manager" />
    </div>
    <div class="form-group col-md-3">
      {/* <label for="yt_video">Story ₹</label> */}
      <input type="email" class="form-control"    onChange={this.handleInputChange}  id="manager_email" placeholder="Manager's Email" />
    </div>
    <div class="form-group col-md-3">
      {/* <label for="insta_st">Post</label> */}
      <input type="number" class="form-control"    onChange={this.handleInputChange}  id="contact" placeholder="Contact" />
    </div>
    <div class="form-group col-md-2">
      {/* <label for="insta">Instagram Url</label> */}
      <input type="text" class="form-control"    onChange={this.handleInputChange}  id="location" placeholder="Location" />
    </div>
  </div>

  <div style={{textAlign: "right"}}>
  <Button type="submit" style={{width:"7em"}} className="dash-button" >Submit</Button>
  </div>

</form>
</div>

          </Modal.Body>
        </Modal>
        }

        {/* Dialog */}

                {this.state.visibleDialog && <Dialog title={"Please confirm"} onClose={()=>this.setState({visibleDialog:false})}>
                    <p style={{ margin: "25px", textAlign: "center" }}>Are you sure you want to delete the selected influencer?</p>
                    <DialogActionsBar>
                        <button className="k-button" onClick={()=>this.setState({visibleDialog:false})}>No</button>
                        <button className="k-button" onClick={this.deleteInfluencer}>Yes</button>
                    </DialogActionsBar>
                </Dialog>
                
                }
                

    </div>

    );
  }
}

Dash.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dash);



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
      <a style={{textDecoration:"underline"}}  href={ this.props.insta_url } target="_blank"> Visit </a>
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
    this.handlechange = this.handlechange.bind(this);
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
  handlechange(e){
    
  console.log(typeof e.currentTarget.value)
  let amount = new Intl.NumberFormat().format(e.currentTarget.value );
  console.log(amount)
    this.setState({ 
      name:  e.currentTarget.value
    })
  }

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
                className={ ( this.props.editorClass || '') + ' editor ' }
                // style={ { display: 'inline', width: '50%' } }
                type='number'
                value={ this.state.name }
                onChange={this.handlechange } 
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

const ItemList = ({ options, campaign_status, toggleCheckbox }) => {

  return (
    <div className="col s12">
      {
        options.map((option, index) => (
          <Item
            key={index}
            option={option}
            checked={(campaign_status === (index + 1) ? true : false)}
            toggleCheckbox={toggleCheckbox} 
            campaign_status = {campaign_status}
            />
        ))
      }
    </div>
  )
}

const Item = ({ option, checked, toggleCheckbox,campaign_status }) => {
  return (
    < >
        <p><label htmlFor={option.id}>
          <input 
            className="filled-in"
            type="checkbox"
            id={option.id}
            onChange={toggleCheckbox}
            checked={option.id == campaign_status ? "checked" : ""} />
          <span className="font2">{option.name}</span>
          </label></p>
      </>
  
  )
}


//i think woh array mein hi change kar dena hai using numeral
//so directly array mehi changes hoge
//so filtering won't be an issue as the databse copy has the pure numbers 
//and the excel will also be downloaded as k and m so even that isn't a problem 
//point is there are no calculations regarding followers and subscribers in this two pages so changing format wouldn't matter much 
//does the numeral have a way of deconstructing it?


