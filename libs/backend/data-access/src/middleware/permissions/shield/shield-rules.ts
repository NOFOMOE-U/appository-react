interface ShieldRule {
    name: string;
    category: string;
  }
  
  interface ShieldRuleset {
    name: string;
    rules: ShieldRule[];
  }
  
  function parseShieldRuleset(data: string): ShieldRuleset {
    const parsedData = JSON.parse(data);
    return {
      name: parsedData.name,
      rules: parsedData.rules.map((rule: any) => ({
        name: rule.name,
        category: rule.category
      }))
    };
  }
  
  const json = `
    {
      "name": "Example Ruleset",
      "rules": [
        {"name": "Rule 1", "category": "Cat 1"},
        {"name": "Rule 2", "category": "Cat 2"}
      ]
    }
  `;
  
  export const shieldRuleset = parseShieldRuleset(json);
  
  console.log(shieldRuleset);
  