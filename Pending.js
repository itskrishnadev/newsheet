//get the list for the username being in the doers.
import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from 'react-redux';
import SideNav from "../../layout/SideNav";
import Edit_Campaign from"./editcampaign";
import Execution_Form from"../execution/execution_form";
import NumberFormat from 'react-number-format';
import { BootstrapTable, TableHeaderColumn  } from 'react-bootstrap-table';
import ReactDOM from 'react-dom';
import {ExportExcelforLockedNPending} from './exportExcel'

import  { 
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Row,
	Col
} from  "reactstrap";

import axios from "axios";
import { ExportReactCSV } from './ExportReactCSV'
import moment from "moment";
import Execution_Sheet from "../execution/execution_sheet";
import LockedCampaign from './lockedCampaign'
import DeleteIcon from '../../../assets/delete.svg'
import MovetoIcon from '../../../assets/move_to.svg'
import {Home} from './Home'

//const axios = require('axios');

class Pending extends Component {


    constructor(props){
    	super(props);
		this.state={
				list:[],
				onClick:false,
				onedit:false,
				elem_details:[],
				selected_data:[],
				campaign_name:'',  
				isOpen: false,
				rmcampang:'',
				select_campaign_name:'',
				rmcampang:'',
				table_value:[],
				total_cost:null,
				monk_fee:null,
				selected_row:[],
				loader:false
			}

        this.handleClick = this.handleClick.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleChecked = this.handleChecked.bind(this);
		this.handleCheckedAll = this.handleCheckedAll.bind(this);
		this.movetoLocked = this.movetoLocked.bind(this);
		this.deleteCampaing = this.deleteCampaing.bind(this);
		this.backfun = this.backfun.bind(this);
		this.update_campaign = this.update_campaign.bind(this);


	}

	update_campaign(){
		var self=this;
		console.log('hi');
		axios.get("/api/campaigns/get_campaigns_pending",{params:{name:self.props.auth.user.name}}).then(function (response) {
		console.log(response);
		var list=response.data;

		for(var i= 0; i<list.length; i++ ){
			var single_campaign= list[i]
			list[i].checked = false;
			var date = single_campaign.campaign_date

			//for displaying mobile number and person incharge
			var num= list[i]["contact_no"];
			var person= list[i]["person_in"];
			list[i].per_con= num +' - '+ person
			// var krishna= date.toString().split(" ").slice(0, 4).join(" ");
			var krishna= date.toString().split(' ').splice(0, 5).join(' ')
			list[i].campaign_date=krishna



			var to= 0 
			var fe=0
			var selectData = list[i]["selected_data"] 
			for(var j = 0 ; j<selectData.length ; j++){
				to = to + selectData[j]['brand_total_cost']
				fe = fe + selectData[j]['agency_total_fee']
			}
			list[i]["cost_influencer"] = to

			list[i]["cost_monk"]= fe
			
		}


		console.log(list);
		list.reverse()
		console.log(list);

		self.setState({list:list});
			//console.log(this.state.list);
			//how do you get the form?.
			//whn clicked you open the form , but how do you idenify and populate the form.
			//for identification give it an id same as the taskname or the rkey.
			//go with the id and search for the details  in the state.
			//save button should call the updates api.
			
			


			

		})
	.catch(function (error) {
		console.log(error);
		});
	 }
	
	handleCheckedAll(event){
		//get all check the check event in here
		var self=this;
		const target=event.target;
		// const campaign_name=target.name;
		// console.log(campaign_name);
		//the default check status is false every other time we change it.
		console.log(self.state.value);
		var arr=self.state.list;
		console.log(arr);
		for(var i=0;i<arr.length;i++){
		
			  var bool=arr[i]['checked'];
			  arr[i]['checked']=(!bool);
			  
		   
		}
		self.setState({list:arr});
			}
			handleChecked(event){

				const { checked, type } = event.target;
				//get the check event in here
				var self=this;
				const target=event.target;
				const campaign_name=target.name;
				console.log(campaign_name);
				//the default check status is false every other time we change it.
				console.log(self.state.value);
				var arr=self.state.list;
				var row = this.state.selected_row
				console.log(arr);
				if (type === "checkbox" && checked === true) {
				for(var i=0;i<arr.length;i++){
				   if(arr[i]['campaign_name']==campaign_name){
					  var bool=arr[i]['checked'];
					  arr[i]['checked']=(true);
					  row.push(arr[i])
					  console.log(row)
					  
				   }
				}

				self.setState({list:arr, selected_row:row});
			}


			else {
				// this.setState(state => state.count--, this.logCount)
				console.log("Yo delete the array")
				console.log(this.state.selected_row)
				for(var i=0;i<this.state.selected_row.length;i++){
					
				  if(this.state.selected_row[i]['campaign_name']==campaign_name){

					var krishna = this.state.selected_row[i];
					var bool = this.state.selected_row[i]['checked']
					this.state.selected_row[i]['checked'] = (false)
					console.log(krishna)
					//pop both 
				   row.splice(i,1);
				  //  console.log(this.state.krishna);
		  
				  }
				}
				 this.setState({selected_row:row} )
			  }
				
		  
			 }
	componentDidMount(){
		//get the api results and store it in the state and then render.
		var self=this;
		console.log('hi');
		axios.get("/api/campaigns/get_campaigns_pending",{params:{name:self.props.auth.user.name}}).then(function (response) {
        console.log(response);
        var list=response.data;
		console.log(list);
		for(var i= 0; i<list.length; i++ ){
			var single_campaign= list[i]
			list[i].checked = false;
			var date = single_campaign.campaign_date

			//for displaying mobile number and person incharge
			var num= list[i]["contact_no"];
			var person= list[i]["person_in"];
			list[i].per_con= num +' - '+ person
			// var krishna= date.toString().split(" ").slice(0, 4).join(" ");
			var krishna= date.toString().split(' ').splice(0, 5).join(' ')
			list[i].campaign_date=krishna



			var to= 0 
			var fe=0
			var selectData = list[i]["selected_data"] 
			for(var j = 0 ; j<selectData.length ; j++){
				to = to + selectData[j]['brand_total_cost']
				fe = fe + selectData[j]['agency_total_fee']
			}
			list[i]["cost_influencer"] = to

			list[i]["cost_monk"]= fe
			
		}
		list.reverse()
		self.setState({list:list});
			//console.log(this.state.list);
			//how do you get the form?.
			//whn clicked you open the form , but how do you idenify and populate the form.
			//for identification give it an id same as the taskname or the rkey.
			//go with the id and search for the details  in the state.
            //save button should call the updates api.
            
			


            

        })
       .catch(function (error) {
        console.log(error);
        });
   }

   toggleModal = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

   deleteEntry= (event) => {
	const self= this;
	const campaign_name= this.state.rmcampang;
	const username= this.props.auth.user.name;
	this.setState({
		loader:true
	})
  axios({
	method: 'post',
	url: "/api/campaigns/delete_campaign",
	data: {
		name: username,
		campaign:campaign_name
	  }
  })
  // new brand api call

  .then(function (response) {
	  axios.get("/api/campaigns/get_campaigns_pending",{params:{name:self.props.auth.user.name}}).then(function (response) {
		  console.log(response);
		  var list=response.data;
		  console.log(list);
		  self.setState({list:list, loader:false});
		  
		  })
		 .catch(function (error) {
		  console.log(error);
		  });

	console.log(response);
	})
	.catch(function (error) {
	console.log(error);
	});
	this.setState(prevState => ({
	  isOpen: !prevState.isOpen
	}));
	  }
	
			
    handleClick(event) {
	  //get the target value
	  console.log("clicked");
      event.preventDefault();
      const target=event.target;
      console.log(target);
      const value=target.id;
	  console.log(value);
	  const title=target.title;
	  console.log(title);


      var list=this.state.list;
      var self=this;
	  var arr=[];
	  //I need to handle the execute click here as well.
	  //pass the name as props.
     if(title=="edit"){

      for(var i=0;i<list.length;i++){
      	if(list[i]['campaign_name']==value){
			var arr = list[i];
      		//get the particular i and get the other details and render the form
      		// arr[0]=list[i]['campaign_name'];
			// arr[1]=list[i]['campaign_desc'];
		
			// var date=moment(list[i]['campaign_date']);

      		// arr[2]=date;
      		// arr[3]=list[i]['cost_influencer'];
			// arr[4]=list[i]['cost_monk'];  
			// arr[5]=list[i]['influencers'];  
			// arr[6]=list[i]['adv'];
			// arr[7]=list[i]['rem'];
			// arr[8]=list[i]['campaign_status'];
			// arr[9]=list[i]['categories'];
			// arr[10]=list[i]['campaign_Date'];
        
  


			
      		console.log(arr);
      		
      		







      		self.setState({list:list,onClick:true,onedit:true,elem_details:arr});

      		console.log(self.state);

      		//set state onclick=true and set clicked data to the data retrieved.
			  //put the condition if true render the editable form with the props.  
			  //pretty if on-edit click render edit.
			  //if onexecute click render execute.
			  //keep a parent condition to get either the table or edit and execute.
			  //once that parent condition is false we check for the other condition for edit or execute.
              
			  
      	}
      }
	}

	if(title=="execute"){
		//set the state where onclick is true
		for(var j=0;j<list.length;j++){
		  //get the data from the selected influencers
		  if(list[j]['campaign_name']==value){
			console.log(list[j]['selected_data']);
		   var selected_data=list[j]['selected_data'];
		   var obj={campaign_name:list[j]['campaign_name']};
		   var name=list[j]['campaign_name'];

		   var obj1={campaign_owner:list[j]['campaign_owner']};
		   selected_data.push(obj);
           selected_data.push(obj1);
		  }
		}
		
		self.setState({onClick:true,selected_data:selected_data,campaign_name:name});
        
	}
      
	if(title=="delete"){
		this.setState(prevState => ({
			isOpen: !prevState.isOpen
		  }));

		 

		for(var j=0;j<list.length;j++){
			//get the data from the selected influencers
			if(list[j]['campaign_name']==value){
				console.log(this.state);
		const campaign_name= value;
		this.setState({rmcampang:campaign_name});
		console.log(campaign_name)
		// const username= this.props.auth.user.name;
		// axios({
		//   method: 'post',
		//   url: "/api/users/delete_campaign",
		//   data: {
		// 	  name: username,
		// 	  campaign:campaign_name
		// 	}
		// })
		// new brand api call
 
		// .then(function (response) {
		// 	axios.get("/api/users/get_campaigns_locked",{params:{name:self.props.auth.user.name}}).then(function (response) {
		// 		console.log(response);
		// 		var list=response.data;
		// 		console.log(list);
		// 		self.setState({list:list});
				
		// 		})
		// 	   .catch(function (error) {
		// 		console.log(error);
		// 		});
	  
		//   console.log(response);
		//   })
		//   .catch(function (error) {
		//   console.log(error);
		//   });
	
			}
		  }
		//set the state where onclick is true
		
        
	}


	}
	
	backfun(){
		this.setState({
		  onClick:false
		})
	}
	handleOnChange(e){
		console.log(e.target.value)
		let value= e.target.value;
		let list = this.state.list;

			for(let i = 0; i<list.length; i++){
				if(value==list[i]["campaign_name"]){
					console.log(list[i])
					var obj= list[i]['selected_data']
					var total= list[i]['cost_influencer']
					var agency = list[i]['cost_monk']
					console.log(total)
					console.log(agency)
					this.setState({
						table_value:obj,
						total_cost:total,
						monk_fee:agency
					})
				}
			}

		this.setState({
			select_campaign_name:value
		})
		console.log(this.state.select_campaign_name)

		}



	
		deleteCampaing=() => {
			console.log("delete influencer")
			var list =this.state.list
			var self = this
			this.setState({
				loader:true
			})	
			 axios({
				method: 'post',
				url: "/api/campaigns/delete_campaign",
				data: this.state.selected_row
				})
				// new brand api call
		
				.then(function (response) {
					axios.get("/api/campaigns/get_campaigns_pending",{params:{name:self.props.auth.user.name}}).then(function (response) {
						console.log(response);
						var list=response.data;
						list.reverse();
						console.log(list);
						self.setState({list:list, loader:false});
						
						})
					.catch(function (error) {
						console.log(error);
						});
			
				console.log(response);
				})
				.catch(function (error) {
				console.log(error);
				});

			  }

			  movetoLocked(event){

				var self = this
				console.log("move to pending")
				var list =this.state.list
				var obj = []
				var row =this.state.selected_row
				this.setState({
					loader:true
				})
				for(var i = 0 ; i<row.length; i++){
					var arr = {
						"campaign_name": row[i]['campaign_name'],
						"obj":{"campaign_status":"Lock"}
					}

					obj.push(arr)
					console.log(arr)

				}

				console.log(obj)
				axios({
					method: 'post',
					url: "/api/campaigns/update_campaign",
					data: {
						obj:obj
					}
					})
					// new brand api call
			
					.then(function (response) {
						axios.get("/api/campaigns/get_campaigns_pending",{params:{name:self.props.auth.user.name}}).then(function (response) {
							console.log(response);
							var list=response.data;
							console.log(list);
							list.reverse();
							self.setState({list:list , loader:false});
							
							})
						.catch(function (error) {
							console.log(error);
							});
				
					console.log(response);
					})
					.catch(function (error) {
					console.log(error);
					});

				// var value = this.state.value
				// for(var j=0;j<list.length;j++){
				//   console.log("in")
				// 	if(list[j]["checked"] == true){
				// 		console.log(list[j]);
				// 		list.splice(j,1);
				// 	}
		
				//  }
				 this.setState({list:list} )

			  }
	render(){
		//map the data in here
		const selectRow = {
			mode: 'checkbox',  // multi select
			onSelect: this.handleRowSelect,
			customComponent: this.customMultiSelect,
			 className: 'my-selection-custom'
		  };

		  const cellEditProp = {
			mode: 'click',
			blurToSave: true,
			// afterSaveCell: this.afterSaveCell,
			// beforeSaveCell: this.beforeSaveCell,
		  };
		//<Edit_Campaign selected={this.state.elem_details} />
		return(
			<div class="list">
			<div className="col-md-4 center">
             {/* <ExportReactCSV csvData={this.state.list} fileName={this.state.campaign_name} /> */}
            </div>
			<SideNav/>
			{this.state.onClick ? this.state.onedit ? <LockedCampaign user={this.props.auth.user.name} selected={this.state.elem_details} backfun={this.backfun} update_campaign= {this.update_campaign}/>:<Execution_Sheet dash={this.state.campaign_name} /> :
  				<>
				
				  <div style={{padding: "1em 3em 0 6em"}}>
  
				  <div className="row">  
							   <span>
								  <h6 className="lockec-head">
									  Pending Sheets
								  </h6>
							  </span>
  
							  <span style={{marginTop: "-0.5em"}} className="display-butt23">
		   <span class="inner12 krbt" onClick={this.deleteCampaing}><img src={DeleteIcon} className="icon-ht"/> <span className="simpletext theme-col" style={{marginLeft: "-6px"}} > Delete</span> </span> 
		   <span class="inner12 krbt" onClick={this.movetoLocked} ><img src={MovetoIcon} className="icon-ht"/><span className=" simpletext theme-col" > Move to Locked</span> </span> 
		   </span>
					  </div>
  
  
					  <section className="locked-sec">
				  <table className="locked-table">
				  <thead key="thead" style={{border: "0.7em solid #fff"}}>
		  
				  <tr>
				  <th className="first-column"><label><input type="checkbox"  class="filled-in" onChange={this.handleCheckedAll} /><span></span> </label></th>
				  <th style={{width: "13em"}} className=""><span>Date</span></th>
				  <th><span>Campaign Name</span></th>
				  <th ><span>Brand Name</span></th>
				  <th><span>Amount</span></th>	
				  <th ><span>Agency Fee</span></th>
				  <th className="last-column"><span>Contact</span></th>
				  {/* <th  >Person</th> */}
  
				  {/* <th>Influencers</th> */}
				  {/* <th >Status</th>
				  <th>Edit</th>
				  <th >Execute</th>
				  <th >Delete</th> */}
				  
				  </tr>
				  </thead>
  
				  <tbody>
				  {this.state.list.map(v=>
  
					  <tr key={v['campaign_name']} className={v['checked'] ? "custom-class" : null} >
					  <td className="yo-check"><label><input type="checkbox" name={v['campaign_name']} checked={v['checked']} class="filled-in" onChange={this.handleChecked} /><span></span> </label></td> 
					  <td className="sec-td">{v['campaign_Date']}</td>
  
		  <td style={{textDecoration:"underline",cursor:"pointer"}} title="edit" onClick={this.handleClick} id={v['campaign_name']} >{v['campaign_name']}</td>
		  
		  <td>{v['adv']}</td>
		  <td>  <NumberFormat
                  displayType={"text"}
                  thousandSeparator={true}
                  value={v['cost_influencer']}
                /></td>
		<td >
		<NumberFormat
                  displayType={"text"}
                  thousandSeparator={true}
                  value={v['cost_monk']}
                />
				</td>
		  <td className="last-td">{v['per_con']}</td>
		  {/* <td className="last-td">{v['person_in']}</td> */}
  
		  {/* <td><i className="material-icons"  title="edit" onClick={this.handleClick} id={v['campaign_name']}>edit</i></td>
		  <td ><i className="material-icons" title="execute" onClick={this.handleClick} id={v['campaign_name']}>subdirectory_arrow_right</i></td>
		  <td ><i className="material-icons" title="delete" onClick={this.handleClick} id={v['campaign_name']}>delete</i></td> */}
					  </tr>
				  )}
  
  
				  </tbody>
			  </table>
			  </section>
			  </div>
			  </>
		}

{
 this.state.loader && <Home visible={this.state.loader} />
}		
<Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
          <ModalHeader className="text-center" toggle={this.toggleModal}>
          
            <h2>Are you sure?</h2>
          </ModalHeader>
          <ModalBody>Do you really want to delete these records? This process cannot be undone.</ModalBody>
          <ModalFooter>
            <Button className="dash-button " onClick={this.toggleModal}>Cancel</Button>{' '}
            <Button className="dash-button " style={{background:'red'}} onClick={this.deleteEntry}>Delete</Button>
          </ModalFooter>
          </Modal> 

	</div>











	)
	}
}

Pending.propTypes={
  auth:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
  auth:state.auth
});


export default connect(mapStateToProps)(Pending); 


//after locking we need to get the new form opened, the influencer details need to be prefetched, need to include it in the influencers-full collection.
//let's get the button in the locked forms dash.
//then there has to be a new button to display the executed sheets and the edit button to edit them.

 




