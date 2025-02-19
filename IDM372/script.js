document.addEventListener("DOMContentLoaded", () => {
    const monthSelect = document.getElementById("month");
    const yearSelect = document.getElementById("year");
    const calendarDays = document.getElementById("calendar-days");

    // Populate month dropdown
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    months.forEach((month, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    // Populate year dropdown (1900 - current year)
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 1900; y--) {
        const option = document.createElement("option");
        option.value = y;
        option.textContent = y;
        yearSelect.appendChild(option);
    }

    // Generate calendar based on selected year & month
    function generateCalendar(year, month) {
        calendarDays.innerHTML = ""; // Clear previous calendar

        const firstDay = new Date(year, month, 1).getDay(); // Day of the week first day lands on
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Number of days in month
        const prevMonthDays = new Date(year, month, 0).getDate(); // Previous month days

        // Fill in empty days from the previous month
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = prevMonthDays - i;
            dayDiv.classList.add("day", "disabled");
            calendarDays.appendChild(dayDiv);
        }

        // Fill in actual days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = day;
            dayDiv.classList.add("day");

            // Handle selection
            dayDiv.addEventListener("click", () => {
                document.querySelectorAll(".day").forEach(d => d.classList.remove("selected"));
                dayDiv.classList.add("selected");
            });

            calendarDays.appendChild(dayDiv);
        }

        // Fill in empty days at the end to align the next month
        let remainingDays = 42 - calendarDays.childElementCount;
        for (let i = 1; i <= remainingDays; i++) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = i;
            dayDiv.classList.add("day", "disabled");
            calendarDays.appendChild(dayDiv);
        }
    }

    // Set defaults
    const today = new Date();
    yearSelect.value = today.getFullYear();
    monthSelect.value = today.getMonth();
    generateCalendar(today.getFullYear(), today.getMonth());

    // Update calendar when month or year changes
    monthSelect.addEventListener("change", () => {
        generateCalendar(yearSelect.value, parseInt(monthSelect.value));
    });

    yearSelect.addEventListener("change", () => {
        generateCalendar(yearSelect.value, parseInt(monthSelect.value));
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const feetSelect = document.getElementById("feet");
    const inchesSelect = document.getElementById("inches");

    // Populate feet dropdown (1 to 10 feet)
    for (let i = 1; i <= 10; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        feetSelect.appendChild(option);
    }

    // Populate inches dropdown (1 to 11 inches)
    for (let i = 1; i <= 11; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        inchesSelect.appendChild(option);
    }
});