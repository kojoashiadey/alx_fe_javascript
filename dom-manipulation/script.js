// Initial quotes data
let quotes = [
  { text: "The only way to do great work is to love what you do.", category: "inspiration" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "business" },
  { text: "Your time is limited, don't waste it living someone else's life.", category: "life" },
  { text: "Stay hungry, stay foolish.", category: "motivation" },
  { text: "The journey of a thousand miles begins with one step.", category: "inspiration" },
  { text: "That which does not kill us makes us stronger.", category: "philosophy" },
  { text: "Be the change that you wish to see in the world.", category: "life" }
];

let currentCategory = 'all';

// DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const categoryButtons = document.getElementById('categoryButtons');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  // Display first quote
  displayRandomQuote();
  
  // Set up event listeners
  newQuoteBtn.addEventListener('click', displayRandomQuote);
  
  // Create category buttons
  createCategoryButtons();
});

// Function to display a random quote
function displayRandomQuote() {
  let filteredQuotes = quotes;
  
  if (currentCategory !== 'all') {
    filteredQuotes = quotes.filter(quote => quote.category === currentCategory);
  }
  
  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = '<p>No quotes available in this category.</p>';
    return;
  }
  
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];
  
  quoteDisplay.innerHTML = `
    <blockquote>
      <p>"${randomQuote.text}"</p>
      <footer>- ${randomQuote.category}</footer>
    </blockquote>
  `;
}

// Function to create category buttons
function createCategoryButtons() {
  // Get all unique categories
  const categories = ['all', ...new Set(quotes.map(quote => quote.category))];
  
  // Clear existing buttons
  categoryButtons.innerHTML = '';
  
  // Create buttons for each category
  categories.forEach(category => {
    const button = document.createElement('button');
    button.textContent = category;
    button.className = 'category-btn';
    if (category === currentCategory) {
      button.classList.add('active-category');
    }
    
    button.addEventListener('click', () => {
      currentCategory = category;
      // Update active button
      document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active-category');
      });
      button.classList.add('active-category');
      
      showRandomQuote();
    });
    
    categoryButtons.appendChild(button);
  });
}

// Function to add a new quote
function addQuote() {
  const quoteText = document.getElementById('newQuoteText').value.trim();
  const quoteCategory = document.getElementById('newQuoteCategory').value.trim();
  
  if (!quoteText || !quoteCategory) {
    alert('Please enter both quote text and category');
    return;
  }
  
  // Add new quote to the array
  quotes.push({
    text: quoteText,
    category: quoteCategory.toLowerCase()
  });
  
  // Clear input fields
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
  
  // Update category buttons
  createCategoryButtons();
  
  // Show the newly added quote
  currentCategory = quoteCategory.toLowerCase();
  showRandomQuote();
}
