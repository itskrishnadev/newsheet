//get the props from the row and put it in state.
//get the changed guys only and call up the update calls.


import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from "../../../../node_modules/materialize-css/dist/js/materialize.min.js";
import SideNav from "../../layout/SideNav";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import axios from "axios";
import moment from "moment";
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import {Row, Col} from "react-bootstrap"
// import InfluencersModal from './Influencers-Modal'
import { ExportReactCSVINeditFOrm } from './ExportReactCSV'
import  { Button,} from  "reactstrap";
// import { ExportReactCSV } from './ExportReactCSV';
import { ExportReactCSV2 } from './ExportReactCSV';
// import  { 
//   Button,
//   Modal,
// 	ModalHeader,
// 	ModalBody,
// 	ModalFooter
//   } from  "reactstrap";
  import { Modal } from 'antd';


const Home = () => <h2>Loading</h2>

//const axios=require('axios');
class Edit_Campaign extends Component {
	constructor(props){
    super(props);
    console.log(props);

    var arra= this.props.selected[9]
    console.log(arra);
		this.state={campaign_name:this.props.selected[0],isOpen:false,campaign_desc:this.props.selected[1],campaign_Date:this.props.selected[10],campaign_date:'',cost_influencer:this.props.selected[3],cost_monk:this.props.selected[4],influencers:this.props.selected[5],adv:this.props.selected[6],rem:this.props.selected[7],date:this.props.selected[2],campaign_status:this.props.selected[8],categories:arra,insta_results:null , response:false , selectedInflu_fromcall: [],list:[], selected_row: [],showLockedSelect:false,showPendSelect:false,showEmptystatus:false ,DontshwCate:false, visible:false,details:[],exportdis:true,selectColNotDn:true,selectColDn:false,  fruites: [
      {id:0     ,value:'Name Of Creator', isChecked: true},
      {id:1     ,value:'Name of Instagram', isChecked: true},
      {id:2     ,value:'Instagram Url', isChecked: true},
      {id:3     ,value:'Instagram Followers', isChecked: true},
      {id:4     ,value:'Insta story Commercials', isChecked: true},
      {id:5     ,value:'Insta static Commercials', isChecked: true },
      {id:6   ,value:'Insta video Commercials', isChecked: true},
      {id:7     ,value:'Youtube Url', isChecked: true},
      {id:8     ,value:'Youtube Subscribers', isChecked: true},
      {id:9    ,value:'Youtube video Commercials', isChecked: true},
      ],
}
	     this.handleInputChange = this.handleInputChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
         this.onChangeDate = this.onChangeDate.bind(this);
         this.deleteTodo = this.deleteTodo.bind(this);
         this.handleExport = this.handleExport.bind(this);
         this.handleSelect = this.handleSelect.bind(this);

         

	}

  handleInputChange(event){
  	//for every change, change the state for the specific id
  	const target=event.target;
  	const id=target.id;
  	const value=target.value;
  	this.setState({[id]:value});


     
  }
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel2 = e => {
    console.log(e);
    this.setState({
      isOpen: false,
    });
  };
   
    // for modal
showModal = () => {
  this.setState({selectColNotDn:false, selectColDn:true, exportdis:false })

  console.log("inside export")
  var self=this;
  // this.setState(prevState => ({
  //   isOpen: !prevState.isOpen
  // }));
  axios.get("/api/influencers/get_selected_influencers",{params:{name:this.state.campaign_name}}).then(function (response) {
    console.log(response);
    var Selected_list=response.data[0];
    var array = Selected_list['selected_data']
    console.log(Selected_list);
 for(var i=0; i<array.length; i++){
      var influencer = array[i]
      console.log(influencer.name)
      delete influencer.Beauty;delete influencer.Comedy;delete influencer.Cricketer;delete influencer.DIY;delete influencer.Education;delete influencer.Entertainment;delete influencer.Fashion;delete influencer.Female;delete influencer.Fitness;delete influencer.Food;delete influencer.Gamer;delete influencer.Grooming;delete influencer.Lifestyle;delete influencer.Male;delete influencer.Motivation;delete influencer.Music;delete influencer.No;delete influencer.Poet;delete influencer.Regional;delete influencer.Sports;delete influencer.Technology;delete influencer.Travel;delete influencer.Vlogger;delete influencer.checked;delete influencer.yt_video_date;delete influencer._id;delete influencer.insta_st_date;delete influencer.insta_static_date; delete influencer.insta_video_date; delete influencer.insta_video_date;  delete influencer.tiktok_video_date;delete influencer.undefined;
      delete influencer.tiktok;
      delete influencer[ 'Moto Vlogger' ];
      delete influencer[ 'Parent/ Mom' ];
      delete influencer[ 'Tik-Tok' ];
      delete influencer.instagram; delete influencer.tweet; delete influencer.yt_short; delete influencer.insta_avgrate;
      delete influencer['17-06-2020  12:09:54'];
      delete influencer['17-06-2020  01:19:02'];
      delete influencer['17-06-2020  01:19:22'];
      delete influencer['17-06-2020  01:20:16'];
      //delete influencer.Moto Vlogger; 
      //delete influencer.Parent/ Mom; 
     // delete influencer.Tik-Tok;
      // influencer.splice(0, 1,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30)
    }
    var array2 = array
    console.log(array)
   
    self.setState({list:array2, details:array2});
    })
   .catch(function (error) {
    console.log(error);
    });

  this.setState({
    visible: true,
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
  handleSelect(){
  



    var arr = this.state.details;
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
    this.setState({details:arr,visible: false,
   });
 }

  componentDidMount(){


    if(this.state.campaign_status=='Lock'){
      this.setState({showLockedSelect:true})
    }
    if(this.state.campaign_status=='Pending'){
      this.setState({showPendSelect:true})
    }

    if(this.state.campaign_status==""){
      this.setState({showEmptystatus:true})
    }
    if(this.state.categories!==undefined){
      this.setState({DontshwCate:true})
    }



    // var elems = document.querySelectorAll('.datepicker');
    // var instances = M.Datepicker.init(elems);

      //query the mongo for the whole database.
      //assuming all the new data is flagged up.
      var self=this;
      const mongo = require('mongodb').MongoClient;
      get_influencers(function(obj){
        //obj is the array 
        //put that array in the state
        //but dash has to be changed
        for(var i=0;i<obj.length;i++){
          obj[i]['checked']=false;
        }
        self.setState({insta_results:obj,response:true});
      })

//sending campaign name to api
console.log('krishna');
var self=this;
axios.get("/api/influencers/get_selected_influencers",{params:{name:this.state.campaign_name}}).then(function (response) {
 console.log(response);
 var Selected_list=response.data[0];
 console.log(Selected_list);


//  var array = Selected_list['selected_data']
//  console.log(Selected_list);
// for(var i=0; i<array.length; i++){
//    var influencer = array[i]
//    var name= array[i]['name']
//    console.log(name)
//    //influencer.splice(0, 1,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30)
//  }
//  var array2 = array
//  console.log(array)
//  self.setState({list:array2});


 //setting the selected row
//  self.setState({selected_row:Selected_list}); 

 //seting the influencer from the give campaing array
var row=[]
 /*for(var i=0;i<Selected_list.length;i++){
  var array=Selected_list[i]['selected_data'];

  for(var i=0;i<array.length;i++){
  var array2=array[i]['name'];
   row.push(array2);

  }
}*/

//console.log(row)

 
  self.setState({selectedInflu_fromcall:Selected_list['influencers'],selected_row:Selected_list['selected_data']});  
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
      date:date
    });
  }

  toggleModal = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  handleExport(event){
    console.log("inside export")
    var self=this;
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
    // self.setState({selectColDn:true});
    
    axios.get("/api/influencers/get_selected_influencers",{params:{name:this.state.campaign_name}}).then(function (response) {
      console.log(response);
      var Selected_list=response.data[0];
      var array = Selected_list['selected_data']
      console.log(Selected_list);
   for(var i=0; i<array.length; i++){
        var influencer = array[i]
        console.log(influencer.name)
        delete influencer.Beauty;delete influencer.Comedy;delete influencer.Cricketer;delete influencer.DIY;delete influencer.Education;delete influencer.Entertainment;delete influencer.Fashion;delete influencer.Female;delete influencer.Fitness;delete influencer.Food;delete influencer.Gamer;delete influencer.Grooming;delete influencer.Lifestyle;delete influencer.Male;delete influencer.Motivation;delete influencer.Music;delete influencer.No;delete influencer.Poet;delete influencer.Regional;delete influencer.Sports;delete influencer.Technology;delete influencer.Travel;delete influencer.Vlogger;delete influencer.checked;delete influencer.yt_video_date;delete influencer._id;delete influencer.insta_st_date;delete influencer.insta_static_date; delete influencer.insta_video_date; delete influencer.insta_video_date;  delete influencer.tiktok_video_date;delete influencer.undefined;
        delete influencer.tiktok;
        delete influencer[ 'Moto Vlogger' ];
        delete influencer[ 'Parent/ Mom' ];
        delete influencer[ 'Tik-Tok' ];
        delete influencer.instagram; delete influencer.tweet; delete influencer.yt_short; delete influencer.insta_avgrate;
        delete influencer['17-06-2020  12:09:54'];
        delete influencer['17-06-2020  01:19:02'];
        delete influencer['17-06-2020  01:19:22'];
        delete influencer['17-06-2020  01:20:16'];
        //delete influencer.Moto Vlogger; 
        //delete influencer.Parent/ Mom; 
       // delete influencer.Tik-Tok;
        // influencer.splice(0, 1,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30)
      }
      var array2 = array
      console.log(array)
     
      self.setState({list:array2});
      })
     .catch(function (error) {
      console.log(error);
      });

    
           
  }
  handleSubmit(event){
  	//make the update call here
    //filter the fields which need to be sent.
    //loop through the variables and check if they have changed and the make two arrays of fields and values.
   
    const name= this.props.selected[0];
    var fields=[];
    var values=[];

    //I just need to check all of them and update the arrays 


    if(this.state.campaign_name!=(this.props.selected[0])){
    	fields.push("campaign_name");
    	values.push(this.state.campaign_name);
    }
    if(this.state.campaign_desc!=(this.props.selected[1])){
    	fields.push("campaign_desc");
    	values.push(this.state.campaign_desc);

    }

    if(this.state.date!=(this.props.selected[2])){
    	fields.push("campaign_date");
    	values.push(this.state.campaign_date);

    }

    
    if(this.state.campaign_Date!=(this.props.selected[10])){
    	fields.push("campaign_Date");
    	values.push(this.state.campaign_Date);

    }

  

    if(this.state.cost_influencer!=(this.props.selected[3])){
    	fields.push("cost_influencer");
    	values.push(this.state.cost_influencer);

    }

    if(this.state.cost_monk!=(this.props.selected[4])){
    	fields.push("cost_monk");
    	values.push(this.state.cost_monk);

    }
    if(this.state.influencers!=(this.props.selected[5])){
    	fields.push("influencers");
    	values.push(this.state.influencers);

    }
    if(this.state.adv!=(this.props.selected[6])){
    	fields.push("adv");
    	values.push(this.state.adv);

    }
    if(this.state.rem!=(this.props.selected[7])){
    	fields.push("rem");
    	values.push(this.state.rem);

    }
    if(this.state.campaign_status!=(this.props.selected[8])){
    	fields.push("campaign_status");
    	values.push(this.state.campaign_status);

    }
    console.log(fields);
    console.log(values);
    //make the call

    axios.post("/api/campaigns/update_campaign",{
    	name:name,
    	fields:fields,
    	values:values
    })
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    });

    }
    deleteTodo(index){
      console.log(index)
       var influencers =this.state.influencers;
       influencers.splice(index, 1)
       this.setState({influencers})
  }

//   exportClick(event){
//     // event.preventDefault();
//       // var elems = document.querySelectorAll('.datepicker');
//     // var instances = M.Datepicker.init(elems);
// var campaign= this.state.campaign_name;
// console.log(campaign)
//       //query the mongo for the whole database.
//       //assuming all the new data is flagged up.
//       var self=this;
//       const mongo = require('mongodb').MongoClient;
//       get_influencers(function(obj){
//         //obj is the array 
//         //put that array in the state
//         //but dash has to be changed
//         for(var i=0;i<obj.length;i++){
//           obj[i]['checked']=false;
//         }
//         self.setState({insta_results:obj,response:true});
//       })
// //sending campaign name to api
// console.log('krishna');
// var self=this;
// axios.get("/api/users/get_selected_influencers",{params:{name:campaign}}).then(function (response) {
//  console.log(response);
//  var Selected_list=response.data[0];
//  console.log(Selected_list);

//  var csv_arr=[]
//  var obj={"Campaign Name":Selected_list['campaign_name'],"Campaign Description":Selected_list['campaign_desc'],"Influencers":Selected_list['influencers'],"Campaign Date":Selected_list['campaign_date'],"Cost Influencer":Selected_list['cost_influencer'],"Cost Monk":Selected_list['cost_monk'],"Advance":Selected_list['adv'],"Remaining":Selected_list['rem'],"campaign_status":Selected_list['campaign_status']}
//  console.log(obj)
//  csv_arr.push(obj);
//  console.log(csv_arr)



 
//   self.setState({details:csv_arr});  
//  })
// .catch(function (error) {
//  console.log(error);
//  });
//   }
  // open() {
  //   this.setState({showModal: true});
  // }
  
  // close() {
  //   this.setState({showModal: false});
  // }
   
render(){

  return(
    <div style={{padding: "0px 10%"}}>
 
     

    <div>
      <div style={{marginLeft:"1%"}}>


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
<p style={{marginTop:"-1%"}}>Please fill in the following details before proceeding ahead.</p>

</div>


</div>



  <div> 
  <form class="col s12" style={{marginTop:"2%"}} onSubmit={this.handleSubmit}>

    <Row>
      <Col lg={4} md={4} sm={12} xs={12}>
        <h4 className="font2">Campaign Details</h4>
      </Col>

      <Col lg={8} md={8} sm={12} xs={12}>
        <Row>
        <Col lg={6} md={6} sm={12} xs={12}>
       
          <div class="input-field ">
          <input id="campaign_name" type="text" class="validate"  class="validate"  value={this.state.campaign_name} onChange={this.handleInputChange}  />
      <label class ="active" for="campaign_name">Campaign Name</label>
    </div>
      </Col>
      <Col lg={6} md={6} sm={12} xs={12}>
      <div class="input-field">
            <input id="campaign_desc" type="text" class="validate" value={this.state.campaign_desc}  onChange={this.handleInputChange} />
            <label class="active" for="campaign_desc">Campaign Description</label>
          </div>
      </Col>

        </Row>
   
      
      </Col>
   
    </Row>

    <Row>
      <Col lg={4} md={4} sm={12} xs={12}>
        <h4 className="font2">Collaterals</h4>
      </Col>

      <Col lg={8} md={8} sm={12} xs={12}>
        <Row>
        <Col lg={6} md={6} sm={12} xs={12}>
        <div class="input-field ">
      <input id="cost_influencer" type="number" class="validate" value={this.state.cost_influencer}  onChange={this.handleInputChange} />
      <label class ="active" for="cost_influencer">Influencer cost</label>
    </div>
    
      </Col>
      <Col lg={6} md={6} sm={12} xs={12}>
      <div class="input-field ">
      <input id="cost_monk" type="number" class="validate" value={this.state.cost_monk}  onChange={this.handleInputChange} />
      <label class="active" for="cost_monk">Monk-E cost</label>
    </div>
      </Col>

        </Row>

      
      </Col>
   
    </Row>

    <Row>
      <Col lg={4} md={4} sm={12} xs={12}>
        <h4 className="font2">Influencers</h4>
      </Col>

      <Col lg={8} md={8} sm={12} xs={12}>
        <Row>
        <Col lg={4} md={4} sm={12} xs={12}>
          <h5 style={{fontSize:"1em"}}>
            Selected Influencers
          </h5>
                {/* <ol>
                  {this.state.influencers.map(function(item, i) {
                    return <li key={item} >
                          {item}
                          <button onClick={() => { this.removeItem(item, i)}}>x</button>
                          </li>;
                  })}
                </ol> */}

           
              
              {/* {this.state.response ? <InfluencersModal dash={this.state.insta_results} selected_row={this.state.selected_row} campaign_name={this.state.campaign_name} sel_influ={this.state.selectedInflu_fromcall} total_cost={this.state.cost_influencer} monk_fee={this.state.cost_monk}/>:
          //{this.state.response ?<Dash dash={this.state.insta_results} />:
          <Home />
          } */}

      </Col>

      
      <Col lg={4} md={4} sm={12} xs={12}>
          <div class="input-field ">

          <SingleDatePicker
        date={this.state.date} // momentPropTypes.momentObj or null
        onDateChange={this.onChangeDate} // PropTypes.func.isRequired
        focused={this.state.focused} // PropTypes.bool
        onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
        id="campaign_date" // PropTypes.string.isRequired,
        numberOfMonths={1}
        openDirection='up'
        showDefaultInputIcon
        inputIconPosition="after"
        displayFormat={() => "DD/MM/YYYY" }
  
/>
      {/* <SingleDatePicker
      date={this.state.moment} // momentPropTypes.momentObj or null
      onDateChange={this.onChangeDate} // PropTypes.func.isRequired
      focused={this.state.focused} // PropTypes.bool
      onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
      id="campaign_date" // PropTypes.string.isRequired,
      numberOfMonths={1}
      enableOutsideDays
      showDefaultInputIcon
      inputIconPosition="after"
      displayFormat={() => "DD/MM/YYYY" }
      required

/> */}

    </div>
      </Col>

      <Col lg={4} md={4} sm={12} xs={12}>
      
      {this.state.DontshwCate && 
      <div>
      <h5 style={{fontSize:"1em"}}>
              Category
            </h5>
                  <ul >
                    {this.state.categories.map(function(item) {
                      return <li key={item}>{item}</li>;
                    })}
                  </ul>
                  </div>
}
      </Col>
    
        </Row>
      
      </Col>
   
    </Row>

    <Row>
      <Col lg={4} md={4} sm={12} xs={12}>
        <h4 className="font2">Status</h4>
      </Col>

      <Col lg={8} md={8} sm={12} xs={12}>
        <Row>
        <Col lg={6} md={6} sm={12} xs={12}>
        <div class="input-field ">
{this.state.showLockedSelect && 
  <select  className="browser-default" id="campaign_status"  onChange={this.handleInputChange} >  
  <option value={this.state.campaign_status}  selected>Lock</option>
  <option value="Pending" >Pending</option>
  </select>
}

{this.state.showPendSelect && 
  <select  className="browser-default" id="campaign_status"  onChange={this.handleInputChange} >  
  <option value={this.state.campaign_status}  selected>Pending</option>
  <option value="Lock" >Lock</option>
  </select>
}
{this.state.showEmptystatus && 
 <select  className="browser-default" id="campaign_status"  onChange={this.handleInputChange} >  
 <option value="" disabled selected>Assign Status</option>
 <option value="Lock" >Lock</option>
 <option value="Pending" >Pending</option>
 </select>
}
         
          </div>
          </Col>


        </Row>

        <Row>
   
        <input type="submit" value="Save" className="my-buttoninform1" />

                  {/* Modal Part */}

                  <div>
      
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
          
          <input type="checkbox" id={fruite.id} className=" mycheckbox" defaultChecked = "false" onChange={this.handleCheckChieldElement.bind(this, index)} />{fruite.value}
        </li>
      )}
    {/* {
      this.state.fruites.map((fruite, index) => {
        return (<CheckBox key={index}  handleCheckChieldElement={this.handleCheckChieldElement} onToggle={this.onToggle}  {...fruite} />)
      })
    } */}
    </ul>
    <h1>
    
    </h1>
    </Modal>
    </div>

        {/* <div className="col-md-4 center">
          <ExportReactCSV csvData={this.state.list} fileName={this.state.campaign_name} />
         </div> */}
         {/* {this.state.selectColNotDn && <Button className="my-buttoninform1" onClick={this.handleExport}>Export</Button>} */}
       <ExportReactCSV2 csvData={this.state.details} exportdis={this.state.exportdis}   fileName={this.state.campaign_name} />
         <Button className="my-buttoninform1"  onClick={this.showModal}>Select Colunms</Button>
        

        </Row>
     
      
      </Col>
   
    </Row>

   
    </form>
    

  </div>
  {/* <Modal
      title="Confirm Export"
      visible={this.state.isOpen}
      footer={null}
      // onOk={this.handleSelect}
      onCancel={this.handleCancel2}
    >
      <h2>Are you sure?</h2>
<div className="ant-modal-footer">
<Button className="dash-button " onClick={this.toggleModal}>Cancel</Button>{' '}
 <ExportReactCSVINeditFOrm csvData={this.state.list} fileName={this.state.campaign_name} />
</div>

    </Modal> */}
  {/* <Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
          <ModalHeader className="text-center" toggle={this.toggleModal}>
            <h2>Are you sure?</h2>
          </ModalHeader>
          <ModalBody>Confirm the export</ModalBody>
          <ModalFooter>
          <Button className="dash-button " onClick={this.toggleModal}>Cancel</Button>{' '}

          <ExportReactCSVINeditFOrm csvData={this.state.list} fileName={this.state.campaign_name} />

          </ModalFooter>
          </Modal> */}




  </div>


  );
}


}

export default Edit_Campaign;


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


// export const ExportReactCSV = ({csvData, fileName}) => {
//   console.log(csvData);
//   return (
      
//             <CSVLink data={csvData} filename={"my-file.csv"} className="black-text">Export</CSVLink>

      
//   )
  
// }


//<div className="col-md-4 center">
  //           <ExportReactCSV csvData={this.state.list} fileName={this.state.campaign_name} />
    //        </div>


















