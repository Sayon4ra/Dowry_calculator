document.getElementById('submit').addEventListener('click', function () {
  let price = 100;

  const educationFactors = {
    bachelor: 1.5,
    college: 1.2,
    high_school: 1.05,
    middle_school: 0.9
  };

  const networthFactors = {
    upper_class: 2,
    middle_class: 1.5,
    lower_class: 1.2
  };

  const casteValues = {
    brahmin: 100,
    kshatriya: 50,
    vaishya: 20,
    shudra: 10,
    untouchable: -50
  };

  const skillValues = {
    music: 10,
    cook: 20,
    easygoing: 15,
    sing: 10
  };

  const reputationModifiers = {
    parents: 0.85,
    character: 0.9,
    general: -20
  };


  const education = document.getElementById('education').value;
  if (educationFactors[education]) {
    price *= educationFactors[education];
  }


  const networth = document.getElementById('networth').value;
  if (networthFactors[networth]) {
    price *= networthFactors[networth];
  }


  const caste = document.getElementById('caste').value;
  if (casteValues[caste] !== undefined) {
    price += casteValues[caste];
  }


  document.querySelectorAll('.skill:checked').forEach(skill => {
    price += skillValues[skill.value] || 0;
  });


  const ageRadios = document.querySelectorAll('input[name="age"]:checked');
  if (ageRadios.length > 0) {
    const ageVal = ageRadios[0].value;
    if (ageVal === '18-23') price *= 1.5;
    else if (ageVal === '24-27') price *= 1.2;
    else if (ageVal === '28+') price *= 0.95;
  }


  let reputationFactor = 1;
  let minusAmount = 0;
  document.querySelectorAll('.reputation:checked').forEach(rep => {
    if (rep.value === 'general') minusAmount += 20;
    else reputationFactor *= reputationModifiers[rep.value] || 1;
  });

  price = price * reputationFactor - minusAmount;


  price = Math.max(0, price.toFixed(2));


  const priceElement = document.getElementById('finalPrice');
  priceElement.textContent = `Final Dowry Price: $${price}`;
  priceElement.style.color = 'green';
  document.body.style.background = 'linear-gradient(to right, #ffd89b, #19547b)';
  document.querySelector('h1').textContent = 'Ancient Dowry Evaluator';
});
