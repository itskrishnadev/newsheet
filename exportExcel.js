
import {
    ExcelExport,
    ExcelExportColumn,
    ExcelExportColumnGroup
} from '@progress/kendo-react-excel-export';
import {Button} from 'reactstrap';
// import jsPDF from 'jspdf'
// import autoTable from 'jspdf-autotable'
import React, { useEffect, useRef,useState } from "react";
import { aggregateBy, process } from '@progress/kendo-data-query';
import ExportIcon from '../../../assets/export.svg'
import ReactDOM from 'react-dom';
import { savePDF, PDFExport } from '@progress/kendo-react-pdf';
import NumberFormat from 'react-number-format';
import axios from "axios";




export const ExportPdf = ({csvData, passedFunction, submit}) =>{

    const array = csvData.selected_row 
    console.log(csvData);
 
    const file_name = csvData.campaign_name;
    const tableValue = csvData.selected_row ;
    const value = tableValue

    const youtubeonly = csvData.youtubeonly ;
    const instaonly = csvData.instaonly ;

    
    const total = csvData.total_cost
    // console.log(tableValue)
    // console.log(file_name)
    const [ytonly, setytonly] =useState(false) 
    const [instaon, setinstaon] =useState(false)
    const [show_ytVid, setshow_ytVid] =useState(false)
    const [show_ins_st, setshow_ins_st] =useState(false)
    const [show_ins_stat, setshow_ins_stat] =useState(false) 
    const [show_ins_vide, setshow_ins_vide] =useState(false) 
    
    useEffect(() => {
     
       var arr = csvData.AllBrandArray
       for(var i=0;i<arr.length;i++){
           console.log(arr[i])
           if(arr[i]=="Youtube Video"){
            setytonly(true)
            setshow_ytVid(true)
           }
           if(arr[i]=="Instagram Story" || arr[i]=="Instagram Static" || arr[i]=="Instagram Video"){
            setinstaon(true)
            }

            if(arr[i]=="Instagram Story"){
                setshow_ins_st(true)
               }

               if(arr[i]=="Instagram Static"){
                setshow_ins_stat(true)
               }
               if(arr[i]=="Instagram Video"){
                setshow_ins_vide(true)
               }
       }
       console.log(instaon)
       console.log(ytonly)
       console.log(show_ytVid)
       console.log(show_ins_st)
       console.log(show_ins_stat)
       console.log(show_ins_vide)
    
      });


    const myRef = useRef(null);
    const exportTOpdf = () => { 
        myRef.current.save();
        passedFunction();
        if(submit==true ){
            console.log("already submited the campaign") 
        }
        if(submit==false ){
            console.log("submit the campaign")

            axios({
                method: 'post',
                url: "/api/campaigns/set_campaign",
                data: {
                  new_brand_name:csvData.new_brand_name,
                  new_brand:csvData.new_brand,
                  n:csvData.n,
                  influencers:csvData.krishna,
                  brand_name:csvData.brand_name,
                  campaign_name:csvData.campaign_name,
                  executor:csvData.executor,
                  campaign_desc:csvData.campaign_desc,
                  campaign_date:csvData.campaign_date,
                  campaign_Date:csvData.campaign_Date,
                  cost_influencer:csvData.total_cost,
                  cost_monk:csvData.monk_fee,
                  campaign_status:csvData.campaign_status,
                  campaign_owner:csvData.campaign_owner,
                  selected_full:csvData.selected_row,
                  Selectedcategory:csvData.Selectedcategory,
                  person_in:csvData.person_in,
                  contact_no:csvData.contact_no,
                  email:csvData.email,
                  adv:csvData.brand_name,
                  startDate:csvData.startDate,
                  endDate:csvData.endDate,
                  adv:csvData.brand_name,
                      }
                      })
                .then(function (response) {
                console.log(response);
                alert("Campaign form is submited")
            
                })
              
                .catch(function (error) {
                console.log(error);
                });
        }
      
    };
  
    return (
        <div>
      
             <Button className=" my-buttoninform1" onClick={exportTOpdf}>PDF</Button>
              <PDFExport
                avoidLinks={false}
                paperSize={"auto"}

                fileName={'Campaign_Brief'}
                ref={ myRef}
                margin={{ top: 70, left: 70, right: 70, bottom: 70}} 
              >
                  

  <div   style={{position:"absolute", left:"200vw", top:"0"}}>
    {/* <h4 className="title-pdf">Monk-e</h4> */}
    {/* <p>Campaign Name : {this.state.file_name}</p> */}
<table className="table pdf-wala" style={{fontWeight:"700"}} >
    <thead >
                    <tr style={{textAlign:"center"}} className="pahlarow">
                        <th  rowspan="1"  colspan="1"></th>
                        {
                       youtubeonly && ytonly  && <th  rowspan="1" colSpan="2" >Youtube</th>
                        }
                         {
                         instaonly && instaon && <th  rowspan="1" colSpan="2">Instagram</th>
                        }
                        
                        {
                        show_ytVid  &&
                        <th  rowspan="1" colspan="1"></th>}

                    {
                        show_ins_st  &&
                        <th  rowspan="1" colspan="1"></th>}
                    {
                        show_ins_stat  &&
                        <th  rowspan="1" colspan="1"></th>}
                    {
                        show_ins_vide &&
                        <th  rowspan="1" colspan="1"></th>
                        }
                         {
                        csvData.onlyonePresent &&
                        <th  rowspan="1" colSpan="1"></th>
                    }
                       

                    </tr>
                    <tr className="pata">
                    <th  rowspan="1" colspan="1">Name</th>
                    
                    {

                    youtubeonly && ytonly &&
                     <>
                     <th  rowspan="1" colspan="1">Subscriber</th>
                     <th  width={"20em"} rowspan="1" colspan="1">URL</th>
                     </>
                    }
                    
               
                    {
                        instaonly && instaon &&
                        <>
                        <th  width={"20em"} rowspan="1" colspan="1">Follower</th>
                        <th  width={"20em"} rowspan="1" colspan="1">URL</th>
                        </>
                        }

                    {
                        show_ytVid  &&
                        <th style={{letterSpacing: "-2px"}} rowspan="1" colspan="1">Youtube Video</th>}

                    {
                        show_ins_st  &&
                        <th style={{letterSpacing: "-2px"}} rowspan="1" colspan="1">Instagram Story</th>}
                    {
                        show_ins_stat  &&
                        <th style={{letterSpacing: "-2px"}} rowspan="1" colspan="1">Instagram Static</th>}
                    {
                        show_ins_vide &&
                        <th style={{letterSpacing: "-2px"}} rowspan="1" colspan="1">Instagram Video</th>
                        }

                    {
                        csvData.onlyonePresent &&
                        <th  rowspan="1" colSpan="1" >Total Cost</th>
                    }

                  
                   
                    
                    </tr>
                </thead>
                <tbody>
                  
                  {array.map(item=>

                    <tr key={item['id']}>
                    <td >{item['name']}</td>
                    
                    {
                    youtubeonly && ytonly  && 
                    <>
                    <td >{item['youtube_subscribers']}</td>
                    {/* <td  width={"20em"}>{item['youtube']}</td> */}
                    <td  width={"20em"}><a href={item['youtube']} target="_blank">Visit</a></td>
                    </>
                    }
                     {
                     instaonly && instaon && 
                    <>
                     <td >{item['insta_followers']}</td>
                    {/* <td  width={"20em"}>{item['insta_url']}</td>*/}
                    <td  width={"20em"}><a href={item['insta_url']} target="_blank">Visit</a></td>
                    </>
                    }
                    
                    {
                        show_ytVid  &&
                        <td  >
                         <NumberFormat displayType={'text'} thousandSeparator={true} value={item['brand_youtube_video']}  />
                           </td>
                         }

                    {
                        show_ins_st  &&
                        <td  >
                         <NumberFormat displayType={'text'} thousandSeparator={true} value={item['brand_insta_story']}  />
                           </td>
                         }
                    {
                        show_ins_stat  &&
                           <td  >
                         <NumberFormat displayType={'text'} thousandSeparator={true} value={item['brand_insta_static']}  />
                           </td>
                         }
                    {
                        show_ins_vide &&
                           <td  >
                         <NumberFormat displayType={'text'} thousandSeparator={true} value={item['brand_insta_video']}  />
                           </td>

                        }
                    
                    {
                        csvData.onlyonePresent &&
                        <td  >
                        <NumberFormat displayType={'text'} thousandSeparator={true} value={item['brand_total_cost']}  />
                       </td>
                    }
                 
       
                    </tr>
               )}
               <tr style={{background:"#cacbd5" , border:"none"}} className="noborder">
                   
               {
                        show_ytVid  &&
                        <td ></td>
                         }

                    {
                        show_ins_st  &&
                        <td ></td>
                         }
                    {
                        show_ins_stat  &&
                        <td ></td>
                         }
                    {
                        show_ins_vide &&
                        <td ></td>

                        }
               
               {
                    instaonly && instaon && 
                    <>
                     <td ></td>

                     {    csvData.onlyonePresent ?
                    <td ></td>:
                    <td style={{textAlign:"right"}}>Total:</td>
                    }

                   
                    </>
                    }

                    
               
               {
                   youtubeonly && ytonly  && 
                    <>
                     <td ></td>
                     {    csvData.onlyonePresent ?
                    <td ></td>:
                    <td style={{textAlign:"right"}}>Total:</td>
                    }

              
                    </>
                    }

                {    csvData.onlyonePresent ?
                <>
                    <td style={{textAlign:"right"}}>Total:</td>
                    <td  > <NumberFormat displayType={'text'} thousandSeparator={true} value={total}   />{}</td> 
                </>  :
                    <td  ><NumberFormat displayType={'text'} thousandSeparator={true} value={total}   />{}</td>
                    }
                
                    </tr>
            </tbody>
                </table>
</div>
        <div style={{height:"5em"}}></div>    
  
              </PDFExport>
     
       </div>
    );
  }




  

  export const ExportPdfforLockedNPending = ({csvData}) =>{

    console.log(csvData)

    const array = csvData.table_value 

 
    const file_name = csvData.campaign_name;
    const tableValue = csvData.table_value ;
    const value = tableValue

    const youtubeonly = csvData.youtubeonly ;
    const instaonly = csvData.instaonly ;

    
    const total = csvData.total_cost


    const [ytonly, setytonly] =useState(false) 
    const [instaon, setinstaon] =useState(false)
    const [show_ytVid, setshow_ytVid] =useState(false)
    const [show_ins_st, setshow_ins_st] =useState(false)
    const [show_ins_stat, setshow_ins_stat] =useState(false) 
    const [show_ins_vide, setshow_ins_vide] =useState(false) 
    
    useEffect(() => {
     
       var arr = csvData.AllBrandArray
       for(var i=0;i<arr.length;i++){
           console.log(arr[i])
           if(arr[i]=="Youtube Video"){
            setytonly(true)
            setshow_ytVid(true)
           }
           if(arr[i]=="Instagram Story" || arr[i]=="Instagram Static" || arr[i]=="Instagram Video"){
            setinstaon(true)
            }

            if(arr[i]=="Instagram Story"){
                setshow_ins_st(true)
               }

               if(arr[i]=="Instagram Static"){
                setshow_ins_stat(true)
               }
               if(arr[i]=="Instagram Video"){
                setshow_ins_vide(true)
               }
       }
       console.log(instaon)
       console.log(ytonly)
       console.log(show_ytVid)
       console.log(show_ins_st)
       console.log(show_ins_stat)
       console.log(show_ins_vide)
    
      });

    // console.log(csvData);
    // console.log(passedFunction);
    // const file_name = file_name;
    // const tableValue = csvData.selected_row ;
    // const value = tableValue

    // const youtubeonly = csvData.youtubeonly ;
    // const instaonly = csvData.instaonly ;

    // const total = cost_influencer
    // console.log(tableValue)
    // console.log(file_name)
    // const total = cost_influencer
    const myRef = useRef(null);
    const exportTOpdf = () => { 
        myRef.current.save();
      
      
    };
  
    return (
        <div>
      
             {/* <Button className=" my-buttoninform1" onClick={exportTOpdf}>PDF</Button> */}
             <span onClick={exportTOpdf}>
            <img src={ExportIcon} className="icon-ht" /><span className="simpletext  theme-col" >PDF</span>
            </span> 
            <PDFExport
                avoidLinks={false}
                paperSize={"auto"}

                fileName={'Campaign_Brief'}
                ref={ myRef}
                margin={{ top: 70, left: 70, right: 70, bottom: 70}} 
              >
                  

  <div   style={{position:"absolute", left:"200vw", top:"0"}}>
    {/* <h4 className="title-pdf">Monk-e</h4> */}
    {/* <p>Campaign Name : {this.state.file_name}</p> */}
<table className="table pdf-wala" style={{fontWeight:"700"}} >
    <thead >
                    <tr style={{textAlign:"center"}} className="pahlarow">
                        <th  rowspan="1"  colspan="1"></th>
                        {
                        ytonly  && <th  rowspan="1" colSpan="2" >Youtube</th>
                        }
                         {
                          instaon && <th  rowspan="1" colSpan="2">Instagram</th>
                        }
                        
                        {
                        show_ytVid  &&
                        <th  rowspan="1" colspan="1"></th>}

                    {
                        show_ins_st  &&
                        <th  rowspan="1" colspan="1"></th>}
                    {
                        show_ins_stat  &&
                        <th  rowspan="1" colspan="1"></th>}
                    {
                        show_ins_vide &&
                        <th  rowspan="1" colspan="1"></th>
                        }
                         {
                        csvData.onlyonePresent &&
                        <th  rowspan="1" colSpan="1"></th>
                    }
                       

                    </tr>
                    <tr className="pata">
                    <th  rowspan="1" colspan="1">Name</th>
                    
                    {

                    ytonly &&
                     <>
                     <th  rowspan="1" colspan="1">Subscriber</th>
                     <th  width={"20em"} rowspan="1" colspan="1">URL</th>
                     </>
                    }
                    
               
                    {
                        instaon &&
                        <>
                        <th  width={"20em"} rowspan="1" colspan="1">Follower</th>
                        <th  width={"20em"} rowspan="1" colspan="1">URL</th>
                        </>
                        }

                    {
                        show_ytVid  &&
                        <th style={{letterSpacing: "-2px"}} rowspan="1" colspan="1">Youtube Video</th>}

                    {
                        show_ins_st  &&
                        <th style={{letterSpacing: "-2px"}} rowspan="1" colspan="1">Instagram Story</th>}
                    {
                        show_ins_stat  &&
                        <th style={{letterSpacing: "-2px"}} rowspan="1" colspan="1">Instagram Static</th>}
                    {
                        show_ins_vide &&
                        <th style={{letterSpacing: "-2px"}} rowspan="1" colspan="1">Instagram Video</th>
                        }

                    {
                        csvData.onlyonePresent &&
                        <th  rowspan="1" colSpan="1" >Total Cost</th>
                    }

                  
                   
                    
                    </tr>
                </thead>
                <tbody>
                  
                  {array.map(item=>

                    <tr key={item['id']}>
                    <td >{item['name']}</td>
                    
                    {
                     ytonly  && 
                    <>
                    <td >{item['youtube_subscribers']}</td>
                    {/* <td  width={"20em"}>{item['youtube']}</td> */}
                    <td  width={"20em"}><a href={item['youtube']} target="_blank">Visit</a></td>
                    </>
                    }
                     {
                     instaon && 
                    <>
                     <td >{item['insta_followers']}</td>
                    {/* <td  width={"20em"}>{item['insta_url']}</td>*/}
                    <td  width={"20em"}><a href={item['insta_url']} target="_blank">Visit</a></td>
                    </>
                    }
                    
                    {
                        show_ytVid  &&
                        <td  >
                         <NumberFormat displayType={'text'} thousandSeparator={true} value={item['brand_youtube_video']}  />
                           </td>
                         }

                    {
                        show_ins_st  &&
                        <td  >
                         <NumberFormat displayType={'text'} thousandSeparator={true} value={item['brand_insta_story']}  />
                           </td>
                         }
                    {
                        show_ins_stat  &&
                           <td  >
                         <NumberFormat displayType={'text'} thousandSeparator={true} value={item['brand_insta_static']}  />
                           </td>
                         }
                    {
                        show_ins_vide &&
                           <td  >
                         <NumberFormat displayType={'text'} thousandSeparator={true} value={item['brand_insta_video']}  />
                           </td>

                        }
                    
                    {
                        csvData.onlyonePresent &&
                        <td  >
                        <NumberFormat displayType={'text'} thousandSeparator={true} value={item['brand_total_cost']}  />
                       </td>
                    }
                 
       
                    </tr>
               )}
               <tr style={{background:"#cacbd5" , border:"none"}} className="noborder">
                   
               {
                        show_ytVid  &&
                        <td ></td>
                         }

                    {
                        show_ins_st  &&
                        <td ></td>
                         }
                    {
                        show_ins_stat  &&
                        <td ></td>
                         }
                    {
                        show_ins_vide &&
                        <td ></td>

                        }
               
               {
                     instaon && 
                    <>
                     <td ></td>

                     {    csvData.onlyonePresent ?
                    <td ></td>:
                    <td style={{textAlign:"right"}}>Total:</td>
                    }

                   
                    </>
                    }

                    
               
               {
                    ytonly  && 
                    <>
                     <td ></td>
                     {    csvData.onlyonePresent ?
                    <td ></td>:
                    <td style={{textAlign:"right"}}>Total:</td>
                    }

              
                    </>
                    }

                {    csvData.onlyonePresent ?
                <>
                    <td style={{textAlign:"right"}}>Total:</td>
                    <td  > <NumberFormat displayType={'text'} thousandSeparator={true} value={total}   />{}</td> 
                </>  :
                    <td  ><NumberFormat displayType={'text'} thousandSeparator={true} value={total}   />{}</td>
                    }
                
                    </tr>
            </tbody>
                </table>
</div>
        <div style={{height:"5em"}}></div>    
  
              </PDFExport>
     
       </div>
    );
  }





export const ExportForNewSheet = ({csvData, passedFunction, submit}) => {

    console.log(csvData.onlyonePresent);
    console.log(csvData);
    const file_name = csvData.campaign_name;
    const tableValue = csvData.selected_row ;

    const youtubeonly = csvData.youtubeonly ;
    const instaonly = csvData.instaonly ;

    // console.log(tableValue)
    // console.log(file_name)

    const myRef = useRef(null);
    const exportButton = () => {
        passedFunction()
        myRef.current.save();
        if(submit==true ){
            // console.log("already submited the campaign") 
        }
        if(submit==false ){
            // console.log("submit the campaign")

            axios({
                method: 'post',
                url: "/api/campaigns/set_campaign",
                data: {
                  new_brand_name:csvData.new_brand_name,
                  new_brand:csvData.new_brand,
                  n:csvData.n,
                  influencers:csvData.krishna,
                  brand_name:csvData.brand_name,
                  campaign_name:csvData.campaign_name,
                  executor:csvData.executor,
                  campaign_desc:csvData.campaign_desc,
                  campaign_date:csvData.campaign_date,
                  campaign_Date:csvData.campaign_Date,
                  cost_influencer:csvData.total_cost,
                  cost_monk:csvData.monk_fee,
                  campaign_status:csvData.campaign_status,
                  campaign_owner:csvData.campaign_owner,
                  selected_full:csvData.selected_row,
                  Selectedcategory:csvData.Selectedcategory,
                  person_in:csvData.person_in,
                  contact_no:csvData.contact_no,
                  email:csvData.email,
                  startDate:csvData.startDate,
                  endDate:csvData.endDate,
                  adv:csvData.brand_name,
          
                      }
                      })
                .then(function (response) {
                console.log(response);
                alert("Campaign form is submited")
            
                })
              
                .catch(function (error) {
                console.log(error);
                });
        }
    };

//for total brand
    const aggregates = [ { field: 'brand_total_cost', aggregate: 'sum' } ];
    const total = aggregateBy(tableValue, aggregates);

    let number = total.brand_total_cost.sum;
    let final= number.toLocaleString()

    const CustomFooter = (props) =>
    
    (`Total : \₹ ${final}`);

    // console.log(total.brand_total_cost.sum)
    // console.log(final)
    return (
       <> 
            <div>
                {/* <span className="simpletext  theme-col" onClick={exportButton}>Export</span>  */}
                <Button className=" my-buttoninform1" onClick={exportButton}>Export</Button>
                <ExcelExport
                    data={tableValue}
                    // group={group}
                    fileName={file_name}
                    ref={myRef}
                >
              {    csvData.onlyonePresent ?
                        <>  <ExcelExportColumn field="name" title="Name" locked={true} width={200} />
                    { /* <ExcelExportColumn field="ProductName" title="Product Name" width={350} /> */}
                    {
                        youtubeonly && csvData.yt   && <ExcelExportColumnGroup title="Youtube" headerCellOptions={{ textAlign: 'center' }}>
                        <ExcelExportColumn
                            field="youtube_subscribers"
                            title="Subscribers"
                            // cellOptions={{ format: '##,##0.00' }}
                            width={150}
                            CellOptions={{ textAlign: 'right' }}
                            // footerCellOptions={{ wrap: true, textAlign: 'center' }}
                            // groupFooterCellOptions={{ textAlign: 'right' }}
                            // groupFooter={CustomGroupFooter}
                            // footer={CustomFooter}
                        />
                        <ExcelExportColumn field="youtube"  title="URL" />
                    </ExcelExportColumnGroup>
                    }
                 {
                     instaonly  &&  csvData.ins && <ExcelExportColumnGroup title="Instagram" headerCellOptions={{ textAlign: 'center' }}>
                     <ExcelExportColumn
                         field="insta_followers"
                         title="Followers"
                         width={150}
                         // footerCellOptions={{ wrap: true, textAlign: 'center' }}
                         // groupFooterCellOptions={{ textAlign: 'right' }}
                         // groupFooter={CustomGroupFooter}
                         // footer={CustomFooter}
                     />
                     <ExcelExportColumn field="insta_url" title="URL" />
                 </ExcelExportColumnGroup>
                 }
                    
                    {
                       csvData.show_ytVid &&
                       <ExcelExportColumn
                       title="Youtube Video"
                       field="brand_youtube_video"
                       // width={150}
                       cellOptions={{ format: '₹#,##0' }}
                     
                   />
                    }
                       {
                       csvData.show_ins_st &&
                       <ExcelExportColumn
                       title="Instagram Story"
                       field="brand_insta_story"
                       // width={150}
                       cellOptions={{ format: '₹#,##0' }}
                     
                   />
                    }

                    {
                       csvData.show_ins_stat &&
                       <ExcelExportColumn
                       title="Instagram Static"
                       field="brand_insta_static"
                       // width={150}
                       cellOptions={{ format: '₹#,##0' }}
                     
                   />
                    }

                    {
                       csvData.show_ins_vide &&
                       <ExcelExportColumn
                       title="Instagram Video"
                       field="brand_insta_video"
                       // width={150}
                       cellOptions={{ format: '₹#,##0' }}
                     
                   />
                    }
          
                   
                        <ExcelExportColumn
                            field="brand_total_cost"
                            title="Total Cost"
                            width={200}
                            footerCellOptions={{ wrap: true, textAlign: 'right' ,format: '#,##0.00'}}
                            cellOptions={{ format: '₹#,##0' }}
                            footer={CustomFooter}
                        />
                        </> :


                                    <> 
                                     <ExcelExportColumn field="name" title="Name" locked={true} width={200} />
                                    { /* <ExcelExportColumn field="ProductName" title="Product Name" width={350} /> */}
                                    {
                                        youtubeonly && csvData.yt   && <ExcelExportColumnGroup title="Youtube" headerCellOptions={{ textAlign: 'center' }}>
                                        <ExcelExportColumn
                                            field="youtube_subscribers"
                                            title="Subscribers"
                                            // cellOptions={{ format: '##,##0.00' }}
                                            width={150}
                                            CellOptions={{ textAlign: 'right' }}
                                            // footerCellOptions={{ wrap: true, textAlign: 'center' }}
                                            // groupFooterCellOptions={{ textAlign: 'right' }}
                                            // groupFooter={CustomGroupFooter}
                                            // footer={CustomFooter}
                                        />
                                        <ExcelExportColumn field="youtube"  title="URL" />
                                    </ExcelExportColumnGroup>
                                    }
                                    {
                                    instaonly  &&  csvData.ins && <ExcelExportColumnGroup title="Instagram" headerCellOptions={{ textAlign: 'center' }}>
                                    <ExcelExportColumn
                                        field="insta_followers"
                                        title="Followers"
                                        width={150}
                                        // footerCellOptions={{ wrap: true, textAlign: 'center' }}
                                        // groupFooterCellOptions={{ textAlign: 'right' }}
                                        // groupFooter={CustomGroupFooter}
                                        // footer={CustomFooter}
                                    />
                                    <ExcelExportColumn field="insta_url" title="URL" />
                                    </ExcelExportColumnGroup>
                                    }

                                    {
                                    csvData.show_ytVid &&
                                    <ExcelExportColumn
                                    title="Youtube Video"
                                    field="brand_youtube_video"
                                    // width={150}
                                    cellOptions={{ format: '₹#,##0' }}
                                    footerCellOptions={{ wrap: true, textAlign: 'right' ,format: '#,##0.00'}}
                                    footer={CustomFooter}
                                    />
                                    }
                                    {
                                    csvData.show_ins_st &&
                                    <ExcelExportColumn
                                    title="Instagram Story"
                                    field="brand_insta_story"
                                    // width={150}
                                    cellOptions={{ format: '₹#,##0' }}
                                    footerCellOptions={{ wrap: true, textAlign: 'right' ,format: '#,##0.00'}}
                                    footer={CustomFooter}
                                    />
                                    }

                                    {
                                    csvData.show_ins_stat &&
                                    <ExcelExportColumn
                                    title="Instagram Static"
                                    field="brand_insta_static"
                                    // width={150}
                                    cellOptions={{ format: '₹#,##0' }}
                                    footerCellOptions={{ wrap: true, textAlign: 'right' ,format: '#,##0.00'}}
                                    footer={CustomFooter}
                                    />
                                    }

                                    {
                                    csvData.show_ins_vide &&
                                    <ExcelExportColumn
                                    title="Instagram Video"
                                    field="brand_insta_video"
                                    // width={150}
                                    cellOptions={{ format: '₹#,##0' }}
                                    footerCellOptions={{ wrap: true, textAlign: 'right' ,format: '#,##0.00'}}
                                    footer={CustomFooter}
                                    />
                                    }

                                        </> 

                        }
     
                        
                </ExcelExport>

            </div>
</>
        
    )
    
}


export const ExportExcelforLockedNPending = ({csvData}) => {

    // console.log(csvData);
    // const file_name = csvData.campaign_name;
    // const tableValue = csvData.selected_row ;

    // const youtubeonly = csvData.youtubeonly ;
    // const instaonly = csvData.instaonly ;

    const file_name = csvData.campaign_name;
    const tableValue = csvData.table_value ;

    const youtubeonly = csvData.youtubeonly ;
    const instaonly = csvData.instaonly ;

    const myRef = useRef(null);
    const exportButton = () => {
        myRef.current.save();
    };


    const aggregates = [ { field: 'brand_total_cost', aggregate: 'sum' } ];
    const total = aggregateBy(tableValue, aggregates);

    let number = total.brand_total_cost.sum;
    let final= number.toLocaleString()
    const CustomFooter = (props) =>
    
    (`Total : \₹ ${final}`);

    // console.log(total.brand_total_cost.sum)
    // console.log(final)
    return (
       <> 
            <div>
                <span onClick={exportButton}>
            <img src={ExportIcon} className="icon-ht" /><span className="simpletext  theme-col" >Export</span>
            </span> 
                {/* <Button className=" my-buttoninform1" onClick={exportButton}>Export</Button> */}

              
                

                <ExcelExport
                    data={tableValue}
                    // group={group}
                    fileName={file_name}
                    ref={myRef}
                >
                    <ExcelExportColumn field="name" title="Name" locked={true} width={200} />
                    {/* <ExcelExportColumn field="ProductName" title="Product Name" width={350} /> */}
                    {
                        youtubeonly    && <ExcelExportColumnGroup title="Youtube" headerCellOptions={{ textAlign: 'center' }}>
                        <ExcelExportColumn
                            field="youtube_subscribers"
                            title="Subscribers"
                            // cellOptions={{ format: '##,##0.00' }}
                            width={150}
                            CellOptions={{ textAlign: 'right' }}
                            // footerCellOptions={{ wrap: true, textAlign: 'center' }}
                            // groupFooterCellOptions={{ textAlign: 'right' }}
                            // groupFooter={CustomGroupFooter}
                            // footer={CustomFooter}
                        />
                        <ExcelExportColumn field="youtube"  title="URL" />
                    </ExcelExportColumnGroup>
                    }
                 {
                     instaonly  &&  <ExcelExportColumnGroup title="Instagram" headerCellOptions={{ textAlign: 'center' }}>
                     <ExcelExportColumn
                         field="insta_followers"
                         title="Followers"
                         width={150}
                         // footerCellOptions={{ wrap: true, textAlign: 'center' }}
                         // groupFooterCellOptions={{ textAlign: 'right' }}
                         // groupFooter={CustomGroupFooter}
                         // footer={CustomFooter}
                     />
                     <ExcelExportColumn field="insta_url" title="URL" />
                 </ExcelExportColumnGroup>
                 }
                    
                    {
                       csvData.show_ytVid &&
                       <ExcelExportColumn
                       title="Youtube Video"
                       field="brand_youtube_video"
                       // width={150}
                       cellOptions={{ format: '₹#,##0' }}
                     
                   />
                    }
                       {
                       csvData.show_ins_st &&
                       <ExcelExportColumn
                       title="Instagram Story"
                       field="brand_insta_story"
                       // width={150}
                       cellOptions={{ format: '₹#,##0' }}
                     
                   />
                    }

                    {
                       csvData.show_ins_stat &&
                       <ExcelExportColumn
                       title="Instagram Static"
                       field="brand_insta_static"
                       // width={150}
                       cellOptions={{ format: '₹#,##0' }}
                     
                   />
                    }

                    {
                       csvData.show_ins_vide &&
                       <ExcelExportColumn
                       title="Instagram Video"
                       field="brand_insta_video"
                       // width={150}
                       cellOptions={{ format: '₹#,##0' }}
                     
                   />
                    }
                    {/* <ExcelExportColumn
                            field="deleverables"
                            title="Deliverables"
                            // width={150}
                            cellOptions={{ format: '₹#,##0' }}
                          
                        /> */}
                  
                        <ExcelExportColumn
                            field="brand_total_cost"
                            title="Total Cost"
                            width={200}
                            footerCellOptions={{ wrap: true, textAlign: 'right' ,format: '#,##0.00'}}
                            cellOptions={{ format: '₹#,##0' }}
                            footer={CustomFooter}
                        />
                        {/* <ExcelExportColumn field="cost_monk" cellOptions={{ format: '₹##,##0.00' }} width={150} title="Agency Fee" /> */}
                  

                   
                  
                        {/* <ExcelExportColumn field="cost_monk" cellOptions={{ format: '₹##,##0.00' }} width={150} title="Agency Fee" /> */}
                   
                </ExcelExport>

            </div>
</>
        
    )
    
}



