<script>
  import io from 'socket.io-client';

  const username = prompt("Please enter your user name", "");
  const socket = io("https://guarded-stream-90676.herokuapp.com/?username=" + username);
  let userDict = {};
  let userList = [];
  let rolls = [];

  function roll() {
  	socket.emit("roll");
  }

  // listen for roll event
  socket.on("roll", (userId, result) => {
  	console.log("received roll", userId, result);
	rolls = [{
		user: userDict[userId],
		result: result
	}, ...rolls];
	console.log(rolls);
  });

  // listen for user list event
  socket.on("users-list", (data) => {
	console.log("received users-list", data);
	userDict = data;
	userList = Object.values(data);
  });
</script>

<h1>Hello {username}!</h1>


<h2>Rollers</h2>
<ul>
	{#each userList as user, i}
		<li>
			{user}
		</li>
	{/each}
</ul>

<button on:click={roll}>Roll dice</button>

<h2>Rolls</h2>
<ul>
	{#each rolls as {user, result}, i}
		<li>
			{user}: {result}
		</li>
	{/each}
</ul>
