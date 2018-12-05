const fs=require('fs');
const text=fs.readFileSync("./input.txt").toString();
const input=text.split("");
/*Beginning of part 1*/
const part1="How many units remain after fully reacting the polymer you scanned?";
const convertToString=(input)=>{
	let string="";
	input.forEach(char=>{
		string+=char;
	})
	return string;
}
const reactPolymer=(input)=>{

	for(let i=0; i<input.length; i++){
		if(input[i]!==input[i-1]){
			if(input[i].toUpperCase()===input[i-1] || input[i].toLowerCase()===input[i-1]){
				input.splice(i-1,2);
				i-=2;
			}
		}
	}
	return input;
}
let reacted=reactPolymer(input);
let string=convertToString(reacted);
const solutionPart1=string.length
/*End of part 1*/
/*Beginning of part 2*/
const part2="What is the length of the shortest polymer you can produce by removing all units of exactly one type and fully reacting the result?";
const units=[]
input.map(char=>{
	if(!units.includes(char.toLowerCase())){
		units.push(char.toLowerCase());
	}
})
let reducedString="";
let solutionPart2=input.length;
units.forEach(char=>{
	reducedString="";
	input.forEach(unit=>{
		if(unit.toLowerCase()!==char) {
			reducedString+=unit;
		}
	})
	reacted=reactPolymer(reducedString.split(""));
	string=convertToString(reacted);
	if(string.length<solutionPart2)solutionPart2=string.length;
})
console.log({part1,solutionPart1,part2,solutionPart2})