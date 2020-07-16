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

      if (roll.mod) {
        result.push("TODO");
      }
      rollText = `${result.join(" + ")}`;
  }
    function printRoll() {

    }
</script>

{rollText}