const fs=require('fs');
const text=fs.readFileSync("./day2input.txt").toString();
const input=text.split("\n");
//part 1
let twos=0,threes=0;
input.map(code=>{
	const count=[];
	let tempString="";
	for(letter of code){
		if(tempString.includes(letter)){
			count[tempString.indexOf(letter)]+=1;
		}
		else{
			tempString+=letter;
			count.push(1);
		}
	}
	if(count.includes(2))twos++;
	if(count.includes(3))threes++;
})
const checksum=twos*threes;
console.log({twos, threes,checksum})
//part 2
const solution=[];
for(let i=0; i<input.length; i++){
	for(let j=1; j<input.length; j++){
		let letters=0;
		for(let k=0; k<26; k++){
			if(input[i][k]!==input[j][k]) letters++
		}
		if(letters===1){
			if(!solution.includes(input[i]))
				solution.push(input[i]);
			if(!solution.includes(input[j]))
				solution.push(input[j]);
			break;
		}
	}
}
let finalSolution="";
for(let i=0; i<26; i++){
	if(solution[0][i]===solution[1][i]) finalSolution+=solution[0][i]
}
console.log({finalSolution})




