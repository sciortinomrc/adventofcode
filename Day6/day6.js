const fs=require('fs');
const text=fs.readFileSync("./input.txt").toString();
const input=text.split("\n");
const letters=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
//array of stingreset
const reset=(array)=>{
	while(array.length){
		array.pop();
	}
}

//create points
const points=[];
input.forEach(point=>{
	const i=input.indexOf(point);
	const split=point.split(', ');
	points.push({point: (i<letters.length)?letters[i]:letters[i-letters.length]+[i-letters.length], x:Number(split[0]), y:Number(split[1]), times:0, type:"finited"})
})
//position points on grid
const grid=[];
for(let i=0; i<400; i++){
	grid.push([]);
	for(let j=0; j<400; j++){
		points.forEach(point=>{
			if(point.x===j && point.y===i){
				grid[i].push(point.point);
			}
		})
		if(!grid[i][j]){
			grid[i].push(' ');
		}
	}
}
//calculate distance
let i=1;
let test=0;
for(let x=0; x<grid.length; x++){
	for(let y=0; y<grid.length; y++){
		let closest="";
		let min=grid.length;
		
		points.forEach(point=>{
			if(Math.abs(y-point.x)+Math.abs(x-point.y)<min) {
				min=Math.abs(y-point.x)+Math.abs(x-point.y);
				closest=point.point;
			}
			else if(Math.abs(y-point.x)+Math.abs(x-point.y)===min){
				closest=".";

			}
		})
		grid[x][y]=(closest!==grid[x][y])?closest.toLowerCase():closest
		points.forEach(point=>{
			if(closest.toUpperCase()===point.point)
				point.times++;
		})
	}
}
//navigate border
const filteredByFinited=[]
for(let i=0; i<grid.length; i++){
	points.forEach(point=>{
		if(point.point===grid[0][i].toUpperCase() || 
		point.point===grid[i][0].toUpperCase() ||
		point.point===grid[i][grid.length-1].toUpperCase() ||
		point.point===grid[grid.length-1][i].toUpperCase()){
			point.type="infinite";
		}
	})
}
//filter
points.forEach(point=>{
	if(point.type==="finited"){
		filteredByFinited.push(point)
	}
})
//get bigger
let solution1=0;
filteredByFinited.forEach(point=>{
	if(point.times>solution1) solution1=point.times;
})

console.log(solution1)

//part 2
let solution2=0;
for(let y=0; y<grid.length; y++){
	for(let x=0; x<grid.length; x++){
		let sum=0;
		points.forEach(point=>{
			sum+=Math.abs(point.x-x)+Math.abs(point.y-y);
		})
		if(sum<10000){
			grid[x][y]="#";
			solution2++;
		}
	}
}
const finalGrid=[];
for(let i=0; i<grid.length; i++){
	finalGrid.push("");
	grid[i].forEach(point=>{
		finalGrid[i]+=point;
	})
}
///console.log(finalGrid)
console.log(solution2)

