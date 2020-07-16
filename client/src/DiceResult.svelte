<script>
  export let roll = {};
  let rollText = "";
  $: {
    const result = [];
    roll.dice.forEach(die => {
      if (die.qty > 0) {
        result.push(`${die.qty}${die.label}`)
      }
    });

    rollText = `${result.join(" + ")}`;

    if (roll.modifier) {
      const parsedModifier = parseInt(roll.modifier);
      if (parsedModifier >=0 ) {
        rollText = `${rollText} + ${parsedModifier}`;
      }
      else {
        rollText = `${rollText} - ${Math.abs(parsedModifier)}`;
      }
    }
  }
</script>

{rollText}