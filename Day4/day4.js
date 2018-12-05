const fs=require('fs');
const text=fs.readFileSync("./day4input.txt").toString();
const input=text.split("\n");
let objArray=input.map(record=>{
	const recordSplit=record.split('[').pop(0).split(']');
	const date= new Date(recordSplit[0]);
	if(recordSplit[1].includes("Guard")){
		return	{timestamp: date, details: recordSplit[1].split(' ')[2]}
	}
	else{
		return {timestamp: date, details: recordSplit[1]}
	}
})
//sort array
for(let i=0; i<objArray.length; i++){
	for(let j=0; j<objArray.length; j++){
		if(objArray[i].timestamp<objArray[j].timestamp){
			const tempObj={...objArray[i]};
			objArray[i]={...objArray[j]};
			objArray[j]={...tempObj}
		}
	}
}
//create nights array
let tempNight=[];
const nights=[];
objArray.map(action=>{
	if(action.details.includes("#") && objArray.indexOf(action)>0){
		nights.push(tempNight);
		tempNight=[];
	}
	tempNight.push(action)
	if(objArray.indexOf(action)>objArray.length-1) nights.push(tempNight);
})
// calculate sleep time per night
nights.map(night=>{
	let sleepTime=0;
	for(let i=night.length-1; i>0; i--){
		if(night[i].details.includes("wakes up")){
			sleepTime+=Number(night[i].timestamp)-Number(night[i-1].timestamp);
		}
	}
	sleepTime=sleepTime/60000;
	night.push(sleepTime)
})
//calculate tot sleep time per id
objArray=[];
const sleepTime=[];
nights.map(night=>{
	if(objArray.includes(night[0].details)){
		const index=objArray.indexOf(night[0].details);
		sleepTime[index]+=night[night.length-1];
	}
	else{
		objArray.push(night[0].details);
		sleepTime.push(night[night.length-1]);
	}
})
//get max sleepTime
let max=0;
let idIndex=0;
for(let i=0; i<sleepTime.length; i++){
	if(sleepTime[i]>max){
		max=sleepTime[i];
		idIndex=i;
	}
}
const idSolution=objArray[idIndex];
console.log({idSolution})
//get found ID shifts
const solutionIdShifts=nights.filter(night=>{
	return night[0].details===idSolution;
})
//console.log(solutionIdShifts)
//calculate min and max hour and minutes
let minH=0, maxH=0, minM=0, maxM=0;
solutionIdShifts.map(shift=>{
	for(action of shift){
		if(action!=shift[shift.length-1] && action.details.includes('falls')){
			if(minH===0) minH=action.timestamp.getHours();
			if(minH>action.timestamp.getHours()) minH=action.timestamp.getHours();
			if(minM===0) minM=action.timestamp.getMinutes();
			if(minM>action.timestamp.getMinutes())minM=action.timestamp.getMinutes();
		}
		else if(action!=shift[shift.length-1] && action.details.includes('wakes')){
			if(maxH===0) maxH=action.timestamp.getHours();
			if(maxH<action.timestamp.getHours()) maxH=action.timestamp.getHours();
			if(maxM===0) maxM=action.timestamp.getMinutes();
			if(maxM<action.timestamp.getMinutes())maxM=action.timestamp.getMinutes();
		}
	}
})

//calculate minutes most sleep
//create minutes array
const minutes=[];
for(let i=minM; i<maxM+1; i++){
	minutes.push({min: i, times:0})
}
for(shift of solutionIdShifts){
	for(action of shift){
		if(isNaN(action) && action.details.includes("falls")){
			const sleep=action.timestamp.getMinutes();
			const wakeId=shift.indexOf(action)+1;
			const sleepingTime=shift[wakeId].timestamp.getMinutes();
			for(let i=0; i<minutes.length; i++){
				if(minutes[i].min>=sleep&&minutes[i].min<sleepingTime)minutes[i].times++;
			}
		}
	}
}
max={min: 0, times:0}
minutes.forEach(minute=>{
	if(minute.times>max.times) max={min: minute.min, times: minute.times}
})
const solution= Number(idSolution.split("#")[1])*max.min;

console.log(solution)