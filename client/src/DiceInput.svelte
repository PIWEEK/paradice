<script>

    let diceD4 = {label:"D4", range:(1,4), qty:0};
    let diceD6 = {label:"D6", range:(1,6), qty:0};
    let diceD8 = {label:"D8", range:(1,8), qty:0};
    let diceD10 = {label:"D10", range:(1,10), qty:0};
    let diceD12 = {label:"D12", range:(1,12), qty:0};
    let diceD20 = {label:"D20", range:(1,20), qty:0};
    let diceD100 = {label:"D100", range:(1,100), qty:0};

function gatherRoll() {
        selectedImage = tabletextures[i]['path'];
        text = "You chose "+tabletextures[i]['name'];
    }

let latestroll = 0;

</script>


<label>
	{diceD4.label} <input type=number bind:value={diceD4.qty} min=0 max=20>
</label>
<label>
	{diceD6.label} <input type=number bind:value={diceD6.qty} min=0 max=20>
</label>
<label>
	{diceD8.label} <input type=number bind:value={diceD8.qty} min=0 max=20>
</label>
<label>
	{diceD10.label} <input type=number bind:value={diceD10.qty} min=0 max=20>
</label>
<label>
	{diceD12.label} <input type=number bind:value={diceD12.qty} min=0 max=20>
</label>
<label>
	{diceD20.label} <input type=number bind:value={diceD20.qty} min=0 max=20>
</label>
<label>
	{diceD100.label} <input type=number bind:value={diceD100.qty} min=0 max=20>
</label>

<p>{diceD4.qty} + {diceD6.qty} +{diceD8.qty} + {diceD10.qty} +{diceD12.qty} +{diceD20.qty} +{diceD100.qty} = {diceD4.qty + diceD6.qty + diceD8.qty + diceD10.qty + diceD12.qty + diceD20.qty + diceD100.qty}</p>