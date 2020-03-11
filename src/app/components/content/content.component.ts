import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { HttpService } from 'src/app/services/http/http.service';
import { Patient } from 'src/app/dto/patient';
import { CallDTO } from 'src/app/dto/callDTO';


// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  tabColor = 'accent'
  tabUnderlineColor = 'primary'
  phone = ''
  name = 'Неизвестно'
  birthDay = 'Неизвестно'
  status: string
  classify: string
  comment: string
  dateStart: string
  dateEnd: string
  incomingCall: boolean = false
  patient: Patient
  hystory: CallDTO[]

  displayedColumns: string[] = ['phone', 'start', 'end', 'client', 'status', 'classify', 'comment'];
  dataSource: CallDTO[]

  constructor(private _event: EventService,
              private _http: HttpService) { }

  ngOnInit() {
    this._event._events.addListener('callReceived', (phone) => {
      this.incomingCall = true
      this.dateStart = new Date().toISOString()
      this._http.getPatient(phone).subscribe((data: Patient)  => {
        this.phone = phone
        this.name = data.full_name
        this.birthDay = data.birth
      })
    })
    this.getHistory()
    this._event._events.addListener('phone', (phone) => {
      this.phone = phone
    })
  }

  onSaveButton() {
    let callDTO = new CallDTO()
    callDTO.date_start = this.dateStart
    callDTO.date_stop = new Date().toISOString()
    callDTO.src = this.phone
    callDTO.dst = '1000'
    callDTO.classification = this.classify
    callDTO.comment = this.comment
    callDTO.status = this.status
    callDTO.uid = Math.random().toString()
    this._http.saveCall(callDTO).subscribe(() => {
      console.log('SEND SUCCESFULL');
    })
    this.incomingCall = false
    this.getHistory()
  }

  getHistory(): boolean {
   this._http.getCalls().subscribe((data) => {
      this.dataSource = data
    })
    return true
  }

}
