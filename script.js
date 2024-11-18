document.addEventListener('DOMContentLoaded', () => {
    const recipeList = document.getElementById('recipeList');
    const addRecipeBtn = document.getElementById('addRecipeBtn');
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const recipeForm = document.getElementById('recipeForm');

    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    function displayRecipes() {
        recipeList.innerHTML = '';
        recipes.forEach((recipe, index) => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            recipeCard.innerHTML = `
                <h3>${recipe.name}</h3>
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
                <button class="btn delete-btn" data-index="${index}">Delete</button>
            `;
            recipeList.appendChild(recipeCard);
        });

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', deleteRecipe);
        });
    }

    function addRecipe(e) {
        e.preventDefault();
        const name = document.getElementById('recipeName').value;
        const ingredients = document.getElementById('recipeIngredients').value;
        const instructions = document.getElementById('recipeInstructions').value;

        recipes.push({ name, ingredients, instructions });
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
        closeModal();
        recipeForm.reset();
    }

    function deleteRecipe(e) {
        const index = e.target.getAttribute('data-index');
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
    }

    function openModal() {
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    addRecipeBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    recipeForm.addEventListener('submit', addRecipe);

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Initial display of recipes
    displayRecipes();
});