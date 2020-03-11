import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

declare var SIPml: any;

@Component({
  selector: 'app-softphone-ui',
  templateUrl: './softphone-ui.component.html',
  styleUrls: ['./softphone-ui.component.scss']
})
export class SoftphoneUiComponent implements OnInit {

  CallingId: string = '';
  CallerId: string = ''
  incomingCallEvent = false
  sipStack: any
  callSession: any
  callStatus: boolean
  registerSession: any
  logStyle = 'background: #222; color: #bada55'
  connected: boolean = false
  sipCallEvent: any
  audio: HTMLAudioElement;

  constructor(private _event: EventService) { }

  ngOnInit() {
    this.initEngine()
  }

  onButton(button: string) {
    this.CallingId += button
  }

  onCallButton() {
    this.makeCall()
  }

  onAcceptCallButton() {
    this.audio.pause();
    this.incomingCallEvent = false;
    this.acceptCall(this.sipCallEvent);
  }

  onClearButton() {
    this.CallingId = ''
    if(this.callSession !== undefined) {
      this.callSession.hangup()
    }
    this.sipCallEvent.newSession.reject()
  }

  onDeclineButton() {
    this.sipCallEvent.newSession.reject()
    this.audio.pause();
    this.incomingCallEvent = false;
  }

  playAudio() {
    this.audio = new Audio();
    this.audio.src = "../../../assets/sound/ringin.wav";
    this.audio.load();
    this.audio.play();
    this.audio.addEventListener('ended', () => {
      console.log('%c Play is end', this.logStyle );
      console.log(this.incomingCallEvent);
      if(this.incomingCallEvent) {
        this.audio.play();
      }
    })
  }

  //Инициализируем движки, создаём колбэк функции
  initEngine() {
    // const _this = this
    const readyCallback = (e) => {
      this.createSipStack();
      // console.log('%c SIPStack created!', _this.logStyle)
      this.startSipStack();
      // console.log('%c SIPStack Started!', _this.logStyle)
    };
    var errorCallback = function(e) {
      console.error('Failed to initialize the engine: ' + e.message);
    };
    SIPml.init(readyCallback, errorCallback);
  }

  //Функция старта SipStack. Соединяется с веб-сокетом, не делая никаких SIP-запросов
  startSipStack() {
    this.sipStack.start();
  }
  //Создаём SipStack, указываем кто слушает события
  createSipStack() {
    this.sipStack = new SIPml.Stack({
      realm: '95.161.178.222', // mandatory: domain name
      impi: '1000', // mandatory: authorization name (IMS Private Identity)
      // impu: 'sip:1060@192.168.1.86', // mandatory: valid SIP Uri (IMS Public Identity)
      impu: 'sip:1000@95.161.178.222', // mandatory: valid SIP Uri (IMS Public Identity)
      password: 'password', // optional
      // websocket_proxy_url: 'wss://asterisk.indev:8089/ws',//'wss://192.168.1.86:8089/ws', // optional
      websocket_proxy_url: 'wss://95.161.178.222:8089/ws',//'wss://192.168.1.86:8089/ws', // optional
      // ice_servers: '[{ url: \'stun:stun.l.google.com:19302\'}]',
      ice_servers: '[]',
      // enable_rtcweb_breaker: false, // optional
      events_listener: {
        events: '*', listener: (e) => {
          console.log('%c Event received');
          if (e.type == 'started') {
            this.login();
          } else if (e.type == 'i_new_message') { // incoming new SIP MESSAGE (SMS-like)
            // acceptMessage(e);
          } else if (e.type == 'i_new_call') { // incoming audio/video call
            this.CallerId = e.o_event.o_message.o_hdr_From.o_uri.s_user_name
            console.log("CallerID", this.CallerId)
            this._event._events.emit('callReceived', this.CallerId)
            this.playAudio()
            this.sipCallEvent = e
            this.incomingCallEvent = true
          } else if (e.type == 'stopped') {
            this.startSipStack();
          }
        }
      }, // optional: '*' means all events
      sip_headers: [ // optional
        {name: 'User-Agent', value: 'IM-client/OMA1.0 sipML5-v1.0.0.0'},
        {name: 'Organization', value: 'Doubango Telecom'}
      ]
    });
  }

  acceptCall(e) {
    console.log('%c New incoming call recieved', this.logStyle);
    e.newSession.accept({
      audio_remote: document.getElementById('audio_remote')
    }); // e.newSession.reject() to reject the call
  }

  login() {
    const _this = this;
    this.registerSession = this.sipStack.newSession('register', {
      events_listener: {
        events: '*',
        listener: (e) => {
          console.info('session event = ' + e.type);
          if (e.type == 'connected' && e.session == this.registerSession) {
            console.log('%c We are successfuly logged in!', this.logStyle);
            this.connected = true
            // makeCall();
            // sendMessage();
            // publishPresence();
            // subscribePresence('johndoe'); // watch johndoe's presence status change
          }
        }
      } // optional: '*' means all events
    });
    this.registerSession.register();
  }

  logout() {
    this.registerSession.unregister();
  }

  makeCall() {
    this.callSession = this.sipStack.newSession('call-audio', {
      audio_remote: document.getElementById('audio_remote'),
      events_listener: {
        events: '*',
        listener: (e) => {
          console.log('%c Event recived ' + e.type, this.logStyle);
          if (e.type === 'terminated') {
            if (this.callStatus) {
              console.log(this.callStatus);
            }
          }
        }
      } // optional: '*' means all events
    });
    console.log(this.CallingId);
    this.callSession.call(this.CallingId);
    this.callStatus = true;
  }
}
