const fetchData = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json');
      const data = await response.json();
      renderData(data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  
  const renderData = (data) => {
    const root = document.getElementById('root');
  
    const renderDevelopers = (developers) => {
      // Clear the existing content
      root.innerHTML = '';
  
      developers.forEach((developer) => {
        const { name, designation, skills } = developer;
  
        // Create a card element
        const card = document.createElement('div');
        card.classList.add('card');
  
        // Render name
        const nameElement = document.createElement('h3');
        nameElement.textContent = name;
        card.appendChild(nameElement);
  
        // Render designation
        const designationElement = document.createElement('p');
        designationElement.textContent = `Designation: ${designation}`;
        card.appendChild(designationElement);
  
        // Render skills
        const skillsElement = document.createElement('p');
        skillsElement.textContent = `Skills: ${skills.join(', ')}`;
        card.appendChild(skillsElement);
  
        // Append the card to the root element
        root.appendChild(card);
      });
    };
  
    renderDevelopers(data);
  
    // Filter developers by name or skills
    const handleSearch = (event) => {
      const searchValue = event.target.value.toLowerCase();
  
      const filteredDevelopers = data.filter((developer) =>
        developer.name.toLowerCase().includes(searchValue)
      );
  
      renderDevelopers(filteredDevelopers);
    };
  
    // Add search input field
    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', 'Search by name');
    searchInput.addEventListener('input', handleSearch);
    root.insertBefore(searchInput, root.firstChild);
  
    // Add filter checkboxes for skills
    const skillsSet = new Set();
    data.forEach((developer) => {
      developer.skills.forEach((skill) => skillsSet.add(skill));
    });
  
    const skillsList = Array.from(skillsSet);
  
    const handleFilter = () => {
      const selectedSkills = Array.from(document.querySelectorAll('input[name=skills]:checked'))
        .map((checkbox) => checkbox.value);
  
      const filteredDevelopers = data.filter((developer) =>
        selectedSkills.every((skill) => developer.skills.includes(skill))
      );
  
      renderDevelopers(filteredDevelopers);
    };
  
    const skillsContainer = document.createElement('div');
    skillsContainer.classList.add('skills-container');
  
    skillsList.forEach((skill) => {
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('name', 'skills');
      checkbox.setAttribute('value', skill);
      checkbox.addEventListener('change', handleFilter);
  
      const label = document.createElement('label');
      label.textContent = skill;
  
      skillsContainer.appendChild(checkbox);
      skillsContainer.appendChild(label);
    });
  
    root.insertBefore(skillsContainer, root.firstChild);
  };
  
  fetchData();
  