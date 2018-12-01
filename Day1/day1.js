const fs=require('fs');
const text=fs.readFileSync("./day1input1.txt").toString();
const input=text.split("\n");
let frequencyCatch=[];
let found=undefined;
let accumulator=0;
let res1=0;
do{
accumulator=input.reduce((acc,curr)=>{
	if(frequencyCatch.includes(acc) && found===undefined) found=acc;
	frequencyCatch.push(acc);
	
	return acc+=Number(curr);
	
},accumulator)
if(res1===0) res1=accumulator;
}while(!found);
console.log({solution_first: res1})
console.log({solution_second: found})




