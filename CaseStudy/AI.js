let Arr1 = [0,2,4,20,100,105,110,115,120,130];
let Arr2 = [0,1,3,15,55,56,57,58,60,62];

function AIMode()
{
	if (!InGame) return;
	let vmax = -Infinity;
	let px = py = -1;
	let TBoard = GetBoard();
	for (y = 0; y < size; y++)
	{
		for (x = 0; x < size; x++)
		{
			if (TBoard[x+y*size] === -1)
			{
				TBoard[x+y*size] = 1;
				let mark = GetMark(x,y,TBoard);
				TBoard[x+y*size] = -1;
				if (mark > vmax)
				{
					px = x;py = y;
					vmax = mark;
				}
			}
		}
	}
	try
	{
		let sqr = document.getElementsByClassName("square");
		sqr.item(px + py*size).setAttribute("player","1");
		sqr.item(px + py*size).style.backgroundImage = "url('Images/X.png')";
		l_played.push(px+py*size);
	}
	catch(e) {alert(e.message)}
}

function GetBoard()
{
	let TBoard = [];
	let sqr = document.getElementsByClassName("square");
	for (i = 0; i < size*size;i++)
		TBoard.push(parseInt(sqr.item(i).getAttribute("player")));
		
	return TBoard;
}

function GetMark(x,y,Tboard)
{
	let val = Tboard[x+y*size];
	if (val == -1) return 0;
	
	let result = Arr1[GetMarkHor(x,y,Tboard,1)] + Arr1[GetMarkVer(x,y,Tboard,1)] 
	+ Arr1[GetMarkCross1(x,y,Tboard,1)] + Arr1[GetMarkCross2(x,y,Tboard,1)];
	
	result += Arr2[GetMarkHor(x,y,Tboard,0)] + Arr2[GetMarkVer(x,y,Tboard,0)] 
	+ Arr2[GetMarkCross1(x,y,Tboard,0)] + Arr2[GetMarkCross2(x,y,Tboard,0)];
	
	return result;
}

function GetMarkHor(x,y,TBoard,player)
{
	let count = 0,counto = 0;
	for (i = x-1;i > 0;i--)
	{
		if (TBoard[i+y*size] === player) count++;
		else {if (TBoard[i+y*size] !== -1) counto++;break;}
	}
	for (i = x+1;i < size;i++)
	{
		if (TBoard[i+y*size] === player) count++;
		else {if (TBoard[i+y*size] !== -1) counto++;break;}
	}
	if (mode === 1 && counto >= 2) return 0;
	if ((x === 0 || x === size-1) && count < 4) counto++;
	if (count <= counto) return 0;
	else if (count - counto >= 3) return count + counto;
	else return count - counto;
}

function GetMarkVer(x,y,TBoard,player)
{
	let count = 0,counto = 0;
	for (i = y-1;i > 0;i--)
	{
		if (TBoard[x+i*size] === player) count++;
		else {if (TBoard[x+i*size] !== -1) counto++;break;}
	}
	for (i = y+1;i < size;i++)
	{
		if (TBoard[x+i*size] === player) count++;
		else {if (TBoard[x+i*size] !== -1) counto++;break;}
	}
	if (mode === 1 && counto >= 2) return 0;
	if ((y === 0 || y === size-1) && count < 4) counto++;
	if (count <= counto) return 0;
	else if (count - counto >= 3) return count + counto;
	else return count - counto;
}

function GetMarkCross1(x,y,TBoard,player)
{
	let count = 0,counto = 0;
	for (i = 1;i < minab(size-x,y+1);i++)
	{
		if (TBoard[(x+i)+(y-i)*size] === player) count++;
		else {if (TBoard[(x+i)+(y-i)*size] !== -1) counto++;break;}
	}
	for (i = 1;i < minab(x+1,size-y);i++)
	{
		if (TBoard[(x-i)+(y+i)*size] === player) count++;
		else {if (TBoard[(x-i)+(y+i)*size] !== -1) counto++;break;}
	}
	if (mode === 1 && counto >= 2) return 0;
	if ((x === 0 || x === size-1 || y === 0 || y === size-1) && count < 4) counto++;
	if (count <= counto) return 0;
	else if (count - counto >= 3) return count + counto;
	else return count - counto;
}

function GetMarkCross2(x,y,TBoard,player)
{
	let count = 0,counto = 0;
	for (i = 1;i < minab(x+1,y+1);i++)
	{
		if (TBoard[(x-i)+(y-i)*size] === player) count++;
		else {if (TBoard[(x-i)+(y-i)*size] !== -1) counto++;break;}
	}
	for (i = 1;i < minab(size-x,size-y);i++)
	{
		if (TBoard[(x+i)+(y+i)*size] === player) count++;
		else {if (TBoard[(x+i)+(y+i)*size] !== -1) counto++;break;}
	}
	if (mode === 1 && counto >= 2) return 0;
	if ((x === 0 || x === size-1 || y === 0 || y === size-1) && count < 4) counto++;
	if (count <= counto) return 0;
	else if (count - counto >= 3) return count + counto;
	else return count - counto;
}