import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv'

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {
  filesToUpload: File;
  fileImportInput: any;
  data;
  csvRecords:any = [];
  filename: string;
  options: { fieldSeparator: string; quoteStrings: string; decimalseparator: string; showLabels: boolean; showTitle: boolean; useBom: boolean; noDownload: boolean; headers: string[]; };
  constructor(private http : HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/getjsondata').subscribe(res =>{
      console.log(res);
      this.data = res;
      this.filename = 'csvdatamohini'
      this.options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: true,
        useBom: true,
        noDownload: false,
        headers: ["_id","id", "first_name", "last_name","email","gender"]
      };
      
  })

  }
  downloadCSV(){
      console.log(this.data);
    new  AngularCsv(this.data, this.filename, this.options);
  }
  fileChangeEvent($event) {
   var text = [];
   var target =$event.target;
   var files = target.files;
   console.log(files);
   var input = $event.target;
   var reader = new FileReader();
   reader.readAsText(input.files[0]);
   reader.onload = (data) => {
    let csvData = reader.result;
    let csvRecordsArray = (csvData as string).split(/\r\n|\n/);
    // console.log(csvData);
    // console.log(csvRecordsArray);
    let headers =  csvRecordsArray[0].split(',');
      let result = [];
for(let i = 0; i < csvRecordsArray.length; i++) {
  var obj = {};
  var currentline = csvRecordsArray[i].split(',');
  for (var j = 0; j < headers.length; j++){
    obj[headers[j]] = currentline[j];
  }
  result.push(obj);
  

}

console.log(result);
this.http.post('http://localhost:3000/data', result).subscribe(res =>{
  console.log(res);
  // alert('file uploaded successfully');
});  
};
   



  }
}
