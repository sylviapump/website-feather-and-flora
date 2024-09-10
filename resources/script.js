document.addEventListener('DOMContentLoaded', function () {
    // Function to close navbar when a link is clicked
    function closeNavbar() {
        const navToggler = document.querySelector('.navbar-toggler');
        if (navToggler) {
            const navCollapse = document.querySelector('.navbar-collapse');
            const icon = navToggler.querySelector('span');
            if (navCollapse && icon && navCollapse.classList.contains('show')) {
                navCollapse.classList.remove('show');
                icon.classList.toggle('fa-times', false);
                icon.classList.toggle('navbar-toggler-icon', true);
            }
        }
    }

    // Toggle navbar icon between default and 'X' icon
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function () {
            const icon = navbarToggler.querySelector('span');
            if (icon) {
                icon.classList.toggle('navbar-toggler-icon');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // Get current date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    const weddingDateInput = document.getElementById('weddingDate');
    if (weddingDateInput) {
        weddingDateInput.setAttribute('min', today); // Set the min attribute
    }

    // Function to toggle visibility and required attributes
    function toggleDesignElements(checkboxId, designSelectId) {
        const checkbox = document.getElementById(checkboxId);
        const designSelect = document.getElementById(designSelectId);

        if (!checkbox || !designSelect) return; // Early exit if elements don't exist

        function toggleElements() {
            if (checkbox.checked) {
                designSelect.style.display = 'block'; // Show select box
                designSelect.setAttribute('aria-required', 'true');
                designSelect.setAttribute('required', 'required');
                designSelect.querySelector('option[value=""]').textContent = 'Select Design';
            } else {
                designSelect.style.display = 'none'; // Hide select box
                designSelect.removeAttribute('aria-required');
                designSelect.removeAttribute('required');
                designSelect.querySelector('option[value=""]').textContent = 'No'; // Change default text
            }
        }

        checkbox.addEventListener('change', toggleElements);
        // Initialize state
        toggleElements();
    }

    // Set up visibility and required state toggles for each section
    const toggles = [
        ['sampleSet', 'sampleSetDesign'],
        ['saveTheDate', 'saveTheDateDesign'],
        ['invitationsEnvelopes', 'invitationsDesign'],
        ['invitationsRsvpSet', 'invitationsRsvpSetDesign'],
        ['invitationsRsvpDetailsSet', 'invitationsRsvpDetailsSetDesign'],
        ['programs', 'programsDesign'],
        ['menus', 'menusDesign'],
        ['placeCards', 'placeCardsDesign'],
        ['favourTags', 'favourTagsDesign'],
        ['thankYouNoteCards', 'thankYouNoteCardsDesign'],
        ['envelopeSeals', 'envelopeSealsDesign'],
        ['senderAddressLabels', 'senderAddressLabelsDesign']
    ];

    toggles.forEach(([checkboxId, designSelectId]) => toggleDesignElements(checkboxId, designSelectId));

    // Function to handle form submission
    function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        // Collect checkbox data
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let emailBody = 'Checkbox Statuses:\n\n';

        checkboxes.forEach(checkbox => {
            const label = document.querySelector(`label[for="${checkbox.id}"]`);
            const status = checkbox.checked ? 'Yes' : 'No';
            emailBody += `${label ? label.textContent.trim() : checkbox.id}: ${status}\n`;
        });

        // Display the email content in the designated area
        document.getElementById('email-content').textContent = emailBody;

        // Log it to the console for debugging
        console.log(emailBody);

        // If validation passed, submit the form
        const anyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
        const errorMessage = document.getElementById('error-message');
        if (!anyChecked) {
            if (errorMessage) {
                errorMessage.style.display = 'block'; // Show error message
            }
            return; // Prevent form submission
        } else {
            if (errorMessage) {
                errorMessage.style.display = 'none'; // Hide error message
            }
        }

        // If validation passed, submit the form
        event.target.submit();
    }

    // Attach submit event listener to the form
    const form = document.querySelector('form[name="order-form"]');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
    
});
