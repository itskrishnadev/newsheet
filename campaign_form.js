import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min";
import SideNav from "../../layout/SideNav"
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import moment from "moment";
import axios from "axios";
// import { ExportReactCSV } from './ExportReactCSV';
import { ExportReactCSV1 } from './ExportReactCSV';
import { SingleDatePicker} from 'react-dates';
import {Row, Col,Button} from "reactstrap"
import { Modal } from 'antd';
import {ExportPdf, ExportExcelforLockedNPending} from "./exportExcel";
// import  CheckBox  from './CheckBox';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import '@progress/kendo-react-intl'
import TextField from '@material-ui/core/TextField';
import Spinner from 'react-spinner-material';

const Home = () =>  <Spinner spinnerColor={"#333333"}  visible={true} />

class Campaign_Form extends Component{

  constructor(props){
    super(props);
    var j=0;
    // var k=0;
    var instaonly = this.props.instaonly;
    var youtubeonly = this.props.youtubeonly;
    console.log("instaonly" + instaonly)
    console.log("youtubeonly" + youtubeonly)
    console.log(this.props.Selectedcategory)
    var arr = this.props.checked;
    var sum=this.props.sum;
    var total_cost = this.props.total_cost
    console.log(total_cost);
    var monk_fee = this.props.monk_fee
    console.log(monk_fee);
    console.log(sum);
    var selected_full=[];
    var filtered_arr=[];
    var brandCommercial=[];
    var influencer_arr=[];

    var csv_arr=[];
    console.log(this.props.selected_row)
    var counttotal= this.props.selected_row.length
    var selected_row = this.props.selected_row;
for(var i=0;i<selected_row.length;i++){
var influ= selected_row[i]["name"];
console.log(influ)
console.log(this.props.monk_fee)
influencer_arr.push(influ)
}
      for(var i=0;i<arr.length;i++){
         if(arr[i]['checked']==true){
            filtered_arr[j]=arr[i]['name'];
            j=j+1;
           // checks the true for the checked influencer
           // now get the value of brand commercial
           // good job
           //  brandCommercial[k]=arr[i]['brand_youtube_video'] + arr[i]['brand_insta_story'] + arr[i]['brand_insta_static'] + arr[i]['brand_insta_video'] + arr[i]['brand_tiktok_video'] ;
           //  k=k+1;

         }
      }
      var k=0;
      var j=34;
      var row={};
      for(var i=0;i<arr.length;i++){
        if(arr[i]['checked']==true){
           /*csv_arr[k]['name']=arr[i]['name'];
           csv_arr[k]['insta']=arr[i]['insta'];
           csv_arr[k]['youtube']=arr[i]['youtube'];
           csv_arr[k]['insta_followers']=arr[i]['insta_followers'];
           csv_arr[k]['insta_media']=arr[i]['insta_media'];
           csv_arr[k]['insta_avgrate']=arr[i]['insta_avgrate'];
           csv_arr[k]['youtube_views']=arr[i]['youtube_views'];
           csv_arr[k]['youtube_comments']=arr[i]['youtube_comments'];
           csv_arr[k]['youtube_subscribers']=arr[i]['youtube_subscribers'];
           csv_arr[k]['youtube_media']=arr[i]['youtube_media'];*/
          //  row={"Name of creator":arr[i]['name'],"insta":arr[i]['insta'],"youtube":arr[i]['youtube'],"insta_followers":arr[i]['insta_followers'],"insta_media":arr[i]['insta_media'],
          // "insta_avgrate":arr[i]['insta_avgrate'],"youtube_views":arr[i]['youtube_views'],"youtube_subscribers":arr[i]['youtube_subscribers']}
          //  row={"name":arr[i]['name'],"Name of IG":arr[i]['insta'],"Instagram Url":arr[i]['insta_url'],"Instagram Followers":arr[i]['insta_followers'],"Youtube Url":arr[i]['youtube'],"Youtube Subscribers":arr[i]['youtube_subscribers'],"Insta story Commercials":arr[i]['brand_insta_story'],"Insta static Commercials":arr[i]['brand_insta_static'],"Insta video Commercials":arr[i]['brand_insta_video'],"Youtube video Commercials":arr[i]['brand_youtube_video']}

           row={"name":arr[i]['name'],"Name of IG":arr[i]['insta'],"Instagram Url":arr[i]['insta_url'],"Instagram Followers":arr[i]['insta_followers'],"Youtube Url":arr[i]['youtube'],"Youtube Subscribers":arr[i]['youtube_subscribers'],"Youtube video Commercials":arr[i]['yt_video'],"Insta story Commercials":arr[i]['insta_st'],"Insta static Commercials":arr[i]['insta_static'],"Insta video Commercials":arr[i]['insta_video']}
         // "instastory":arr[i]['instastory'],"instavideo":arr[i]['instavideo'],"instapost":arr[i]['instapost'],"ytvideo":arr[i]['ytvideo'],"tiktokvideo":arr[i]['tiktokvideo']}
          // csv_arr.push(row);
          csv_arr.push(arr[i]);
          let influe= arr[i];
          selected_full.push(influe);
          
           k=k+1;
        }
     }
    console.log(this.props.auth.user.name);
    console.log(sum);
    //var csv_arr=this.props.checked;
    var obj={"cost_influencer":this.props.total_cost,"cost_monk":this.props.monk_fee}
    csv_arr.push(obj);
    console.log(csv_arr)
    
    this.state={
      value:this.props.dash,
      selected_row:this.props.selected_row,
      brands:[],
      brand_name:'',
      new_brand_name : false,
      newBrand:'',
      new_brand:'',
      influencers:influencer_arr,
      brand_commercial:brandCommercial,
      campaign_name:'',
      campaign_desc:'',
      campaign_date:'',
      campaign_Date:'',
      cost_influencer:null,
      cost_monk:null,
      adv:'',
      rem:'',
      count:counttotal,
      // campaign_status:'',
      person_in:'',
      contact_no:'',
      email:'',
      campaign_owner:this.props.auth.user.name,
      details:csv_arr,
      select_column:["cost_influencer","cost_monk"],
      selected_full:selected_full,
      users:[],
      executor:'',
      n:null,
      sum:sum,
      cost_monk: monk_fee,
      cost_influencer:total_cost,
      type:"submit",
      list:[],
      show_add:false,
      show_cancel:true,
      selecColumn:[],
      visible: false,
      ExportButton: false ,
      SelectButton: true,
      listvalue: this.props.backFromform ,
      showcol:'4',
      toggle:"1",
      hideYt:false,
      hideInsta:false,
      valuepresent:false,
      responsefromCom:false,
      Selectedcategory:this.props.Selectedcategory,
      total_influencer:this.props.count,
    fruites: [
      {id:0 ,label:"Name" ,value:'name', isChecked: true},
      // {id:1 ,label: ,value:'youtube_views', isChecked: true},
      {id:1 ,label:"Instagram Id" ,value:'insta', isChecked: true},
      {id:2 ,label:"Instagram Url" ,value:'insta_url', isChecked: instaonly},
      {id:3 ,label:"Instagram Followers" ,value:'insta_followers', isChecked: instaonly},
      {id:4 ,label:"instagram Static" ,value:'insta_st', isChecked: instaonly},
      {id:5 ,label:"instagram Static Post" ,value:'insta_static', isChecked: instaonly },
      {id:6 ,label:"instagram Video" ,value:'insta_video', isChecked: instaonly},
      {id:7 ,label:"Youtube Url" ,value:'youtube', isChecked: youtubeonly},
      {id:8 ,label:"Youtube Subscribers" ,value:'youtube_subscribers', isChecked: youtubeonly},
      {id:9 ,label:"Youtube Video" ,value:'yt_video', isChecked: youtubeonly},
      
      // {id:5     ,value:'insta_media', isChecked: true},
      //{id:6     ,value:'Influencers Commercials', isChecked: true},
      // {id:5     ,value:'insta_avgrate', isChecked: true},
      // {id:6     ,value:'No of deliverables Youtube Video', isChecked: true},
      // {id:7     ,value:'No of deliverables Instagram Story', isChecked: true},
      // {id:8     ,value:'No of deliverables Instagram Static Post' , isChecked: true},
      // {id:9     ,value:'No of deliverables Instagram Video Post', isChecked: true},
      // {id:10     ,value:'No of deliverables Tiktok Video', isChecked: true},
     
   
      
      
      ],
      options: [{
        id: "Lock",
        name: "Locked"
      },
      {
        id: "Pending",
        name: "Pending"
      }],
      campaign_status: "Lock"

    };
    console.log(this.state);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleSelect=this.handleSelect.bind(this);

    this.handleDownload=this.handleDownload.bind(this);

    this.handleInputChange=this.handleInputChange.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.handleCampainChange=this.handleCampainChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    // this.handleRowSelect = this.handleRowSelect.bind(this);
    this.statusSelection = this.statusSelection.bind(this);
    //What are the UI glitches.
    //edit form-done.
    //datepicker-done.
    //theme colour-done.
    //search functions.

  }

  toggleCheckbox(e) {
    var mod_details = this.state.details;
    // for(var i = 0; i<details.length; i++){
    //   var rw= details[i]["campaign_status"]
    // }
    var length=mod_details.length;
    mod_details[length-1]["campaign_status"]=e.target.id;
    this.setState({
      campaign_status : e.target.id
    })
   }
  handleOpen() {
    this.setState({ open: true });



  };

  handleClose(){

    var array = this.state.selected_row
    console.log(array);
 for(var i=0; i<array.length; i++){
      var influencer = array[i]
      console.log(influencer.name)
      // delete influencer.Beauty;delete influencer.Comedy;delete influencer.Cricketer;delete influencer.DIY;delete influencer.Education;delete influencer.Entertainment;delete influencer.Fashion;delete influencer.Female;delete influencer.Fitness;delete influencer.Food;delete influencer.Gamer;delete influencer.Grooming;delete influencer.Lifestyle;delete influencer.Male;delete influencer.Motivation;delete influencer.Music;delete influencer.No;delete influencer.Poet;delete influencer.Regional;delete influencer.Sports;delete influencer.Technology;delete influencer.Travel;delete influencer.Vlogger;delete influencer.yt_video_date;delete influencer._id;delete influencer.insta_st_date;delete influencer.insta_static_date; delete influencer.insta_video_date; delete influencer.insta_video_date;  delete influencer.tiktok_video_date;delete influencer.undefined;
      // delete influencer.tiktok;
      // delete influencer.youtuber;
      // delete influencer.tiktok_url;
      // delete influencer.tiktok_video;
      // // delete influencer.checked;
      // delete influencer[ 'Moto Vlogger' ];
      // delete influencer[ 'Parent/ Mom' ];
      // delete influencer[ 'Tik-Tok' ];
      // delete influencer.instagram; delete influencer.tweet; delete influencer.yt_short; delete influencer.insta_avgrate;
      // delete influencer['17-06-2020  12:09:54'];
      // delete influencer['17-06-2020  01:19:02'];
      // delete influencer['17-06-2020  01:19:22'];
      // delete influencer['17-06-2020  01:20:16'];
      //delete influencer.Moto Vlogger; 
      //delete influencer.Parent/ Mom; 
     // delete influencer.Tik-Tok;
      // influencer.splice(0, 1,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30)
    }
    var array2 = array
    console.log(array)
    this.setState({ open: false });
    var arr = this.state.selected_row;
    var select_arr=this.state.fruites;
    var filter_select_arr=[];
    
    for(var k=0;k<select_arr.length;k++){
      if(select_arr[k]['isChecked']==false){
        filter_select_arr.push(select_arr[k]);
      }
    }
    console.log(filter_select_arr);
    for(var i=0;i<arr.length;i++){
      for(var j=0;j<filter_select_arr.length;j++){ 
       console.log(filter_select_arr[j]['value']);
       delete arr[i][filter_select_arr[j]['value']];

      }
    }
    console.log(arr);
    this.setState({selected_row:arr});
  };

  //handleColumnSelect(event){
    //after every select 
    //change the details array by popping out the column all together
    //no you cant do the popping up immediately
    //you will have to first change the slectcolumns array.
    //once this is done you get the selction confirmation button.
    //on the click of which you trim the details array. 
    //and then you show the export button with the current functionality.
  //}

  handleDownload(event){
    //Update:no need for this as handle input change handles the concatenation./
    //gets the concatentation of the campaign details and influencers details
    console.log("in download")
    var arr=this.state.details;
    var obj={"campaign_name":this.state.campaign_name,"campaign_desc":this.state.campaign_desc,"campaign_date":this.state.campaign_date,"cost_influencer":this.state.cost_influencer,"cost_monk":this.state.cost_monk,"50% ADVANCE":this.state.adv,"50% remaining":this.state.rem,"moment":null}
    arr.push(obj);
    console.log(arr)
    this.setState({details:arr});
    
  }

  componentDidMount(){

    var array = this.state.selected_row
    console.log(array);

    var array2 = array
    console.log(array)

    // this.setState({details: selected_row})
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems);
    var self=this;



//     // api call for find if campaign name is present
// var self=this;
// console.log('hi');
// axios.get("/api/users/get_campaigns",{params:{name:self.props.auth.user.name}}).then(function (response) {
//     console.log(response);
//     var list=response.data;
// console.log(list);
// var array= []

// for(var i= 0; i<list.length; i++ ){
//   var single_campaign= list[i]
//   // console.log(single_campaign)
//   // console.log(single_campaign.campaign_date)
//   var campaingName = single_campaign.campaign_name
//   array.push(campaingName) 
// }
// self.setState({list:array, responsefromCom:true});
// console.log(array)

//   //console.log(this.state.list);
//   //how do you get the form?.
//   //whn clicked you open the form , but how do you idenify and populate the form.
//   //for identification give it an id same as the taskname or the rkey.
//   //go with the id and search for the details  in the state.
//         //save button should call the updates api.
 

//     })
//    .catch(function (error) {
//     console.log(error);
//     });
    


    console.log("inside mount")
    //call the brand names api and list them in brand names input.
    axios.get("/api/brands/get_brands").then( function(response){
      const array=response.data;
      console.log(array)
      axios.get("/api/brands/get_users").then(function (response) {
        console.log("inside axios")
        var names=response.data;
        console.log(names);

        self.setState({brands:array,users:names, responsefromCom:true})

      
  
        })
       .catch(function (error) {
        console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
      });


  }


  onChangeDate(date) {
    console.log(date);
    var string_date=date.toString();
    console.log(string_date);
    this.setState({
      campaign_date:string_date,
      campaign_Date:moment().format("DD-MM-YYYY hh:mm"),
      moment:date,

    });
    console.log(moment().format("DD-MM-YYYY hh:mm"))
  }

  handleInputChange(event){
    const target=event.target;
    // console.log(target);
    //check if the target is date and if it is change the format  
    const id=target.id;
    // console.log(id);
    const value=target.value;
    console.log(value);
    //get the details, modify it here.
    //get the length as well.
    // console.log(this.state);
    if(id=="executor"){
      this.setState({[id]:value});
    }
    else{

    var mod_details=this.state.details;
    var length=mod_details.length;
    mod_details[length-1][id]=value;

    mod_details[length-1]["brand_name"]=this.state.brand_name;
    mod_details[length-1]["campaign_name"]=this.state.campaign_name;
    mod_details[length-1]["campaign_date"]=this.state.campaign_date;
    mod_details[length-1]["campaign_status"]=this.state.campaign_status;

    this.setState({[id]:value,details:mod_details}); 
    //pushing means adding an entire row by itself.
    //instead just initiate the values to null in details
    }
    


    
  }


  handleCampainChange(event){
    const target=event.target;
    console.log(target);
    console.log(this.state.list);
    
    var self=this;
    
    // var alreadyPresentCampaignNames = self.state.list
    // var campaign_name = self.state.campaign_name;

    // console.log(this.state.list)
    // console.log(self.state.list)
    // console.log( campaign_name)
    // console.log(alreadyPresentCampaignNames.indexOf(campaign_name) )


    // if(alreadyPresentCampaignNames.indexOf(campaign_name) >= 0){
    //   this.setState({valuepresent:true})
    // }else{
    //   this.setState({valuepresent:false})
    // }

    // for(var i = 0; i< alreadyPresentCampaignNames.length; i++){
    //   var CampName= alreadyPresentCampaignNames[i]
    //   console.log(CampName);
    //   if(CampName==campaign_name){
    //   this.setState({valuepresent:true})
      
    //   } else{
    //     this.setState({valuepresent:false})
    //   }
    // }

    // for(var i = 0; i< alreadyPresentCampaignNames.length; i++){
    //   var CampName= alreadyPresentCampaignNames[i]
    //   console.log(CampName);
    //   if(CampName!==campaign_name){
    //   this.setState({valuepresent:false})
    //   } 
    // }

    //if new brand button is clicked then new brand should be store in brands state

    //var brand_name = this.state.brand_name;
    //this.setState({
      //brand_name: event.target.value
    //});
    //console.log(this.state.brand_name);
    //console.log("first time");
    //so if the brand is given the name
  
    //const newBrand1 = target.value.brand_name;
    //this.setState({brand_name:newBrand1})
   //console.log("this is brand name !!!!"+this.state.brand_name);

    const id=target.id;
  
    if (id=='brand_name'){
     
      var xyz;
      const v = target.value;
      console.log("hey")
      // console.log(v)
      this.setState({brand_name:v})
      console.log(this.state.brand_name);
    console.log("third time");
      //then new brand should be passed with _+1 
      //this.setState({
        //campaign_name: brand_name + '_' + 1
      //});
      //console.log(this.state.campaign_name);
      //console.log("first time");
    // var brandName= self.state.brands;
    // console.log( brandName);
    //check if the target is date and if it is change the format 
        for(var i=0; i<self.state.brands.length; i++){
     
          if(v==self.state.brands[i]['brand']){
            // xyz =this.state.brands.brand[i].brand[n];
            console.log("heyhey")
            var number=self.state.brands[i]["n"];
            xyz = self.state.brands[i]["n"] + 1;
            // xyz += self.state.brand[i]["n"]
            var campaignName= v+'_'+xyz;
            this.setState({campaign_name : campaignName,n:number})
            console.log(this.state.campaign_name) 
            console.log("second time");
          }
        }
    
      }  else{

        console.log(id);
        const value=target.value;
        console.log(value);
        this.setState({new_brand:value});
        console.log(this.state.new_brand);
        this.setState({
          campaign_name: value + '_' + 1
        });
      }

    
   
}
handleCampainChange2= (event) =>{
  const target=event.target;
  console.log(target);
  // console.log(this.state.list);

  
  var self=this;
  const id = target.id

  console.log(id);
  const value=target.value;
  console.log(value);
  this.setState({new_brand:value});
  console.log(this.state.new_brand);
  this.setState({
   campaign_name: value + '_' + 1
  });
     //for id = new_brand
     if(id=="new_brand"){
      var xyz;
      const v = target.value;
      console.log("hey")
      // console.log(v)
      this.setState({new_brand:v})
      console.log(this.state.new_brand);
    console.log("third time");
      //then new brand should be passed with _+1 
      //this.setState({
        //campaign_name: brand_name + '_' + 1
      //});
      //console.log(this.state.campaign_name);
      //console.log("first time");
    // var brandName= self.state.brands;
    // console.log( brandName);
    //check if the target is date and if it is change the format 
        for(var i=0; i<self.state.brands.length; i++){
     
          if(v==self.state.brands[i]['brand']){
            // xyz =this.state.brands.brand[i].brand[n];
            console.log("heyhey")
            var number=self.state.brands[i]["n"];
            xyz = self.state.brands[i]["n"] + 1;
            // xyz += self.state.brand[i]["n"]
            var campaignName= v+'_'+xyz;
            this.setState({campaign_name : campaignName,n:number})
            console.log(this.state.campaign_name) 
            console.log("second time");
          }
   
        }
      //get the details, modify it here.
      //get the length as well.
        
      //eh campaign name when typed gets teh state updated.
      //the name ka id is there 
  
        
  
      //th
  
  
    
      //pushing means adding an entire row by itself.
      //instead just initiate the values to null in details
  
    }
    else{

}


}


  handleSelect(){
     var arr = this.state.selected_row;
     var select_arr=this.state.fruites;
     var filter_select_arr=[];
     
     for(var k=0;k<select_arr.length;k++){
       if(select_arr[k]['isChecked']==false){
         filter_select_arr.push(select_arr[k]);
       }
     }
     console.log(filter_select_arr);
     for(var i=0;i<arr.length;i++){
       for(var j=0;j<filter_select_arr.length;j++){ 
        console.log(filter_select_arr[j]['value']);
        delete arr[i][filter_select_arr[j]['value']];

       }
     }
     console.log(arr);
     this.setState({selected_row:arr,visible: false,
    });
  }
  handleSubmit(event){
  //  console.log(this.state.valuepresent)
  //  event.preventDefault();
  //  return false

  
    // if(this.state.valuepresent==true){
    //   alert("Campaign Name Already Present")
    //   event.preventDefault();
    // }

   
    //get the data to mongo.
    //make it available to the history button.

    console.log(this.state);
    console.log("YO I have ben cki");
    axios({
      method: 'post',
      url: "/api/campaigns/set_campaign",
      data: {
        new_brand_name:this.state.new_brand_name,
        new_brand:this.state.new_brand,
        n:this.state.n,
        influencers:this.state.influencers,
        brand_name:this.state.brand_name,
        campaign_name:this.state.campaign_name,
        executor:this.state.executor,
        campaign_desc:this.state.campaign_desc,
        campaign_date:this.state.campaign_date,
        campaign_Date:this.state.campaign_Date,
        cost_influencer:this.state.cost_influencer,
        cost_monk:this.state.cost_monk,
        adv:this.state.adv,
        rem:this.state.rem,
        campaign_status:this.state.campaign_status,
        campaign_owner:this.state.campaign_owner,
        selected_full:this.state.selected_full,
        Selectedcategory:this.state.Selectedcategory,
        person_in:this.state.person_in,
        contact_no:this.state.contact_no,
        email:this.state.email,

            }
            })
      .then(function (response) {
      console.log(response);
  
  
      })
    
      .catch(function (error) {
      console.log(error);
      });
      
    
   

    

  }


  // for modal
showModal = () => {
  this.setState({
    visible: true,
  });
};

handleOk = e => {
  let fruites= this.state.fruites;
  const selecColumn = this.state.selecColumn;
  console.log(selecColumn);
  console.log(e);
  this.setState({
    visible: false,
    ExportButton: true,
    SelectButton: false,
  });

};

onChangeColumnMultiselect = (event) => {
  this.setState({
    Selectedcategory: [ ...event.target.value ]
  });
}

handleCancel = e => {
  console.log(e);
  this.setState({
    visible: false,
  });
};

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


// modal code ends here//
   // to check the total cost and monke fee


    

   statusSelection= e => {
       var id= e.target.id
        console.log(id)
        this.setState({
          campaign_status:id
        })
        this.setState({[e.target.id]:e.target.checked})
      }
	render(){
    const { value } = this.state;

		return(
      <div>
{ this.state.responsefromCom ?     <div >
         <div style={{padding: "0px 22% 0 3%"}}>
        <div className="hoho">


{/* <Row>
<p style={{float:"right"}}>
Influencer Marketing and Talent Management <span class="material-icons">
keyboard_arrow_right
</span>
<b>New Sheet</b>
</p>
<hr class="myhrlinehai"></hr>
</Row> */}


<h3 className="hey2rem">Campaign Form</h3>
{/* <p style={{marginTop:"-1%"}}>Please fill in the following details before proceeding ahead.</p> */}

</div>


</div>

 

    <div className="" > 
    <form class="col s12" style={{marginTop:"2%"}} onSubmit={this.handleSubmit}>
    <div className="form-sizeh" > 

    <Row className="form1 yo-hmt">
      <Col lg={2} md={3} sm={12} xs={12}>
          <h4 className="font2">Brand Name:</h4>
        </Col>
        <Col lg={3} md={3} sm={8} xs={8}>
        
{this.state.show_add && <input id="new_brand" className="enter_brand" required={true} value={this.state.new_brand} onChange={this.handleCampainChange2}/> }
         { this.state.show_cancel && <select className="browser-default" id="brand_name" required={true} onChange={this.handleCampainChange}  >  
          <option value="" disabled selected>Brand Name</option>
        
          {this.state.brands.map(brand=>
           <option value={brand['brand']} key={brand['brand']}>{brand['brand']}</option>
          )}
           <option value="enter" key="enter">
          {/* <div class="input-field col s6">
          <input id="brand_name" type="text" class="validate" onChange={this.handleCampainChange}
 />
          <label for="brand_name">Enter</label>
           </div> */}
          </option> 
          </select>
          }
            </Col>
        <Col lg={1} md={1} sm={4} xs={4}>

          {this.state.show_cancel && <Button className="add-button" onClick={() =>this.setState({value:"", show_add:true, show_cancel:false})} ><i class="fa fa-plus" aria-hidden="true"></i></Button>}
        {this.state.show_add &&   <Button className="add-button" onClick={() =>this.setState({value:"", show_add:false, show_cancel:true})} ><i class="fa fa-remove  " aria-hidden="true"></i></Button>}
     
        </Col>

        <Col lg={2} md={3} sm={12} xs={12}>
          <h4 className="font2 asdf">Date:</h4>
        </Col>
        <Col lg={4} md={3} sm={12} xs={12}>
        
          
          <SingleDatePicker
        date={this.state.moment} // momentPropTypes.momentObj or null
        onDateChange={this.onChangeDate} // PropTypes.func.isRequired
        focused={this.state.focused} // PropTypes.bool
        onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
        id="campaign_date" // PropTypes.string.isRequired,
        numberOfMonths={1}
        // enableOutsideDays
        showDefaultInputIcon
        inputIconPosition="after"
        displayFormat={() => "DD/MM/YYYY" }
        required={true}
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
        <input id="campaign_desc" type="text" class="validate-kris" required   onChange={this.handleInputChange} />
        
  
          </Col>

      </Row>

      <Row className="yo-hmt">
      <Col lg={2} md={2} sm={12} xs={12}>
          <h4 className="font2 asdf">Total Cost:</h4>
        </Col>
        <Col lg={4} md={4} sm={12} xs={12}>
        
        <input id="cost_influencer" type="number" class="validate-kris" required value={this.state.cost_influencer} onChange={this.handleInputChange} />
     
        </Col>

        <Col lg={2} md={2} sm={12} xs={12}>
          <h4 className="font2 asdf">Agency Fee:</h4>
        </Col>
        <Col lg={4} md={4} sm={12} xs={12}>
        <input id="cost_monk" type="number" class="validate-kris" value={this.state.cost_monk}  onChange={this.handleInputChange}  />
        
  
          </Col>

      </Row>
          {/* <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
          <div class="input-field ">
        <input id="adv" type="text" class="validate" onChange={this.handleInputChange} />
        <label for="adv">50% Advance</label>
      </div>
     
      
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
        <div class="input-field ">
        <input id="rem" type="text" class="validate" onChange={this.handleInputChange} />
        <label for="rem">50% Remaining</label>
      </div>
        </Col>
          </Row> */}
        
     

      <Row className="yo-hmt" >
        <Col lg={2} md={2} sm={12} xs={12}>
          <h4 className="font2 asdf">Total Influencers:</h4>
        </Col>

 
   
          <Col lg={4} md={4} sm={6} xs={6}>

         <input id="total_influencer" type="number" value={this.state.total_influencer} onChange={this.handleInputChange} className="validate-kris"   />
          
                  {/* <ol className="influ-list">
                    {this.state.influencers.map(function(item) {
                      return <li key={item}>{item}</li>;
                    })}
                  </ol> */}
      
        </Col>
        <Col lg={2} md={2} sm={12} xs={12}>
      <h4 className="font2 asdf">Person in charge:</h4>
         </Col>
         <Col lg={4} md={4} sm={12} xs={12}>
         <input id="person_in" type="text" value={this.state.person_in} onChange={this.handleInputChange} className="validate-kris"   />
            </Col>
        {/* <Col lg={2} md={2} sm={6} xs={6}>
        <h4 className="font2 asdf">
              Category:
            </h4>
                  
        </Col>

        <Col lg={4} md={4} sm={12} xs={12}>
        
        <ul >
                    {this.state.Selectedcategory.map(function(item) {
                      return <li key={item}>{item}</li>;
                    })}
                  </ul>
    
        </Col> */}
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
          {/* <div>
        <input className='react-bs-select-all'
        type='checkbox'
        id="Lock"
        value={this.state.campaign_status}
        onChange={this.statusSelection} />
        Locked
        </div>
        <div>
       <input className='react-bs-select-all'
        type='checkbox'
        id="Pending"
        value="Pending"
        value={this.state.campaign_status}
        onChange={this.statusSelection} />
        Pending
     </div> */}
        {/* <select  className="browser-default" id="campaign_status" required  onChange={this.handleInputChange}   >  
            <option value="" disabled selected>Assign Status:</option>
            <option value="Lock" >Lock</option>
            <option value="Pending" >Pending</option>
            </select> */}
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


   {/* <div className="submit-all">
 <span> <input type="submit" value="Save" className="my-buttoninform1" /></span>
 <span> <ExportReactCSV1 csvData={this.state.selected_row} type="submit" type={this.state.type} handlesubmit={this.handleSubmit}  fileName={this.state.campaign_name} /></span>
 <span><Button className="my-buttoninform1"  onClick={this.showModal}>Select Colunms</Button></span>
 </div> */}

</div>
{/* <div id="outer12" style={{ padding: "0 2.6em"}}> */}
<div id="outer12" style={{    padding: "3em 2em 4em"}}>
  <div class="inner12 cp0"><Button type="submit" value="Save" className="my-buttoninform1" >Save</Button></div>
  <div class="inner12 cp0"><ExportExcelforLockedNPending csvData={this.state.details} /></div>
  {/* <div class="inner12 cp0"><Button className="my-buttoninform1" onClick={this.export}>Export</Button></div> */}
  <div class="inner12 cp0"><ExportPdf csvData={this.state.selected_row} /></div>
  {/* <div class="inner12 cp0"><ExportReactCSV1 csvData={this.state.selected_row} type="submit" type={this.state.type} handlesubmit={this.handleSubmit}  fileName={this.state.campaign_name} /></div> */}
  <div class="inner12 cp0"><Button className="my-buttoninform1"  onClick={this.showModal}>Edit</Button></div>
</div>

      </form>
      </div>
  

      <Modal
          title="Select Column"
          visible={this.state.visible}
          onOk={this.handleSelect}
          onCancel={this.handleCancel}
        >
           {/* <input type="checkbox" onChange={this.handleAllChecked} className="mycheckbox"  value="checkedall" /> Check / Uncheck All */}
        <ul>

        {this.state.fruites.map((fruite, index) =>
          	<li key={index}>
              <label htmlFor={fruite.id}>
          	  <input type="checkbox" id={fruite.id} className="filled-in" checked={fruite.isChecked}  onChange={this.handleCheckChieldElement.bind(this, index)} />  <span className="font2">  {fruite.label}</span>
              </label>
          	</li>
          )}

        </ul>
        {/* {this.state.fruites.map((fruite, index) =>
        <p><label htmlFor={fruite.id}>
          <input 
            className="filled-in"
            type="checkbox"
            id={fruite.id}
            onChange={this.handleCheckChieldElement.bind(this, index)}
            checked={fruite.isChecked}/>
          <span className="font2">{fruite.label}</span>
          </label></p>
          )} */}
        <h1>
        
        </h1>
        </Modal>
      
   
    
    </div>:
      <Home />
    }

</div>
		);
	}
}

Campaign_Form.propTypes={
  auth:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
  auth:state.auth
});
export default connect(mapStateToProps)(Campaign_Form);



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