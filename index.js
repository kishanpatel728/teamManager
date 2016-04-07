var teams = [
	['Dynamo', [
		{firstName: 'Oleksandr', lastName: 'Shovkosky', number: 1},
		{firstName: 'Andriy', lastName: 'Yarmolenko', number: 10}
	]],
	['Shakhtar', [
		{firstName: 'Andriy', lastName: 'Pyatov', number: 30}
	]],
]

var chosenTeam;
var deletingPlayer = false;

function updateTeams() {
	$('#teams').html('');
	
	for (i = 0; i < teams.length; i++) 
	{
		//build #teams innerHTML
		var html = "<div class='col-md-4'>";
		
		var teamName = teams[i][0];
		html += "<h3>" + teamName + "</h3>";
		html += "<table class='table table-striped table-hover'>" +
			+ "<thead>"
			+    "<tr>"
			+      "<th>#</th>"
			+      "<th>Player's Name</th>"
			+      "<th>Number</th>"
			+    "</tr>"
			+  "</thead>"
			+  "<tbody>";
		for (j = 0; j < teams[i][1].length; j++)
		{
			html += "<tr><td>" + (j+1) + "</td><td>" + teams[i][1][j].firstName + "  " 
					+ teams[i][1][j].lastName + "</td><td>" + teams[i][1][j].number + "</td></tr>";
		}
		html += "</tbody></table></div>";
		$('#teams').append(html);
	}
}

function updateEditTeams() {
	$('#editDiv').html('');
	var editDivHTML = "<table class='table table-striped table-hover'><tbody>";
	editDivHTML += "<h2>Choose the team you want to edit</h2>";
	for (i = 0; i < teams.length; i++) 
	{	
		//build #editDiv innerHTML
		var teamName = teams[i][0];
		editDivHTML += "<tr class='tr'><td><a href='#' onclick='editTeam(" + i + ")'><h4>" 
						+ teamName + "</h4></a></td>" 
						+ "<td width='5%'><a href='#' onclick='deleteTeam(" 
						+ i + ")'>" 
						+ "<span class='glyphicon glyphicon-remove-circle'>"
						+ "</span></a></td></tr>";
	}

	editDivHTML += "</tbody></table>";
	editDivHTML += "<button type=button' class='btn btn-success' data-toggle='modal' data-target='#teamModal'><h4>"
		+ "<span class='glyphicon glyphicon-plus'></span>  Add team</h4></button>";
	$('#editDiv').append(editDivHTML);
}

$(window).load(function() {
	updateTeams();	
	updateEditTeams();
});


$('#showTeams').click(function() {
	updateTeams();
	$('#editDiv').hide();
	$('#editTeam').hide();
	$('#teams').show();
});

$('#editButton').click(function() {
	$('#teams').hide();

	$('#editDiv').show();
});

function editTeam(id) {
	$('#editTeam').html('');
	var html = "<h2>Edit the team: <i>" + teams[id][0].toUpperCase() + "</i>" 
				+ "<a href='#' onclick='editTeamName(" + id
				+ ")'><small> edit team's name</small></h2></a>"
				+ "<table class='table table-striped table-hover'>"
				+ "<thead>"
				+    "<tr>"
				+      "<th>#</th>"
				+      "<th>Player's Name</th>"
				+      "<th>Number</th>"
				+      "<th>Delete</th>"
				+    "</tr>"
				+  "</thead>"
				+  "<tbody>";;
	for (j = 0; j < teams[id][1].length; j++)
	{
		html += "<tr class='tr' onclick='editPlayer("
				+ id + ", " + j
				+ ")'><a><td>" + (j+1) + "</td><td><a href='#'>" + teams[id][1][j].firstName + "  " 
				+ teams[id][1][j].lastName + "</a></td><td>" + teams[id][1][j].number 
				+ "</td><td><a href='#' onclick='deletePlayer(" 
				+ id + ", " + j
				+	")'><span class='glyphicon glyphicon-remove-circle'></span></a></td></tr>";
	}

	html += "</tbody></table>";
	html += "<button type=button' class='btn btn-success' data-toggle='modal' data-target='#playerModal'><h4>"
			+ "<span class='glyphicon glyphicon-plus'></span>  Add player</h4></button>";

	$('#editTeam').append(html);
	chosenTeam = id;
	$('#editTeam').show();

}

var editingPlayer = false;
var chosenPlayer;

function editPlayer(i, j) {
	chosenPlayer = j;
	if (!deletingPlayer)
	{
		//alert(i+' , '+j);
		$('#firstName').val(teams[i][1][j].firstName);
		$('#lastName').val(teams[i][1][j].lastName);
		$('#number').val(teams[i][1][j].number);		
		$('#playerModal').modal('show');
		editingPlayer = true;
	}
	else
		deletingPlayer = false;
}

function deletePlayer(i, j) {
	teams[i][1].splice(j, 1);
	editTeam(i);
	deletingPlayer = true;
}

function addPlayer() {
	var firstName = $('#firstName').val();
	var lastName = $('#lastName').val();
	var number = $('#number').val();
	var playersArr = teams[chosenTeam][1];

	if (!editingPlayer)	//add new player
	{
		playersArr.push(
			{
				firstName: firstName, 
				lastName: lastName, 
				number: number
			});
		editTeam(chosenTeam);
	
	}
	else 	//edit existing player
	{
		playersArr[chosenPlayer].firstName = firstName;
		playersArr[chosenPlayer].lastName = lastName;
		playersArr[chosenPlayer].number = number;
		editTeam(chosenTeam);
		$('#firstName').val('');
		$('#lastName').val('');
		$('#number').val('');	
		editingPlayer = false;
	}

} 

function addTeam() {
	var name = $('#teamName').val();
	teams.push([name, []]);
	updateEditTeams();
	$('#teamName').val('');
}

function deleteTeam(i) {
	teams.splice(i, 1);
	updateEditTeams();
	if (i == chosenTeam)
		$('#editTeam').hide();

}

function editTeamName(i) {
	chosenTeam = i;
    $('#teamNameUpdate').val(teams[chosenTeam][0]);
	$('#editTeamModal').modal('show');
}

function editTeamNameButton() {
	var name = $('#teamNameUpdate').val();
	teams[chosenTeam][0] = name;
	updateEditTeams();
	editTeam(chosenTeam);
}