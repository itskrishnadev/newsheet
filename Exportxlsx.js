import React, { useEffect, useRef,useState } from "react";
import Button from 'react-bootstrap/Button';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const Exportxlsx = ({csvData, fileName}) => {
    console.log(csvData)

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const [arrayOfArray, setarrayOfArray] =useState([]) 
    var arrayy = []

    useEffect(() => {
     
        var arr = csvData.selected_row
    
        var AllBrandArray = csvData.AllBrandArray
        for(var i=0;i<arr.length;i++){

            var obj = {}
            // obj.push(arr[i]['name'])
            obj.Name = arr[i]['name']

            for(var j=0; j<AllBrandArray.length; j++){
                if(AllBrandArray[j]=="Youtube Video"){
                    // var m = {
                    //     "Youtube Video" :  arr[i]['brand_youtube_video']
                    // }
                    obj.Subscribers = arr[i]['youtube_subscribers']
                    obj.URL = arr[i]['youtube']
                    var key = "Youtube Video"
                    obj[key] = arr[i]['brand_youtube_video']
                    // obj.push(arr[i]['brand_youtube_video'])
                }

                if(AllBrandArray[j]=="Instagram Story" || AllBrandArray[j]=="Instagram Static" || AllBrandArray[j]=="Instagram Video"){
                    obj.Followers = arr[i]['insta_followers']
                    var k = "URL "
                    obj[k] = arr[i]['insta_url']
                    }

                if(AllBrandArray[j]=="Instagram Story"){
                    var key = "Instagram Story"
                    obj[key]  = arr[i]['brand_insta_story']

                    // obj.push(arr[i]['brand_insta_story'])
                   }
    
                if(AllBrandArray[j]=="Instagram Static"){
                    var key = "Instagram Static"
                    obj[key]  = arr[i]['brand_insta_static']

                    // obj.push(arr[i]['brand_insta_static'])
                   }
                if(AllBrandArray[j]=="Instagram Video"){
                    var key = 'Instagram Video'
                    obj[key]  = arr[i]['brand_insta_video']

                    // obj.push(arr[i]['brand_insta_video'])
                   }
            }

            arrayy.push(obj) 
        }
        console.log(arrayy)
     
     
       });

    // const header = Object.keys(csvData[0]);

    // var wscols = [];
    // for (var i = 0; i < header.length; i++) {  // columns length added
    //   wscols.push({ wch: header[i].length + 5 })
    // }
    const exportToCSV = (csvData, fileName) => {
        // setarrayOfArray(arrayy)
        console.log(arrayy)
        const ws = XLSX.utils.json_to_sheet(arrayy);
        // ws["!cols"] = wscols;
        var field = '=HYPERLINK("http://www.google.com","Click for Google")';
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <Button variant="warning" onClick={(e) => exportToCSV(csvData,fileName)}>Export</Button>
    )
}