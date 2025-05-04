document.getElementById('storyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the user-selected values
    const storyType = document.getElementById('storyType').value;
    const voiceType = document.getElementById('voiceType').value;
    const language = document.getElementById('language').value;

    // Fetch stories from the backend (which fetches them from the external API)
    fetch(`/api/stories?type=${storyType}&language=${language}`)
        .then(response => response.json())
        .then(data => {
            console.log("Fetched data:", data); 
            if (data.length > 0) {
                const story = data[0]; // Display the first story for now
                document.getElementById('storyContainer').innerHTML = `
                    <h3>${story.title}</h3>
                    <p>${story.content}</p>
                `;
                simulateVoiceReading(story.content, voiceType, language);
            } else {
                document.getElementById('storyContainer').innerHTML = "<p>No stories available for the selected filters.</p>";
            }
        })
        .catch(error => {
            console.error('Error fetching story:', error);
            document.getElementById('storyContainer').innerHTML = "<p>There was an error fetching the story. Please try again later.</p>";
        });
});

// Function to simulate voice reading (using Web Speech API)
function simulateVoiceReading(storyContent, voiceType, language) {
    const utterance = new SpeechSynthesisUtterance(storyContent);
    utterance.lang = language;  // Set the language for the speech
    window.speechSynthesis.speak(utterance);
}
