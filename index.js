/*** You will not need this file until Unit 5 ***/

/*** Dark Mode ***
  
  Purpose:
  - Use this starter code to add a dark mode feature to your website.

  When To Modify:
  - [ ] Project 5 (REQUIRED FEATURE) 
  - [ ] Any time after
***/

// Step 1: Select the theme button
let themeButton = document.getElementById("theme-button");

// Step 2: Write the callback function
const toggleDarkMode = () => {
    // Write your code here
    document.body.classList.toggle("dark-mode");
    // This section will run whenever the button is clicked
}

// Step 3: Register a 'click' event listener for the theme button,
//             and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener("click", toggleDarkMode);



/*** Form Handling [PLACEHOLDER] [ADDED IN UNIT 6] ***
Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants.

  When To Modify:
  - [ ] Project 6 (REQUIRED FEATURE)
  - [ ] Project 6 (STRETCH FEATURE) 
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: Add your query for the submit RSVP button here
const rsvpButton = document.getElementById("rsvp-button");
const rsvpForm = document.getElementById("rsvp-form");
let count = 3;  // Initial RSVP count, matches the 3 default participants in your HTML


const addParticipant = (person) => {
    // Create new <p> element to show participant info
    const newParticipant = document.createElement("p");
    newParticipant.textContent = `🎟️ ${person.name} from ${person.state} has RSVP'd.`;

    // Append this new participant <p> to the participants container
    const participantsDiv = document.querySelector(".rsvp-participants");
    participantsDiv.appendChild(newParticipant);

    // Find the current RSVP count element by id
    const oldCountElement = document.getElementById("rsvp-count");
    if (oldCountElement) {
        oldCountElement.remove(); // Remove the old count from the DOM
    }

    // Increment the count variable by 1
    count = count + 1;

    // Create a new <p> element to show updated RSVP count
    const newCountElement = document.createElement("p");
    newCountElement.id = "rsvp-count";
    newCountElement.textContent = "⭐ " + count + " people have RSVP'd to this event!";

    // Append the new count element at the bottom of the participants list
    participantsDiv.appendChild(newCountElement);
};

// Step 3: Add a click event listener to the submit RSVP button here
// rsvpButton.addEventListener("click", validateForm);






/*** Form Validation ***
  
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.

  When To Modify:
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 7 (STRETCH FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: We actually don't need to select the form button again -- we already did it in the RSVP code above.

// Step 2: Write the callback function
const validateForm = (event) => {
  event.preventDefault();          // Prevent form submission

  let containsErrors = false;      // Track errors
  const rsvpInputs = document.getElementById("rsvp-form").elements;

  // Create the person object with properties for each input
  let person = {
    name: rsvpInputs[0].value.trim(),
    email: rsvpInputs[1].value.trim(),
    state: rsvpInputs[2].value.trim()
  };

  // Validate each property and add/remove error class accordingly
  if (person.name.length < 2) {
    containsErrors = true;
    rsvpInputs[0].classList.add("error");
  } else {
    rsvpInputs[0].classList.remove("error");
  }

  if (person.email.length < 2) {
    containsErrors = true;
    rsvpInputs[1].classList.add("error");
  } else {
    rsvpInputs[1].classList.remove("error");
  }

  if (person.state.length < 2) {
    containsErrors = true;
    rsvpInputs[2].classList.add("error");
  } else {
    rsvpInputs[2].classList.remove("error");
  }

  // If no errors, add participant and clear inputs manually
  if (!containsErrors) {
    addParticipant(person);
    toggleModal(person);  // <-- call here to show the modal

    // Clear each input manually
    for (let i = 0; i < rsvpInputs.length; i++) {
      const input = rsvpInputs[i];
      if (input.type !== "submit" && input.type !== "button") {
        input.value = "";
      }
    }
  }
};

// Step 3: Replace the form button's event listener with a new one that calls validateForm()
rsvpButton.addEventListener("click", validateForm);









/*** Animations [PLACEHOLDER] [ADDED IN UNIT 8] ***/
// animation variables and animateImage()
let rotateFactor = 0;
let modalImage = document.querySelector(".modal-image");

const animateImage = () => {
    // Toggle rotateFactor between 0 and -10
    if (rotateFactor === 0) {
        rotateFactor = -10;
    } else {
        rotateFactor = 0;
    }

    // Apply the rotation to the image
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
};









/*** Success Modal [PLACEHOLDER] [ADDED IN UNIT 9] ***/
/*** Modal ***/
let intervalId;  // Declare globally

const toggleModal = (person) => {
    const modal = document.getElementById("success-modal");
    const modalContent = modal.querySelector(".modal-message");
    modal.style.display = "flex";
    modalContent.textContent = `Thanks for RSVPing, ${person.name}. We can't wait to see you at the event! 🎉 It's going to be a blast — get ready for fun, friends, and good vibes!`;

    // Start the image animation
    intervalId = setInterval(animateImage, 500);  // Assign to global variable

    // After 5 seconds, hide the modal and stop the animation
    setTimeout(() => {
        modal.style.display = "none";
        clearInterval(intervalId);  // Stop animation
    }, 5000);
};

const closeModalButton = document.getElementById("close-modal-button");

const hideModal = () => {
  const modal = document.getElementById("success-modal");
  modal.style.display = "none";
  clearInterval(intervalId);  
};

closeModalButton.addEventListener("click", hideModal);