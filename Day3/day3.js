const fs=require('fs');
const text=fs.readFileSync("./day3input.txt").toString();
const input=text.split("\n");

// load array of object with input converted to objects
input.forEach(inputSplit=>{
	const index=input.indexOf(inputSplit);
	iSplit=inputSplit.split(" ");
	const fromLeft= Number(iSplit[2].split(",")[0]);
	const fromTop= Number(iSplit[2].split(",")[1].split(":")[0]);
	const width= Number(iSplit[3].split("x")[0]);
	const height= Number(iSplit[3].split("x")[1]);
	const rightSide=fromLeft+width;
	const bottomSide=fromTop+height;
	input[index]={
		id: iSplit[0], fromLeft, fromTop, width, height, rightSide, bottomSide, overlaps:false
	}
})
//part 1
let squareInches=0;
let id="";
for(let row=0; row<1000; row++){
	for(let col=0; col<1000; col++){
		let squareInche=0;
		input.forEach(piece=>{
			if(
				row>piece.fromTop && 
				row<=piece.bottomSide &&
				col>piece.fromLeft &&
				col<=piece.rightSide
			){	
				squareInche++;
				if(squareInche===2) squareInches++;
			}
		})
	}
}
console.log({solution1:squareInches})
//part 2

input.forEach(piece=>{
	input.forEach(piece2=>{
	if(piece.id!==piece2.id){
		if(	
			((piece.fromLeft>=piece2.fromLeft && piece2.rightSide>=piece.rightSide) ||
			(piece.fromLeft<=piece2.fromLeft && piece2.fromLeft<=piece.rightSide) ||
			(piece.fromLeft<=piece2.rightSide && piece2.rightSide<=piece.rightSide)) && 
			((piece.fromTop>=piece2.fromTop && piece2.bottomSide>=piece.bottomSide) ||
			(piece.fromTop<=piece2.fromTop && piece2.fromTop<=piece.bottomSide) ||
			(piece.fromTop<=piece2.bottomSide && piece2.bottomSide<=piece.bottomSide))
		){		
			piece.overlaps=true;
			piece2.overlaps=true;
		}
	}
	})
})
const solution=input.filter(piece=>{
	return !piece.overlaps;
})
console.log({solution2: solution})