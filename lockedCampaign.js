import React, { Component } from "react";
import NumberFormat from "react-number-format";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ReactDOM from "react-dom";
import { ExportExcelforLockedNPending,ExportPdfforLockedNPending } from "./exportExcel";
import DeleteIcon from "../../../assets/delete.svg";
import MovetoIcon from "../../../assets/move_to.svg";
import axios from "axios";
import { Drawer, ButtonToolbar } from "rsuite";
import { Button } from "reactstrap";
import moment from "moment";
import { Home } from "./Home";
import { SingleDatePicker} from 'react-dates';
import { Dialog, DialogActionsBar, Window } from '@progress/kendo-react-dialogs';

// import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

export class LockedCampaign extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    console.log(props);
    console.log(this.props.selected.campaign_name);
    console.log(this.props.user);
    var selected = this.props.selected;
    var count = selected.selected_data.length;

    this.state = {
      rmcampang: "",
      campaign_name: selected.campaign_name,
      total_cost: null,
      brand_name: selected.adv,
      monk_fee: null,
      table_value: selected.selected_data,
      user: this.props.user,
      selected_row: [],
      locked_or_not: this.props.locked_or_not,
      show_d1: false,
      show_d2: false,
      campaign_Date: selected.campaign_Date,
      count: count,
      status: selected.campaign_status,
      islocked: false,
      ispending: false,
      ytlink: "",
      instalink: "",
      view: null,
      insta_like: "",
      insta_comment: "",
      reportEntry: [],
      insta_view: "",
      share: "",
      krishna: [],
      name: "",
      loader: false,
      influrncer_total:null,
      youtubeonly:false,
      instaonly:false,
      inf_name:[],
      visibleDialog:false,
      show_ins_st:false,
      show_ins_stat:false,
      show_ins_vide:false,
      show_ytVid:false,
      ekinfHai:false,
      AllBrandArray:[],
      onlyonePresent:false

    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.deleteinfluecer = this.deleteinfluecer.bind(this);
    this.movetoPending = this.movetoPending.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.toggleDrawer_2 = this.toggleDrawer_2.bind(this);
    this.closekar = this.closekar.bind(this);
    this.enteredLink = this.enteredLink.bind(this);
    this.saveEntry = this.saveEntry.bind(this);
    this.editchange = this.editchange.bind(this);
    // this.onChangeDateone = this.onChangeDateone.bind(this);
    // this.onChangeDatetwo = this.onChangeDatetwo.bind(this);
    this.dateChange = this.dateChange.bind(this);
  this.toggleDialog = this.toggleDialog.bind(this);

  }

  componentDidMount() {
    var self = this;
    // if (this.state.status == "Lock") {
    //   this.setState({
    //     islocked: true,
    //   });
    // }

    // if (this.state.status == "Pending") {
    //   this.setState({
    //     ispending: true,
    //   });
    // }
    var influrncer_total = this.state.influrncer_total
    var obj = []
    var total_cost= 0 ;
    var agency_fee = 0


    
    if(this.state.table_value.length>0){
      this.setState({
        ekinfHai:true
      })
    }

    function onlyUnique(value, index, self) { 
      return self.indexOf(value) === index;
  }


var table = this.state.table_value
var kr = []
    for(var i = 0 ; i< table.length ; i++){

      
      var name = table[i]['name'] 
      obj.push(name)
      var n =  table[i]['commercial_cost'] 
      influrncer_total = influrncer_total + n
      // table[i]['ytfocus'] = null
      // table[i]['instafocus'] = null
      total_cost = total_cost + table[i]['brand_total_cost'] 
      agency_fee = agency_fee + table[i]['agency_total_fee'] 


      var br_yt = parseInt(table[i]['brand_youtube_video'])
      var br_instor = parseInt(table[i]['brand_insta_story'])
      var br_inssta = parseInt(table[i]['brand_insta_static'])
      var br_insvide = parseInt(table[i]['brand_insta_video'])

      if( br_yt>0){

        var yt = "Youtube Video"
        kr.push(yt)

      //  this.setState({
      //    youtubeonly:true,
      //    show_ytVid:true,
      //  })
     } if( br_instor>0){
      var st = "Instagram Story"
      kr.push(st)

      // this.setState({
      //   instaonly:true,
      //   show_ins_st:true,

      // })

     } if( br_inssta>0){
      var sta = "Instagram Static"
       kr.push(sta)
      //  this.setState({
      //   instaonly:true,
      //   show_ins_stat:true,
      // })

     } if( br_insvide>0){
      var vd = "Instagram Video"
      kr.push(vd)

      // this.setState({
      //   instaonly:true,
      //   show_ins_vide:true,
      // })

     }

    }
    console.log(influrncer_total)

    var unique = kr.filter( onlyUnique );
    console.log(kr)   
    console.log(unique)
     
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

    this.setState({
      influrncer_total : influrncer_total,
      table_value:table,
      total_cost:total_cost,
      monk_fee: agency_fee,
      AllBrandArray:unique
  })
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

dateChange(e) {
    // console.log(id)
    var nameVal =e.target.name
    var id = e.target.id
    var value= e.target.value
    console.log(id)
    console.log(nameVal)
    console.log(value)

    var table = this.state.table_value
    if(id=='instaDate'){
      for(var i = 0 ; i<table.length;i++){
        var one = table[i]
       var  name = table[i]['name']
      if(nameVal==name){
  
      one['instaDate']=value
      console.log(one)
      }
  
  
      }
    }

    if(id=='ytDate'){
      for(var i = 0 ; i<table.length;i++){
        var one = table[i]
       var  name = table[i]['name']
      if(nameVal==name){
  
      one['ytDate']=value
      console.log(one)
      }
  
  
      }
    }

 
 

  axios({
    method: "post",
    url: "/api/campaigns/update_selected_influencers",
    data: {
      influencers: table,
      campaign_name: this.state.campaign_name,
      influencers_sel: this.state.inf_name,
    },
  })
    // new brand api call

    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    this.setState({
      table_value:table
    })    

  }


  handleOnChange(e) {
    console.log(e.target.value);
    let value = e.target.value;
    let list = this.state.list;

    for (let i = 0; i < list.length; i++) {
      if (value == list[i]["campaign_name"]) {
        console.log(list[i]);
        var obj = list[i]["selected_data"];
        var total = list[i]["cost_influencer"];
        var agency = list[i]["cost_monk"];
        console.log(total);
        console.log(agency);
        this.setState({
          table_value: obj,
          total_cost: total,
          monk_fee: agency,
        });
      }
    }

    this.setState({
      select_campaign_name: value,
    });
    console.log(this.state.select_campaign_name);
  }

  customMultiSelect(props) {
    const { type, checked, disabled, onChange, rowIndex } = props;
    /*
     * If rowIndex is 'Header', means this rendering is for header selection column.
     */
    if (rowIndex === "Header") {
      return (
        <div className="checkbox-personalized">
          <Checkbox {...props} />
          <label htmlFor={"checkbox" + rowIndex}>
            <div className="check"></div>
          </label>
        </div>
      );
    } else {
      return (
        <div className="checkbox-personalized">
          <input
            type={type}
            name={"checkbox" + rowIndex}
            id={"checkbox" + rowIndex}
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange(e, rowIndex)}
            ref={(input) => {
              if (input) {
                input.indeterminate = props.indeterminate;
              }
            }}
          />
          <label htmlFor={"checkbox" + rowIndex}>
            <div className="check"></div>
          </label>
        </div>
      );
    }
  }

  customHeaderClass() {
    return "influecer-name1";
  }
  columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
    return rowIdx % 1 === 0
      ? "influecer-cell"
      : "td-column-function-odd-example";
  }
  Yotube_brand(fieldValue, row, rowIdx, colIdx) {
    return rowIdx % 1 === 0 ? "yt-brand" : "td-column-function-odd-example";
  }
  Yotube_influ(fieldValue, row, rowIdx, colIdx) {
    return rowIdx % 1 === 0 ? "yt-influ" : "td-column-function-odd-example";
  }
  insta_whole(fieldValue, row, rowIdx, colIdx) {
    return rowIdx % 1 === 0 ? "insta_whole" : "td-column-function-odd-example";
  }

  handleRowSelect(row, isSelected, e, rowIdx) {
    //get the check event in here
    var self = this;
    console.log(row);
    // console.log(isSelected);
    const name = row.name;
    console.log(name);

    //to add the selected influencer in checked list
    var joined = this.state.krishna;

    //the default check status is false every other time we change it.
    // console.log(self.state.value);
    var arr = self.state.table_value;
    // console.log(arr);
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]["name"] == name) {
        //var bool=arr[i]['checked'];
        //arr[i]['checked']=(!bool);
        arr[i]["checked"] = isSelected;
        // console.log(arr[i]);
      }
    }
    self.setState({ table_value: arr });

    //listen the the onchange checked event
    const { checked, type } = e.target;
    let count = this.state.count;
    //check the checked checkbox
    if (type === "checkbox" && checked === true) {
      var joined = this.state.krishna;

      joined.push(name);
      this.setState({ krishna: joined });

      // this.setState(state => state.count++, this.logCount)

      var selectRow = this.state.selected_row;

      selectRow.push(row);
      this.setState({ selected_row: selectRow });
      console.log(selectRow);
    } else {
      this.setState((state) => state.count--, this.logCount);
      console.log("Yo delete the array");
      for (var i = 0; i < this.state.krishna.length; i++) {
        if (this.state.krishna[i] == name) {
          //pop both
          this.state.krishna.splice(i, 1);
          //   //  console.log(this.state.krishna);
        }
      }

      var selectRow = this.state.selected_row;
      // console.log(selectRow);
      for (var j = 0; j < selectRow.length; j++) {
        console.log("in");
        if (selectRow[j]["name"] == name) {
          // console.log(selectRow[j]);

          //pop object
          // delete selectRow[i];
          selectRow.splice(j, 1);
          console.log(selectRow);
        }
      }
      this.setState({ selected_row: selectRow });
    }
    // }
    return { color: rowIdx % 1 === 0 ? "red" : "blue" };
  }

  movetoPending() {
    const self = this;
    const campaign_name = this.state.campaign_name;
    const username = this.state.user;
    const campaign_status = this.state.campaign_status;
    axios({
      method: "post",
      url: "/api/users/update_campaign_staus",
      data: {
        name: username,
        campaign: campaign_name,
        campaign_status: this.state.campaign_status,
      },
    })
      // new brand api call

      .then(function (response) {
        axios
          .get("/api/campaigns/get_campaigns_locked", {
            params: { name: username },
          })
          .then(function (response) {
            console.log(response);
            var list = response.data;
            console.log(list);
            self.setState({ list: list });
            window.location.reload();
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

  priceFormatter(cell, row) {
    return (
      <div>
        <NumberFormat
          displayType={"text"}
          thousandSeparator={true}
          value={cell}
        />
      </div>
    );
  }
  deleteinfluecer() {
    console.log("delete influencer");
    var row = this.state.selected_row;
    var name = this.state.krishna;
    var value = this.state.table_value;

    // brand cost
    var total = this.state.total_cost 
    var lasttotal;

    // agency fee
    var agency = this.state.monk_fee
    var lastfee;

    //total infll 
    var influrncer_total = this.state.influrncer_total
    var final_to;

    // var func = this.props.updateSheets

    for (var j = 0; j < value.length; j++) {
      console.log("in");
      for (var i = 0; i < name.length; i++) {
        var jk = name[i];
        console.log(jk);
        if (value[j]["name"] == name[i]) {
          console.log(value[j]);
      
          var influ_brand_total = value[j]['brand_total_cost']
          lasttotal = total - influ_brand_total

          var influ_agency_total = value[j]['agency_total_fee']
          lastfee = agency - influ_agency_total

          var n =  value[j]['commercial_cost'] 
          console.log(n)
          final_to = influrncer_total - n
          console.log(final_to)

          value.splice(j, 1);
        }
      }
    }

    if(this.state.table_value.length==0){
      this.setState({
        ekinfHai:false
      })
    }


    console.log(total)
    this.setState({
      table_value: value,
      total_cost : lasttotal,
      monk_fee :lastfee,
      influrncer_total : final_to,
      visibleDialog:false,
      count:value.length
    });


    var obj = {
    name:  this.state.user,
    campaign: this.state.campaign_name,
    cost_influencer: this.state.total_cost,
    cost_monk:this.state.monk_fee
    }

var func = this.props.update_campaign

    const self = this;
    const campaign_name = this.state.campaign_name;
    const username = this.state.user;
    axios({
      method: "post",
      url: "/api/campaigns/update_selected_influencers",
      data: {
        influencers: value,
        campaign_name: this.state.campaign_name,
        influencers_sel: name,
      },
    })
      // new brand api call

      .then(function (response) {
        func()

        // axios({
        //   method: "post",
        //   url: "/api/campaigns/update_campaign",
        //   data: {
        //     obj : obj
           
        //   },
        // })
        // .then(function (response) {
        //   func()
        //   console.log(response);
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  toggleDrawer() {
    this.setState({ show_d1: true, show_d2: false });
  }
  toggleDrawer_2() {
    this.setState({ show_d2: true, show_d1: false });
  }
  closekar() {
    this.setState({
      show_d1: false,
      show_d2: false,
    });
  }

 
  enteredLink(e) {
    var id = e.target.id;
    var tablend = this.state.table_value;
    var name = e.target.name;
    var self = this;

    var insta_link;
    var instalike;
    var instacomm;
    console.log(name);

    if (id == "ytlink") {
      var value = e.target.value;
      for (var k = 0; k < tablend.length; k++) {
        if (tablend[k]["name"] == name) {
          var inf = tablend[k];
          console.log(inf);
          inf.ytlink = value;
        }
      }
      this.setState({
        table_value: tablend,
      });
    }

    if (id == "instalink") {
      var value = e.target.value;

      for (var k = 0; k < tablend.length; k++) {
        if (tablend[k]["name"] == name) {
          var inf = tablend[k];
          console.log(inf);

          inf.instalink = value;
        }
      }
      this.setState({
        table_value: tablend,
      });
    }

    console.log(tablend);
    //   this.setState({instalink:e.target.value})
    //   console.log(e.target.value)
    //   console.log(this.state.instalink)
    //   var value = e.target.value;
    //   insta_link = value
    //   var url = e.target.value

    //   axios.get("/api/analysis/get_likes",{params:{url}}).then(function(response){
    //     var result=response.data;
    //     console.log(result);

    //     var instalike = result[1];
    //     var instacomm = result[2];

    //     console.log(instalike);
    //     console.log(instacomm);
    //     self.setState({instalink:url,insta_like:instalike, insta_comment:instacomm , loader:false});
    //     console.log(self.state)
    // })
    // .catch(function(error){
    //     console.log(error);
    // })

    axios({
      method: "post",
      url: "/api/campaigns/update_selected_influencers",
      data: {
        influencers: tablend,
        campaign_name: this.state.campaign_name,
        influencers_sel: this.state.inf_name,
        
      },
    })
      // new brand api call

      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({
      table_value:tablend,
    })
  }

  saveEntry(e) {
    var tablend = this.state.table_value;
    var ndtable = this.state.table_value;
    var id = e.target.id;
    console.log(id);
    var self = this;
    var n = this.state.view;

    var infobj = [];
    var v;
    this.setState({
      loader: true,
    });
    for (var k = 0; k < tablend.length; k++) {
      if (tablend[k]["name"] == id) {
        var inf = tablend[k];
        console.log(inf);
        var kname = tablend[k]["name"];
        var instalink = tablend[k]["instalink"];
        var ytlink = tablend[k]["ytlink"];
        console.log(ytlink);
        var obj = {
          name: kname,
          insta_link: instalink,
          youtube_link: ytlink,
        };
        var mobj = JSON.stringify(obj);
        infobj.push(obj);
        v = tablend[k]["ytlink"];
      }
    }

    console.log(infobj);

    // axios({
    //   method: 'get',
    //   url: "/api/analysis/get_likes",
    //   data: {
    //     array:infobj
    //       }
    //   })
    //   // new brand api call

    //   .then(function (response) {

    //   console.log(response);
    //   })
    //   .catch(function (error) {
    //   console.log(error);
    //   });

    var data = JSON.stringify(infobj);
    // console.log(typeof infobj)

    //   var url = "/api/analysis/get_likes"
    //   axios.get(url, {params: {array: data}}).then((res)=>{console.log(res.data);})
    // .catch((e)=>{console.log(e)});

    //   console.log(data)
    /*var config = {
      method: "get",
      url: "/api/analysis/get_likes",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };*/

    axios
      .get("/api/analysis/get_likes", { params: { array: data } })
      .then(function (response) {
        var result = response.data;

        console.log(response);
        console.log(result);

        var inf_name = result[0]["name"];
        var inyt = result[0]["viewCount"];
        var insta_like = result[0]["likes"];
        var insta_comment = result[0]["comments"];
        var commentCount = result[0]["commentCount"]
        var likeCount = result[0]["likeCount"]

        const formatCash = n => {
          if (n < 1e3) return n;
          if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
          if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
          if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
          if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
        };

        inyt = formatCash(inyt);
        likeCount = formatCash(likeCount);
        commentCount = formatCash(commentCount);

        console.log(inf_name);
        for (var k = 0; k < tablend.length; k++) {
          if (tablend[k]["name"] == inf_name) {
            var inf = tablend[k];
            console.log(inf);
            inf.yt_view = inyt;
            inf.insta_like = insta_like;
            inf.insta_comme = insta_comment;
            inf.comments = commentCount
            inf.likesCount = likeCount
          }
        }

        self.setState({ loader: false, table_value: tablend });
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(tablend);
    this.setState({
      table_value: tablend,
    });

    //now empty the last row
    // this.setState({
    //   ytlink:"",
    //   instalink:"",
    //   view:"",
    //   insta_like:"",
    //   insta_comment:"",
    //   share:"",
    //   insta_view:"",            })

    //update the campaign update influencer

    // console.log("save karr")
    // var obj = {
    //   yturl:this.state.ytlink,
    //   instaurl:this.state.instalink,
    //   yt_view:this.state.view,
    //   likes:this.state.insta_like,
    //   comment:this.state.insta_comment,
    //   share:this.state.share,
    //   insta_view:this.state.insta_view,
    //   edit:false
    // }

    // var bool = false
    // var tab_val = this.state.table_value;
    // if(tab_val[1]["campaignURl"]==undefined){
    //   for( var i = 0; i<tab_val.length; i++){
    //     var kr = tab_val[i]
    //     console.log(kr)
    //     kr.campaignURl = [{
    //       ytlink:this.state.ytlink,
    //       instalink:this.state.instalink
    //     }]
    //   }
    //   this.setState({
    //     table_value:tab_val
    //   })
    // }

    // if(tab_val[1]["campaignURl"]!==undefined){
    //   for( var i = 0; i<tab_val.length; i++){
    //     var kr = tab_val[i]["campaignURl"]
    //     console.log(kr)
    //    obj = {
    //       ytlink:this.state.ytlink,
    //       instalink:this.state.instalink
    //     }

    //     kr.push(obj)

    //   }
    //   this.setState({
    //     table_value:tab_val
    //   })
    // }

    // var myentry =   this.state.reportEntry;
    // myentry.push(obj)
    // this.setState({reportEntry:myentry , edit:false})
    // console.log(obj)
    // console.log(this.state.reportEntry)

    // //now empty the last row
    // this.setState({
    //   ytlink:"",
    //   instalink:"",
    //   view:"",
    //   insta_like:"",
    //   insta_comment:"",
    //   share:"",
    //   insta_view:"",            })
  }
  editchange(e) {
    const yturl = e.target.name;
    var register = this.state.reportEntry;
    for (var i = 0; i < register.length; i++) {
      if (register[i]["yturl"] == yturl) {
        var bool = register[i]["edit"];
        register[i]["edit"] = true;
      }
    }
    this.setState({
      reportEntry: register,
    });
  }

  render() {
    const selectRow = {
      mode: "checkbox", // multi select
      onSelect: this.handleRowSelect,
      customComponent: this.customMultiSelect,
      className: "my-selection-custom",
    };

    const cellEditProp = {
      mode: "click",
      blurToSave: true,
      // afterSaveCell: this.afterSaveCell,
      // beforeSaveCell: this.beforeSaveCell,
    };

    const {table_value,onlyonePresent,campaign_name,AllBrandArray,total_cost,instaonly,youtubeonly,show_ins_st,show_ins_stat,show_ins_vide,show_ytVid } = this.state
    const  csvData ={table_value,onlyonePresent,campaign_name,AllBrandArray,total_cost,instaonly,youtubeonly,show_ins_st,show_ins_stat,show_ins_vide,show_ytVid }
    return (
      <div>
        <div class="list" >
          {/* <SideNav/> */}

          <div>
            <i onClick={this.props.backfun} class="fa fa-angle-left size-6"></i>
            <div
              className="filter-icos row"
              style={{ padding: "0em 0em 0px 5em" }}
            >
              <span className="font-pr filter-colr tltl">
                {" "}
                Total: {this.state.count}
              </span>

              <span className="font-pr filter-colr tltl">
                {" "}
                Date: {this.state.campaign_Date}
              </span>

              <span className="font-pr filter-colr tltl">
                {" "}
                {this.state.brand_name}: {this.state.campaign_name}
              </span>

              {/* <select style={{ width: "16em"}} className="browser-default t4t  " onChange={this.handleOnChange} value={this.state.select_campaign_name}>
<option value="" disabled selected>Select Campaign</option>
							{ this.state.list.reverse().map(name=>
					
							<option  value={name["campaign_name"]} key={name["campaign_name"]} > {name["campaign_name"]}</option>
				
							)}
			</select> */}

              <span className="font-pr filter-colr tltl">
                Total Cost:{" "}
                <NumberFormat
                  displayType={"text"}
                  thousandSeparator={true}
                  value={this.state.total_cost}
                />{" "}
                INR
              </span>

              <span className="font-pr filter-colr tltl">
                Agency Fee:{" "}
                <NumberFormat
                  displayType={"text"}
                  thousandSeparator={true}
                  value={this.state.monk_fee}
                />{" "}
                INR
              </span>

      {        this.state.ekinfHai &&
              <span className="display-butt23">
                <span class="inner12">
                  <ExportExcelforLockedNPending
                    csvData={csvData}
                    // file_name={this.state.campaign_name}
                    // instaonly={this.state.instaonly}
                    // youtubeonly={this.state.youtubeonly}
                  />
                </span>
                <span class="inner12">
                  <ExportPdfforLockedNPending
                    csvData={csvData}

                    // file_name={this.state.campaign_name}
                    // cost_influencer = {this.state.total_cost}
                    // instaonly={this.state.instaonly}
                    // youtubeonly={this.state.youtubeonly}
                  />
                </span>
                <span class="inner12" onClick={this.toggleDialog}>
                  <img src={DeleteIcon}  className="icon-ht" />{" "}
                  <span
                    className="simpletext3 theme-col"
                    style={{ marginRight: "7px" }}
                  >
                    {" "}
                    Delete
                  </span>{" "}
                </span>
              </span>}
            </div>

            <ButtonToolbar>
              <button className="op1" onClick={this.toggleDrawer}>
                <i class="fa fa-angle-left size-1 custom_ico"></i>
              </button>
            </ButtonToolbar>
            <ButtonToolbar>
              <button
                style={{ margin: "7.2em 0px" }}
                className="op1"
                onClick={this.toggleDrawer_2}
              >
                <i class="fa fa-angle-left size-1 custom_ico"></i>
              </button>
            </ButtonToolbar>

            <div className="locked-table " style={{ padding: "0 4em" }}>
              <div className="ksadk">
                <BootstrapTable
                  data={this.state.table_value}
                  selectRow={selectRow}
                  tableHeaderClass="my-custom-locked"
                  cellEdit={cellEditProp}
                  // deleteRow={ true }
                  // options={ options }
                  version="4"
                  // insertRow={ true } options={ options }
                  // trStyle={rowStyleFormat}
                  // options={ options }
                  // height='68vh'
                >
                  <TableHeaderColumn
                    row="0"
                    rowSpan="3"
                    dataField="name"
                    isKey={true}
                    className={this.customHeaderClass}
                    columnClassName={this.columnClassNameFormat}
                    width="14em"
                    dataAlign="center"
                    filter={{
                      type: "TextFilter",
                      delay: 200,
                      placeholder: "Enter name",
                    }}
                    headerAlign="justify"
                    thStyle={{ background: "#fff", fontWeight: "700" }}
                  >
                    Name
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    row="0"
                    colSpan="3"
                    thStyle={{
                      background: "#FFF8F9",
                      color: "#821F3A",
                      fontSize: "20px",
                      borderBottomColor: "#FFF8F9",
                      fontWeight: "700",
                      borderRight: "13px solid #F6F3F8",
                    }}
                    headerAlign="justify"
                  >
                    Cost
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    row="2"
                    dataField="commercial_cost"
                    dataAlign="center"
                    columnClassName={this.Yotube_influ}
                    editable={true}
                    width="7em"
                    thStyle={{
                      background: "#FFF8F9",
                      color: "#821F3A",
                      fontSize: "0.9em",
                      borderRightColor: "#FFF8F9",
                      borderTopColor: "#FFF8F9",
                      borderLeftColor: "#FFF8F9",
                      fontWeight: "600",
                    }}
                    dataFormat={this.priceFormatter}
                    headerAlign="center"
                  >
                    Influencer
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    row="2"
                    dataField="brand_total_cost"
                    dataAlign="center"
                    columnClassName={this.Yotube_influ}
                    editable={true}
                    thStyle={{
                      background: "#FFF8F9",
                      color: "#821F3A",
                      fontSize: "0.9em",
                      borderRightColor: "#FFF8F9",
                      borderTopColor: "#FFF8F9",
                      borderLeftColor: "#FFF8F9",
                      fontWeight: "600",
                    }}
                    width="6em"
                    dataFormat={this.priceFormatter}
                    headerAlign="center !important"
                  >
                    Brand
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    row="2"
                    dataField="agency_total_fee"
                    editable={true}
                    columnClassName={this.Yotube_brand}
                    editable={true}
                    thStyle={{
                      background: "#FFF8F9",
                      color: "#821F3A",
                      fontSize: "0.9em",
                      borderRightColor: "#FFF8F9",
                      borderLeftColor: "#FFF8F9",
                      borderRight: "13px solid #F6F3F8",
                      fontWeight: "600",
                    }}
                    width="6em"
                    headerAlign="center"
                    dataAlign="center"
                    dataFormat={this.priceFormatter}
                  >
                    Agency
                  </TableHeaderColumn>

                  {/* the hidden details for the youtube hide column */}
                  <TableHeaderColumn
                    row="0"
                    colSpan="5"
                    dataAlign="center"
                    hidden={this.state.sh_on_yt}
                    editable={false}
                    thStyle={{
                      background: "rgb(242 235 247)",
                      color: "#540D6E",
                      fontSize: "20px",
                      borderBottomColor: "#F6F3F8",
                      fontWeight: "700",
                      borderRightWidth: "0px",
                      borderColor: "rgb(242, 235, 247)",
                    }}
                    headerAlign="justify"
                  >
                    Details
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    row="2"
                    dataField="com_agency"
                    editable={false}
                    thStyle={{
                      background: "rgb(242 235 247)",
                      color: "#540D6E",
                      fontSize: "0.9em",
                      borderRightColor: "#F6F3F8",
                      borderLeftColor: "#F6F3F8",
                      fontWeight: "600",
                    }}
                    width="6em"
                    headerAlign="center"
                    dataAlign="center"
                    columnClassName={this.insta_whole}
                  >
                    Company
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    row="2"
                    dataField="manager"
                    editable={false}
                    thStyle={{
                      background: "rgb(242 235 247)",
                      color: "#540D6E",
                      fontSize: "0.9em",
                      borderRightColor: "#F6F3F8",
                      borderLeftColor: "#F6F3F8",
                      fontWeight: "600",
                    }}
                    width="6em"
                    headerAlign="center"
                    dataAlign="center"
                    columnClassName={this.insta_whole}
                  >
                    Manager
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    row="2"
                    dataField="email_id"
                    editable={false}
                    thStyle={{
                      background: "rgb(242 235 247)",
                      color: "#540D6E",
                      fontSize: "0.9em",
                      borderRightColor: "#F6F3F8",
                      borderLeftColor: "#F6F3F8",
                      fontWeight: "600",
                    }}
                    width="12em"
                    headerAlign="center"
                    dataAlign="center"
                    columnClassName={this.insta_whole}
                  >
                    Email
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    row="2"
                    dataField="contact"
                    editable={false}
                    thStyle={{
                      background: "rgb(242 235 247)",
                      color: "#540D6E",
                      fontSize: "0.9em",
                      borderRightColor: "#F6F3F8",
                      borderLeftColor: "#F6F3F8",
                      fontWeight: "600",
                    }}
                    width="10em"
                    headerAlign="center"
                    dataAlign="center"
                    columnClassName={this.insta_whole}
                  >
                    Contact
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    row="2"
                    dataField="location"
                    editable={false}
                    thStyle={{
                      background: "rgb(242 235 247)",
                      color: "#540D6E",
                      fontSize: "0.9em",
                      borderRightColor: "#F6F3F8",
                      borderLeftColor: "#F6F3F8",
                      fontWeight: "600",
                    }}
                    width="6em"
                    headerAlign="center"
                    dataAlign="center"
                    columnClassName={this.insta_whole}
                  >
                    Location
                  </TableHeaderColumn>

                  {/* the hidden details for the youtube hide column */}
                </BootstrapTable>
              </div>
            </div>

            <div className="first-drawer">
              <Drawer
                size=" accounts"
                backdrop={true}
                show={this.state.show_d1}
                onHide={this.closekar}
              >
                {/* <Drawer.Header>
              <Drawer.Title>Drawer Title</Drawer.Title>
              <span onClick={this.closekar}>close</span>
            </Drawer.Header> */}
                <Drawer.Body>
                  <div className="wrapp">
                    <div className="inn1">
                      <button className="op1_" onClick={this.closekar}>
                        <i class="fa fa-angle-right size-1 custom_ico"></i>
                      </button>

                      <button className="op1_1" onClick={this.toggleDrawer_2}>
                        <i class="fa fa-angle-left size-1 custom_ico"></i>
                      </button>

                      {/* {this.state.dnt_sh_btn &&
<ButtonToolbar>
<button className="op1_1" onClick={this.toggleDrawer_2}><i class="fa fa-angle-left size-1 custom_ico"></i></button>	   
</ButtonToolbar>} */}

                      {/* <ButtonToolbar>
            <button className="op1_1" onClick={this.closekar}><i class="fa fa-angle-right size-1 custom_ico"></i></button>	   
          </ButtonToolbar> */}
                    </div>
                    <div className="inn2">
                      <div className="table-hei">
                        {/* <ScrollSyncPane> */}
                        <div style={{ overflowY: "auto" }}>
                          <div className="nd-taable">
                            <table className="account-table jlks header-fixed">
                              <thead className="locked-header">
                                <tr>
                                  <th
                                    className="acco-head"
                                    style={{ padding: "9px 5px 6px" }}
                                    colspan="7"
                                  >
                                    Accounts
                                  </th>{" "}
                                </tr>
                                {/* <tr>  <th className="details2" colspan="7" ></th>	</tr> */}
                                <tr>
                                  <th className="" colspan="2">
                                    Amount
                                  </th>
                                  <th className="" colspan="2">
                                    Status
                                  </th>
                                  <th className=""></th>
                                </tr>
                                <tr>
                                  <th className="dr wk border-1st wk">
                                    Influencer
                                  </th>
                                  <th
                                    className="dr wk border-wala1"
                                    style={{ borderRight: "7px solid #fbfbfc" }}
                                  >
                                    Brand
                                  </th>
                                  <th className="dr wk border-1st ">Invoice</th>
                                  <th className="dr wk border-wala2">
                                    Payment
                                  </th>
                                  <th className="  wk">Notes</th>
                                </tr>
                              </thead>

                              <tbody>
                                <tr className="heheh">
                                  <td>
                                    <NumberFormat
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      value={this.state.influrncer_total}
                                    />{" "}
                                  </td>
                                  <td>
                                    <NumberFormat
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      value={
                                        this.state.total_cost 
                                      }
                                    />{" "}
                                  </td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                </tr>

                                {/* {this.state.value.map(v=>

			 	<tr key={v['name']}>
				<td className={v['checked'] ? "my-selection-custom" :''} >{v['com_agency']}</td>
        <td className={v['checked'] ? "my-selection-custom" :''} >{v['manager']}</td>
        <td className={v['checked'] ? "my-selection-custom" :''} >{v['email_id']}</td>
        <td className={v['checked'] ? "my-selection-custom" :''} >{v['contact']}</td>
        <td className={v['checked'] ? "my-selection-custom" :''}  >{v['location']}</td>
        <td className={v['checked'] ? "my-selection-custom" :''}  >{v['gender']}</td>
        <td className={v['checked'] ? "my-selection-custom" :''}  >{v['category']}</td>
    
			 	</tr>
			)} */}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {/* </ScrollSyncPane> */}
                      </div>
                    </div>
                  </div>
                </Drawer.Body>
              </Drawer>
            </div>

            <Drawer
              size=" report"
              backdrop={true}
              show={this.state.show_d2}
              onHide={this.closekar}
            >
              {/* <Drawer.Header>
              <Drawer.Title>Drawer Title</Drawer.Title>
              <span onClick={this.closekar}>close</span>
            </Drawer.Header> */}
              <Drawer.Body>
                <div className="wrapp">
                  <div className="inn1">
                    <button className="op1_" onClick={this.toggleDrawer}>
                      <i class="fa fa-angle-left size-1 custom_ico"></i>
                    </button>

                    <button className="op1_1" onClick={this.closekar}>
                      <i class="fa fa-angle-right size-1 custom_ico"></i>
                    </button>

                    {/* <ButtonToolbar>
            <button className="op1_1" onClick={this.closekar}><i class="fa fa-angle-right size-1 custom_ico"></i></button>	   
          </ButtonToolbar> */}
                  </div>
                  <div className="inn2">
                    <div className="table-hei">
                      {/* <ScrollSyncPane> */}
                      <div style={{ overflowY: "auto" }}>
                        <section className="nd-taable">
                          <table className="account-table jlks header-fixed">
                            <thead className="locked-header">
                              <tr>
                                <th
                                  className="acco-head"
                                  style={{ padding: "9px 5px 6px" }}
                                  colspan="10"
                                >
                                  Report
                                </th>{" "}
                              </tr>
                              {/* <tr>  <th className="details2" colspan="7" ></th>	</tr> */}
                              <tr>
                                <th className="" colspan="5">
                                  Youtube
                                </th>
                                <th className="" colspan="5">
                                  Instagram
                                </th>
                                <th className=""></th>
                              </tr>
                              <tr>
                              <th className="dr   border-1st ">Upload Date</th>
                                <th className="dr ">
                                  Video Link
                                </th>
                            
                                <th className="dr  ">Views</th>
                                <th className="dr  ">Likes</th>
                                <th
                                  className="dr  border-wala1"
                                  style={{ borderRight: "7px solid #fbfbfc" }}
                                >
                                  Comments
                                </th>
                                <th className="dr  border-1st">Post Date</th>
                                <th className="dr   ">
                                  Post link
                                </th>
                                
                                <th className="dr  ">Likes</th>
                                <th className="dr ">Comments</th>
                                {/* <th className="dr  ">Shares</th>
                                <th className="dr  ">Views</th> */}
                                <th className="dr  border-wala2">
                                  Action
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {this.state.table_value.map((v) => (
                                <tr className="heheh" key={v["ytlink"]}>
                             
      
                                  <td> 
                                  <input 
                                  style={{
                                    height: "3.5em",
                                    margin: "0 0 0px 0 ",
                                    // width: "15em",
                                    fontSize: "0.99em",
                                    borderBottom: "none",
                                  }}
                                  onChange={this.dateChange}
                                  type="date" 
                                  id="ytDate" 
                                  name={v["name"]}
                                  value={v["ytDate"]} 
                                  />
                                  </td> 
                                  <td>
                                       
                                  <input
                                          type="text"
                                          name={v["name"]}
                                          onChange={this.enteredLink}
                                          value={v["ytlink"]}
                                          style={{
                                            height: "3.5em",
                                            margin: "0 0 0px 0 ",
                                            // width: "15em",
                                            fontSize: "0.99em",
                                            borderBottom: "none",
                                          }}
                                          id="ytlink"
                                        />
                                    </td>
                            
                            
                                  <td>{v["yt_view"]}</td>
                                  <td>{v["likesCount"]}</td>
                                  <td>{v["comments"]}</td>
   
                                  <td>
                                  <input 
                                  style={{
                                    height: "3.5em",
                                    margin: "0 0 0px 0 ",
                                    // width: "15em",
                                    fontSize: "0.99em",
                                    borderBottom: "none",
                                  }}
                                  name={v["name"]}
                                  onChange={this.dateChange}
                                  type="date" 
                                  id="instaDate" 
                                  value={v["instaDate"]} 
                                  />     
                                    
                                    </td>
                                    <td>
                                    {" "}
                                    <input
                                      type="text"
                                      name={v["name"]}
                                      onChange={this.enteredLink}
                                      style={{
                                        height: "3.5em",
                                        margin: "0 0 0px 0 ",
                                        // width: "15em",
                                        fontSize: "0.99em",
                                        borderBottom: "none",
                                      }}
                                      value={v["instalink"]}
                                      id="instalink"
                                    />{" "}
                                  </td>
                                  <td>{v["insta_like"]}</td>
                                  <td>{v["insta_comme"]}</td>
                               
                                  <td>
                                    <i
                                      id={v["name"]}
                                      onClick={this.saveEntry}
                                      class="fa fa-save yuou"
                                    ></i>
                                  </td>
              
                                </tr>
                              ))}

                              {this.state.loader && (
                                <Home visible={this.state.loader} />
                              )}
   
                            </tbody>
                          </table>
                        </section>
                      </div>
                   
                    </div>
                  </div>
                </div>
              </Drawer.Body>
            </Drawer>
          </div>
        </div>

          {/* Dialog */}

          {this.state.visibleDialog && <Dialog title={"Please confirm"} onClose={()=>this.setState({visibleDialog:false})}>
                    <p style={{ margin: "25px", textAlign: "center" }}>Are you sure you want to delete the selected influencer?</p>
                    <DialogActionsBar>
                        <button className="k-button" onClick={()=>this.setState({visibleDialog:false})}>No</button>
                        <button className="k-button"  onClick={this.deleteinfluecer}>Yes</button>
                    </DialogActionsBar>
                </Dialog>
                
                }
      </div>
    );
  }
}

export default LockedCampaign;
class Checkbox extends React.Component {
  componentDidMount() {
    this.update(this.props.checked);
  }
  componentWillReceiveProps(props) {
    this.update(props.checked);
  }
  update(checked) {
    ReactDOM.findDOMNode(this).indeterminate = checked === "indeterminate";
  }
  render() {
    return (
      <>
        <input
          className="react-bs-select-all"
          type="checkbox"
          name={"checkbox" + this.props.rowIndex}
          id={"checkbox" + this.props.rowIndex}
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
      </>
    );
  }
}
