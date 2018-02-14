import React, { Component } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import {Row, Col, Button, FormGroup, FormControl} from 'react-bootstrap';
import './App.css';

/*
<input  id="rest_logo" type = "file"/>

$("#rest_logo").change(function(){
        readURL(this);
    });	



function readURL(input) {
	
}


*/


class GraveForm extends Component{
	constructor(props){
		super(props);
		this.state = {
			grave_meat:{
				name: "",
				image: "./grave-0.jpg",
				comment: ""							
			}
		};
		
		this.nameChange = this.nameChange.bind(this);	
		this.dateChange = this.dateChange.bind(this);
		this.imageChange = this.imageChange.bind(this);
		this.messageChange = this.messageChange.bind(this);
		this.gpsChange = this.gpsChange.bind(this);
		this.submitClick = this.submitClick.bind(this);
		this.getValidationState = this.getValidationState.bind(this);
		this.closeModal = this.closeModal.bind(this);		
		this.refreshGrave = this.refreshGrave.bind(this);	
		this.imageReady = this.imageReady.bind(this);
		}
		
		closeModal(){
			this.props.closeModal()
		}
			
		nameChange(e){
			var grave;
			grave = this.state.grave_meat
			grave.name = e.target.value;
			this.setState({grave});
			
		}
		
		dateChange(date){
			this.props.dateChange(date);			
			console.log(date)
		}
		imageReady(result){
			var grave;
			grave = this.state.grave_meat
			grave.image = result; 
			this.setState({grave});
		}
		
		imageChange(e){
			var reader = new FileReader();
			var input = e.target;
			
			if (input.files && input.files[0]) {
		
				if(input.files[0].size < 2500000){
					
					reader.onload = function (e) {
						this.callback(e.target.result);
						
					}		
					reader.callback = this.imageReady;
					
					reader.readAsDataURL(input.files[0]);
							
					}else{
						alert("maximum file_size exceeded");
					}
				}
	
		}
		
		messageChange(e){
			var grave;
			grave = this.state.grave_meat
			grave.comment = e.target.value;
			this.setState({grave});		
		}
		
		gpsChange(e){
			var grave;
			grave = this.state.grave_meat
		}
		
		submitClick(e){
			var grave;
			grave = this.state.grave_meat;
			this.props.submitGrave(grave);
		}
		refreshGrave(){
			var grave = this.props.graveInit;
			if(typeof(grave)== "object" && grave !== null){
				
				var grave_meat = this.state.grave_meat;
				grave_meat.name = grave.name
				grave_meat.image = grave.image
				grave_meat.comment = grave.comment
				this.setState({ grave_meat });
			}
		}
		getValidationState(){
			var grave;
		}
		render(){
			const isOpen = this.props.isOpen;
			const appElement = document.getElementById('root');
			
		
			
			return(
				<Modal
				isOpen = {isOpen}
				appElement = {appElement}
				onRequestClose = {this.closeModal}
				onAfterOpen = {this.refreshGrave}
				>
				 <Row >
				 
				 <Col xs = "12" sm = "5">
				 	<img style = {{padding:"auto", height:"inherit", width:"inherit"}} src = {this.state.grave_meat.image} />
					
				 	<input
				 		type = "file"
				 		placeholder = "Upload Image"
				 		onChange = {this.imageChange}
				 		/>
				 </Col>
				 
				 <Col xs = "12" sm = "7">
				 
				    <FormGroup
				    	controlId = "grave_form"
				    	validationState = {this.getValidationState()}
				    >
				    	<FormControl
				    		type = "text"
				    		value = {this.state.grave_meat.name}
				    		placeholder = "Deceased Name"
				    		onChange = {this.nameChange}			    	
				    	
				    	/>
				    	
				    	<DatePicker id = "dod_picker"
				    		className = "form-control"
				    		selected = {this.props.date}
				    		onChange = {this.dateChange}
				    		dateFormat = "DD/MM/YYYY"
				    		showYearDropdown
				    		scrollableYearDropdown
				    		yearDropdownItemNumber={2000}
				    		minDate={moment().subtract(2000, "years")}
				    		maxDate={moment()}
				    		/>
				    	
				    	<FormControl
				    		type = "text"
				    		value = {this.state.grave_meat.comment}
				    		placeholder = "Last Words"
				    		onChange = {this.messageChange}			    	
				    	
				    	/>
				    	
				    	<Button type="button"
				    		onClick = {this.submitClick}
				    	>Post Grave</Button>
				    	
				    
				    
				    
				    </FormGroup>
				</Col>
				</Row>
				    
				</Modal>
				
				)
		}
}
				
		
	

class App extends Component {
	
	
	constructor(props){
		super(props);
		this.state = {
			ui_helper: {
				mouse_over:-1
				
			},
			grave: {	
			},
			
			graves:[],
											
			modals: {
				grave_form:false,
				grave_form_date:-1
				
				
			},
			
			App:{
				AppElement: document.getElementById('root')
			}
		};
		
		
		this.closeGraveForm = this.closeGraveForm.bind(this);
		this.submitGrave = this.submitGrave.bind(this);
		
		this.dayClick = this.dayClick.bind(this);
		this.dayOver = this.dayOver.bind(this);
		this.dayOut = this.dayOut.bind(this);
		
		this.loadGraves = this.loadGraves.bind(this);
		this.saveGraves = this.saveGraves.bind(this);
		this.sortGraves = this.sortGraves.bind(this);
		this.dateChange = this.dateChange.bind(this);
		this.setGrave = this.setGrave.bind(this);
					 
		
    }
  setGrave(day){
  	var date;
  	var x;
  	var graves = this.state.graves;
  	var grave = null ;
  	 for(x=0;x<graves.length && graves[x].day <= day;++x){
  	  		if(graves[x].day == day){
  	  			grave = graves[x];
  	  			this.setState({grave});
  	  		 				
  	  		}
  	  }
  	  if (grave === null){
  	  	date = new Date();
	   	date.setMonth(0);
		date.setDate(1);
		date.setDate(parseInt(day)+1)
		
  	  	  grave =  {
				name: "Unnamed Grave",
				date:date.getDate(),
				mth:date.getMonth(),
				year:2005,
				image: "./grave-0.jpg",
				comment: "A terrible Person",		
				grave_day:1		
			}
		this.setState({grave});
		
  	  }
  }
  loadGraves(){
  	var graves
  	if(window.localStorage.getItem("graves")){
  	  graves = JSON.parse(window.localStorage.getItem("graves"));
  	  if (graves === null){
  	  	  return false;
  	  }else{
  	  	  this.setState({graves})
  	  }
  	} else {
  		return false;
  	}
  	this.sortGraves();  
  }
  saveGraves(){
  	  var graves = this.state.graves
  	  window.localStorage.setItem("graves", JSON.stringify(graves));
  	  this.setState({graves});	  
  }
  
  sortGraves(){
  	  var graves = this.state.graves;
  	  graves.sort(function(a, b){
  	  	return a.day - b.day	  
  	  })
  	  
  	  this.setState({graves});
  	  
  	  
  }
  dayClick(e){
  	  var modals = this.state.modals;  	  
  	  var date = e.target.getAttribute("date");
  	  var mth  = e.target.getAttribute("mth");
  	  var day = e.target.getAttribute("day");
  	   	  
  	  var mmt
  	  var time = new Date();
  	  time.setDate(date);
  	  time.setMonth(mth);
  	  
  	  mmt = moment(time);
  	  modals.grave_form_date = mmt;
  	  modals.grave_form = true;
  	  
  	  this.setGrave(day);
  	  
  	  
  	  this.setState({modals});
 
  }
  
  dateChange(date){
  	   var modals = this.state.modals; 
  	   modals.grave_form_date = date;
  	   this.setState({modals});
  }
  
  closeGraveForm(){
  	var modals = this.state.modals
  	modals.grave_form = false;
  	
  	this.setState({modals});
  }
  
  submitGrave(grave){
  	  var modals = this.state.modals;
  	  var dod = new Date(modals.grave_form_date.toDate());
  	  
  	  var soy = new Date(dod);
  	  soy.setDate(1);
  	  soy.setMonth(0);
  	  
  	  var day = Math.floor((dod-soy)/86400000);
  	  var date = dod.getDate();
  	  var mth = dod.getMonth();
  	  var year = dod.getYear() + 1900;
  	  
  	  grave.day = day;
  	  grave.date = date;
  	  grave.mth = mth;
  	  grave.year = year;
  	  
  	  var graves = this.state.graves;
  	  graves.push(grave);
 	  
  	  this.sortGraves();
  	  this.closeGraveForm();
  }
    
  dayOver(e){
  	  var day = e.target.getAttribute("day");
  	  var ui_helper = this.state.ui_helper;
  	  ui_helper.mouse_over = day;
  	  this.setState({ui_helper});
  	  	 
  	  this.setGrave(day);
  	   
  	  
  }
  
  dayOut(){
  	  var ui_helper = this.state.ui_helper;
  	  ui_helper.mouse_over = -1;
  	  this.setState({ui_helper});
  	  
  }
  
  render() {
  	var mouse_over = this.state.ui_helper.mouse_over
  	var date = new Date();
  	var today = {};
  	today.day = date.getDate();
  	today.mth = date.getMonth();
  	
  	var day_ticker = new Date()
  		day_ticker.setDate(1)
  		day_ticker.setMonth(0);
  	var x; 	
  	var buttons = [];
  	var btn_class
  	var mth;
  	var day;
  	var graves = this.state.graves
  	  	  	
  	for (x=0;x<365;++x){
  		mth = day_ticker.getMonth();
  	    day = day_ticker.getDate();
  	      	      	    
  	    if(day === 1){
  	    	buttons.push(
  	    	<button
  	    		key = {"mth_"+mth}
  	    		className = {"mthBtn"}
  	    		>
  	    		{day_ticker.toLocaleDateString("en", {month:'short'})}	
  	    	</button>
  	    	)
  	    }
  	    
  	    if(mth == today.mth && day == today.day && mouse_over == -1){
  	    	btn_class = "bgBtn"
  	    }else if(mouse_over == x){
  	    	btn_class = "bgBtn"	
  	    }else{
  	    	btn_class = "smBtn"
  	    }
  	    
  	    buttons.push(
  	    	<button 
  	    		className = {btn_class}
  	    		onClick = {this.dayClick}
  	    		onMouseEnter = {this.dayOver}
  	    		onMouseLeave = {this.dayOut}
  	    		date = {day}
  	    		mth = {mth}
  	    		day = {x}
  	    		key = {x}
  	    	
  	    		>{day}
  	    	
  	    	</button>
  	    	)
  	    
  	    day_ticker.setDate(day_ticker.getDate()+1);
  	   
  	}
  	    	
  	     	  
  	  
    return (
      <div className="App">
        <header className="App-header">
           <h1 className="App-title">PissOnTheirGrave</h1>
        </header>
        <div className = "Year-view">   
        	{buttons}
        </div>
        <div className = "Detail-view">
        	<div className = "Portrait-view">
        		<img style = {{height:"inherit", width:"inherit"}} alt = "GRAVE" src = {this.state.grave.image} />
        	</div>
        	<div className = "Portrait-meta">
        		<h2>{this.state.grave.name} <strong>{this.state.grave.date +"/"+ (this.state.grave.mth + 1) +"/" + this.state.grave.year}</strong> </h2>
        		<a href="https://www.google.ca/maps/@43.6607909,-79.3413887,3a,18.7y,178.21h,104.12t/data=!3m6!1e1!3m4!1sEjlVAqlN2Y82LLW-3TdtkQ!2e0!7i13312!8i6656">{this.state.grave.gps}</a>
        		<h3>{this.state.grave.comment}</h3>
        		
        	
        	</div>
        
        </div>
       
        
        <GraveForm 
        	isOpen = {this.state.modals.grave_form}
        	submitGrave= {this.submitGrave}	
        	date = {this.state.modals.grave_form_date}
        	closeModal = {this.closeGraveForm}
        	dateChange ={this.dateChange}
        	graveInit = {this.state.grave}
        />
      </div>
      
     
    );
  }
}

export default App;
