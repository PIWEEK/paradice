<script>
    export let roll = {};

    function printRoll() {
      const result = [];
      roll.dice.forEach(die => {
        if (die.qty > 0) {
          result.push(`${die.qty}${die.label}`)
        }
      });

      if (roll.mod) {
        result.push("TODO");
      }
      return `${result.join(" + ")} = ${roll.result}`
    }
</script>

{printRoll()}